/* Import any needed modules */
require('dotenv').config();
const appLogger = require('../../config/winston');

const express = require('express');
const router = express.Router();

const searchController = require('../../controllers/searchController');

router.post('/search', searchController.performSearch);

module.exports = router;