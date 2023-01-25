import { Request, Response } from "express";
import { UserUseCase } from "../useCases/UserUseCase";
import { CreateUserInputDTO } from "../types/createUserInput.dto";

export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  public create = async (req: Request, res: Response) => {
    try {
      const { name, email, password, role } = req.body;

      const newUser: CreateUserInputDTO = {
        name,
        email,
        password,
        role,
      };

      const userCreated = await this.userUseCase.create(newUser);

      res
        .status(201)
        .send({
          message: "User successfully registered",
          user: userCreated.user,
          token: userCreated.token,
        });
    } catch (error: any) {
      res.status(error.statusCode || 500).send({
        message: error.message,
      });
    }
  };

  public findUserByEmail = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      const user = await this.userUseCase.findUserByEmail(email);

      res.status(201).send(user);
    } catch (error: any) {
      res.status(error.statusCode || 500).send({
        message: error.message,
      });
    }
  };
}
