import { prisma } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, address, postcode, logo, createdBy } = body;
    if (!name || !address || !postcode || !createdBy || !logo) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }
    const careHome = await prisma.careHome.create({
      data: { ...body },
    });
    
    if (careHome) {
      await prisma.user.update({
        where: { id: createdBy },
        data: {
          onboarded: true,
        },
      });
    }
    return NextResponse.json({ success: true, careHome }, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Error Creating Carehome", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
