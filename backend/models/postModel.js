const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        max: 500
    },
    image: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Post", PostSchema);

