import { randomUUID } from "crypto";

export type PostProps = {
  id: string;
  title: string;
  url: string;
  score: number;
};

export class Post {
  public readonly props: PostProps;
  private voters = new Set<string>();

  private constructor(props: PostProps) {
    this.props = props;
  }

  static create(input: { title: string; url: string }): Post {
    const title = (input.title ?? "").trim();
    if (!title) {
      throw new Error("TITLE_REQUIRED");
    }
    const id = randomUUID();
    return new Post({ id, title, url: input.url ?? "", score: 0 });
  }

  upvoteBy(memberId: string) {
    if (!memberId) return;
    if (this.voters.has(memberId)) return;
    this.voters.add(memberId);
    this.props.score += 1;
  }
}
