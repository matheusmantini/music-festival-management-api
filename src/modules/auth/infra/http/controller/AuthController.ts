import { Request, Response } from "express";
import { AuthUseCase } from "../../../domain/useCases/AuthUseCase";

class AuthController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authUseCase = new AuthUseCase();

    const token = await authUseCase.execute({
      email,
      password,
    });

    return response.json(token);
  }
}

export { AuthController };
