import { Request, Response } from "express";
import { ListPostUseCase } from "./ListPostUseCase";

export class ListPostController {
  constructor(private listPostUseCase: ListPostUseCase) {}
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const result = await this.listPostUseCase.execute(id);

      return res.status(200).send(result);
    } catch (err) {
      return res.status(400).json({
        message: err.message || "Unexpected error.",
      });
    }
  }
}
