import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch("/api/login_users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.username,
              password: credentials?.password, // Ideally, hash this before sending
            }),
          });

          if (!res.ok) {
            // Handle API errors here
            const errorData = await res.json();
            throw new Error(errorData.message || "Authentication failed");
          }

          const user = await res.json();

          if (user) {
            // Include more user data in the token (optional)
            return { ...user, id: user.id }; // Add any relevant fields
          }
        } catch (error) {
          console.error("Error during authentication:", error);
        }

        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Include more user data in the token
        token.id = user.id;
        // token.name = user.name; // (optional)
        // ...other fields
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
});
