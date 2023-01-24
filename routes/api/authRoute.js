/* Import any needed modules */
require('dotenv').config();
const appLogger = require('../../config/winston');

const express = require('express');
const router = express.Router();

const authController = require('../../controllers/authController');

router.post('/login', authController.loginUser);
router.post('/register', authController.createUser);

router.post('/refresh-token', authController.refreshToken);
router.delete('/refresh-token', authController.removeToken);

/*
 * TODO /logout
 * router.post('/logout', authController/logoutUser);
 */

module.exports = router;