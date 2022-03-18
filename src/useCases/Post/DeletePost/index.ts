import { DeletePostController } from "./DeletePostController";
import { DeletePostUseCase } from "./DeletePostUseCase";
import { MongoDbPostsRepository } from "../../../repositories/implementations/MongoDBPostRepository";
import Posts from "../../../models/post";

const mongoDbPostsRepository = new MongoDbPostsRepository(Posts);

const deletePostService = new DeletePostUseCase(mongoDbPostsRepository);

const deletePostController = new DeletePostController(deletePostService);

export { deletePostController, deletePostService };
