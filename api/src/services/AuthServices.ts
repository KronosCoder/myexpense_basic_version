import { prisma } from "../libs/prisma";
import jwt, { sign, verify } from "jsonwebtoken";
import { LoginInput, RegisterInput } from "../types/auth";
import bcrypt from "bcryptjs";
import { User } from "../generated/client";
import { Result } from "../libs/result";

class AuthServices {
    private accessToken: string;
    private refreshToken: string;

    constructor () {
        this.accessToken = process.env.JWT_ACCESS_SECRET as string ?? '';
        this.refreshToken = process.env.JWT_REFRESH_SECRET as string ?? '';
        console.log('SECRET: ' + this.accessToken)
        console.log('SECRET: ' + this.refreshToken)
    }

    /* -------------------------------- Token -------------------------------- */
    generateAccessToken (userId: string, tokenId: string): string {
        return sign({ userId, tokenId }, this.accessToken, {
            expiresIn: '15m',
            algorithm: 'HS256',
        });
    }
    
    generateRefreshToken (userId: string, tokenId: string): string {
        return sign({ userId, tokenId }, this.refreshToken, {
            expiresIn: '7d',
            algorithm: 'HS256',
        });
    }
    
    verifyToken<T> (token: string, type: 'access' | 'refresh'): T | null {
        try {
            const secret = type === 'access' ? this.accessToken : this.refreshToken;
            return jwt.verify(token, secret ) as T;
        } catch (err) { 
            return null;
        }
    }

    tokenExpiredAt (day: number): Date {
        return new Date(Date.now() * day * 24 * 60 *60 * 1000);
    }

    async revokeRefreshToken (userId: string) {
        const oldToken = await prisma.userRefreshToken.findMany({
            where: { userId: userId }
        });
        return await prisma.userRefreshToken.updateMany({
            where: { id: { in: oldToken.map(t => t.id) } },
            data: { isRevoked: true }
        });
    }

    async storeRefreshToken (email: string) {
        const user = await this.findUserWithEmail(email);
        if (!user) throw new Error('Not found user');

        const ok = this.revokeRefreshToken(user.id);
        if (!ok) throw new Error('An occurred error revoking refresh token.');

        const expiredDate = 7;
        const newTokenId = crypto.randomUUID();
        const refreshToken = this.generateRefreshToken(user.id, newTokenId);
        return await prisma.userRefreshToken.create({
            data: {
                userId: user.id,
                token: refreshToken,
                expiredAt: this.tokenExpiredAt(expiredDate),
            }
        });
    }

    async refreshAccessToken (userId: string, refreshToken: string): Promise<string | {}> {
        // เช็คว่าฝั่ง client ส่ง Parametter มาครบไหม
        if (!userId || !refreshToken) return Result.badRequest('Missing userId or refreshToken!');
        
        // เช็คว่า RefreshToken หมดอายุหรือยังถ้าหมดก็ลบทิ้งไปเลยและป้องกัน Token ปลอม
        const payload = this.verifyToken<{ 
            userId: string,
            refreshToken: string 
        }>(refreshToken, 'refresh');

        if (!payload) {
            await prisma.userRefreshToken.deleteMany({ 
                where: { token: refreshToken }
            });
            return Result.unauthorize('Refresh token is expired or Invalid!');
        }

        // ดึง Token ใน DB มาเช็คต่ออีกชั้นว่า Revoke หรือยัง (ป้องกันอีกชั้น)
        const dbToken = await prisma.userRefreshToken.findUnique({
            where: { token: refreshToken },
        });

        if (!dbToken || dbToken.isRevoked || dbToken.expiredAt < new Date()) {
            return Result.unauthorize('Token revoked or expired');
        }

        const newAccessToken = this.generateAccessToken(payload.userId, crypto.randomUUID());
        return Result.success({ accessToken: newAccessToken });
    } 

    /* ---------------------------- Register / Login ---------------------------- */
    async regitser (data: RegisterInput): Promise<User> {
        const existEmail = await this.findUserWithEmail(data.email);
        if (existEmail) throw new Error('Email aldready exists !');
        const salt = 10;
        const hashedPassword: string = await bcrypt.hash(data.password, salt);
        const user = await prisma.user.create({
            data: { email: data.email, password: hashedPassword },
        });
        
        return user;
    }   

    async login (data: LoginInput) {
        if (!data.email || data.email === '') throw new Error('Missing credential!');
        const user = await this.findUserWithEmail(data.email);
        if (!user) return Result.notFound("Not found user.");

        const correctPassword = await bcrypt.compare(data.password, user.password);
        if (!correctPassword) return Result.error("Invalid password.");
        this.storeRefreshToken(user.id);

        const accessTokenId = crypto.randomUUID();
        const accessToken = this.generateAccessToken(user.id, accessTokenId);
        
        return Result.success({ accessToken }, "Login successfully.");
    }

    async findUserWithEmail (email: string): Promise<User | null> {
        return await prisma.user.findUnique({ 
            where: { email }
        });
    }
}

export default new AuthServices();