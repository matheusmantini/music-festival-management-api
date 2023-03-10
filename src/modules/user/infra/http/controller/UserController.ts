import { Request, Response } from "express";
import { UserUseCase } from "../../../domain/useCases/UserUseCase";
import { CreateUserInputDTO } from "../../../domain/dto/createUserInput.dto";

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

      res.status(201).send({
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
      const { email } = req.query;

      const user = await this.userUseCase.findUserByEmail(email as string);

      res.status(201).send(user);
    } catch (error: any) {
      res.status(error.statusCode || 500).send({
        message: error.message,
      });
    }
  };

  public findAll = async (req: Request, res: Response) => {
    try {
      const users = await this.userUseCase.findAll();

      res.status(201).send(users);
    } catch (error: any) {
      res.status(error.statusCode || 500).send({
        message: error.message,
      });
    }
  };
}
