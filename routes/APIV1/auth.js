const express = require('express');
const router = express.Router();

const { signUp, login, logout, getMe } = require('../../controller/authController');
const validBody = require('../../middleware/validBody');
const auth = require('../../middleware/auth');

router.post('/signup', validBody('createUser'), signUp);
router.post('/login', validBody('loginUser'), login);
router.post('/logout', auth, logout);
router.get('/me', auth, getMe);

module.exports = router;
