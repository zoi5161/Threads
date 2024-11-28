const express = require('express');
const router = express.Router();

const threadRoutes = require('./thread');
const imageRoutes = require('./image');
const threadActionRoutes = require('./thread_action');
const accountRoutes = require('./account');

const profileRoutes = require('./profile');

router.use('/thread', threadRoutes);
router.use('/image', imageRoutes);
router.use('/thread_action', threadActionRoutes);
router.use('/account', accountRoutes);
router.use('/profile', profileRoutes);

module.exports = router;
