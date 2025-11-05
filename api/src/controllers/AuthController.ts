import { Context } from "hono";
import { RegisterInput } from "../types/auth";
import AuthServices from "../services/AuthServices";

export default class AuthController {
    async register (ctx: Context) {
        try {
            const registerData = await ctx.req.json<RegisterInput>();
            console.log(registerData)
            const user = await AuthServices.regitser(registerData);
            return ctx.json({
                status_code: 200,
                message: "register success",
                data: user,
            }, 200);
        } catch (err: any) {
            process.env.NODE_ENV === 'development' ? console.log(err.message) : undefined;
            return ctx.json({
                status_code: 500,
                error: err.message
            }, 500);
        }
    }
}