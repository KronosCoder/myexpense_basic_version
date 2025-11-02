import type { Context, Next } from "hono";

export async function errorHandler(ctx: Context, next: Next) {
    try {
        await next();
    } catch (error) {
        console.log(error);
        return ctx.json({ 
            error: error instanceof Error ? error.message : 'Unknown error' 
        }, 500);
    }
}