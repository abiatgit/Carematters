"use server";
import { prisma } from "@/lib/db";
import { User } from "@prisma/client";

export async function fetchResident(user: User,houseId:string | null) {
   if(houseId){
    const residents=await prisma.resident.findMany({
      where:{
        unitId:houseId
      }
    })
    return residents
   }
   
  const fullUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      CareHome: true,
    },
  });
  if (user.role === "MANAGER") {
    const careHomeId = fullUser?.CareHome[0]?.id;
    if (!careHomeId) return [];
    const units = await prisma.unit.findMany({
      where: { careHomeId },
      select: { id: true },
    });
    const unitsId = units.map((unit) => unit.id);
    if(units.length===0)return[]

    const residents = await prisma.resident.findMany({
      where: {
        unitId: {
          in: unitsId,
        },
      },
    });
    return residents;
  } else {
    const unitId = user.unitId;
    if (!unitId) return[];
    const residents = await prisma.resident.findMany({
      where: {
        unitId,
      },
    });
    return residents;
  }
}
