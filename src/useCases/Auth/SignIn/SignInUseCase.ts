import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { ISignInDTO } from "./SignInDTO";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class SignInUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(dto: ISignInDTO) {
    const user = await this.usersRepository.findByEmail(dto.email);

    if (!user) {
      throw new Error("User dont exists.");
    }

    const isMatch = await this.usersRepository.comparePassword(dto);

    if (!isMatch) {
      throw new Error("Passwords dont match.");
    }

    const token = jwt.sign(dto, process.env.JWT_SECRET, { expiresIn: "1d" });

    return { token };
  }
}
