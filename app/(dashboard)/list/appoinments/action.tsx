"use server";
import { prisma } from "@/lib/db";
import { Appoinment } from "@prisma/client";

export interface EnrichedAppointment extends Appoinment {
    residentName: string | null;
    residentAvatar: string | null;
    unitName: string | null;
}

export async function fetchAppoinment(careHomeId: string | null) {
    if (!careHomeId) return []
    try {
        const appoinments = await prisma.appoinment.findMany({
            where: {
                unit: {
                    careHomeId: careHomeId
                }
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
    catch (error) {
        console.error("Error fetching appointments:", error);
        return [];
    }
}
export async function fetchAppoinmentBasic(residentId: string | null) {
    if (residentId) {
        const appoinments = await prisma.appoinment.findMany({
            where: {
            residentId: residentId
            }
        });
        return appoinments;
    }
    return [];
}

export async function deleteAppointment(appointmentId: string) {
    try {
        await prisma.appoinment.delete({
            where: {
                id: appointmentId
            }
        });
        return { success: true };
    } catch (error) {
        console.error("Error deleting appointment:", error);
        return { success: false, error: "Failed to delete appointment" };
    }
}

export async function fetchUpcomingAppointments(careHomeId: string | null) {
    if (!careHomeId) return [];
    
    try {
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Start of today
        const tenDaysFromNow = new Date();
        tenDaysFromNow.setDate(now.getDate() + 10);
        tenDaysFromNow.setHours(23, 59, 59, 999); // End of the 10th day
        
        console.log("Fetching upcoming appointments:", {
            careHomeId,
            now: now.toISOString(),
            tenDaysFromNow: tenDaysFromNow.toISOString()
        });
        
        // First, let's fetch all appointments to see what we have
        const allAppointments = await prisma.appoinment.findMany({
            where: {
                unit: {
                    careHomeId: careHomeId
                }
            },
            include: {
                resident: {
                    select: {
                        id: true,
                        name: true,
                        photo: true,
                        roomNumber: true
                    }
                },
                unit: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: {
                date: 'asc'
            }
        });
        
        console.log("All appointments for care home:", allAppointments);
        
        // Filter appointments for the next 10 days
        const filteredAppointments = allAppointments.filter(apt => {
            const appointmentDate = new Date(apt.date);
            appointmentDate.setHours(0, 0, 0, 0); // Normalize to start of day
            console.log("Comparing dates:", {
                appointmentDate: appointmentDate.toISOString(),
                now: now.toISOString(),
                tenDaysFromNow: tenDaysFromNow.toISOString(),
                isInRange: appointmentDate >= now && appointmentDate <= tenDaysFromNow
            });
            return appointmentDate >= now && appointmentDate <= tenDaysFromNow;
        }).slice(0, 10); // Take only first 10
        
        console.log("Filtered appointments:", filteredAppointments);
        
        const enrichedAppointments: EnrichedAppointment[] = filteredAppointments.map((apt) => ({
            ...apt,
            residentName: apt.resident.name || null,
            residentAvatar: apt.resident.photo || null,
            unitName: apt.unit.name,
            resident: undefined,
            unit: undefined
        }));
        
        console.log("Enriched appointments:", enrichedAppointments);
        
        return enrichedAppointments;
    } catch (error) {
        console.error("Error fetching upcoming appointments:", error);
        return [];
    }
}

export async function fetchUpcomingAppointmentsByUnit(unitId: string | null, careHomeId?: string | null) {
    if (!unitId) return [];
    
    try {
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Start of today
        const tenDaysFromNow = new Date();
        tenDaysFromNow.setDate(now.getDate() + 10);
        tenDaysFromNow.setHours(23, 59, 59, 999); // End of the 10th day
        
        let appointments;
        
        if (unitId === "all" && careHomeId) {
            appointments = await prisma.appoinment.findMany({
                where: {
                    unit: {
                        careHomeId: careHomeId
                    },
                    date: {
                        gte: now,
                        lte: tenDaysFromNow
                    }
                },
                include: {
                    resident: {
                        select: {
                            id: true,
                            name: true,
                            photo: true,
                            roomNumber: true
                        }
                    },
                    unit: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },
                orderBy: {
                    date: 'asc'
                },
                take: 10
            });
        } else {
            appointments = await prisma.appoinment.findMany({
                where: {
                    unitId: unitId,
                    date: {
                        gte: now,
                        lte: tenDaysFromNow
                    }
                },
                include: {
                    resident: {
                        select: {
                            id: true,
                            name: true,
                            photo: true,
                            roomNumber: true
                        }
                    },
                    unit: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },
                orderBy: {
                    date: 'asc'
                },
                take: 10
            });
        }
        
        const enrichedAppointments: EnrichedAppointment[] = appointments.map((apt) => ({
            ...apt,
            residentName: apt.resident.name || null,
            residentAvatar: apt.resident.photo || null,
            unitName: apt.unit.name,
            resident: undefined,
            unit: undefined
        }));
        
        return enrichedAppointments;
    } catch (error) {
        console.error("Error fetching upcoming appointments by unit:", error);
        return [];
    }
}

export async function fetchAppointmentsByUnit(unitId: string | null, limit: number = 20, careHomeId?: string | null) {
    if (!unitId) return [];
    
    try {
        let appointments;
        
        if (unitId === "all" && careHomeId) {
            appointments = await prisma.appoinment.findMany({
                where: {
                    unit: {
                        careHomeId: careHomeId
                    }
                },
                include: {
                    resident: {
                        select: {
                            id: true,
                            name: true,
                            photo: true,
                            roomNumber: true
                        }
                    },
                    unit: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },
                orderBy: {
                    date: 'desc'
                },
                take: limit
            });
        } else {
            appointments = await prisma.appoinment.findMany({
                where: {
                    unitId: unitId
                },
                include: {
                    resident: {
                        select: {
                            id: true,
                            name: true,
                            photo: true,
                            roomNumber: true
                        }
                    },
                    unit: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },
                orderBy: {
                    date: 'desc'
                },
                take: limit
            });
        }
        
        const enrichedAppointments: EnrichedAppointment[] = appointments.map((apt) => ({
            ...apt,
            residentName: apt.resident.name || null,
            residentAvatar: apt.resident.photo || null,
            unitName: apt.unit.name,
            resident: undefined,
            unit: undefined
        }));
        
        return enrichedAppointments;
    } catch (error) {
        console.error("Error fetching appointments by unit:", error);
        return [];
    }
}
