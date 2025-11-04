import { error } from "console";
import { Context, Hono } from "hono";

const userRouter = new Hono();

/* ------------- register ------------- */
userRouter.post('/', async (c: Context) => {
    try {
        
    } catch (err: any) {
        console.log('register error: ', err);
        c.json({
            message: "Internal server error",
            error: process.env.NODE_ENV === "development" ? err.message : undefined,
        },500);
    }
});

export default userRouter;