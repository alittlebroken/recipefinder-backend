/* Import any needed modules */
require('dotenv').config();
const appLogger = require('../../config/winston');
const { checkRoles, checkToken } = require('../../middlewares/verifyMiddleware');

const express = require('express');
const router = express.Router();

const { setQueryOpts } = require('../../middlewares/queriesMiddleware')

const searchController = require('../../controllers/searchController');

router.post('/', setQueryOpts, searchController.performSearch);
router.post('/pantry', checkToken, setQueryOpts, searchController.performPantrySearch);

module.exports = router;