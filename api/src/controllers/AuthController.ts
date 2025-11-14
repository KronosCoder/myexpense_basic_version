import { Context } from "hono";
import { RegisterInput, LoginInput } from "../types/auth";
import AuthServices from "../services/AuthServices";

export default class AuthController {
    async register (ctx: Context) {
        try {
            const registerData = await ctx.req.json<RegisterInput>();
            console.log(registerData)

            if (!registerData.email || !registerData.password) {
                return ctx.json({   
                    status_code: 400,
                    message: "Required email and password !",
                }, 400);
            } else if (registerData.password !== registerData.confirmPassword) {
                return ctx.json({
                    status_code: 400,
                    message: "Password doesn't match !",
                }, 400);
            }

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

    async login (ctx: Context) {
        try {
            const loginData = await ctx.req.json<LoginInput>();

            if (!loginData.email || !loginData.password) {
                return ctx.json({   
                    status_code: 400,
                    message: "Required email and password !",
                }, 400);
            } 

            const response = await AuthServices.login(loginData);
            return ctx.json({
                status_code: 200,
                data: { 
                    accessToken: response.accessToken,
                },
            })

        } catch (err: any) {
            process.env.NODE_ENV === 'development' ? console.log(err.message) : undefined;
            return ctx.json({
                status_code: 500,
                error: err.message,
            }, 500);
        }
    }
}