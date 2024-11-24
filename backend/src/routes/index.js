const express = require('express');
const router = express.Router();

const threadRoutes = require('./thread');
const imageRoutes = require('./image');
const threadActionRoutes = require('./thread_action');
const profileRoutes = require('./profile');

router.use('/thread', threadRoutes);
router.use('/image', imageRoutes);
router.use('/thread_action', threadActionRoutes);
router.use('/profile', profileRoutes);

module.exports = router;
