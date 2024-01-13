export class LiteUser {
  username: string | undefined;
  isAdmin: Boolean;

  constructor() {
    this.username = undefined;
    this.isAdmin = false;
  }
}
