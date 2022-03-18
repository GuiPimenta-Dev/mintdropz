import { UploadImageController } from "./UploadImageController";
import { UploadImageUseCase } from "./UploadImageUseCase";
import { MongoDbPostsRepository } from "../../../repositories/implementations/MongoDBPostRepository";
import UploadSchema from "../../../models/post";

const mongoDbUploadRepository = new MongoDbPostsRepository(UploadSchema);

const uploadImageService = new UploadImageUseCase(mongoDbUploadRepository);

const uploadImageController = new UploadImageController(uploadImageService);

export { uploadImageController, uploadImageService };
