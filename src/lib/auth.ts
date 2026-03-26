import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

type CredentialsInput = {
  email?: string;
  password?: string;
};

function readCredentials(credentials?: CredentialsInput) {
  const email = credentials?.email;
  const password = credentials?.password;

  if (!email || !password) return null;
  return { email, password };
}

async function validateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  return {
    id: user.id,
    email: user.email,
  };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const parsedCredentials = readCredentials(credentials as CredentialsInput | undefined);
        if (!parsedCredentials) return null;

        return validateUser(parsedCredentials.email, parsedCredentials.password);
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
