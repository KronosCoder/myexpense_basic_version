import { PrismaClient } from "../generated/client";
import dotenv from 'dotenv';

/* ตั้ง __db__ เพราะให้รู้ว่าไม่ควรใช้โดยตรง */
declare global {
    var __db__ : PrismaClient | undefined;
}

export const prisma = global.__db__ ?? new PrismaClient();
