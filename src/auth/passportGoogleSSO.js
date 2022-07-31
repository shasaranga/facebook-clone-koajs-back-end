const passport = require("koa-passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models");
const GOOGLE_CALLBACK_URL = "http://localhost:8000/api/v1/auth/google/callback"
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      const defaultUser = {
        fullName: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        googleId: profile.id,
      };

      const user = await User.findOrCreate({
        where: { googleId: profile.id },
        defaults: defaultUser,
      }).catch((err) => {
        console.error("Error signing up", err);
        cb(err, null);
      });

      console.log("$$$$")

      if (user && user[0]) return cb(null, user && user[0]);
    }
  )
);

passport.serializeUser((user, cb) => {
  console.log("Serializing user:", user);
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findOne({ where: { id } }).catch((err) => {
    console.log("Error deserializing", err);
    cb(err, null);
  });

  console.log("DeSerialized user : ",id , " ---> ", user);

  if (user) cb(null, user);
});
