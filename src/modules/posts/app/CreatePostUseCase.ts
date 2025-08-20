import { Post } from "../domain/Post";
import { PostRepo } from "../domain/PostRepo";
import { CreatePostDTO } from "./dtos";

export class CreatePostUseCase {
  constructor(private readonly repo: PostRepo) {}

  async execute(dto: CreatePostDTO): Promise<{ id: string }> {
    // Validate and create the post (title required enforced in domain)
    const post = Post.create({ title: dto.title, url: dto.url });

    await this.repo.add(post);

    return { id: post.props.id };
  }
}
