const mongoose = require("mongoose");

const themesSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: [1, "Title should be at least 1 characters"],
    required: true,
  },
  genre: {
    type: String,
    minLength: [3, "Genre should be at least 3 characters"],
    required: true,
  },
  author: {
    type: String,
    minLength: [2, "Author name should be at least 2 characters"],
    required: true,
  },
  image: {
    type: String,
    match: [/^https?:\/\//, "Invalid image url"],
    required: true,
  },
  description: {
    type: String,
    minLength: [10, "Description should be at least 10 characters"],
    required: true,
  },
  reviewedList: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  createdAt: Date,
});

themesSchema.pre("save", function () {
  if (!this.createdAt) {
    this.createdAt = Date.now();
  }
});

const Themes = mongoose.model("Themes", themesSchema);

module.exports = Themes;
