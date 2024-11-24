const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');

router.post('/', profileController.getAccountInfor);


module.exports = router;