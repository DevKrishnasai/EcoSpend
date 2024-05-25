import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import prisma from "./db";

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    github,
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
} satisfies NextAuthConfig;
export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
