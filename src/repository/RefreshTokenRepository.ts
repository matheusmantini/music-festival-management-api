import { client } from "../services/PrismaClient";

export class RefreshTokenRepository {
  public findUser = async (userId: string) /* : Promise<user | null> */ => {
    try {
      const refreshToken = await client.refreshToken.findFirst({
        where: { userId },
      });

      if (!refreshToken) {
        return null;
      }

      return {
        refresh_token: refreshToken.id,
      };
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}
