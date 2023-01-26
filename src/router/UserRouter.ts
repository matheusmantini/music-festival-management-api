import express from "express";
import { UserController } from "../controller/UserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { validateAdmin } from "../middlewares/validateAdmin";
import { UserRepository } from "../repository/UserRepository";
import { UserUseCase } from "../useCases/UserUseCase";

export const userRouter = express.Router();

const userUseCase = new UserUseCase(new UserRepository());

const userController = new UserController(userUseCase);

userRouter.post("/signup", userController.create);
userRouter.get("/", userController.findUserByEmail);
userRouter.get(
  "/all",
  ensureAuthenticated,
  validateAdmin,
  userController.findAll
);
