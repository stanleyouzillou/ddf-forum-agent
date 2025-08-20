import type { NextApiRequest, NextApiResponse } from "next";
import { inMemoryPostRepo } from "../infra/InMemoryPostRepo";
import { CreatePostUseCase } from "../app/CreatePostUseCase";

const useCase = new CreatePostUseCase(inMemoryPostRepo);

export default async function createPostHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const { title, url } = (req.body || {}) as { title?: string; url?: string };
    const result = await useCase.execute({
      title: title ?? "",
      url: url ?? "",
      authorId: "alice",
    });
    return res.status(201).json({ id: result.id });
  } catch (e: any) {
    if (e?.message === "TITLE_REQUIRED") {
      return res.status(400).json({ error: "Title is required" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
