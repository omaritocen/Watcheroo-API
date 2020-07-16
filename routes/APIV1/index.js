const express = require('express');
const router = express.Router();

const authetnicate = require('../../middleware/auth');

const home = require('./home');
const auth = require('./auth');
const profiles = require('./profiles');

router.use('/', home);
router.use('/auth', auth);
router.use('/profiles', authetnicate, profiles);

module.exports = router;
