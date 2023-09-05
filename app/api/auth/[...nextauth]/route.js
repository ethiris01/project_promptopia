import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
// db models
import User from "@models/user";

import { connectToDB } from "@utils/database";
// for authentication purpose
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    // authentication purposes.
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();
      return session;
    },

    async signIn({ profile }) {
      try {
        // serverless => lambda => dynamodb

        // check if a user already exists
        await connectToDB();
        const userExists = await User.findOne({
          email: profile.email,
        });

        // if not, create new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };

// this file is setup as server.js
