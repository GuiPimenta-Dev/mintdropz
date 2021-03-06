import { Response } from "express";
import { DeletePostUseCase } from "./DeletePostUseCase";
import IDecodedRequest from "../../../interfaces/decodedRequest";

export class DeletePostController {
  constructor(private deletePostUseCase: DeletePostUseCase) {}
  async handle(req: IDecodedRequest, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { email } = req.decoded;

      const result = await this.deletePostUseCase.execute(id, email);

      return res.status(204).send(result);
    } catch (err) {
      return res.status(400).json({
        message: err.message || "Unexpected error.",
      });
    }
  }
}
