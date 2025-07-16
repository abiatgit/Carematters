"use server";
import { prisma } from "@/lib/db";
import { User } from "@prisma/client";

export async function fetchHouse(user: User | null) {
  if (!user) return [];

  if (user.role === "MANAGER") {
    const careHome = await prisma.careHome.findFirst({
      where: {
        createdBy:  user.id,
      },
      include: {
        units: true,
      },
    });

    if (!careHome) return [];

    return careHome.units;
  } else {
    if (!user.unitId) return [];
    const unit = await prisma.unit.findUnique({
      where: {
        id: user.unitId,
      },
    });
    return unit ? [unit] : [];
  }
}

export async function fetchHousewithresident(careHomeId: string) {
  if (!careHomeId) return;

  const data = await prisma.unit.findMany({
    where: {
      careHomeId: careHomeId,
    },
    include: {
      residents: true, // includes related residents
      staff: true,      // includes related user (if relation exists)
    },
  });

  return data;
}

export async function deleteHouse(houseId: string) {
  try {
    // First check if house has residents or staff
    const house = await prisma.unit.findUnique({
      where: { id: houseId },
      include: {
        residents: true,
        staff: true,
      },
    });

    if (!house) {
      throw new Error("House not found");
    }

    if (house.residents.length > 0) {
      throw new Error("Cannot delete house with residents. Please move residents first.");
    }

    if (house.staff.length > 0) {
      throw new Error("Cannot delete house with staff assigned. Please reassign staff first.");
    }

    // Delete the house
    await prisma.unit.delete({
      where: { id: houseId },
    });

    return { success: true, message: "House deleted successfully" };
  } catch (error) {
    console.error("Error deleting house:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to delete house" 
    };
  }
}
