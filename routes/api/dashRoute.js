/* Import any needed modules */
require('dotenv').config();
const { checkRoles, checkToken } = require('../../middlewares/verifyMiddleware');
const { setQueryOpts } = require('../../middlewares/queriesMiddleware')


const express = require('express');
const router = express.Router();

const dashboardController = require('../../controllers/dashboardController')

router.get('/', checkToken, checkRoles(['Admin']), setQueryOpts, dashboardController.getDashboard);

module.exports = router;