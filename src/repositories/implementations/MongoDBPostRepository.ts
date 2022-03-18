import { IUploadImageDTO } from "@upload/UploadImageDTO";
import { IPostsRepository } from "../IPostRepository";

export class MongoDbPostsRepository implements IPostsRepository {
  private post: any;

  constructor(schema) {
    this.post = schema;
  }

  async create(dto: IUploadImageDTO): Promise<IUploadImageDTO> {
    const post = await this.post.create(dto);

    return post;
  }
  async listAll(): Promise<IUploadImageDTO[]> {
    const posts = await this.post.find();

    return posts;
  }

  async delete(filename: string): Promise<void> {
    const post = await this.post.findById(filename);

    await post.remove();
  }
}
