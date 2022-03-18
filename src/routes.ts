import { Router } from "express";
import multerConfig from "./config/multer";
import multer from "multer";
import { uploadImageController } from "./useCases/Post/UploadImage";
import { listAllPostsController } from "./useCases/Post/ListAllPosts";
import { deletePostController } from "./useCases/Post/DeletePost";
import { signUpController } from "./useCases/Auth/SignUp";
import { signInController } from "./useCases/Auth/SignIn";
import { protectRoute } from "./middlewares/auth";
const router = Router();

router.post(
  "/upload",
  protectRoute,
  multer(multerConfig).single("file"),
  (req, res) => {
    return uploadImageController.handle(req, res);
  }
);

router.get("/posts", protectRoute, async (_, res) => {
  return listAllPostsController.handle(res);
});

router.delete("/post/:filename", protectRoute, async (req, res) => {
  return deletePostController.handle(req,res);
});

router.post("/signUp", (req, res) => {
  return signUpController.handle(req, res);
});

router.post("/signIn", (req, res) => {
  return signInController.handle(req, res);
});

export { router };
