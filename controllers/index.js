const express = require('express');
let router = express.Router();

router.use('/join', require('./join'));
router.use('/session', require('./session'));

module.exports = router;