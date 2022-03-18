import { MongoDbUsersRepository } from "../../../repositories/implementations/MongoDBUsersRepository";
import { SignInUseCase } from "./SignInUseCase";
import { SignInController } from "./SignInController";
import UserSchema from "../../../models/user";

const mongoDBUsersRepository = new MongoDbUsersRepository(UserSchema);

const signInUseCase = new SignInUseCase(mongoDBUsersRepository);

const signInController = new SignInController(signInUseCase);

export { signInUseCase, signInController };
