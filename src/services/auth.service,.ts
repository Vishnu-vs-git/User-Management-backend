import bcrypt from "bcrypt";
import { RegisterDTO } from "../dto/register.dto";
import { LoginDTO } from "../dto/login.dto";
import { UserDTO } from "../dto/user.response.dto";
import { IUserRepository } from "../repositories/interfaces/user.repository.interface";
import { JwtService } from "./jwt.service";
import { LoginResponseDTO } from "../dto/login.response.dto";
import { AUTH_MESSAGES, USER_MESSAGES } from "../constants/message";
import { AppError } from "../errors/AppError";
import { HTTP_STATUS } from "../constants/http-status";

export class AuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService
  ) {}

  async register(data: RegisterDTO): Promise<UserDTO> {
   
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new AppError(HTTP_STATUS.CONFLICT,AUTH_MESSAGES.EMAIL_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.userRepository.createUser({
      ...data,
      password: hashedPassword,
    });

    return user;
  }

  async login(data: LoginDTO): Promise<LoginResponseDTO> {
  
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED,AUTH_MESSAGES.INVALID_CREDENTIALS);
    }
    const isPasswordMatch = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!isPasswordMatch) {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED,AUTH_MESSAGES.INVALID_CREDENTIALS);
    }
   const accessToken = this.jwtService.generateAccessToken(user);

  const refreshToken = this.jwtService.generateRefreshToken(user);

     return {
       user,
      accessToken,
      refreshToken,
};
  }
  async getProfile(id: string): Promise<UserDTO> {
    const user = await this.userRepository.findById(id);

    if (!user) {
        throw new AppError(
            HTTP_STATUS.NOT_FOUND,
            USER_MESSAGES.USER_NOT_FOUND
        );
    }

    return user;
}
}