import { MailtrapMailProvider } from "../../../providers/implementations/MailTrapProvider";
import { MongoDbUsersRepository } from "../../../repositories/implementations/MongoDBUsersRepository";
import { SignUpUseCase } from "./SignUpUseCase";
import { SignUpController } from "./SignUpController";
import UserSchema from "../../../schemas/user";

const postgresUsersRepository = new MongoDbUsersRepository(UserSchema);

const mailtrapMailProvider = new MailtrapMailProvider();

const signUpUseCase = new SignUpUseCase(
  postgresUsersRepository,
  mailtrapMailProvider
);

const signUpController = new SignUpController(signUpUseCase);

export { signUpUseCase, signUpController };
