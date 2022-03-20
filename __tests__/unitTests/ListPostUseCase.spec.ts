import Post from "../../src/models/post";
import { CreatePostUseCase } from "../../src/useCases/Post/CreatePost/CreatePostUseCase";
import { MongoDbPostsRepository } from "../../src/repositories/implementations/MongoDBPostRepository";
import { ListPostUseCase } from "../../src/useCases/Post/ListPost/ListPostUseCase";
import mongoose from "mongoose";

describe("list One Post", () => {
  let createPostUseCase;
  let listPostUseCase;
  let post;

  beforeAll(async () => {
    if (!process.env.MONGO_URL) {
      throw new Error("MongoDB server not initialized");
    }
    await mongoose.connect(process.env.MONGO_URL);
    createPostUseCase = new CreatePostUseCase(new MongoDbPostsRepository(Post));
    listPostUseCase = new ListPostUseCase(new MongoDbPostsRepository(Post));
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

  it("should be able to list a specific post", async () => {
    const listPost = await listPostUseCase.execute(post._id.valueOf());
    expect(listPost).toEqual(
      expect.objectContaining({
        description: "description",
        email: "test@gmail.com",
        filename: "1234456789",
        size: 444,
        title: "title",
        url: "www.test.com.br",
      })
    );
  });
});
