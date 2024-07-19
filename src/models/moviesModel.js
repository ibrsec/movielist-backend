const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    user_id: {
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"User"
    },
    movieTitle: {
      type: String,
      trim: true,
      required: [true, "movieTitle is a requried field!"],
      maxLength: 50,
    },
    year: {
      type: Number,
      required: [true, "year is a required field!"],
      validate: (year) => String(year).length == 4,
    },
    image: {
      type: String,
      trim: true,
      required: [true, "image is a required field!"],
      validate: (image) => {
        console.log("validate");
        return image.startsWith("https://") || image.startsWith("http://");
      },
    },
  },
  {
    collection: "movies",
    timestamps: true,
  }
);

module.exports.Movie = mongoose.model("Movie", MovieSchema);
