const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeThreadSchema = new Schema(
    {
        thread_id: { type: String, required: true, primaryKey: true },
        user_id: { type: Array, default: [] },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Like_Thread", likeThreadSchema);