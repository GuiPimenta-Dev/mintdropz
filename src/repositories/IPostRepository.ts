import { ICreatePostDTO } from "../useCases/Post/CreatePost/CreatePostDTO";
import { IUpdatePostDTO } from "../useCases/Post/UpdatePost/UpdatePostDTO";

export interface IPostsRepository {
  create(file: ICreatePostDTO): Promise<ICreatePostDTO>;
  isOwner(id: String, email: String): Promise<Boolean>;
  listAll(): Promise<ICreatePostDTO[]>;
  listOne(id: String): Promise<ICreatePostDTO>;
  delete(filename: String): Promise<void>;
  update(filename: IUpdatePostDTO): Promise<ICreatePostDTO>;
}
