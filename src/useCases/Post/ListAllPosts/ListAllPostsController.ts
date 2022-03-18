import { Response } from "express";
import { ListAllPostsUseCase } from "./ListAllPostsUseCase";

export class ListAllPostsController {
  constructor(private listAllPostsUseCase: ListAllPostsUseCase) {}
  async handle(res: Response): Promise<Response> {
    try {
      const result = await this.listAllPostsUseCase.execute();

      return res.status(200).send(result);
    } catch (err) {
      return res.status(400).json({
        message: err.message || "Unexpected error.",
      });
    }
  }
}
