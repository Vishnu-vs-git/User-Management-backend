import { RegisterDTO } from "../../dto/register.dto";
import { User } from "../../types/user.type";

export interface IUserRepository {
  createUser(data: RegisterDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
