import { prisma } from "@/lib/db";

export async function POST(req: Request) {
   
    const data = req.body
    console.log(data)
    //  if(!data)return []
    // const res = await prisma.appoinment.create({
    //     data:{
    //         ...data
    //     }
    // })
}