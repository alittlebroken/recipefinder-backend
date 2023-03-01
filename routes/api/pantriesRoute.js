/* Import any needed modules */
require('dotenv').config();

const express = require('express');
const router = express.Router();
const { checkRoles, checkToken } = require('../../middlewares/verifyMiddleware');
const { setQueryOpts } = require('../../middlewares/queriesMiddleware')

const pantriesController = require('../../controllers/pantriesController');

router.get(
    '/', 
    checkToken, 
    checkRoles(['Admin']),
    setQueryOpts,
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