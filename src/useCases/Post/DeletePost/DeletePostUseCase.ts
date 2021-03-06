import { IPostsRepository } from "../../../repositories/IPostRepository";
export class DeletePostUseCase {
  constructor(private mongoDBPostsRepository: IPostsRepository) {}

  async execute(id: String, email: String) {
    if (!id) {
      throw new Error("Post id is missing.");
    }

    const isOwner = await this.mongoDBPostsRepository.isOwner(id, email);

    if (!isOwner) {
      throw new Error("You are not the owner of this post.");
    }
    return await this.mongoDBPostsRepository.delete(id);
  }
}
