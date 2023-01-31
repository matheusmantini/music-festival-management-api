import express from "express";
import { UserController } from "../controller/UserController";
import { ensureAuthenticated } from "../../../../../shared/middlewares/ensureAuthenticated";
import { validateAdmin } from "../../../../../shared/middlewares/validateAdmin";
import { UserRepository } from "../../repository/UserRepository";
import { UserUseCase } from "../../../domain/useCases/UserUseCase";

export const userRoutes = express.Router();

const userUseCase = new UserUseCase(new UserRepository());

const userController = new UserController(userUseCase);

userRoutes.post("/signup", userController.create);
userRoutes.get("/", userController.findUserByEmail);
userRoutes.get(
  "/all",
  ensureAuthenticated,
  validateAdmin,
  userController.findAll
);
