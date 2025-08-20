/// <reference types="jest" />
import {
  inMemoryPostRepo,
  InMemoryPostRepo,
} from "../../../src/modules/posts/infra/InMemoryPostRepo";
import { CreatePostUseCase } from "../../../src/modules/posts/app/CreatePostUseCase";

describe("CreatePostUseCase", () => {
  beforeEach(() => {
    // Reset the shared repo for isolation
    (inMemoryPostRepo as unknown as { items: any[] }).items = [];
  });

  it("creates a post and returns its id", async () => {
    const useCase = new CreatePostUseCase(inMemoryPostRepo);

    const result = await useCase.execute({
      title: "Awesome tool",
      url: "https://example.com",
      authorId: "alice",
    });

    expect(result.id).toBeDefined();
    const list = await inMemoryPostRepo.listPopular();
    expect(list).toHaveLength(1);
    expect(list[0].props.title).toBe("Awesome tool");
    expect(list[0].props.url).toBe("https://example.com");
    expect(list[0].props.score).toBe(0);
  });

  it("throws TITLE_REQUIRED when title is blank", async () => {
    const useCase = new CreatePostUseCase(inMemoryPostRepo);

    await expect(
      useCase.execute({ title: "  ", url: "", authorId: "bob" })
    ).rejects.toThrowError("TITLE_REQUIRED");
  });
});
