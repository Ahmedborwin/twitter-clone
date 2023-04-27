import prisma from "lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (req.method === "POST") {
    if (req.body.task === "reply tweet") {
      await prisma.tweet.create({
        data: {
          content: req.body.content,
          parent: req.body.parent,
          author: {
            connect: { id: user.id },
          },
        },
      });
    } else {
      await prisma.tweet.create({
        data: {
          content: req.body.content,
          author: {
            connect: { id: user.id },
          },
        },
      });
    }
  }

  if (req.method === "DELETE") {
    //submit delete method to tweet table using the tweet ID
    let id = req.body.tweetId;
    await prisma.tweet.delete({
      where: { id },
    });
  }
  return res.end();
}
