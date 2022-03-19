import { Response } from "express";
import { CreatePostUseCase } from "./CreatePostUseCase";
import IDecodedRequest from "../../../interfaces/decodedRequest";

export class CreatePostController {
  constructor(private createPostUseCase: CreatePostUseCase) {}
  async handle(req: IDecodedRequest, res: Response): Promise<Response> {
    try {
      const { email } = req.decoded;
      const result = await this.createPostUseCase.execute(
        req.file,
        req.body,
        email
      );

      return res.status(200).send(result);
    } catch (err) {
      return res.status(400).json({
        message: err.message || "Unexpected error.",
      });
    }
  }
}
