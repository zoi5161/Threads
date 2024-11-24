const express = require('express');
const router = express.Router();
const threadActionController = require('../controllers/thread_action');

router.post('/like', threadActionController.likeThread);

router.post('/unlike', threadActionController.unlikeThread);

router.post('/check_like', threadActionController.checkLikeStatus);

module.exports = router;