import Post from "../../src/models/post";
import { CreatePostUseCase } from "../../src/useCases/Post/CreatePost/CreatePostUseCase";
import { MongoDbPostsRepository } from "../../src/repositories/implementations/MongoDBPostRepository";
import { ListAllPostsUseCase } from "../../src/useCases/Post/ListAllPosts/ListAllPostsUseCase";
import mongoose from "mongoose";

describe("list All Posts", () => {
  let createPostUseCase;
  let listAllPostsUseCase;
  let post;

  beforeAll(async () => {
    if (!process.env.MONGO_URL) {
      throw new Error("MongoDB server not initialized");
    }
    await mongoose.connect(process.env.MONGO_URL);
    createPostUseCase = new CreatePostUseCase(new MongoDbPostsRepository(Post));
    listAllPostsUseCase = new ListAllPostsUseCase(
      new MongoDbPostsRepository(Post)
    );
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Post.deleteMany({});
  });

  beforeEach(async () => {
    post = await createPostUseCase.execute(
      {
        location: "www.test.com.br",
        filename: "1234456789",
        size: 444,
      },
      { title: "title", description: "description" },
      "test@gmail.com"
    );
  });

  it("should be able to list All posts", async () => {
    await listAllPostsUseCase.execute();
    const listAllPosts = await Post.find({}).lean();
    expect(listAllPosts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: "description",
          email: "test@gmail.com",
          filename: "1234456789",
          size: 444,
          title: "title",
          url: "www.test.com.br",
        }),
      ])
    );
  });
});
