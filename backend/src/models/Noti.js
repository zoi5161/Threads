const mongoose = require("mongoose");
const { Schema } = mongoose;

const notiSchema = new Schema(
    {
        user_id: { type: String, required: true },
        post_id: { type: String, default: "" },
        user_make_noti: { type: String, required: true },
        type: { type: String, required: true },
        msg: { type: String, required: true },
        seen: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Noti", notiSchema);