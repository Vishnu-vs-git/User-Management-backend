import express from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { authController, authMiddleware } from "../di/auth.container";
const router = express.Router();

// route.get("/register",)
router.get(
    "/me",
   authMiddleware.authenticate,
    authController.me
);