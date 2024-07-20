import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import prisma from "./lib/prisma";

export const authConfig = {
  session: { strategy: "jwt", maxAge: 365 * 24 * 60 * 60 },
  jwt: { maxAge: 365 * 24 * 60 * 60 },
  callbacks: {
    session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.email = token.email;
      }

      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [],
} satisfies NextAuthConfig;
