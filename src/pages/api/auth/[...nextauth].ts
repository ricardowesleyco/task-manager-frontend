import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            "http://localhost:3001/api/v1/auth/login",
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          const { user, token } = res.data;

          if (user && token) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              accessToken: token,
            };
          }

          return null;
        } catch (error) {
          console.error("Erro de login:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
