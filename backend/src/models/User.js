const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    user_id: String,
    user_name: {type: String, required: true},
    full_name: { type: String, required: true },
    tag: { type: String, required: true },
    bio: String,
    avt_url: String,
    num_follow: Number,
    link_fb: String,
    follow_status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);