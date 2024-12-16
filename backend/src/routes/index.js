const express = require('express');
const router = express.Router();

const threadRoutes = require('./thread');
const imageRoutes = require('./image');
const threadActionRoutes = require('./thread_action');
const accountRoutes = require('./account');
const gmailRoutes = require('./gmail');
const profileRoutes = require('./profile');
const notiRoutes = require('./noti');

const { authMiddleware } = require("../controllers/account");

router.use('/thread', threadRoutes);
router.use('/image', imageRoutes);
router.use('/thread_action', authMiddleware, threadActionRoutes);
router.use('/account', accountRoutes);
router.use('/profile', profileRoutes);
router.use('/gmail', gmailRoutes);
router.use('/noti', authMiddleware, notiRoutes);

module.exports = router;
