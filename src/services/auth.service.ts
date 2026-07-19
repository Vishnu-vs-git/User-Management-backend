import bcrypt from "bcrypt";
import { RegisterDTO } from "../dto/register.dto";
import { LoginDTO } from "../dto/login.dto";

import { IUserRepository } from "../repositories/interfaces/user.repository.interface";
import { JwtService } from "./jwt.service";
import { LoginResponseDTO } from "../dto/login.response.dto";
import { AUTH_MESSAGES, USER_MESSAGES } from "../constants/message";
import { AppError } from "../errors/AppError";
import { HTTP_STATUS } from "../constants/http-status";
import { UserResponseDTO } from "../dto/user.response.dto";
import { UserMapper } from "../mapper/user.mapper";

export class AuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService
  ) {}

  async register(data: RegisterDTO): Promise<UserResponseDTO> {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new AppError(
        HTTP_STATUS.CONFLICT,
        AUTH_MESSAGES.EMAIL_ALREADY_EXISTS
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.userRepository.createUser({
      ...data,
      password: hashedPassword,
    });

    return UserMapper.toDTO(user);
  }

  async login(data: LoginDTO): Promise<LoginResponseDTO> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new AppError(
        HTTP_STATUS.UNAUTHORIZED,
        AUTH_MESSAGES.INVALID_CREDENTIALS
      );
    }
    const isPasswordMatch = await bcrypt.compare(data.password, user.password);

    if (!isPasswordMatch) {
      throw new AppError(
        HTTP_STATUS.UNAUTHORIZED,
        AUTH_MESSAGES.INVALID_CREDENTIALS
      );
    }
    const payload = UserMapper.toDTO(user);
    const accessToken = this.jwtService.generateAccessToken(payload);

    const refreshToken = this.jwtService.generateRefreshToken(payload);
    const userData = UserMapper.toDTO(user);
    return {
      user: userData,
      accessToken,
      refreshToken,
    };
  }
  async getProfile(id: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, USER_MESSAGES.USER_NOT_FOUND);
    }

    return UserMapper.toDTO(user);
  }
}
