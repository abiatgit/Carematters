"use server";
import { prisma } from "@/lib/db";


export async function fetchResident(houseId: string | null, careHomeId?: string | null) {
  if (houseId === "all" && careHomeId) {
    const residents = await prisma.resident.findMany({
      where: {
        unit: {
          careHomeId: careHomeId
        }
      },
      include:{
        unit:true
      }
    })
    return residents
  }
  
  if (houseId) {
    const residents = await prisma.resident.findMany({
      where: {
        unitId: houseId
      },
      include:{
        unit:true
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

export async function updateResidentWithId(Id: string, data: {
  name?: string;
  dateOfBirth?: Date;
  roomNumber?: number;
  gp?: string;
  nextOfKin?: string;
  contact?: string;
  bio?: string;
}) {
  if (!Id) return null;

  try {
    const updatedResident = await prisma.resident.update({
      where: {
        id: Id
      },
      data: {
        ...data,
        updatedAt: new Date()
      }
    });
    return updatedResident;
  } catch (err) {
    console.log(err);
    return null;
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

