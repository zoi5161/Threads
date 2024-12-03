const Image = require("../models/Image");

const uploadImage = async (image_data, mime_type) => {
    const image = new Image({
        image_data,
        mime_type, // Save MIME type along with image data
    });
    return await image.save();
};

const getImage = async (image_id) => {
    const image = await Image.findById(image_id).select("image_data mime_type");
    if (!image) {
        throw new Error("Image not found");
    }
    return image; // Return the full image document with data and mime_type
};

module.exports = {
    uploadImage,
    getImage
};
