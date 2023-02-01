import dayjs from "dayjs";
import { BadRequestError } from "../../../../shared/errors";
import {
  GenerateRefreshToken,
  GenerateToken,
  client,
} from "../../../../shared/helpers";

class RefreshTokenUseCase {
  async execute(refresh_token: string) {
    const refreshToken = await client.refreshToken.findFirst({
      where: { id: refresh_token },
    });

    if (!refreshToken) {
      throw new BadRequestError("Invalid refresh_token");
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    );

    const user = await client.users.findFirst({
      where: { id: refreshToken.userId },
    });

    const generateToken = new GenerateToken();
    const token = await generateToken.execute(refreshToken.userId, user?.role);

    if (refreshTokenExpired) {
      await client.refreshToken.deleteMany({
        where: { userId: refreshToken.userId },
      });

      const generatedRefreshToken = new GenerateRefreshToken();
      const newRefreshToken = await generatedRefreshToken.execute(
        refreshToken.userId
      );

      return { token, refreshToken: newRefreshToken };
    }

    return { token };
  }
}

export { RefreshTokenUseCase };
