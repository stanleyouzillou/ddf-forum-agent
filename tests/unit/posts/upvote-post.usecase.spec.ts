/// <reference types="jest" />
import {
  inMemoryPostRepo,
  InMemoryPostRepo,
} from "../../../src/modules/posts/infra/InMemoryPostRepo";
import { Post } from "../../../src/modules/posts/domain/Post";
import { UpvotePostUseCase } from "../../../src/modules/posts/app/UpvotePostUseCase";

describe("UpvotePostUseCase", () => {
  beforeEach(() => {
    // Reset the shared repo for isolation
    (inMemoryPostRepo as InMemoryPostRepo)["items"] = [] as any;
  });

  it("increments score by 1 on first upvote and is idempotent per member", async () => {
    const useCase = new UpvotePostUseCase(inMemoryPostRepo);

    const post = Post.create({ title: "Awesome tool", url: "https://x.com" });
    await inMemoryPostRepo.add(post);

    // First upvote by alice -> score becomes 1
    const r1 = await useCase.execute({
      postId: post.props.id,
      memberId: "alice",
    });
    expect(r1.score).toBe(1);

    // Second upvote by same member -> still 1
    const r2 = await useCase.execute({
      postId: post.props.id,
      memberId: "alice",
    });
    expect(r2.score).toBe(1);

    // Upvote by another member -> becomes 2
    const r3 = await useCase.execute({
      postId: post.props.id,
      memberId: "bob",
    });
    expect(r3.score).toBe(2);
  });
});
