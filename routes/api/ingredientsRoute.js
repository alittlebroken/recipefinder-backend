// Import modules to be used
require('dotenv').config();
const appLogger = require('../../config/winston');

const ingredientsController = require('../../controllers/ingredientsController');

const express = require('express');
const router = express.Router();

// Specify each route and which controllers they will use
router.get('/', passport.authenticate('jwt', { session: false }), ingredientsController.get);
router.get('/:id', passport.authenticate('jwt', { session: false }), ingredientsController.getById);
router.post('/', passport.authenticate('jwt', { session: false }), ingredientsController.create);
router.delete('/', passport.authenticate('jwt', { session: false }), ingredientsController.remove);
router.delete('/:id', passport.authenticate('jwt', { session: false }), ingredientsController.removeById);
router.put('/:id', passport.authenticate('jwt', { session: false }), ingredientsController.update);

module.exports = router;
