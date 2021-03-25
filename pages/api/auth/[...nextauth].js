import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import mongoConnect from "../../../utils/mongoConnect";
import Settings from "../../../models/settings";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session(session, user) {
      return { session, user };
    },
    async signIn(user, account, profile) {
      return true;
    },
    async redirect(url, baseUrl) {
      return baseUrl;
    },
  },
  events: {
    async signIn({ user }) {
      await mongoConnect();
      const found = await Settings.findOne({ _user: user.id });
      if (found) {
        // Make sure every user has this set of properties
        if (!found.recommendations) found.recommendations = [];
        if (!found.likes) found.likes = [];

        await found.save();
      } else {
        // Generate new settings for user
        const settings = new Settings({
          _user: user.id,
          likes: [],
          recommendations: [],
        });
        await settings.save();
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: "/preferences", // If set, new users will be directed here on first sign in
  },

  // A database is optional, but required to persist accounts in a database
  database: process.env.MONGO_URI,
});
