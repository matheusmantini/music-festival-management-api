import express from "express";
import { UserController } from "../controller/UserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { UserRepository } from "../repository/UserRepository";
import { UserUseCase } from "../useCases/UserUseCase";

export const userRouter = express.Router();

const userUseCase = new UserUseCase(
  new UserRepository(),
);

const userController = new UserController(userUseCase);

userRouter.post("/signup", userController.create);
userRouter.post("/find", userController.findUserByEmail);

userRouter.get("/courses", ensureAuthenticated, (request, response) => {
  return response.json([
    { id: 1, name: "NodeJS" },
    { id: 2, name: "ReactJS" },
    { id: 3, name: "React Native" },
    { id: 4, name: "Flutter" },
    { id: 5, name: "Elixir" },
  ]);
});
