import { useState } from "react";

export default function PopularPage() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [posts, setPosts] = useState<
    Array<{ id: string; title: string; score: number }>
  >([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, url }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to create post");
      }
      const data = (await res.json()) as { id: string };
      setPosts((prev) => [{ id: data.id, title, score: 0 }, ...prev]);
      setTitle("");
      setUrl("");
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl p-4">
      <h1 className="text-2xl font-bold mb-4">Popular</h1>

      <form
        onSubmit={onSubmit}
        className="space-y-2 mb-6"
        data-testid="create-post-form"
      >
        <input
          data-testid="title-input"
          className="border p-2 w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          data-testid="url-input"
          className="border p-2 w-full"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          data-testid="submit-btn"
          className="bg-blue-600 text-white px-4 py-2 disabled:opacity-50"
          disabled={submitting}
        >
          {submitting ? "Submitting…" : "Submit"}
        </button>
        {error && (
          <p role="alert" className="text-red-600 text-sm">
            {error}
          </p>
        )}
      </form>

      <ul data-testid="posts-list" className="space-y-2">
        {posts.map((p) => (
          <li key={p.id} className="border p-2">
            <div className="font-medium">{p.title}</div>
            <div className="text-sm text-gray-600">Score: {p.score}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
