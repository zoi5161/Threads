const express = require('express');
const router = express.Router();
const threadController = require('../controllers/thread');
const { authMiddleware } = require("../controllers/account");


router.post('/', authMiddleware, threadController.createThread);

router.get('/', threadController.getAllThreads);

router.get('/all', threadController.getAllThreads);

router.get('/newest', threadController.getNewestThreads);

router.get('/reply', threadController.getReplyThreads);

router.get('/like', threadController.getLikeThreads);

router.get('/comment', threadController.getCommentThreads);

router.get('/user/:user_id', threadController.getThreadByUser);

router.get('/liked', authMiddleware, threadController.getLikedThreads);

router.get('/commented', authMiddleware, threadController.getCommentedThreads);

router.post('/comment', authMiddleware, threadController.createComment);

router.get('/comment/:thread_id', threadController.getComment);

router.get('/:thread_id', threadController.getThread);

router.get('/likeOfThread/:thread_id', threadController.getLikePost);


module.exports = router;
