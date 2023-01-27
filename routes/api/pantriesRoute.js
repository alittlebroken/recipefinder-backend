/* Import any needed modules */
require('dotenv').config();

const express = require('express');
const router = express.Router();
const passport = require('passport');
const { checkRoles, checkToken } = require('../../middlewares/verifyMiddleware');

const pantriesController = require('../../controllers/pantriesController');

router.get(
    '/', 
    checkToken, 
    checkRoles(['Admin']),
    pantriesController.listAll);
router.get(
    '/:id', 
    checkToken, 
    pantriesController.list);
router.post(
    '/', 
    checkToken, 
    checkRoles(['Admin']),
    pantriesController.create);
router.post(
    '/:pantryId', 
    checkToken, 
    pantriesController.add);
router.delete(
    '/', 
    checkToken, 
    checkRoles(['Admin']),
    pantriesController.removeAll);
router.delete(
    '/:pantryId', 
    checkToken, 
    pantriesController.removeItems);
router.put(
    '/:id', 
    checkToken, 
    pantriesController.update);

module.exports = router;