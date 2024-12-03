const express = require('express');
const gmailController = require('../controllers/gmail');
const router = express.Router();

router.post('/sendcode', gmailController.sendVerificationEmail);
router.post('/verifycode', gmailController.verifyCode);

module.exports = router;