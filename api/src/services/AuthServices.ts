import { prisma } from "../libs/prisma";
import jwt, { sign, verify } from "jsonwebtoken";
import { RegisterInput } from "../types/auth";

export default class AuthServices {
    private accessToken: string;
    private refreshToken: string;

    constructor () {
        this.accessToken = process.env.JWT_ACCESS_SECRET as string ?? null;
        this.refreshToken = process.env.JWT_REFRESH_SECRET as string ?? null;

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
    /* ---------------------------- Register / Login ---------------------------- */
    async regitser (data: RegisterInput) {
        try {

        } catch (err) {
            
        }
    }
}