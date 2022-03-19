import { Router } from "express";
import IDecodedRequest from "./interfaces/decodedRequest";
import multerConfig from "./config/multer";
import multer from "multer";
import { createPostController } from "./useCases/Post/CreatePost";
import { listAllPostsController } from "./useCases/Post/ListAllPosts";
import { listPostController } from "./useCases/Post/ListPost";
import { deletePostController } from "./useCases/Post/DeletePost";
import { updatePostController } from "./useCases/Post/UpdatePost";
import { signUpController } from "./useCases/Auth/SignUp";
import { signInController } from "./useCases/Auth/SignIn";
import { protectRoute } from "./middlewares/auth";
const router = Router();

router.post(
  "/posts",
  protectRoute,
  multer(multerConfig).single("file"),
  (req: IDecodedRequest, res) => {
    return createPostController.handle(req, res);
  }
);

router.get("/posts", protectRoute, async (_, res) => {
  return listAllPostsController.handle(res);
});

router.get("/posts/:id", protectRoute, async (req, res) => {
  return listPostController.handle(req, res);
});

router.delete("/posts/:id", protectRoute, async (req: IDecodedRequest, res) => {
  return deletePostController.handle(req, res);
});

router.put(
  "/posts/:id",
  protectRoute,
  multer(multerConfig).single("file"),
  async (req: IDecodedRequest, res) => {
    return updatePostController.handle(req, res);
  }
);

router.post("/signUp", (req, res) => {
  return signUpController.handle(req, res);
});

router.post("/signIn", (req, res) => {
  return signInController.handle(req, res);
});

export { router };
