// app/api/auth/[...nextauth]/auth.ts or auth.ts (wherever you're defining it)
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
const adapter = PrismaAdapter(prisma);
import { encode } from "next-auth/jwt";
import { userSchema } from "@/lib/userSchema"; // Zod schema for validation

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      credentials: {
        name:{label:"Name",type:"text"},
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },

      },
      async authorize(credentials) {

        try {
          const { email, password } = userSchema.parse(credentials);
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.password) {
            throw new Error("Invalid credentials");
          }

          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            throw new Error("Invalid credentials");
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },},
    jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();
        if (!params.token.sub) {
          throw new Error("No User id found in tokens");
        }
        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });
        if (!createdSession) {
          throw new Error("failed to create session");
        }
        return sessionToken;
      }
      return encode(params);
    },
  },
 
});
