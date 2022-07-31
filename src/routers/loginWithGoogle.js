const KoaRouter = require("koa-router");
const passport = require("koa-passport");

const router = new KoaRouter();

const successLoginUrl = "http://localhost:3000/login/success";
const errorLoginUrl = "http://localhost:3000/login/error";

router.get(
  "/api/v1/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/api/v1/auth/google/callback",
  passport.authenticate("google", {
    failureMessage: "Cannot login to Google, please try again later!",
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
  }),
  (ctx, next) => {
    ctx.response.body = "Thank you for signing in!";
  }
);

module.exports = router;
