/* Import any needed modules */
require('dotenv').config();
const appLogger = require('../../config/winston');

const express = require('express');
const router = express.Router();
const passport = require('passport');

const recipesController = require('../../controllers/recipesController');

router.get('/',passport.authenticate('jwt', { session: false }), recipesController.listAll);
router.get('/:id',passport.authenticate('jwt', { session: false }), recipesController.list);
router.get('/:id/ingredients',passport.authenticate('jwt', { session: false }), recipesController.listRecipeIngredients);
router.get('/:id/steps',passport.authenticate('jwt', { session: false }), recipesController.listRecipeSteps);
router.get('/:id/categories',passport.authenticate('jwt', { session: false }), recipesController.listRecipeCategories);
router.post('/',passport.authenticate('jwt', { session: false }), recipesController.create);
router.post('/:id/ingredients',passport.authenticate('jwt', { session: false }), recipesController.addRecipeIngredients);
router.post('/:id/steps',passport.authenticate('jwt', { session: false }), recipesController.addRecipeSteps);
router.post('/:id/categories',passport.authenticate('jwt', { session: false }), recipesController.addRecipeCategories);
router.delete('/',passport.authenticate('jwt', { session: false }), recipesController.removeAll);
router.delete('/:id',passport.authenticate('jwt', { session: false }), recipesController.remove);
router.delete('/:id/ingredients',passport.authenticate('jwt', { session: false }), recipesController.removeRecipeIngredients);
router.delete('/:id/steps',passport.authenticate('jwt', { session: false }), recipesController.removeRecipeSteps);
router.delete('/:id/categories',passport.authenticate('jwt', { session: false }), recipesController.removeRecipeCategories);
router.put('/:id',passport.authenticate('jwt', { session: false }), recipesController.update);

/* Future API expansion
router.get('/:id/comments', recipesController.listRecipeComments);
router.delete('/:id/comments', recipesController.removeRecipeComments);
router.post('/:id/comments', recipesController.addRecipeComments);
router.get('/:id/steps', recipesController.listRecipeSteps);
*/

module.exports = router;