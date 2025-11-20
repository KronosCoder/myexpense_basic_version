import { Context } from "hono";
import { setCookie } from "hono/cookie";
import AuthServices from "../services/AuthServices";
import { z } from "zod";
import { errorHandler } from "../libs/errorHandler";

const registerSchema = z.object({
    email: z.string().email({ message: "Invalid email pattern" }),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
}).refine(d => d.password === d.confirmPassword, {
    message: "Password do not macth",
    path: ["confirmPassword"]
});

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    isRememberMe: z.boolean(),
});

type LoginRequest = {
    email: string;
    password: string;
    isRememberMe: boolean;
}

export default class AuthController {
    static async register (ctx: Context) {
        try {
            const datas = await (ctx.req.json)
            console.log(datas)
            const raw: { email: string, password: string, confirmPassword: string } = await ctx.req.json();
            const data = registerSchema.parse(raw);
            const response = await AuthServices.regitser(data);
            return ctx.json(response, (response as any).status_code);
        } catch (err: any) {
            return ctx.json(errorHandler(err), (errorHandler(err) as any).status_code)
        }
    }

    static async login (ctx: Context) {
        try {
            const raw: LoginRequest = await ctx.req.json();
            const data = LoginSchema.parse(raw);
            const response = await AuthServices.login(data);

            if (data.isRememberMe && response.success && response.status_code === 200) {
                setCookie(ctx, "refresh_token", response.data.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    path: "/",
                    maxAge: 7 *24 * 60 * 60,
                });
                const { refreshToken, ...safeData } = response.data;
                // console.log(refreshToken);
                // console.log(safeData);
                response.data = safeData;
            }

            return ctx.json(response, (response as any).status_code);
        } catch (err: any) {
            return ctx.json(errorHandler(err), (errorHandler(err) as any).status_code)
        }
    }
}