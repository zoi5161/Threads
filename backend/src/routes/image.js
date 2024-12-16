const express = require('express');
const router = express.Router();
const imageController = require('../controllers/image');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { authMiddleware } = require("../controllers/account");


router.post('/', authMiddleware, upload.single('image'), imageController.uploadImage);

router.get('/:image_id', imageController.getImage);

module.exports = router;