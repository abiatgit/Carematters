"use server";

import { redirect } from "next/navigation";
import { prisma } from "../db";
import { executeAction } from "../executeAction";
import bcrypt from "bcryptjs";

export const handleSignUp = async (formdata: FormData) => {
  const data = Object.fromEntries(formdata);

  if (!data) {
    throw new Error("data required");
  }
  const password = data.password as string;
  const email = data.email as string;
  const hashPassword = await bcrypt.hash(password, 10);

  executeAction({
    actionFn: async () => {
      try {
        await prisma.user.create({
          data: {
            email,
            password: hashPassword,
          },
        });
        redirect("/auth/manager");
      } catch (err) {
        console.log("failed to create ", err);
      }
    },
  });
};
