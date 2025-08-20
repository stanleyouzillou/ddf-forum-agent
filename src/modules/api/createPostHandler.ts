import type { NextApiRequest, NextApiResponse } from "next";
import { InMemoryPostRepo } from "../posts/infra/InMemoryPostRepo";
import { CreatePostUseCase } from "../posts/app/CreatePostUseCase";

const repo = new InMemoryPostRepo();
const useCase = new CreatePostUseCase(repo);

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
    return res.status(201).json(result);
  } catch (e: any) {
    if (e?.message === "TITLE_REQUIRED") {
      return res.status(400).json({ error: "Title is required" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
