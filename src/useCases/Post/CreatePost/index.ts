import { CreatePostController } from "./CreatePostController";
import { CreatePostUseCase } from "./CreatePostUseCase";
import { MongoDbPostsRepository } from "../../../repositories/implementations/MongoDBPostRepository";
import UploadSchema from "../../../models/post";

const mongoDbUploadRepository = new MongoDbPostsRepository(UploadSchema);

const createPostUseCase = new CreatePostUseCase(mongoDbUploadRepository);

const createPostController = new CreatePostController(createPostUseCase);

export { createPostController, createPostUseCase };
