import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UnauthorizedError } from "../errors";

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
    verify(token, process.env.JWT_SECRET as string);

    return next();
  } catch (error: any) {
    throw new UnauthorizedError(error.message || "Invalid token.");
  }
};
