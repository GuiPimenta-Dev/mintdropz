import { IPostsRepository } from "../../../repositories/IPostRepository";
export class ListPostUseCase {
  constructor(private mongoDBPostsRepository: IPostsRepository) {}

  async execute(id: string) {
    return await this.mongoDBPostsRepository.listOne(id);
  }
}
