const multer = require('multer');
const sharp = require('sharp');

const Post = require('../models/postModel');
const User = require('../models/userModel');
const PostStatuses = require('../configs/postStatuses');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError(`Not an image! Please, upload only image!`, 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadPostImages = upload.fields([
  {
    name: 'images',
    maxCount: 5,
  },
]);

exports.resizePostPhotos = catchAsync(async (req, res, next) => {
  if (!req.files) return next();
  req.body.attachments = [];
  await Promise.all(
    req.files.images.map(async (image, i) => {
      const filename = `server/public/img/posts/post-${
        req.params.id
      }-${Date.now()}-${i + 1}.jpeg`;
      await sharp(image.buffer)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`${filename}`);
      req.body.attachments.push({
        alt: `image for post ${req.params.id}`,
        address: filename,
      });
    }),
  );

  next();
});

exports.getAllPosts = catchAsync(async (req, res) => {
  const features = new APIFeatures(Post.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();
  const posts = await features.query;
  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: {
      posts,
    },
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({
    $or: [{ postId: req.params.id }, { _id: req.params.id }],
  });
  if (!post) {
    return next(new AppError(`No post found with id ${req.params.id}`, 404));
  }
  const postOwner = await User.findOne({ userId: post.owner });
  if (!postOwner) {
    return next(
      new AppError(`No user found with id ${req.params.userId}`, 404),
    );
  }
  let ownerData;
  if (postOwner.showOnlyNickname) {
    ownerData = {
      userId: postOwner.userId,
      nickname: postOwner.nickname,
      bio: postOwner.bio,
      createdPosts: postOwner.createdPosts,
      phone: postOwner.phone,
      email: postOwner.email,
    };
  } else {
    ownerData = {
      userId: postOwner.userId,
      nickname: postOwner.nickname,
      name: postOwner.name,
      surname: postOwner.surname,
      bio: postOwner.bio,
      createdPosts: postOwner.createdPosts,
      phone: postOwner.phone,
      email: postOwner.email,
    };
  }
  res.status(200).json({
    status: 'success',
    data: {
      post: post,
      owner: ownerData,
    },
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  const data = req.body;
  const lastPost = await Post.find().limit(1).sort({ _id: -1 });
  const lastNumber = lastPost[0].postId.slice(3);
  data.postId = `PST${Number(lastNumber) + 1}`;
  const user = await User.findOne({ userId: req.params.id });
  data.owner = user.userId;
  data.dateOfCreation = new Date();
  const newPost = await Post.create(data);
  user.createdPosts.push(newPost.postId);
  await User.findOneAndUpdate(
    { userId: user.userId },
    { createdPosts: user.createdPosts },
  );
  res.status(201).json({
    status: 'Success',
    data: {
      post: newPost,
    },
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findOneAndUpdate(
    { postId: req.params.id },
    req.body,
    {
      new: true,
    },
  );
  if (!post) {
    return next(new AppError(`No post found with id ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

exports.answerPost = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ userId: req.body.userId });
  if (!user) {
    return next(new AppError(`No user found with id ${req.body.userId}`, 404));
  }
  if (
    user.answeredPosts.includes(req.body.postId) ||
    user.createdPosts.includes(req.body.postId)
  ) {
    return next(
      new AppError(
        `User ${req.body.userId} already answered on post ${req.body.postId} `,
        400,
      ),
    );
  }
  user.answeredPosts.push(req.body.postId);
  await User.findOneAndUpdate(
    { userId: user.userId },
    { answeredPosts: user.answeredPosts },
  );

  const post = await Post.findOne({ postId: req.body.postId });
  if (!post) {
    return next(new AppError(`No post found with id ${req.body.postId}`, 404));
  }
  if (
    post.participators.includes(req.body.userId) ||
    post.owner === req.body.userId
  ) {
    return next(
      new AppError(
        `User ${req.body.userId} already answered on post ${req.body.postId} `,
        400,
      ),
    );
  }
  post.participators.push(req.body.userId);
  await Post.findOneAndUpdate(
    { postId: post.postId },
    { participators: post.participators },
  );
  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

exports.leavePost = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ userId: req.body.userId });
  if (!user) {
    return next(new AppError(`No user found with id ${req.body.userId}`, 404));
  }
  if (user.createdPosts.includes(req.body.postId)) {
    return next(
      new AppError(`Owner can not leave created post ${req.body.postId} `, 400),
    );
  }
  if (!user.answeredPosts.includes(req.body.postId)) {
    return next(
      new AppError(
        `User ${req.body.userId} already left post ${req.body.postId} `,
        400,
      ),
    );
  }
  user.answeredPosts = user.answeredPosts.filter(
    (post) => post !== req.body.postId,
  );
  await User.findOneAndUpdate(
    { userId: user.userId },
    { answeredPosts: user.answeredPosts },
  );

  const post = await Post.findOne({ postId: req.body.postId });
  if (!post) {
    return next(new AppError(`No post found with id ${req.body.postId}`, 404));
  }
  if (post.owner === req.body.userId) {
    return next(
      new AppError(`Owner can not leave created post ${req.body.postId} `, 400),
    );
  }
  if (!post.participators.includes(req.body.userId)) {
    return next(
      new AppError(
        `User ${req.body.userId} already left post ${req.body.postId} `,
        400,
      ),
    );
  }
  post.participators = post.participators.filter(
    (usr) => usr !== req.body.userId,
  );
  await Post.findOneAndUpdate(
    { postId: post.postId },
    { participators: post.participators },
  );
  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const postUsers = await User.find({
    $or: [{ answeredPosts: req.params.id }, { createdPosts: req.params.id }],
  });
  if (!postUsers) {
    return next(new AppError(`No post found with id ${req.params.id}`, 404));
  }
  postUsers.forEach(async (user) => {
    user.answeredPosts = user.answeredPosts.filter(
      (post) => post !== req.params.id,
    );
    user.createdPosts = user.createdPosts.filter(
      (post) => post !== req.params.id,
    );
    await User.findOneAndUpdate(
      { userId: user.userId },
      { answeredPosts: user.answeredPosts, createdPosts: user.createdPosts },
      {
        new: true,
      },
    );
  });
  const post = await Post.findOneAndDelete({ postId: req.params.id });
  if (!post) {
    return next(new AppError(`No post found with id ${req.params.id}`, 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.changePostStatus = catchAsync(async (req, res, next) => {
  // eslint-disable-next-line no-prototype-builtins
  if (!PostStatuses.hasOwnProperty(req.params.status)) {
    return next(new AppError(`Incorrect status`, 400));
  }
  const post = await Post.findOneAndUpdate(
    { postId: req.params.id },
    { status: req.params.status },
    { new: true },
  );
  if (!post) {
    return next(new AppError(`No post found with id ${req.params.id}`, 404));
  }
  res.status(200).json({
    status: 'success',
    data: post,
  });
});
