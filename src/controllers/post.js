const { storage } = require("../config/firebaseConfig");
const fs = require("fs");
const _ = require('lodash')

const { Posts, User } = require("../models");

const getPosts = async (ctx, next) => {
  const posts = await Posts.findAll({ order: [["updatedAt", "DESC"]] });

  const results = [];

  for (const post of posts) {
    const user = await User.findOne({ where: { id: post.dataValues.userId } });
    if (user) {
      results.push({
        ...post.dataValues,
        username: user.fullName,
        profilePic: user.picture,
      });
    }
  }

  ctx.response.body = results;
};

const saveFileInBucket = async (file, fileName) => {
  try {
    const bucket = storage.bucket();
    const data = fs.readFileSync(file.filepath);

    await bucket.file(fileName).save(data);
  } catch (e) {
    console.error("New Post could not be saved!", e);
  }
};
const createFileName = (file, postId, userId) => {
  const originalName = file.originalFilename.split(".")[0];
  const ext = file.originalFilename.split(".")[1];
  return postId + "_" + userId + "_" + originalName + "." + ext;
};

const addPost = async (ctx, next) => {
  const { imageUrl, message, userId } = ctx.request.body;

  const newPost = await Posts.create({
    imageUrl,
    uploadedImage: null,
    uploadedVideo: null,
    message,
    userId,
  });

  if (!_.isEmpty(ctx.request.files )) {
    let fileName = "default";
    let file = null;
    if (ctx.request.files.uploadedImage) {
      file = ctx.request.files.uploadedImage;
      fileName = createFileName(file, newPost.id, userId);

      await saveFileInBucket(file, fileName);

      newPost.uploadedImage = fileName;
      await newPost.save();
    } else {
      file = ctx.request.files.uploadedVideo;
      fileName = createFileName(file, newPost.id, userId);

      await saveFileInBucket(file, fileName);
      newPost.uploadedVideo = fileName;
      await newPost.save();
    }
  }

  ctx.response.status = 201;
  ctx.response.body = "Success";
};

module.exports = {
  getPosts,
  addPost,
};
