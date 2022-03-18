import { UploadImageController } from "./UploadImageController";
import { UploadImageService } from "./UploadImageUseCase";
import { MongoDbUploadRepository } from "../../repositories/implementations/MongoDBUploadRepository";

const mongoDbUploadRepository = new MongoDbUploadRepository();

const uploadImageService = new UploadImageService(mongoDbUploadRepository);

const uploadImageController = new UploadImageController(uploadImageService);

export { uploadImageController, uploadImageService };
