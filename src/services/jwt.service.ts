import jwt, { SignOptions } from "jsonwebtoken";
import { UserDTO } from "../dto/user.response.dto";

export class JwtService {
  generateAccessToken(user: UserDTO): string {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_ACCESS_SECRET as string,
      {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"],
      }
    );
  }

  generateRefreshToken(user: UserDTO): string {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_REFRESH_SECRET as string,
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"],
      }
    );
  }

  verifyAccessToken(token: string) {
    return jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string
    );
  }

  verifyRefreshToken(token: string) {
    return jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string
    );
  }
}