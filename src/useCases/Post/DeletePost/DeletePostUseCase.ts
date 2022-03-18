import { IPostsRepository } from "../../../repositories/IPostRepository";
export class DeletePostUseCase {
  constructor(private mongoDBPostsRepository: IPostsRepository) {}

  async execute(filename) {
    if (!filename) {
      throw new Error("Filename is missing.");
    }
    return await this.mongoDBPostsRepository.delete(filename);
  }
}
