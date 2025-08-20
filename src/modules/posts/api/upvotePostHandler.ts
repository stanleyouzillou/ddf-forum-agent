import type { NextApiRequest, NextApiResponse } from "next";
import { inMemoryPostRepo } from "../infra/InMemoryPostRepo";
import { UpvotePostUseCase } from "../app/UpvotePostUseCase";

const useCase = new UpvotePostUseCase(inMemoryPostRepo);

export default async function upvotePostHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method Not Allowed");
  }

  const id = (req.query.id as string) || "";
  if (!id) return res.status(400).json({ error: "POST_ID_REQUIRED" });

  try {
    const result = await useCase.execute({ postId: id, memberId: "alice" });
    return res.status(200).json(result);
  } catch (e: any) {
    if (e?.message === "POST_NOT_FOUND") {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
