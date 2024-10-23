const express = require('express');
const router = express.Router();

const testRoutes = require('./test');

router.use('/test', testRoutes);
// router.use('/test2', testRoutes);



module.exports = router;