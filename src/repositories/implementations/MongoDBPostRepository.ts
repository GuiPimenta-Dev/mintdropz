import { ICreatePostDTO } from "@upload/CreatePostDTO";
import { IPostsRepository } from "../IPostRepository";
import { IUpdatePostDTO } from "../../useCases/Post/UpdatePost/UpdatePostDTO";

export class MongoDbPostsRepository implements IPostsRepository {
  private post: any;

  constructor(schema) {
    this.post = schema;
  }

  async create(dto: ICreatePostDTO): Promise<ICreatePostDTO> {
    const post = await this.post.create(dto);

    return post;
  }

  async isOwner(id: String, email: String): Promise<Boolean> {
    const post = await this.post.findById(id);

    return post.email === email;
  }

  async listAll(): Promise<ICreatePostDTO[]> {
    const posts = await this.post.find();

    return posts;
  }

  async listOne(id: String): Promise<ICreatePostDTO> {
    return await this.post.findById(id).lean();
  }

  async update(dto: IUpdatePostDTO): Promise<ICreatePostDTO> {
    const { id, ...rest } = dto;

    await this.post.updateOne({ _id: id }, rest);

    return await this.listOne(id);
  }

  async delete(id: String): Promise<void> {
    const post = await this.post.findById(id);

    await post.remove();
  }
}
