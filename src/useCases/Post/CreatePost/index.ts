import { CreatePostController } from "./CreatePostController";
import { CreatePostUseCase } from "./CreatePostUseCase";
import { MongoDbPostsRepository } from "../../../repositories/implementations/MongoDBPostRepository";
import UploadSchema from "../../../models/post";

const mongoDbUploadRepository = new MongoDbPostsRepository(UploadSchema);

const createPostService = new CreatePostUseCase(mongoDbUploadRepository);

const createPostController = new CreatePostController(createPostService);

export { createPostController, createPostService };
