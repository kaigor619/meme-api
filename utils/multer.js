const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const { cloudinary } = require("./cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storageMemes = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: (req, file) => {
      switch (file.fieldname) {
        case "canvas_img":
          return "memes_images";
        case "canvas_background_img":
          return "canvas_backgrounds";
        default:
          return "elements_image";
      }
    },
    // format: async (req, file) => "png", // supports promises as well
    public_id: (req, file) => uuidv4(),
  },
  //   folder: async (req, file, cb) => {
  //     if (file.fieldname === "elements_binary_img") {
  //       cb(null, "elements_image");
  //     }
  //     if (file.fieldname === "canvas_binary_img") {
  //       cb(null, "elements_image");
  //     }
  //   },
  //   allowedFormats: ["jpg", "png"],
  //   filename: (req, file, cb) => {
  //     cb(null, uuidv4());
  //   },
});

const addMemes = multer({ storage: storageMemes });

module.exports = { addMemes };
