import { Post } from "../domain/Post";

export interface CreatePostDTO {
  title: string;
  url: string;
  authorId: string;
}

export interface PostWriterRepo {
  add(post: Post): Promise<void>;
}

export class CreatePostUseCase {
  constructor(private readonly repo: PostWriterRepo) {}

  async execute(dto: CreatePostDTO): Promise<{ id: string }> {
    const post = Post.create({ title: dto.title, url: dto.url });
    await this.repo.add(post);
    return { id: post.props.id };
  }
}
