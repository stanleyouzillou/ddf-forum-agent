/// <reference types="jest" />
import { InMemoryPostRepo } from "../../../src/modules/posts/infra/InMemoryPostRepo";
import { CreatePostUseCase } from "../../../src/modules/posts/app/CreatePostUseCase";

describe("CreatePostUseCase", () => {
  it("persists a post and returns its id", async () => {
    const repo = new InMemoryPostRepo();
    const useCase = new CreatePostUseCase(repo);

    const result = await useCase.execute({
      title: "Awesome tool",
      url: "https://x.com",
      authorId: "alice",
    });

    expect(result.id).toBeDefined();
    const items = await repo.listPopular();
    expect(items[0].props.title).toBe("Awesome tool");
    expect(items[0].props.score).toBe(0);
  });

  it("requires a non-empty title", async () => {
    const repo = new InMemoryPostRepo();
    const useCase = new CreatePostUseCase(repo);

    await expect(
      useCase.execute({ title: "   ", url: "https://x.com", authorId: "alice" })
    ).rejects.toThrow("TITLE_REQUIRED");
  });
});
