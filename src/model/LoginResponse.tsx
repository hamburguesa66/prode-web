import { LiteUser } from "./LiteUser";

export class LoginResponse {
  user: LiteUser;
  token: string;

  constructor() {
    this.user = new LiteUser();
    this.token = "";
  }
}
