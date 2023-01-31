import dayjs from "dayjs";
import { client } from "./PrismaClient";

class GenerateRefreshToken {
  async execute(userId: string) {
    const expiresIn = dayjs().add(8, "hour").unix();

    const generatedRefreshToken = await client.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });

    return generatedRefreshToken;
  }
}

export { GenerateRefreshToken };
