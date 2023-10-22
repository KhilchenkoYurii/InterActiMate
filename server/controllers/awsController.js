const aws = require('aws-sdk');
const multer = require('multer');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError(`Not an image! Please, upload only image!`, 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadImage = upload.single('image');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const uploadFile = async function (file) {
  if (file.originalname) {
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      await s3.upload(params).promise();
    } catch (error) {
      console.error(error);
      return new AppError('Error uploading file to S3!', 500);
    }
  } else {
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: process.env.S3_BUCKET,
      Key: file.name,
    };
    try {
      await s3.putObject(params).promise();
    } catch (error) {
      console.error(error);
      return new AppError('Error uploading file to S3!', 500);
    }
  }
};

exports.uploadFile = uploadFile;

exports.getFileURL = catchAsync(async (req, res, next) => {
  if (req.file) {
    uploadFile(req.file);
  }
  res.status(200).json({
    status: 'success',
    data: {
      url: `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${req.file.originalname}`,
    },
  });
  next();
});
