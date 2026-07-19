import jwt, { SignOptions } from "jsonwebtoken";
import { UserResponseDTO } from "../dto/user.response.dto";
import { JwtPayload } from "../types/jwt.payload";
import { ENV } from "../utils/env";
import { AppError } from "../errors/AppError";
import { HTTP_STATUS } from "../constants/http-status";
import { AUTH_MESSAGES } from "../constants/message";

export class JwtService {
  generateAccessToken(user: UserResponseDTO): string {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      ENV.JWT_ACCESS_SECRET as string,
      {
        expiresIn: ENV.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"],
      }
    );
  }

  generateRefreshToken(user: UserResponseDTO): string {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      ENV.JWT_REFRESH_SECRET as string,
      {
        expiresIn: ENV.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"],
      }
    );
  }

  verifyAccessToken(token: string): JwtPayload {
    const decoded = jwt.verify(token, ENV.JWT_ACCESS_SECRET as string);

    if (typeof decoded === "string") {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.INVALID_TOKEN);
    }

    return decoded as JwtPayload;
  }

  verifyRefreshToken(token: string): JwtPayload {
    const decoded = jwt.verify(token, ENV.JWT_REFRESH_SECRET as string);

    if (typeof decoded === "string") {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.INVALID_TOKEN);
    }

    return decoded as JwtPayload;
  }
}
