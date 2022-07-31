module.exports.isUserAuthenticated = (ctx, next) => {
  if (ctx.isAuthenticated() && ctx.state.user) {
    next();
  } else {
    ctx.response.status=401
    ctx.response.body = "You must login first!";
  }
};
