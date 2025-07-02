"use server";
import { prisma } from "@/lib/db";
import { id } from "zod/v4/locales";

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
  console.log("delete user",id)
  try {
      const residents = await prisma.resident.delete({
        where: {
          id: Id
        }
      })
      console.log(residents)
      return "deleted"
    
  }
  catch (err) {
    console.log(err)
    return null
  }

}

