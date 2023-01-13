/* Require needed modules */
require('dotenv').config();

const express = require('express');
const router = express.Router();
const passport = require('passport');

const cookbookController = require('../../controllers/cookbookController');

  /* Add the various routes */
router.get('/', passport.authenticate('jwt', { session: false }), cookbookController.list);
router.get('/:id', passport.authenticate('jwt', { session: false }), cookbookController.getById);
router.get('/:id/recipes', passport.authenticate('jwt', { session: false }), cookbookController.recipes);
router.get('/:id/category', passport.authenticate('jwt', { session: false }), cookbookController.getCategories);
router.post('/', passport.authenticate('jwt', { session: false }), cookbookController.create);
router.post('/:id/recipe', passport.authenticate('jwt', { session: false }), cookbookController.addRecipe);
router.post('/:id/category', passport.authenticate('jwt', { session: false }), cookbookController.addCategory);
router.delete('/', passport.authenticate('jwt', { session: false }), cookbookController.removeAll);
router.delete('/:id', passport.authenticate('jwt', { session: false }), cookbookController.removeById);
router.delete('/:id/recipes', passport.authenticate('jwt', { session: false }), cookbookController.removeRecipes);
router.delete('/:id/categories', passport.authenticate('jwt', { session: false }), cookbookController.removeCategories);
router.put('/', passport.authenticate('jwt', { session: false }), cookbookController.update);

module.exports = router;
