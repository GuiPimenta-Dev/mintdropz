import { IPostsRepository } from "../../../repositories/IPostRepository";
export class CreatePostUseCase {
  constructor(private mongoDBPostsRepository: IPostsRepository) {}

  async execute(file, body, email) {
    if (!file) {
      throw new Error("You need to upload a file.");
    }
    const { location: url = "", size } = file;

    const filename = file.key ? file.key : file.filename;

    const { title, description } = body;

    const upload = await this.mongoDBPostsRepository.create({
      title,
      description,
      filename,
      url,
      size,
      email,
    });
    return upload;
  }
}
