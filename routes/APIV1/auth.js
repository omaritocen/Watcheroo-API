const express = require('express');
const router = express.Router();

const { signUp, login } = require('../../controller/authController');
const validBody = require('../../middleware/validBody');

router.post('/signup', validBody('createUser'), signUp);
router.post('/login', validBody('loginUser'), login);

module.exports = router;
