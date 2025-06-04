"use server";

import { prisma } from "../db";
import { executeAction } from "../executeAction";

export const signUp = async (formdata: FormData) => {
  const data = Object.fromEntries(formdata);

  if(!data){
    throw new Error("data required")
  }
  const password = data.password as string
  const email = data.email as string

  return executeAction({
    actionFn: async () => {
      try {
        const user = await prisma.user.create({
          data: {
            email,
            password,
          },
        });
 
        return user;
      } catch (err) {
       console.log("failed to create ",err)
      }
    },
  });
};

