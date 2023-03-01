/* Import any needed modules */
require('dotenv').config();

const express = require('express');
const router = express.Router();
const passport = require('passport');

const { checkRoles, checkToken } = require('../../middlewares/verifyMiddleware');
const { setQueryOpts } = require('../../middlewares/queriesMiddleware')

const stepsController = require('../../controllers/stepsController');

router.get(
    '/', 
    checkToken,
    checkRoles(['Admin']),
    setQueryOpts,
    stepsController.find
    );

router.get(
    '/:id', 
    checkToken,
    stepsController.findById
    );

router.post(
    '/', 
    checkToken,
    stepsController.create
    );

router.delete(
    '/', 
    checkToken,
    checkRoles(['Admin']),
    stepsController.removeAll
    );

router.delete(
    '/:id', 
    checkToken,
    stepsController.removeById
    );

router.put(
    '/:id', 
    checkToken,
    stepsController.update
    );

module.exports = router;