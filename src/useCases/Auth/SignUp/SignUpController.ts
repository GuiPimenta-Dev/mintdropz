import { Request, Response } from "express";
import { SignUpUseCase } from "./SignUpUseCase";

export class SignUpController {
  constructor(private signUpUseCase: SignUpUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    try {
      const result = await this.signUpUseCase.execute({
        name,
        email,
        password,
      });

      return res.status(201).send(result);
    } catch (err) {
      return res.status(400).json({
        message: err.message || "Unexpected error.",
      });
    }
  }
}
