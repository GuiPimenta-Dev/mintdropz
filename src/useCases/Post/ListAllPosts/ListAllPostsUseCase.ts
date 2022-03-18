import { IPostsRepository } from "../../../repositories/IPostRepository";
export class ListAllPostsUseCase {
  constructor(private mongoDBPostsRepository: IPostsRepository) {}

  async execute() {
    const upload = await this.mongoDBPostsRepository.listAll();
    return upload;
  }
}
