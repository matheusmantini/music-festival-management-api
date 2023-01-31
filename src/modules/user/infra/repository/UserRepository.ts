import { User } from "../../domain/entities/User";
import { client } from "../../../../shared/helpers/PrismaClient";
import { userType } from "../../domain/entities/userType";

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

  public findUserById = async (id: string): Promise<userType | null> => {
    try {
      const user = await client.users.findFirst({ where: { id } });

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

  public findUserByEmail = async (email: string): Promise<userType | null> => {
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

  public findAll = async (): Promise<userType[] | null> => {
    try {
      const users = await client.users.findMany();

      if (!users) {
        return [];
      }

      const newUsers = users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      });

      return newUsers;
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
