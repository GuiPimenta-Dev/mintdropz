import { Options, diskStorage } from "multer";
import { resolve } from "path";
import { randomBytes } from "crypto";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import path from "path";

// export const multerConfig = {
//   dest: resolve(__dirname, "..", "..", "uploads"),
//   storage: diskStorage({
//     destination: (request, file, callback) => {
//       callback(null, resolve(__dirname, "..", "..", "uploads"));
//     },
//     filename: (request, file, callback) => {
//       randomBytes(16, (error, hash) => {
//         if (error) {
//           callback(error, file.filename);
//         }
//         const key = `${hash.toString("hex")}.png`;
//         callback(null, key);
//       });
//     },
//   }),
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB
//   },
//   fileFilter: (request, file, callback) => {
//     const formats = ["image/jpeg", "image/jpg", "image/png"];

//     if (formats.includes(file.mimetype)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Format not accepted"));
//     }
//   },
// } as Options;

const storageTypes = {
  local: diskStorage({
    destination: (request, file, callback) => {
      callback(null, resolve(__dirname, "..", "..", "uploads"));
    },
    filename: (request, file, callback) => {
      randomBytes(16, (error, hash) => {
        if (error) {
          callback(error, file.filename);
        }
        const filename = `${hash.toString("hex")}-${file.originalname}`;
        callback(null, filename);
      });
    },
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    filename: (req, file, cb) => {
      randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),
};

export default {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  },
};
