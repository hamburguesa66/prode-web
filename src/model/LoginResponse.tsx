import { LiteUser } from "./LiteUser";

export interface LoginResponse {
  user: LiteUser;
  token: string;
}
