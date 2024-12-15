const express = require('express');
const gmailController = require('../controllers/gmail');
const router = express.Router();

router.post('/sendcode', gmailController.sendVerificationEmail);
router.post('/sendcode-reset', gmailController.sendVerificationEmail_ResetPass);
router.post('/verifycode', gmailController.verifyCode);
router.post('/verifycode-reset', gmailController.verifyCode_ResetPass);

module.exports = router;