import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { client } from "../services/PrismaClient";

export const ensureAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new UnauthorizedError("Token is missing");
  }
  const [, token] = authToken.split(" ");

  try {
    const payload = verify(token, process.env.JWT_SECRET as string);

    const user = await client.users.findFirst({
      where: { id: payload.sub as string },
    });

    if (!user) {
      throw new NotFoundError("User does not exists");
    }

    if (user.role.toUpperCase() !== "ADMIN") {
      throw new UnauthorizedError(
        `You don't have permission to access this content.`
      );
    }

    return next();
  } catch (error: any) {
    throw new UnauthorizedError(error.message || "Invalid token.");
  }
};
