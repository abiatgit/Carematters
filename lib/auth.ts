import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./db/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { userSchema } from "./userSchema";
import { encode } from "next-auth/jwt";
const adapter = PrismaAdapter(prisma);
import { v4 as uuid } from "uuid";
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
            password: validateCredentials.password,
          },
        });
        if (user) {
          return user;
        } else {
          throw new Error("invalid credential");
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
    },
  },
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
    },}
});
