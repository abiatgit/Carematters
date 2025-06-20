"use server";
import { prisma } from "@/lib/db";

export async function fetchResident(houseId:string | null) {
   if(houseId){
    const residents=await prisma.resident.findMany({
      where:{
        unitId:houseId
      }
    })
    return residents
   }
   
}
