"use server";
import { prisma } from "@/lib/db";
import { Appoinment } from "@prisma/client";

export interface EnrichedAppointment extends Appoinment {
  residentName: string | null;
  residentAvatar: string | null;
  unitName: string | null;
}

export async function fetchAppoinment(houseId: string | null) {
    if(!houseId)return[]
    if (houseId) {
        const appoinments = await prisma.appoinment.findMany({
            where: {
                unitId: houseId
            },include:{
                resident:{
                    select:{
                        id:true,
                        name:true,
                        photo:true
                    }
                },
                unit:{
                    select:{
                        id:true,
                        name:true
                    }
                }
            }
        })
        return appoinments
    }

}
