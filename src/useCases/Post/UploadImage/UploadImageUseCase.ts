import { IUploadImageRepository } from "../../../repositories/IPostRepository";
export class UploadImageService {
  constructor(private uploadRepository: IUploadImageRepository) {}

  async execute(file) {
    if (!file) {
      throw new Error("You need to upload a file.");
    }
    const { originalname: name, size, location: url = "" } = file;

    const filename = file.key ? file.key : file.filename;

    const upload = await this.uploadRepository.create({
      name,
      size,
      filename,
      url,
    });
    return upload;
  }
}
