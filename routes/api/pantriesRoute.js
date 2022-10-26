/* Import any needed modules */
require('dotenv').config();
const appLogger = require('../../config/winston');

const express = require('express');
const router = express.Router();

const pantriesController = require('../controllers/pantriesController');



module.exports = router;