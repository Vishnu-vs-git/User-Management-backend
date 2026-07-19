import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service,";
import { HTTP_STATUS } from "../constants/http-status";
import { AUTH_MESSAGES } from "../constants/message";
import { accessTokenCookieOptions, refreshTokenCookieOptions } from "../utils/cookie";
import { TokenType } from "../constants/token.enum";


export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await this.authService.register(req.body);

      return res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: AUTH_MESSAGES.REGISTER_SUCCESS,
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { user, accessToken, refreshToken } =
        await this.authService.login(req.body);

      res.cookie(
        TokenType.ACCESS,
        accessToken,
        accessTokenCookieOptions
      );

      res.cookie(
        TokenType.REFRESH,
        refreshToken,
        refreshTokenCookieOptions
      );

      return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: AUTH_MESSAGES.LOGIN_SUCCESS,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
}