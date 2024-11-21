const Image = require("../models/Image");

const uploadImage = async(image_data) => {
    const image = new Image({
        image_data
    });
    return await image.save();
};

const getImage = async (image_id) => {
    const image = await Image.findById(image_id).select("image_data");
    if (!image) {
      throw new Error("Image not found");
    }
    const binaryData = Buffer.from(image.image_data, "base64");
    return binaryData;
  };
  

module.exports = {
    uploadImage,
    getImage
};