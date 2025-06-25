"use server"
import { prisma } from "@/lib/db"

export const fetchAllHouse=async(id:string | undefined)=>{

    const houses=await prisma.unit.findMany({
        where:{
            careHomeId:id
        }
    })
    return  houses
}