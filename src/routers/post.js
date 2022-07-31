const KoaRouter = require("koa-router");
const { getPosts, addPost } = require("../controllers/post");
const router = new KoaRouter();

router.post("/api/v1/posts", addPost);
router.get("/api/v1/posts", getPosts);

module.exports = router;
