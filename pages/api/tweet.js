import prisma from "lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(501).end();
  }

  const session = await getServerSession(req, res, authOptions);
  console.log("found session: ", JSON.stringify(session));

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (req.method === "POST") {
    await prisma.tweet.create({
      data: {
        content: req.body.content,
        author: {
          connect: { id: user.id },
        },
      },
    });
    res.end();
    return;
  }

  res.end();
}
