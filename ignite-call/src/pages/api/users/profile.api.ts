import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { buildNextAuthOptions } from "../auth/[...nextauth].api";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const UpdateProfileSchema = z.object({
  bio: z.string(),
});

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).end();
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  );

  if (!session) {
    return res.status(401).end();
  }

  try {
    const { bio } = UpdateProfileSchema.parse(req.body);

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        bio,
      },
    });

    return res.status(204).end();
  } catch (error) {
    // If the validation fails, you can handle the error accordingly
    return res.status(400).json({ error: "Invalid request body" });
  }
}
