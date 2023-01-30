// Import modules to be used
require('dotenv').config();
const { checkRoles, checkToken } = require('../../middlewares/verifyMiddleware');

const ingredientsController = require('../../controllers/ingredientsController');

const express = require('express');
const router = express.Router();
const passport = require('passport');

// Specify each route and which controllers they will use
router.get('/', checkToken, checkRoles(['Admin']),ingredientsController.get);
router.get('/:id', checkToken, ingredientsController.getById);
router.post('/', checkToken, ingredientsController.create);
router.delete('/', checkToken, checkRoles(['Admin']),ingredientsController.remove);
router.delete('/:id', checkToken, ingredientsController.removeById);
router.put('/:id', checkToken, ingredientsController.update);

module.exports = router;
