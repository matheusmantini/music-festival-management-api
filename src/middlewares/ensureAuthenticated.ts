import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export const ensureAuthenticated = (
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
  } catch (error) {
    throw new UnauthorizedError("Token is invalid");
  }
};
