import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./db/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { userSchema } from "./userSchema";
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validateCredentials = userSchema.parse(credentials);
        const user = await prisma.user.findFirst({
          where: {
            email: validateCredentials.email,
          },
        });

        if (!user?.password) {
          throw new Error("Invalid Credential");
        }
        if (user) {
          const isPasswordValid = await bcrypt.compare(
            validateCredentials.password,
            user.password
          );
          if (isPasswordValid)
            return user
          else {
            throw new Error("Invalid Credential");
          }
        } else {
          throw new Error("Invalid Credential");
        }
      },
    }),
  ],
});
