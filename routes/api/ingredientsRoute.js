// Import modules to be used
require('dotenv').config();
const { checkRoles, checkToken } = require('../../middlewares/verifyMiddleware');
const { setQueryOpts } = require('../../middlewares/queriesMiddleware');

const ingredientsController = require('../../controllers/ingredientsController');

const uploadFiles = require('../../config/multer')

const express = require('express');
const router = express.Router();
const passport = require('passport');

// Specify each route and which controllers they will use
router.get('/', setQueryOpts, ingredientsController.get);
router.get('/:id', checkToken, ingredientsController.getById);
router.post('/', checkToken, uploadFiles, ingredientsController.create);
router.delete('/', checkToken, checkRoles(['Admin']),ingredientsController.remove);
router.delete('/:id', checkToken, ingredientsController.removeById);
router.put('/:id', checkToken, uploadFiles, ingredientsController.update);

module.exports = router;
