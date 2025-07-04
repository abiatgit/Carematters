"use server";
import { prisma } from "@/lib/db";

export async function fetchStaff(houseId:string | null) {
    if(houseId){
      const staff=await prisma.user.findMany({
        where:{
          unitId:houseId
        },
        include:{
          unit:true
        }
      })
      return staff
     }
}
