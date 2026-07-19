import { UserDTO } from "./user.response.dto";

export interface LoginResponseDTO {
  user: UserDTO;
  accessToken: string;
  refreshToken: string;
}