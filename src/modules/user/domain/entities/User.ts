export class User {
  constructor(
    private name: string,
    private email: string,
    private password: string,
    private role: string
  ) {}

  public getName = (): string => {
    return this.name;
  };

  public getEmail = (): string => {
    return this.email;
  };

  public getPassword = (): string => {
    return this.password;
  };

  public getRole = (): string => {
    return this.role;
  };

  static toUserModel(user: any): User {
    return new User(user.name, user.email, user.password, user.role);
  }
}
