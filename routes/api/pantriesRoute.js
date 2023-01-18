/* Import any needed modules */
require('dotenv').config();

const express = require('express');
const router = express.Router();
const passport = require('passport');
const { checkRoles } = require('../../middlewares/verifyMiddleware');

const pantriesController = require('../../controllers/pantriesController');

router.get(
    '/', 
    passport.authenticate('jwt', { session: false }), 
    checkRoles(['Admin']),
    pantriesController.listAll);
router.get(
    '/:id', 
    passport.authenticate('jwt', { session: false }), 
    pantriesController.list);
router.post(
    '/', 
    passport.authenticate('jwt', { session: false }), 
    checkRoles(['Admin']),
    pantriesController.create);
router.post(
    '/:pantryId', 
    passport.authenticate('jwt', { session: false }), 
    pantriesController.add);
router.delete(
    '/', 
    passport.authenticate('jwt', { session: false }), 
    checkRoles(['Admin']),
    pantriesController.removeAll);
router.delete(
    '/:pantryId', 
    passport.authenticate('jwt', { session: false }), 
    pantriesController.removeItems);
router.put(
    '/:id', 
    passport.authenticate('jwt', { session: false }), 
    pantriesController.update);

module.exports = router;