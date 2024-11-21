const mongoose = require("mongoose");
const { Schema } = mongoose;

const threadSchema = new Schema(
    {
        user_id: { type: String, required: true},
        content: { type: String, required: true},
        image_url: String,
        like: { type: Number, default: -1},
        comment: { type: Number, default: -1},
    },
    { timestamps: true }
);

module.exports = mongoose.model("Thread", threadSchema);
    