import { IUploadImageDTO } from "@upload/UploadImageDTO";

export interface IPostsRepository {
  create(file: IUploadImageDTO): Promise<IUploadImageDTO>;
  listAll(): Promise<IUploadImageDTO[]>;
  delete(filename: string): Promise<void>;
}
