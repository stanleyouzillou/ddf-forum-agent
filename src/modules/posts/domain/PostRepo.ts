import { Post } from "./Post";

export interface PostRepo {
  add(post: Post): Promise<void>;
  listPopular(): Promise<Post[]>;
  getById(id: string): Promise<Post | undefined>;
  update(post: Post): Promise<void>;
}
