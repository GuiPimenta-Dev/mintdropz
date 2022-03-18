import { MailtrapMailProvider } from "../../../providers/implementations/MailTrapProvider";
import { MongoDbUsersRepository } from "../../../repositories/implementations/MongoDBUsersRepository";
import { SignUpUseCase } from "./SignUpUseCase";
import { SignUpController } from "./SignUpController";
import UserSchema from "../../../models/user";

const mongoDBUsersRepository = new MongoDbUsersRepository(UserSchema);

const mailtrapMailProvider = new MailtrapMailProvider();

const signUpUseCase = new SignUpUseCase(
  mongoDBUsersRepository,
  mailtrapMailProvider
);

const signUpController = new SignUpController(signUpUseCase);

export { signUpUseCase, signUpController };
