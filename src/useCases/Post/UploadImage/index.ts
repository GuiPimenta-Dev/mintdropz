import { UploadImageController } from "./UploadImageController";
import { UploadImageService } from "./UploadImageUseCase";
import { MongoDbUploadRepository } from "../../../repositories/implementations/MongoDBPostRepository";
import UploadSchema from "../../../models/post";

const mongoDbUploadRepository = new MongoDbUploadRepository(UploadSchema);

const uploadImageService = new UploadImageService(mongoDbUploadRepository);

const uploadImageController = new UploadImageController(uploadImageService);

export { uploadImageController, uploadImageService };
