"use server";
import { prisma } from "@/lib/db";
import { Appoinment } from "@prisma/client";

export interface EnrichedAppointment extends Appoinment {
    residentName: string | null;
    residentAvatar: string | null;
    unitName: string | null;
}

export async function fetchAppoinment(houseId: string | null) {
    if (!houseId) return []
    try {
        if (houseId) {
            const appoinments = await prisma.appoinment.findMany({
                where: {
                    unitId: houseId
                }, include: {
                    resident: {
                        select: {
                            id: true,
                            name: true,
                            photo: true
                        }
                    },
                    unit: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            })
            const enrichedAppointment: EnrichedAppointment[] = appoinments.map((apt) => ({
                ...apt,
                residentName: apt.resident.name || null,
                residentAvatar: apt.resident.photo || null,
                unitName: apt.unit.name,
                resident: undefined,
                unit: undefined
            }))
            return enrichedAppointment
        }

    }
    catch (error) {
        console.error("Error fetching appointments:", error);
        return [];
    }
}
export async function fetchAppoinmentBasic(houseId: string | null) {
    if (houseId) {
        const appoinments = await prisma.appoinment.findMany({
            where: {
                unitId: houseId
            }
        });
        return appoinments;
    }
    return [];
}
