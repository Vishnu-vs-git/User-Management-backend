import { Request, Response, NextFunction } from "express";

import { HTTP_STATUS } from "../constants/http-status";
import { AUTH_MESSAGES } from "../constants/message";
import { accessTokenCookieOptions, refreshTokenCookieOptions } from "../utils/cookie";
import { TokenType } from "../constants/token.enum";
import { AuthService } from "../services/auth.service";


export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
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

 login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
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
 me = async (
    req: Request,
    res: Response,
    next: NextFunction
)  => {
    try {

        const user = await this.authService.getProfile(req.user.id);

        res.status(HTTP_STATUS.OK).json({
            success: true,
            user
        });

    } catch (error) {
        next(error);
    }
}
logout = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.clearCookie(TokenType.ACCESS);
  res.clearCookie(TokenType.REFRESH);

  return res.status(HTTP_STATUS.OK).json({
    success: true,
    message: AUTH_MESSAGES.LOGOUT_SUCCESS,
  });
};
}