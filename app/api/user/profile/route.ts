import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["male", "female", "other"]).optional(),
  image: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = updateProfileSchema.parse(body);

    // Check if email is being changed and if it's already taken by another user
    if (validatedData.email !== session.user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: validatedData.email },
      });

      if (existingUser && existingUser.email !== session.user.email) {
        return NextResponse.json(
          { success: false, error: "Email is already taken" },
          { status: 400 }
        );
      }
    }

    // Update the user profile
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: validatedData.name,
        email: validatedData.email,
        gender: validatedData.gender,
        image: validatedData.image || null, // Handle empty string as null
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        gender: true,
        image: true,
        role: true,
        unitId: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Error updating profile:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Invalid data", 
          details: error.errors 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to update profile" },
      { status: 500 }
    );
  }
}

// GET method to fetch current user profile
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        gender: true,
        image: true,
        role: true,
        unitId: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}