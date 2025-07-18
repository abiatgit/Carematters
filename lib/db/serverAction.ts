"use server";
import { prisma } from "../db";
import { executeAction } from "../executeAction";
import bcrypt from "bcryptjs";

export const handleSignUp = async (formdata: FormData) => {
  const data = Object.fromEntries(formdata);

  if (!data) {
    return {
      success: false,
      message: "Form data is required"
    };
  }

  const password = data.password as string;
  const email = data.email as string;
  const name = data.name as string;

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address"
    };
  }

  // Validate password length
  if (password.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters long"
    };
  }

  // Validate name length
  if (name.trim().length < 2) {
    return {
      success: false,
      message: "Name must be at least 2 characters long"
    };
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return {
      success: false,
      message: "An account with this email already exists"
    };
  }

  const hashPassword = await bcrypt.hash(password, 10);

  return executeAction({
    actionFn: async () => {
      try {
        await prisma.user.create({
          data: {
            email,
            password: hashPassword,
            name: name,
            role: "MANAGER", // Set new users as MANAGER by default
          },
        });
      } catch (err) {
        console.log("failed to create ", err);
        throw new Error("Failed to create account");
      }
    },
    successMessage: "Account created successfully"
  });
};

