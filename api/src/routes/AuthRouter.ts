import { Hono } from "hono";
import AuthController from "../controllers/AuthController";

const router = new Hono();
const authController = new AuthController();

router.post('/register', async (c) => await authController.register(c));
router.post('/login', async (c) => await authController.login(c));
// router.post('/register', async (c) => await authController.register(c));

export default router;