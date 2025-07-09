"use server";
import { prisma } from "@/lib/db";


export async function fetchStaff(houseId: string | null) {
  if (houseId) {
    const staff = await prisma.user.findMany({
      where: {
        unitId: houseId
      },
      include: {
        unit: true
      }
    })
    return staff
  }
}

export async function deleteStaffwithId(params: { id: string }) {
  const { id } = params
  if (!id) return {success:false,message:"id Required"}
  try{
    const res=await prisma.user.deleteMany({
      where:{
        id:id
      }
    })
    return {success:true,data:res}
  }
  catch(error){
    return {"success":false,message:error}
  }
}