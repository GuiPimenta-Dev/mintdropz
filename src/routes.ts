import { Router } from "express";
import multerConfig from "./config/multer";
import multer from "multer";
import { uploadImageController } from "./useCases/Post/UploadImage";
import { listAllPostsController } from "./useCases/Post/ListAllPosts";
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

router.post("/signUp", (request, response) => {
  return signUpController.handle(request, response);
});

router.post("/signIn", (request, response) => {
  return signInController.handle(request, response);
});

export { router };
