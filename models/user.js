const { Schema, model } = require("mongoose");

const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatarUrl: String,

  memes: [
    {
      memeId: {
        type: Schema.Types.ObjectId,
        ref: "Meme",
        required: true,
      },
    },
  ],
});

// Добавить в корзину
// user.methods.addToCart = function (courseId) {
//   let copy_items = [...this.cart.items];

//   let idx = copy_items.findIndex((c) => c.courseId.toString() == courseId);

//   if (idx > -1) {
//     copy_items[idx].count += 1;
//   } else {
//     copy_items.push({ count: 1, courseId });
//   }

//   this.cart.items = copy_items;
//   return this.save();
// };

module.exports = model("User", user);
