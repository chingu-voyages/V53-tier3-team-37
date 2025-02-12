import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../services/prisma";

export const authOptions: NextAuthOptions = {
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      id: "google",
      name: "Google",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  debug: true,
  callbacks: {
    async session({ session, user }) {
      console.log("session is: ", session);
      if (user) {
        session.user.id = user.id;
        session.user.email = user.email;
      }
      return session;
    },
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error("No profile");
      }
      console.log("sign in callback triggered");

      await prisma.user.upsert({
        where: { email: profile.email },
        create: {
          email: profile.email,
          // username: profile.email.split('@')[0],
          name: profile.name ?? "unknown",
        },
        update: {
          name: profile.name,
        },
      });
      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
