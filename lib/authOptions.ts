import axios from "axios";
import { NextAuthOptions } from "next-auth";

import Credentials from "next-auth/providers/credentials";

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
            `${process.env.ACCESS_LOGIN_URL}/api/routers/user/login?email=${credentials?.email}&password=${credentials?.password}`
          );
          if (res.status !== 200) {
            throw new Error("Invalid credentials");
          }
          const user: any = await res.data;
          console.log(user);
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        //@ts-ignore
        token.balance = user.Balances.balance;
      }
      const expiryTime = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // Current time in seconds + 24 hours
      token.exp = expiryTime;
      return token;
    },
    async session({ session, token }) {
      //@ts-ignore
      session.user.id = token.id;
      //@ts-ignore
      session.user.balance = token.balance;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
