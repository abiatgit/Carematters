"use server"
import { prisma } from "@/lib/db";


export const fetchIncidents = async (unitId: string | null, careHomeId?: string | null) => {
  if (!unitId) return []
  try {
    let data;
    
    if (unitId === "all" && careHomeId) {
      data = await prisma.incident.findMany({
        where: {
          unit: {
            careHomeId: careHomeId
          }
        },
        include:{
          resident:true,
          unit:true
        }
      })
    } else {
      data = await prisma.incident.findMany({
        where: {
          unitId: unitId
        },
        include:{
          resident:true,
          unit:true
        }
      })
    }

    return data
  }
  catch(error){
    console.error("something went wrong ",error)
  }
}