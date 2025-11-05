import { prisma } from "../libs/prisma";
import jwt, { sign, verify } from "jsonwebtoken";
import { LoginInput, RegisterInput } from "../types/auth";
import bcrypt from "bcryptjs";
import { User } from "../generated/client";

class AuthServices {
    private accessToken: string;
    private refreshToken: string;

    constructor () {
        this.accessToken = process.env.JWT_ACCESS_SECRET as string ?? '';
        this.refreshToken = process.env.JWT_REFRESH_SECRET as string ?? '';
        if (this.refreshToken || this.accessToken) throw new Error('Missing jwt secert in env !');
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

    async storeRefreshToken (email: string) {
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
        if (!data.email || data.email === '') throw new Error('Missing credential !');
        const user = await this.findUserWithEmail(data.email);
        if (!user) throw new Error('Invalid credentials');

        const correctPassword = await bcrypt.compare(data.password, user.password);
        if (!correctPassword) throw new Error('Invalid password');
        
    }

    async findUserWithEmail (email: string): Promise<User | null> {
        return await prisma.user.findUnique({ 
            where: { email: email }
        });
    }
}

export default new AuthServices();