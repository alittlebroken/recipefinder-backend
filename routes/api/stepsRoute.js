/* Import any needed modules */
require('dotenv').config();
const appLogger = require('../../config/winston');

const express = require('express');
const router = express.Router();
const passport = require('passport');

const stepsController = require('../../controllers/stepsController');

router.get(
    '/', 
    passport.authenticate('jwt', { session: false }),
    stepsController.find
    );

router.get(
    '/:id', 
    passport.authenticate('jwt', { session: false }),
    stepsController.findById
    );

router.post(
    '/', 
    passport.authenticate('jwt', { session: false }),
    stepsController.create
    );

router.delete(
    '/', 
    passport.authenticate('jwt', { session: false }),
    stepsController.removeAll
    );

router.delete(
    '/:id', 
    passport.authenticate('jwt', { session: false }),
    stepsController.removeById
    );

router.put(
    '/:id', 
    passport.authenticate('jwt', { session: false }),
    stepsController.update
    );

module.exports = router;