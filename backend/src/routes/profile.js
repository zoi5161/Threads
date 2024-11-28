const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');

router.post('/', profileController.getAccountInfor);
router.put('/update_infor', profileController.updateProfile);


module.exports = router;