import User from "../../src/models/user";
import { SignInUseCase } from "../../src/useCases/Auth/SignIn/SignInUseCase";
import { SignUpUseCase } from "../../src/useCases/Auth/SignUp/SignUpUseCase";
import { MongoDbUsersRepository } from "../../src/repositories/implementations/MongoDBUsersRepository";
import { MailtrapMailProvider } from "../../src/providers/implementations/MailTrapProvider";
import mongoose from "mongoose";

describe("sign in", () => {
  let signUpUseCase;
  let signInUseCase;
  const mailtrapMailProvider = new MailtrapMailProvider();

  beforeAll(async () => {
    if (!process.env.MONGO_URL) {
      throw new Error("MongoDB server not initialized");
    }
    await mongoose.connect(process.env.MONGO_URL);

    signUpUseCase = new SignUpUseCase(
      new MongoDbUsersRepository(User),
      mailtrapMailProvider
    );
    signInUseCase = new SignInUseCase(new MongoDbUsersRepository(User));
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  beforeEach(async () => {
    const spy = jest.spyOn(mailtrapMailProvider, "sendMail");
    spy.mockReturnValue(null);
    await signUpUseCase.execute({
      name: "User",
      email: "user@gmail.com",
      password: "test@123",
    });
    spy.mockRestore();
  });

  it("should be able to sign in", async () => {
    const token = await signInUseCase.execute({
      email: "user@gmail.com",
      password: "test@123",
    });
    expect(token).toHaveProperty("token");
  });

  it("should throw an error when user does not exists", async () => {
    await expect(
      signInUseCase.execute({
        email: "anotheremail@gmail.com",
        password: "test@123",
      })
    ).rejects.toThrow("User does not exists.");
  });

  it("should throw an error when user does not exists", async () => {
    await expect(
      signInUseCase.execute({
        email: "user@gmail.com",
        password: "wrongPassword",
      })
    ).rejects.toThrow("Passwords dont match.");
  });
});
