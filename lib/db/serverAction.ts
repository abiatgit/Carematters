import bcrypt  from "bcrypt";
import { prisma } from "../db";
import { executeAction } from "../executeAction";
const saltRounds = 10;

export const signUp=async (formdata:FormData)=>{
     return executeAction(
{
  actionFn:async()=>{
    const data = Object.fromEntries(formdata.entries());
  const email = data.email as string;
  const password = data.password as string;
 const hashedPassword= await  bcrypt.hash(password,saltRounds)
 try{
  const user = await prisma.user.create({
    data: {
      email:email.toLowerCase(),
      password:hashedPassword,
    },
  });
    return user;
 }catch(err){
    throw new Error("Failed to create user: " + (err as Error).message);
 }
  }
}
     )
}