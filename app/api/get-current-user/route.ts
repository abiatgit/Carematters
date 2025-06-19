
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'


export async function GET() {
    const session = await auth()
    const user = session?.user
    try {
        const currentUser = await prisma.user.findUnique({
            where: {
                id: user?.id
            }
        })
       return NextResponse.json({success:true,currentUser})
    }
    catch(err){
         console.log(err)
      return   NextResponse.json({success:false,err})
    }
}
