const session = require("koa-session");
const Koa = require("koa");
require("dotenv").config();
const koaBody = require("koa-body");
const cors = require("koajs-cors");
const app = new Koa();
const port = process.env.PORT || 3001;
const passport = require("koa-passport");

require("./auth/passport");
require("./auth/passportGoogleSSO");
require("./config/firebaseConfig")

app.use(koaBody({multipart: true}));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  session(
    {
      key: process.env.COOKIE_SECRET,
      maxAge: 24 * 60 * 60 * 1000,
    },
    app
  )
);
app.keys = [process.env.COOKIE_SECRET];

app.use(passport.initialize());
app.use(passport.session());

const db = require("./models");
const loginWithGoogle = require("./routers/loginWithGoogle");
const userRouter = require("./routers/user");
const postRouter = require("./routers/post");

app.use(loginWithGoogle.routes());
app.use(userRouter.routes());
app.use(postRouter.routes());

db.sequelize
  .sync({ alter: true })
  .then(() => console.log("***** Synced DB *****"));
app.listen(port, () => console.log(`Listening on port : ${port}`));
