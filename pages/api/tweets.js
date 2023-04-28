import { getTweets } from "@/lib/data";
import { getTweetReplies } from "@/lib/data";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const cursor = parseInt(req.query.cursor) || null;
    const take = parseInt(req.query.take || 2);
    const id = parseInt(req.query.parent) || null;

    const tweets = await getTweets(prisma, take, { id: cursor });

    res.json(tweets);
  }
}

/*
    if (!id) {
      const tweets = await getTweets(prisma, take, { id: cursor });
    } else {
      const tweets = await getTweetReplies(id, prisma, take, {
        id: cursor,
      });
    }
*/
