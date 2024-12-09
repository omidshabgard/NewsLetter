const express = require('express');
const { signup, signin, getUserInfo } = require('../controllers/userController');
const { validateSignup, validateSignin } = require('../utils/validate');
const auth = require('../middlewares/auth');

const router = express.Router();

// Public routes
router.post('/signup', validateSignup, signup);
router.post('/signin', validateSignin, signin);

// Protected routes
router.get('/me', auth, getUserInfo);

module.exports = router;
