"use server"
import { prisma } from "@/lib/db";


export const fetchIncidents = async (unitId: string | null) => {
  if (!unitId) return []
  try {
    const data = await prisma.incident.findMany({
      where: {
        unitId: unitId
      },
      include:{
        resident:true,
        unit:true
      }
    })

    return data
  }
  catch(error){
    console.error("something went wrong ",error)
  }
}