const mongoose = require("mongoose");
const aws = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const s3 = new aws.S3();

const Post = new mongoose.Schema({
  name: String,
  size: Number,
  filename: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

Post.pre("save", function () {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.filename}`;
  }
});

Post.pre("remove", function () {
  if (process.env.STORAGE_TYPE === "s3") {
    return s3
      .deleteObject({
        Bucket: process.env.BUCKET_NAME,
        Key: this.filename,
      })
      .promise()
      .then((response) => {
        console.log(response.status);
      })
      .catch((response) => {
        console.log(response.status);
      });
  } else {
    return promisify(fs.unlink)(
      path.resolve(__dirname, "..", "..", "tmp", "uploads", this.filename)
    );
  }
});

module.exports = mongoose.model("Upload", Post);
