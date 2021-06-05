const { Router } = require("express");
const Meme = require("../models/meme");
const { addMemes } = require("../utils/multer");
const { cloudinary } = require("../utils/cloudinary");
const router = Router();

router.get("/", async (req, res) => {
  const allMemes = await Meme.find().select("url name");
  res.status(200).json(allMemes);
});

router.get("/backgrounds", async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "meme_templates",
    });
    const backgrounds = result.resources.map(
      ({ url, asset_id, width, height }) => ({
        url,
        id: asset_id,
        width,
        height,
      })
    );

    res.status(200).json(backgrounds);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:meme_id", async (req, res) => {
  const meme = await Meme.findById(req.params.meme_id);

  res.status(200).json(meme);
});

router.post(
  "/",
  addMemes.fields([
    { name: "elements_binary_img" },
    { name: "canvas_background_img" },
    { name: "canvas_img" },
  ]),
  (req, res) => {
    console.log("create");
    const { name, canvas, elements } = req.body;

    const { canvas_background_img, canvas_img } = req.files;

    const parsedCanvas = JSON.parse(canvas);

    if (canvas_background_img) {
      parsedCanvas.backgroundImage = canvas_background_img[0].path;
    }

    try {
      const meme = new Meme({
        name: name,
        url: canvas_img[0].path,
        canvas: parsedCanvas,
        elements: JSON.parse(elements),
      });

      meme.save();
      res.status(200).json({ msg: "ok" });
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
