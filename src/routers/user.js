const KoaRouter = require("koa-router");
const { isUserAuthenticated } = require("../middleware/auth");

const router = new KoaRouter();


router.get("/api/v1/auth/user", isUserAuthenticated, (ctx, next) =>{
    ctx.response.body = ctx.state.user
});

router.get("/api/v1/auth/logout", async(ctx, next) =>{
    ctx.logout();
    ctx.session = null;
    ctx.response.body = "Success";
});

module.exports = router;