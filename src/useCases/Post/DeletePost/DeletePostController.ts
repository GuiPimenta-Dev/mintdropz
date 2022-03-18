import { Request, Response } from "express";
import { DeletePostUseCase } from "./DeletePostUseCase";

export class DeletePostController {
  constructor(private deletePostUseCase: DeletePostUseCase) {}
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { filename } = req.params;

      const result = await this.deletePostUseCase.execute(filename);

      return res.status(204).send(result);
    } catch (err) {
      return res.status(400).json({
        message: err.message || "Unexpected error.",
      });
    }
  }
}
