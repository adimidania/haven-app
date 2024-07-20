import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./prisma";
import { getUserById } from "@/data/user";

async function getUser(email: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!user || !user.isActive) return null;
  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) return null;

  return {
    id: user.id,
    name: user.name,
  };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const user = await getUserById(token.sub);

      if (!user) {
        return token;
      }

      token.email = user.email;
      token.role = user.role;

      return token;
    },
    session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.email = token.email;
      }

      return session;
    },
  },
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string(),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }
        const { email, password } = parsedCredentials.data;
        const user = await getUser(email, password);
        return user;
      },
    }),
  ],
});
