export class PostTitle {
  private constructor(public readonly value: string) {}

  static create(raw: string | undefined | null): PostTitle {
    const val = (raw ?? "").trim();
    if (!val) throw new Error("TITLE_REQUIRED");
    // Optional: enforce a max length for sanity
    if (val.length > 200) throw new Error("TITLE_TOO_LONG");
    return new PostTitle(val);
  }
}
