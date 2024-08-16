import axios from "axios";
import { NextAuthOptions } from "next-auth";

import Credentials from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user as any;
      }
      return session;
    },
  },
  secret: "jnnxycv32",
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.get(
            `http://localhost:3000/fastapi/api/routers/user/login?email=${credentials?.email}&password=${credentials?.password}`
          );
          if (res.status !== 200) {
            throw new Error("Invalid credentials");
          }
          const user = await res.data;
          console.log(user);
          if (user.error) {
            throw new Error(user.error);
          }
          return user;
        } catch (error) {}
      },
    }),
  ],
};

export default authOptions;
