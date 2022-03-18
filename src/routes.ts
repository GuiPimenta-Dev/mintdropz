import { response, Router } from "express";
import { multerConfig } from "./config/multer";
import multer from "multer";
import { uploadImageController } from "./useCases/Post";
import { signUpController } from "./useCases/Auth/SignUp";
import { signInController } from "./useCases/Auth/SignIn";
import { protectRoute } from "./middlewares/auth";
const router = Router();

router.post(
  "/upload",
  protectRoute,
  multer(multerConfig).array("file"),
  (req, res) => {
    return uploadImageController.handle(req, res);
  }
);

router.post("/signUp", (request, response) => {
  return signUpController.handle(request, response);
});

router.post("/signIn", (request, response) => {
  return signInController.handle(request, response);
});

export { router };
