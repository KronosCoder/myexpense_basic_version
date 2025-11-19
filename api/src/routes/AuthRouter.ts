import { Hono } from "hono";
import AuthController from "../controllers/AuthController";
const router = new Hono();

router.post("/register", (c) => AuthController.register(c));
router.post("/login", (c) => AuthController.login(c));

export default router;