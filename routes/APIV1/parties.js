const express = require('express');
const router = express.Router();

const { createParty } = require('../../controller/partyController');

const auth = require('../../middleware/auth');
const validBody = require('../../middleware/validBody');

router.use(auth);

router.route('/').post(validBody('createParty') ,createParty);

module.exports = router;
