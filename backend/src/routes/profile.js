const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');
const { authMiddleware } = require("../controllers/account");

router.post('/', profileController.getAccountInfor);
router.put('/update_infor', authMiddleware, profileController.updateProfile);


module.exports = router;