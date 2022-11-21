/* Import any needed modules */
require('dotenv').config();
const appLogger = require('../../config/winston');

const express = require('express');
const router = express.Router();

const authController = require('../../controllers/authController');

router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);
router.post('/register', authController.createUser);

module.exports = router;