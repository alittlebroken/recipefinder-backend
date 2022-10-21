// Import modules to be used
require('dotenv').config();
const appLogger = require('../../config/winston');

const ingredientsController = require('../../controllers/ingredientsController');

const express = require('express');
const router = express.Router();

// Specify each route and which controllers they will use
router.get('/', ingredientsController.get);
router.get('/:id', ingredientsController.getById);
router.post('/', ingredientsController.create);
router.delete('/', ingredientsController.remove);
router.delete('/:id', ingredientsController.removeById);
router.put('/:id', ingredientsController.update);

module.exports = router;
