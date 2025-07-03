import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  const careHomeId = req.nextUrl.searchParams.get("careHomeId")

  if (!careHomeId) return NextResponse.json({ success: false, });
  try {
    const houses = await prisma.unit.findMany({
      where: {
        careHomeId: careHomeId
      }
    });
    return NextResponse.json({ success: true, houses });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error });
  }
}