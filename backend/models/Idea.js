const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    creator: {
      type: String,
      required: true,
    },

    // SOLD STATUS
    sold: {
      type: Boolean,
      default: false,
    },

    // WHO PURCHASED THE IDEA
    purchasedBy: {
      type: String,
      default: "",
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Idea", ideaSchema);