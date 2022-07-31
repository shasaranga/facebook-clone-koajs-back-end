const passport = require("koa-passport");
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const db = require("../config/firebaseConfig");

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY,
    },
    async function (payload, done) {
      const userRef = db.collection("user");
      const snapshot = await userRef
        .where("userId", "==", payload.id)
        .get()
        .catch((err) => done(err));
        console.log("HHEEEL", snapshot)
      if (snapshot.empty) {
        return done(null, null);
      }
      const user = snapshot.docs[0];
      return done(null, user);
    }
  )
);
