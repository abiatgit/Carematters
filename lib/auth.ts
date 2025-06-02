import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./db/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log("credential",credentials)
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });
console.log("db user",user)
        if (user) {
          return {
            id: "1", // unique ID
            name: "Abi",
            email: "abi@gmail.com",
          };
        } else {
          throw new Error("Invalid Credential");
        }
      },
    }),
  ],
});
