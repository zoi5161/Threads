const express = require('express');
const router = express.Router();

const threadRoutes = require('./thread');

// Correctly use threadRoutes as middleware
router.use('/thread', threadRoutes);

module.exports = router;
