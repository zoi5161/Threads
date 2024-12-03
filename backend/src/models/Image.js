const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new Schema(
    {
        image_data: { type: Buffer, required: true },
        mime_type: { type: String, required: true }, // Save MIME type
    },
    { timestamps: true }
);

module.exports = mongoose.model("Image", imageSchema);
