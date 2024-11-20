const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    full_name: { type: String, required: true },
    tag: { type: String, required: true },
    bio: String,
    avt_url: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);