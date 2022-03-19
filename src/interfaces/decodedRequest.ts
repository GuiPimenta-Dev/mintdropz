import { Request } from "express";

interface IDecodedContent {
  email: string;
}

export default interface IDecodedRequest extends Request {
  decoded: IDecodedContent;
}
