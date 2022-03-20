import Post from "../../src/models/post";
import { CreatePostUseCase } from "../../src/useCases/Post/CreatePost/CreatePostUseCase";
import { MongoDbPostsRepository } from "../../src/repositories/implementations/MongoDBPostRepository";
import mongoose from "mongoose";

describe("insert", () => {
  const email = "test@gmail.com";
  const body = { title: "title", description: "description" };
  const file = {
    location: "www.test.com.br",
    key: "1234456789",
    size: 444,
  };
  let createPostUseCase;

  beforeAll(async () => {
    if (!process.env.MONGO_URL) {
      throw new Error("MongoDB server not initialized");
    }
    await mongoose.connect(process.env.MONGO_URL);
    createPostUseCase = new CreatePostUseCase(new MongoDbPostsRepository(Post));
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Post.deleteMany({});
  });

  it("should be able to create a new post with key parameter on file", async () => {
    await createPostUseCase.execute(file, body, email);

    const createdPost = await Post.find({}).lean();
    expect(createdPost).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "title",
          description: "description",
          filename: "1234456789",
          size: 444,
          url: "www.test.com.br",
          email: "test@gmail.com",
        }),
      ])
    );
  });

  it("should be able to create a new post with filename parameter on file", async () => {
    const file = {
      location: "www.test.com.br",
      filename: "1234456789",
      size: 444,
    };
    await createPostUseCase.execute(file, body, email);

    const createdPost = await Post.find({}).lean();
    expect(createdPost).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "title",
          description: "description",
          filename: "1234456789",
          size: 444,
          url: "www.test.com.br",
          email: "test@gmail.com",
        }),
      ])
    );
  });
  it("should throw an error not sending the file", async () => {
    await expect(createPostUseCase.execute(null, body, email)).rejects.toThrow(
      "You need to upload a file."
    );
  });
});
