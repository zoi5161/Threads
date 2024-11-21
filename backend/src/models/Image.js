const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new Schema(
    {
        image_data: { type: Buffer, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Image", imageSchema);