import express from "express";
import { AuthController } from "../controller/AuthController";
import { RefreshTokenUserController } from "../controller/RefreshTokenUserController";

export const authRouter = express.Router();

const authenticateController = new AuthController();

const refreshTokenUserController = new RefreshTokenUserController();

authRouter.post("/login", authenticateController.handle);
authRouter.post("/refresh-token", refreshTokenUserController.handle);
