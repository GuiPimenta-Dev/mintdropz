import UploadSchema from "../../schemas/upload";
import fs from "fs";

export class UploadImageService {
  async execute(files) {
    if (!files) {
      throw new Error("You need to upload a file.");
    }

    let imgArray = files.map((file) => {
      let img = fs.readFileSync(file.path);

      return img.toString("base64");
    });

    let result = imgArray.map((src, index) => {
      let finalImg = {
        filename: files[index].originalname,
        contentType: files[index].mimetype,
        imageBase64: src,
      };

      let newUpload = new UploadSchema(finalImg);

      return newUpload
        .save()
        .then(() => {
          return {
            msg: `${files[index].originalname} Uploaded Successfully...!`,
          };
        })
        .catch((error) => {
          if (error) {
            if (error.name === "MongoError" && error.code === 11000) {
              return Promise.reject({
                error: `Duplicate ${files[index].originalname}. File Already exists! `,
              });
            }
            return Promise.reject({
              error:
                error.message ||
                `Cannot Upload ${files[index].originalname} Something Missing!`,
            });
          }
        });
    });
    Promise.all(result)
      .then((msg) => {
        return;
      })
      .catch(() => {
        throw new Error(`Error uploading the files`);
      });
  }
}
