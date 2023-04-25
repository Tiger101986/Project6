const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

/**
 * signup router
 * login router 
 */
router.post('/signup', userController.signUp);
router.post('/login', userController.logIn);

module.exports = router;