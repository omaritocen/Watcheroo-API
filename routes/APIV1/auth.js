const express = require('express');
const router = express.Router();

const { signUp } = require('../../controller/authController');
const validBody = require('../../middleware/validBody');

router.post('/signup', validBody('createUser'), signUp);

module.exports = router;
