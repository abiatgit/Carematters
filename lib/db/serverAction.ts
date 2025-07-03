"use server";
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
  const name = data.name as string;
  const hashPassword = await bcrypt.hash(password, 10);
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
  }

  return executeAction({
    actionFn: async () => {
      try {
        await prisma.user.create({
          data: {
            email,
            password: hashPassword,
            name: name,
          },
        });
      } catch (err) {
        console.log("failed to create ", err);
      }
    },
  });
};

