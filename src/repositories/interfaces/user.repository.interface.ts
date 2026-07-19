import { RegisterDTO } from "../../dto/register.dto";

export interface IUserRepository {
  createUser(data: RegisterDTO): Promise<void>;
  findByEmail(email: string): Promise<any>;
}