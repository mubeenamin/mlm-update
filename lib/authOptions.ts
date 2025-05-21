import axios, { AxiosError } from "axios";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
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
            `${process.env.ACCESS_LOGIN_URL}/api/routers/user/login`,
            {
              params: {
                email: credentials?.email,
                password: credentials?.password,
              },
              timeout: 10000,
            }
          );

          if (res.status !== 200) {
            throw new Error("Invalid credentials");
          }

          const user = res.data;

          if (user.error) {
            throw new Error(user.error);
          }

          // Check if user status is active
          if (user.status !== "Active") {
            throw new Error(
              "Your account is inactive. Please contact support."
            );
          }

          return user;
        } catch (error) {
          let errorMessage = "An error occurred during login.";

          if (error instanceof AxiosError) {
            if (error.response) {
              errorMessage =
                error.response.data?.error || "Invalid email or password";
            } else if (error.request) {
              errorMessage =
                "Unable to connect to the server. Please check your internet connection.";
            } else {
              errorMessage = "Invalid request configuration. Please try again.";
            }
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }

          throw new Error(errorMessage);
        }
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
        // @ts-ignore
        token.balance = user.Balances?.balance;
      }
      token.exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
      return token;
    },
    async session({ session, token }) {
      // @ts-ignore
      session.user.id = token.id as string;
      // @ts-ignore
      session.user.balance = token.balance;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
