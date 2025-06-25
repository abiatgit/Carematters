import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const res = await req.json();
    const data = await prisma.incident.create({ data: res });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error("Error creating incident:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}