const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    user_id: String,
    user_name: {type: String, required: true},
    full_name: { type: String, required: true},
    tag: { type: String, required: true },
    bio: String,
    avt_url: String,
    num_follow: Number,
    link_fb: String,
    follow_status: String,
    //2 mục này cho phần follow system:
    followers: [{type: String}], // mảng chứa id các user đang follow user đó
    following: [{type: String}] // mảng chứa id các user mà được người này follow
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);