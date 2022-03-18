import { Request, Response } from "express";
import { UploadImageService } from "./UploadImageUseCase";

export class UploadImageController {
  constructor(private uploadImageUseCase: UploadImageService) {}
  async handle(req, res: Response): Promise<Response> {
    try {
      const result = await this.uploadImageUseCase.execute(req.files);

      return res.status(200).send(result);
    } catch (err) {
      return res.status(400).json({
        message: err.message || "Unexpected error.",
      });
    }
  }
}
