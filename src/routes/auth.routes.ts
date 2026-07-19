import { Router } from "express";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { validate } from "../middlewares/validation.middleware";
import { authController, authMiddleware } from "../di/auth.container";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);

router.post("/login", validate(loginSchema), authController.login);

router.get("/me", authMiddleware.authenticate, authController.me);

export default router;
