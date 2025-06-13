import { NextResponse } from "next/server"

export async function POST (req:Request){
    const body=await req.json()
    try{
        console.log(body)
        return NextResponse.json({success:true ,body})
    }
        
    catch(error){
        return NextResponse.json({success:false,error})
    }
}