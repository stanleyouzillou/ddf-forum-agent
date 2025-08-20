import { Post } from "../domain/Post";
import { PostRepo } from "../domain/PostRepo";

export class InMemoryPostRepo implements PostRepo {
  private items: Post[] = [];

  async add(post: Post): Promise<void> {
    this.items.push(post);
  }

  async listPopular(): Promise<Post[]> {
    return [...this.items].sort((a, b) => b.props.score - a.props.score);
  }

  async getById(id: string): Promise<Post | undefined> {
    return this.items.find((p) => p.props.id === id);
  }

  async update(post: Post): Promise<void> {
    const idx = this.items.findIndex((p) => p.props.id === post.props.id);
    if (idx >= 0) this.items[idx] = post;
  }
}

// Shared singleton persisted on globalThis to survive Next.js dev HMR
const globalForPosts = globalThis as unknown as {
  inMemoryPostRepo?: InMemoryPostRepo;
};

export const inMemoryPostRepo =
  globalForPosts.inMemoryPostRepo ??
  (globalForPosts.inMemoryPostRepo = new InMemoryPostRepo());
