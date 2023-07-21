import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { buildNextAuthOptions } from "../auth/[...nextauth].api";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const timeIntervalsBodyschema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    })
  ),
});

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
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

  // Wrap the incoming array in an object with an "intervals" property
  const requestBody = { intervals: req.body };

  try {
    const { intervals } = timeIntervalsBodyschema.parse(requestBody);

    await Promise.all(
      intervals.map((interval) => {
        return prisma.userTimeInterval.create({
          data: {
            week_day: interval.weekDay,
            time_start_in_minutes: interval.startTimeInMinutes,
            time_end_in_minutes: interval.endTimeInMinutes,
            user_id: session.user?.id,
          },
        });
      })
    );

    return res.status(201).end();
  } catch (error) {
    // If the validation fails, you can handle the error accordingly
    return res.status(400).json({ error: "Invalid request body" });
  }
}
