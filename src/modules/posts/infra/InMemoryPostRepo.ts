import { Post } from "../domain/Post";

export interface PostRepo {
  add(post: Post): Promise<void>;
  listPopular(): Promise<Post[]>;
}

export class InMemoryPostRepo implements PostRepo {
  private items: Post[] = [];

  async add(post: Post): Promise<void> {
    this.items.push(post);
  }

  async listPopular(): Promise<Post[]> {
    return [...this.items].sort((a, b) => b.props.score - a.props.score);
  }
}
