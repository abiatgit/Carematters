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
