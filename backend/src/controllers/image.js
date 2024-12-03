const imageService = require('../services/image');

// Handle Image Upload
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Extract file buffer and MIME type
        const image_data = req.file.buffer;
        const mime_type = req.file.mimetype;

        // Upload the image data to the service
        const image = await imageService.uploadImage(image_data, mime_type);
        res.status(201).json({
            message: "Image uploaded successfully",
            imageId: image._id, // Return image ID for reference
            media_type: image.mime_type
        });
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

// Handle Image Retrieval
const getImage = async (req, res) => {
    const { image_id } = req.params;
    try {
        const image = await imageService.getImage(image_id);
        
        // Dynamically set MIME type based on the stored data
        const { mime_type, image_data } = image;

        // Set the correct MIME type for the response
        res.contentType(mime_type);

        // Send the image/video data as raw bytes
        res.send(image_data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    uploadImage,
    getImage
};
