import { PostRepo } from "../domain/PostRepo";
import { UpvotePostDTO } from "./dtos";

export class UpvotePostUseCase {
  constructor(private readonly repo: PostRepo) {}

  async execute(dto: UpvotePostDTO): Promise<{ id: string; score: number }> {
    const post = await this.repo.getById(dto.postId);
    if (!post) throw new Error("POST_NOT_FOUND");

    post.upvoteBy(dto.memberId);
    await this.repo.update(post);

    return { id: post.props.id, score: post.props.score };
  }
}
