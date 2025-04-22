"use server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const clerk = await clerkClient();
  console.log("API called");

  try {
    const data = await req.json();
    const { careHomeName, address, totalRooms, createdBy } = data;
    console.log(careHomeName, address, totalRooms, createdBy);

    const managerId = createdBy;

    // Create new care home
    const newCareHome = await prisma.careHome.create({
      data: {
        name: careHomeName,
        address,
        totalRooms,
        createdBy,
      },
    });

    console.log("CareHome created:", newCareHome);

    if (newCareHome) {
      // Update user role in Clerk (Ensure Clerk Client is correctly initialized)
      const clerkManager = await clerk.users.updateUser(managerId, {
        publicMetadata: {
          careHome: newCareHome.name,
          role: "manager",
        },
      });

      console.log("Clerk Manager updated:", clerkManager);

      // Create manager entry in the database
      const manager = await prisma.manager.create({
        data: {
          id: managerId,
          firstName: clerkManager.firstName || "Default",
          lastName: clerkManager.lastName || "Manager",
          careHomeId: newCareHome.id,
          role: "manager",
        },
      });

      console.log("Manager created:", manager);
    }

    // Send success response
    return NextResponse.json(newCareHome, { status: 201 });
  } catch (err) {
    console.error("Error in onboarding POST:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    // Disconnect Prisma (optional; typically Prisma manages connections)
    await prisma.$disconnect();
  }
}
