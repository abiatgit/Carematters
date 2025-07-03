import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {

  const body = await req.json();
  const { name,careHomeId} = body;


  try {
    const house = await prisma.unit.create({
      data: {
        name,
        careHomeId: careHomeId
      },
    });
    return NextResponse.json({ success: true, house });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error });
  }
}

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
