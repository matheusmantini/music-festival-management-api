import { sign } from "jsonwebtoken";

class GenerateToken {
  async execute(userId: string, role?: string) {
    const token = sign({ role }, process.env.JWT_SECRET as string, {
      subject: userId,
      expiresIn: "20min",
    });

    return token;
  }
}

export { GenerateToken };
