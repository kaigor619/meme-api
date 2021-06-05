const { Schema, model } = require("mongoose");

const meme = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: String,
  canvas: Object,
  elements: [Object],
});

module.exports = model("Meme", meme);
