import { test, expect } from "@playwright/test";

// This test relies on API routes:
// - POST /api/posts -> { id }
// - POST /api/posts/:id/upvote -> { id, score }

test("create a post then upvote it (idempotent per member)", async ({
  request,
  baseURL,
}) => {
  // 1) Create post
  const createUrl = new URL("/api/posts", baseURL).toString();
  const createResp = await request.post(createUrl, {
    data: { title: "Upvote E2E", url: "https://example.com" },
    headers: { "content-type": "application/json" },
  });
  expect(createResp.status()).toBe(201);
  const { id } = await createResp.json();
  expect(id).toBeTruthy();

  // 2) First upvote by default member (alice in handler)
  const upvoteUrl = new URL(`/api/posts/${id}/upvote`, baseURL).toString();

  // Warm up the API route to ensure Next.js has compiled the dynamic handler
  for (let i = 0; i < 5; i++) {
    const warm = await request.get(upvoteUrl);
    if (warm.status() !== 404) break;
    await new Promise((r) => setTimeout(r, 200));
  }

  const up1 = await request.post(upvoteUrl);
  expect(up1.status()).toBe(200);
  const body1 = await up1.json();
  expect(body1.id).toBe(id);
  expect(body1.score).toBe(1);

  // 3) Second upvote by same member -> still 1 (idempotent)
  const up2 = await request.post(upvoteUrl);
  expect(up2.status()).toBe(200);
  const body2 = await up2.json();
  expect(body2.score).toBe(1);
});
