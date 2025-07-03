"use server";
import { prisma } from "@/lib/db";

export async function fetchResident(houseId: string | null) {
  if (houseId) {
    const residents = await prisma.resident.findMany({
      where: {
        unitId: houseId
      }
    })
    return residents
  }

}


export async function fetchResidentwithId(Id: string | null) {
  if (!Id) return null
  try {
    {
      const residents = await prisma.resident.findUnique({
        where: {
          id: Id
        }
      })
      return residents
    }
  }
  catch (err) {
    console.log(err)
    return null
  }

}
export async function deleteResidentwithId(Id: string | null) {
  if (!Id) return null
  try {
    
       await prisma.resident.delete({
        where: {
          id: Id
        }
      })
      return "deleted"
    
  }
  catch (err) {
    console.log(err)
    return null
  }

}

