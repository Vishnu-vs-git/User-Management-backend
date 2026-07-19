import { RegisterDTO } from "../../dto/register.dto";
import { UserDTO } from "../../dto/user.response.dto";

export interface IUserRepository {
  createUser(data: RegisterDTO): Promise<UserDTO>;
  findByEmail(email: string): Promise<UserDTO| null>;
  findById(id: string): Promise<UserDTO | null>;
}