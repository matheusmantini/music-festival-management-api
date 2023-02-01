import express from "express";
import { AuthController } from "../controller/AuthController";
import { RefreshTokenUserController } from "../../../../refreshToken/infra/http/controller/RefreshTokenUserController";

export const authRoutes = express.Router();

const authenticateController = new AuthController();

const refreshTokenUserController = new RefreshTokenUserController();


authRoutes.post("/login", authenticateController.handle);
authRoutes.post("/refresh-token", refreshTokenUserController.handle);
