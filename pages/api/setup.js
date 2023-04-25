import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.end();
  }

  if (req.method === "POST") {
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: req.body.name,
      },
    });
  }
  res.status(401).json("Invalid Method");
}
