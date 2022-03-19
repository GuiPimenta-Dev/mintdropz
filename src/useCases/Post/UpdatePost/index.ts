import { UpdatePostController } from "./UpdatePostController";
import { UpdatePostUseCase } from "./UpdatePostUseCase";
import { MongoDbPostsRepository } from "../../../repositories/implementations/MongoDBPostRepository";
import Posts from "../../../models/post";

const mongoDbPostsRepository = new MongoDbPostsRepository(Posts);

const updatePostService = new UpdatePostUseCase(mongoDbPostsRepository);

const updatePostController = new UpdatePostController(updatePostService);

export { updatePostController, updatePostService };
