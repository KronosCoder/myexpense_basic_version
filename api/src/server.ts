import "dotenv/config";
import { Hono } from "hono";
import { logger } from 'hono/logger'
import { errorHandler } from "./middlewares/errorHandler";
import { prettyJSON } from "hono/pretty-json";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";


const app = new Hono();

/* ---------- Use --------- */
app.use("*", logger());
app.use("*", errorHandler);
app.use("*", prettyJSON());
app.use("*", cors());

import AuthRouter from "./routes/AuthRouter";

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