import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const body = await req.json();
  const time = new Date(`${body.date}T${body.time}:00`);
  const date = new Date(body.date);
  const { venue, unitId, residentId, scheduledWith } = body;
  const res = await prisma.appoinment.create({
    data: {
      venue: venue,
      date: date,
      time: time,
      unitId: unitId,
      residentId: residentId,
      scheduledWith: scheduledWith,
    },
  });
  console.log(res);
  return NextResponse.json({ success: true, res });
}
