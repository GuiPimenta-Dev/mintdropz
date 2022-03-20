import Post from "../../src/models/post";
import { CreatePostUseCase } from "../../src/useCases/Post/CreatePost/CreatePostUseCase";
import { MongoDbPostsRepository } from "../../src/repositories/implementations/MongoDBPostRepository";
import { DeletePostUseCase } from "../../src/useCases/Post/DeletePost/DeletePostUseCase";
import mongoose from "mongoose";

describe("delete", () => {
  let createPostUseCase;
  let deletePostUseCase;
  let post;

  beforeAll(async () => {
    if (!process.env.MONGO_URL) {
      throw new Error("MongoDB server not initialized");
    }
    await mongoose.connect(process.env.MONGO_URL);
    createPostUseCase = new CreatePostUseCase(new MongoDbPostsRepository(Post));
    deletePostUseCase = new DeletePostUseCase(new MongoDbPostsRepository(Post));
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
        key: "1234456789",
        size: 444,
      },
      { title: "title", description: "description" },
      "test@gmail.com"
    );
  });

  it("should be able to delete a post that you own", async () => {
    await deletePostUseCase.execute(post._id.valueOf(), "test@gmail.com");
    const deletedPost = await Post.find({}).lean();
    expect(deletedPost).toEqual([]);
  });

  it("should thrown an error if there is no post id", async () => {
    await expect(
      deletePostUseCase.execute(null, "test@gmail.com")
    ).rejects.toThrow("Post id is missing.");
  });

  it("should thrown an error if you are not the post owner", async () => {
    await expect(
      deletePostUseCase.execute(post._id.valueOf(), "anothertest@gmail.com")
    ).rejects.toThrow("You are not the owner of this post.");
  });
});
