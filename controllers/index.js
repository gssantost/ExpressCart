const express = require('express');
let router = express.Router();

router.use('/join', require('./join'));
router.use('/session', require('./session'));
router.use('/products', require('./products'));
router.use('/purchase', require('./purchase'));
router.use('/show', require('./show'));

module.exports = router;