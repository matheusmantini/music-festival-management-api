import { compare } from "bcryptjs";
import { BadRequestError } from "../../../../shared/errors";
import {
  GenerateRefreshToken,
  GenerateToken,
  client,
} from "../../../../shared/helpers";
import { IRequest } from "../entities/authRequest";

class AuthUseCase {
  async execute({ email, password }: IRequest) {
    const userAlreadyExists = await client.users.findFirst({
      where: { email },
    });

    if (!userAlreadyExists) {
      throw new BadRequestError("Invalid credentials!");
    }

    const passwordMatch = compare(password, userAlreadyExists.password);

    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials!");
    }

    const generateToken = new GenerateToken();
    const token = await generateToken.execute(
      userAlreadyExists.id,
      userAlreadyExists.role
    );

    await client.refreshToken.deleteMany({
      where: { userId: userAlreadyExists.id },
    });

    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generateRefreshToken.execute(
      userAlreadyExists.id
    );

    return { token, refreshToken };
  }
}

export { AuthUseCase };
