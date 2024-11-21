const express = require('express');
const router = express.Router();

const threadRoutes = require('./thread');
const imageRoutes = require('./image');
const threadActionRoutes = require('./thread_action');


router.use('/thread', threadRoutes);
router.use('/image', imageRoutes);
router.use('/thread_action', threadActionRoutes);

module.exports = router;
