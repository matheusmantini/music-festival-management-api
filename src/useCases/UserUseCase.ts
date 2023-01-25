import { UserRepository } from "../repository/UserRepository";
import { User } from "../model/User";
import { USER_ROLE } from "../model/UserRole";
import { CreateUserInputDTO } from "../types/createUserInput.dto";
import { LoginInputDTO } from "../types/loginInput.dto";
import { NotFoundError } from "../errors/NotFoundError";
import { BadRequestError } from "../errors/BadRequestError";
import { hash } from "bcryptjs";
import { GenerateToken } from "../services/GenerateToken";

class UserUseCase {
  constructor(private userRepository: UserRepository) {}

  public create = async (newUser: CreateUserInputDTO) => {
    const { name, email, password, role } = newUser;
    const userRoles = Object.values(USER_ROLE);

    if (!name || !email || !password || !role) {
      throw new BadRequestError(
        "Invalid entries. The 'name', 'email', 'password' and 'role' fields are required."
      );
    }

    if (password.length < 6) {
      throw new BadRequestError(
        "Invalid password. Password must have at least 6 characters"
      );
    }

    if (email.includes("@") === false) {
      throw new BadRequestError("Invalid email. Email must contain @");
    }

    if (!userRoles.includes(role.toUpperCase())) {
      throw new BadRequestError(
        `Invalid role. Role must be: ${userRoles.join(" OR ")}`
      );
    }

    const userAlreadyExists = await this.userRepository.findUserByEmail(email);

    if (userAlreadyExists) {
      throw new BadRequestError(
        `User with email '${email}' is already registered in the system`
      );
    }

    const passwordHash = await hash(password, 8);

    const user = new User(name, email, passwordHash, role);

    const newCreatedUser = await this.userRepository.create(user);

    const generateToken = new GenerateToken();
    const token = await generateToken.execute(
      newCreatedUser.id,
      newCreatedUser.role
    );

    return { user: newCreatedUser, token };
  };

  public findUserById = async (id: string) => {
    if (!id) {
      throw new BadRequestError(
        "Invalid entries. The 'id' field is required."
      );
    }

    const userAlreadyExists = await this.userRepository.findUserById(id);
    if (!userAlreadyExists) {
      throw new BadRequestError(
        `User with id '${id}' is not registered in the system yet`
      );
    }

    return userAlreadyExists;
  };

  public findUserByEmail = async (email: string) => {
    if (!email) {
      throw new BadRequestError(
        "Invalid entries. The 'email' field is required."
      );
    }

    if (email.includes("@") === false) {
      throw new BadRequestError("Invalid email. Email must contain @");
    }

    const userAlreadyExists = await this.userRepository.findUserByEmail(email);
    if (!userAlreadyExists) {
      throw new BadRequestError(
        `User with email '${email}' is not registered in the system yet`
      );
    }

    return userAlreadyExists;
  };
}

export { UserUseCase };
