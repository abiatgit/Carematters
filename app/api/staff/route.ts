import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const { name, email, password, role, unitId, photoURL, onboarded, gender } = body;
    const hashPassword = await bcrypt.hash(password, 10)
    const staff = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
        role: role,
        unit: {
          connect: {
            id: unitId
          }
        },
        image: photoURL,
        onboarded: onboarded,
        gender: gender
      }
    })

    return NextResponse.json({ success: true, staff });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, error });
  }
}

