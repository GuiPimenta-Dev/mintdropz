import { Response } from "express";
import { UpdatePostUseCase } from "./UpdatePostUseCase";
import IDecodedRequest from "../../../interfaces/decodedRequest";

export class UpdatePostController {
  constructor(private updatePostUseCase: UpdatePostUseCase) {}
  async handle(req: IDecodedRequest, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { email } = req.decoded;
      const result = await this.updatePostUseCase.execute(
        id,
        req.body,
        req.file,
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
