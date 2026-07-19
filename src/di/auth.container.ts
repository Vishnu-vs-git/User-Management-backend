import { AuthController } from "../controllers/auth.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { PostgresUserRepository } from "../repositories/implementations/postgres.user.repository";
import { AuthService } from "../services/auth.service,";
import { JwtService } from "../services/jwt.service";


const userRepository = new PostgresUserRepository();
const jwtService = new JwtService()
const authService = new AuthService(userRepository,jwtService);
export const authMiddleware = new AuthMiddleware(jwtService)
export const authController = new AuthController(authService)