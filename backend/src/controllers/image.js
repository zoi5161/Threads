const imageService = require('../services/image');

const uploadImage = async (req, res) => {
    try {
        const image = await imageService.uploadImage(req.file.buffer);
        res.status(201).json(image);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

const getImage = async (req, res) => {
    const { image_id } = req.params;
    try {
        const image = await imageService.getImage(image_id);
        res.contentType("image/png"); // Set appropriate MIME type for the image
        res.send(image); // Send the raw image data
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    uploadImage,
    getImage
};