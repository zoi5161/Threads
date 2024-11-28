const express = require('express');
const router = express.Router();
const threadController = require('../controllers/thread');

router.post('/', threadController.createThread);

router.get('/', threadController.getAllThreads);

router.get('/all', threadController.getAllThreads);

router.get('/newest', threadController.getNewestThreads);

router.get('/reply', threadController.getReplyThreads);

router.get('/like', threadController.getLikeThreads);

router.get('/comment', threadController.getCommentThreads);

router.get('/user/:user_id', threadController.getThreadByUser);

router.get('/liked', threadController.getLikedThreads);

router.get('/commented', threadController.getCommentedThreads);

router.post('/comment', threadController.createComment);

router.get('/comment/:thread_id', threadController.getComment);

router.get('/:thread_id', threadController.getThread);


module.exports = router;
