import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const carehomeId = await prisma.careHome.findFirst();
  if (!carehomeId) return;
  const body = await req.json();
  const { name } = body;

  try {
    const house = await prisma.unit.create({
      data: {
        name,
        careHomeId: carehomeId?.id,
      },
    });
    return NextResponse.json({ succes: true, house });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error });
  }
}
