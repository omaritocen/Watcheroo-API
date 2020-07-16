const express = require('express');
const router = express.Router();

const { getMe, updateProfile } = require('../../controller/profileController');

const validBody = require('../../middleware/validBody');

router.route('/').get(getMe).put(validBody('updateProfile'), updateProfile);

module.exports = router;
