const express = require('express');
const router = express.Router();

const threadRoutes = require('./thread');
const imageRoutes = require('./image');


router.use('/thread', threadRoutes);
router.use('/image', imageRoutes);

module.exports = router;
