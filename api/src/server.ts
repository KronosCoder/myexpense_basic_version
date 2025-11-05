import { Hono } from "hono";
import { logger } from 'hono/logger'
import { errorHandler } from "./middlewares/errorHandler";
import { prettyJSON } from "hono/pretty-json";
import { serve } from "@hono/node-server";
import AuthRouter from "./routes/AuthRouter";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
const app = new Hono();

/* ---------- Use --------- */
app.use("*", logger());
app.use("*", errorHandler);
app.use("*", prettyJSON());


/* ---------- Route --------- */
app.route('/auth', AuthRouter)

/* ---------- Serve --------- */
serve({
    fetch: app.fetch,
    port: 45176
}, (info) => {
    console.log(`Server running at http://localhost:${info.port}`)
});
export default app;