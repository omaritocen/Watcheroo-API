const express = require('express');
const router = express.Router();

const home = require('./home');
const auth = require('./auth');
const profiles = require('./profiles');
const parties = require('./parties');

router.use('/', home);
router.use('/auth', auth);
router.use('/profiles', profiles);
router.use('/parties', parties)

module.exports = router;
