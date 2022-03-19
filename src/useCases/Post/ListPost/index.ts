import { ListPostController } from "./ListPostController";
import { ListPostUseCase } from "./ListPostUseCase";
import { MongoDbPostsRepository } from "../../../repositories/implementations/MongoDBPostRepository";
import Posts from "../../../models/post";

const mongoDbPostsRepository = new MongoDbPostsRepository(Posts);

const listPostService = new ListPostUseCase(mongoDbPostsRepository);

const listPostController = new ListPostController(listPostService);

export { listPostController, listPostService };
