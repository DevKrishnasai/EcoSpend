import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import github from "next-auth/providers/github";
import prisma from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [github],
  callbacks: {
    async session({ session, token }) {
      // Remove or set emailVerified to undefined
      console.log("object ", session);
      return session;
    },
    async signIn({ user }) {
      console.log("user ", user);
      return true;
    },

  },
});
