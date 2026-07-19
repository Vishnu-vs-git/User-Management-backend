import { UserResponseDTO } from "../dto/user.response.dto";
import { User } from "../types/user.type";

export class UserMapper {
  static toDTO(user: User): UserResponseDTO {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
    };
  }
}
