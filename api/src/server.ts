import { Hono } from "hono";
import { logger } from 'hono/logger'
import { errorHandler } from "./middlewares/errorHandler";
import { prettyJSON } from "hono/pretty-json";
import { serve } from "@hono/node-server";
import tRouter from "./routes/transactions";


const app = new Hono();

/* ---------- Use --------- */
app.use("*", logger());
app.use("*", errorHandler);
app.use("*", prettyJSON());


/* ---------- Route --------- */
app.route('/transactions', tRouter)

/* ---------- Serve --------- */
serve({
    fetch: app.fetch,
    port: 3000
}, (info) => {
    console.log(`Server running at http://localhost:${info.port}`)
});
export default app;