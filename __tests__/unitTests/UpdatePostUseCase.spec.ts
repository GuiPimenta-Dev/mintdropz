import Post from "../../src/models/post";
import { CreatePostUseCase } from "../../src/useCases/Post/CreatePost/CreatePostUseCase";
import { MongoDbPostsRepository } from "../../src/repositories/implementations/MongoDBPostRepository";
import { UpdatePostUseCase } from "../../src/useCases/Post/UpdatePost/UpdatePostUseCase";
import mongoose from "mongoose";

describe("update", () => {
  let createPostUseCase;
  let updatePostUseCase;
  let post;

  beforeAll(async () => {
    if (!process.env.MONGO_URL) {
      throw new Error("MongoDB server not initialized");
    }
    await mongoose.connect(process.env.MONGO_URL);
    createPostUseCase = new CreatePostUseCase(new MongoDbPostsRepository(Post));
    updatePostUseCase = new UpdatePostUseCase(new MongoDbPostsRepository(Post));
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

  it("should be able to update a post that you own", async () => {
    const newBody = { title: "new title", description: "new description" };
    const newFile = {
      location: "www.test2.com.br",
      key: "987654321",
    };
    await updatePostUseCase.execute(
      post._id.valueOf(),
      newBody,
      newFile,
      "test@gmail.com"
    );
    const updatedPost = await Post.find({}).lean();
    expect(updatedPost).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: "new description",
          email: "test@gmail.com",
          filename: "987654321",
          title: "new title",
          url: "www.test2.com.br",
        }),
      ])
    );
  });

  it("should be able to update a post that you own with filename parameter", async () => {
    const newBody = { title: "new title", description: "new description" };
    const newFile = {
      location: "www.test2.com.br",
      filename: "987654321",
    };
    await updatePostUseCase.execute(
      post._id.valueOf(),
      newBody,
      newFile,
      "test@gmail.com"
    );
    const updatedPost = await Post.find({}).lean();
    expect(updatedPost).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: "new description",
          email: "test@gmail.com",
          filename: "987654321",
          title: "new title",
          url: "www.test2.com.br",
        }),
      ])
    );
  });

  it("should thrown an error if there is no post id", async () => {
    await expect(
      updatePostUseCase.execute(null, "test@gmail.com")
    ).rejects.toThrow("Post id is missing.");
  });

  it("should thrown an error if you are not the post owner", async () => {
    await expect(
      updatePostUseCase.execute(post._id.valueOf(), "anothertest@gmail.com")
    ).rejects.toThrow("You are not the owner of this post.");
  });
});
