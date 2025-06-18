import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const {
    firstName,
    lastName,
    dateOfBirth,
    roomNumber,
    gender,
    unitId,
    gp,
    nextOfKin,
    photo,
  } = body.values;

  try {
    const resident = await prisma.resident.create({
      data: {
        name: firstName + " " + lastName,
        dateOfBirth: new Date(dateOfBirth),
        roomNumber,
        gender,
        unitId,
        gp,
        nextOfKin,
        photo,
      },
    });
    return NextResponse.json({ success: true, resident });
  } catch (err) {
    return NextResponse.json({ succss: false, err });
  }
}

export async function GET(req:NextRequest) {
  const {searchParams}=new URL(req.url)
  const unitId= searchParams.get("unitId")
  try {
    const residents = await prisma.resident.findMany({
      where:unitId?{unitId}:undefined
    });

    return NextResponse.json({ success: true, residents });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
