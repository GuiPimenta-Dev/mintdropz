import { IUploadImageDTO } from "@upload/UploadImageDTO";
import { IUploadImageRepository } from "../IPostRepository";

export class MongoDbUploadRepository implements IUploadImageRepository {
  private upload: any;

  constructor(schema) {
    this.upload = schema;
  }

  async create(dto: IUploadImageDTO): Promise<IUploadImageDTO> {
    const upload = await this.upload.create(dto);

    return upload;
  }
}
