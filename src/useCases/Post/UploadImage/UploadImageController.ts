import { Request, Response } from "express";
import { UploadImageUseCase } from "./UploadImageUseCase";

export class UploadImageController {
  constructor(private uploadImageUseCase: UploadImageUseCase) {}
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.uploadImageUseCase.execute(req.file);

      return res.status(200).send(result);
    } catch (err) {
      return res.status(400).json({
        message: err.message || "Unexpected error.",
      });
    }
  }
}
