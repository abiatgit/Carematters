"use server";
import { prisma } from "@/lib/db";
import { User } from "@prisma/client";


export async function fetchStaff(user: (User | null)) {
  if (!user )return []

  const fullUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      CareHome: {
        include:{
            units:true
        }
      },
    },
  });
  if(!user )return[];
  if (user.role === "MANAGER") {
    const careHome = fullUser?.CareHome[0]
    if (!careHome) return [];

   const unitIds=careHome.units.map((unit)=>unit.id)

    if(unitIds.length===0)return[]

    const staff = await prisma.user.findMany({
      where: {
        unitId: {
          in: unitIds,
        },
      },
    });
    return staff
  } else {
    const unitId = user.unitId;
    if (!unitId) return[];
    const staff = await prisma.user.findMany({
      where: {
        unitId,
      },
    });
    return staff;
  }
}
