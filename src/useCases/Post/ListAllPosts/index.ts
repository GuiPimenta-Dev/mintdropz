import { ListAllPostsController } from "./ListAllPostsController";
import { ListAllPostsUseCase } from "./ListAllPostsUseCase";
import { MongoDbPostsRepository } from "../../../repositories/implementations/MongoDBPostRepository";
import Posts from "../../../models/post";

const mongoDbPostsRepository = new MongoDbPostsRepository(Posts);

const listAllPostsService = new ListAllPostsUseCase(mongoDbPostsRepository);

const listAllPostsController = new ListAllPostsController(listAllPostsService);

export { listAllPostsController, listAllPostsService };
