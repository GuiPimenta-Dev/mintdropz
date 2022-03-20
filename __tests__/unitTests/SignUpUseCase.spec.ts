import User from "../../src/models/user";
import { SignUpUseCase } from "../../src/useCases/Auth/SignUp/SignUpUseCase";
import { MongoDbUsersRepository } from "../../src/repositories/implementations/MongoDBUsersRepository";
import { MailtrapMailProvider } from "../../src/providers/implementations/MailTrapProvider";
import mongoose from "mongoose";

describe("insert", () => {
  let signUpUseCase;
  const dto = { name: "User", email: "user@gmail.com", password: "test@123" };
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
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("should be able to sign up a new user", async () => {
    const funcB = () => {
      return "original";
    };
    const spy = jest.spyOn(mailtrapMailProvider, "sendMail");
    spy.mockReturnValue(null);
    await signUpUseCase.execute(dto);

    const createdUser = await User.find({}).lean();

    expect(createdUser).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "User",
          email: "user@gmail.com",
        }),
      ])
    );
    spy.mockRestore();
  });

  it("should throw an error when user already exists", async () => {
    await signUpUseCase.execute(dto);
    await expect(signUpUseCase.execute(dto)).rejects.toThrow(
      "User already exists."
    );
  });
});
