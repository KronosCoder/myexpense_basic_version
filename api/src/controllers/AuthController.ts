import { Context } from "hono";
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
});

export default class AuthController {
    async register (ctx: Context) {
        try {
            const raw: { email: string, password: string, confirmPassword: string } = await ctx.req.json();
            const data = registerSchema.parse(raw);
            const response = await AuthServices.regitser(data);
            return ctx.json(response, (response as any).status_code);
        } catch (err: any) {
            return ctx.json(errorHandler(err), (errorHandler(err) as any).status_code)
        }
    }

    async login (ctx: Context) {
        try {
            const raw: { email: string, password: string } = await ctx.req.json();
            const data = LoginSchema.parse(raw);
            const response = await AuthServices.login(data);
            return ctx.json(response, (response as any).status_code);
        } catch (err: any) {
            return ctx.json(errorHandler(err), (errorHandler(err) as any).status_code)
        }
    }
}