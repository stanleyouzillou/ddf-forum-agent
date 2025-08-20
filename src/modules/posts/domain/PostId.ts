import { randomUUID } from "crypto";

export class PostId {
  private constructor(public readonly value: string) {}

  static create(raw?: string | null): PostId {
    const v = (raw ?? "").trim();
    const id = v || randomUUID();
    // optionally validate UUID shape; keep permissive for now
    return new PostId(id);
  }
}
