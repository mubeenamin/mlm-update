import axios from "axios";
import { NextAuthOptions } from "next-auth";

import Credentials from "next-auth/providers/credentials";
type User = {
  id: number;
  email: string;
  name: string;
  role: string;
};
const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        id: { label: "ID", type: "text" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.get(
            `http://localhost:3000/fastapi/api/routers/user/login?email=${credentials?.email}&password=${credentials?.password}`
          );
          if (res.status !== 200) {
            throw new Error("Invalid credentials");
          }
          const user: any = await res.data;

          if (user.error) {
            throw new Error(user.error);
          }
          return user;
        } catch (error) {}
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signIn",
    signOut: "/",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
