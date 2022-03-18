import { Request, Response } from "express";
import { SignInUseCase } from "./SignInUseCase";

export class SignInController {
  constructor(private signInUseCase: SignInUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const result = await this.signInUseCase.execute({
        email,
        password,
      });

      return res.status(200).send(result);
    } catch (err) {
      return res.status(400).json({
        message: err.message || "Unexpected error.",
      });
    }
  }
}
