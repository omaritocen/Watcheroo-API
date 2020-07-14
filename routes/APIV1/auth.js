const express = require('express');
const router = express.Router();

const { signUp, login, getMe } = require('../../controller/authController');
const validBody = require('../../middleware/validBody');
const auth = require('../../middleware/auth');

router.post('/signup', validBody('createUser'), signUp);
router.post('/login', validBody('loginUser'), login);
router.get('/me', auth, getMe);

module.exports = router;
