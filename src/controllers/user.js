const registerUser = async (ctx, next) => {
  const { body } = ctx.request;

  ctx.response.status = 201;
  ctx.response.body = body;
};

const loginGoogleUser = async (ctx, next) => {
    
    ctx.response.body = ctx.user;
  
};

module.exports = {
  registerUser,
  loginGoogleUser,
};
