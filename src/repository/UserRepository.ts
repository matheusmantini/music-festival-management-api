import { User } from "../model/User";
import { client } from "../services/PrismaClient";
import { user } from "../types/user";

export class UserRepository {
  public create = async (user: User) => {
    try {
      const newUser = {
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword(),
        role: user.getRole(),
      };
      return await client.users.create({ data: newUser });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public findUserByEmail = async (email: string): Promise<user | null> => {
    try {
      const user = await client.users.findFirst({ where: { email } });

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getUserHashPasswordByEmail = async (email: string) => {
    try {
      const user = await client.users.findMany({ where: { email } });
      return {
        password: user[0].password,
      };
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}
