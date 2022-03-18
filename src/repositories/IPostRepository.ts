import { IUploadImageDTO } from "@upload/UploadImageDTO";

export interface IUploadImageRepository {
  create(file: IUploadImageDTO): Promise<IUploadImageDTO>;
}
