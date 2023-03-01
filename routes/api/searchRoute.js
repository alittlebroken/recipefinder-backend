/* Import any needed modules */
require('dotenv').config();
const appLogger = require('../../config/winston');

const express = require('express');
const router = express.Router();

const { setQueryOpts } = require('../../middlewares/queriesMiddleware')

const searchController = require('../../controllers/searchController');

router.post('/', setQueryOpts, searchController.performSearch);

module.exports = router;