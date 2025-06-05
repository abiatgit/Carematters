"use server";

import { prisma } from "../db";
import { executeAction } from "../executeAction";
import bcrypt from "bcryptjs";

export const handleSignUp = async (formdata: FormData) => {
  const data = Object.fromEntries(formdata);

  if(!data){
    throw new Error("data required")
  }
  const password = data.password as string
  const email = data.email as string
  const hashPassword=await bcrypt.hash(password,10)

  return executeAction({
    actionFn: async () => {
      try {
        const user = await prisma.user.create({
          data: {
            email,
            password:hashPassword,
          },
        });
 
        return user;
      } catch (err) {
       console.log("failed to create ",err)
      }
    },
  });
};

