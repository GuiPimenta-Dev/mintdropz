import { IPostsRepository } from "../../../repositories/IPostRepository";
export class UpdatePostUseCase {
  constructor(private mongoDBPostsRepository: IPostsRepository) {}

  async execute(id, body, file, email) {
    if (!id) {
      throw new Error("Post id is missing.");
    }

    const isOwner = await this.mongoDBPostsRepository.isOwner(id, email);

    if (!isOwner) {
      throw new Error("You are not the owner of this post.");
    }

    const { title, description } = body;

    const { location: url = "" } = file;

    const filename = file.key ? file.key : file.filename;

    const dto = { id, title, description, url, filename };

    return await this.mongoDBPostsRepository.update(dto);
  }
}
