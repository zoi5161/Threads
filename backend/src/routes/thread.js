const express = require('express');
const router = express.Router();
const threadController = require('../controllers/thread');

router.post('/', threadController.createThread);

router.get('/:thread_id', threadController.getThread);

router.get('/', threadController.getAllThreads);

module.exports = router;