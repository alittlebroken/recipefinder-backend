/* Import any needed modules */
require('dotenv').config();
const appLogger = require('../../config/winston');

const express = require('express');
const router = express.Router();

const recipesController = require('../../controllers/recipesController');

router.get('/', recipesController.listAll);
router.get('/:id', recipesController.list);
router.get('/:id/ingredients', recipesController.listRecipeIngredients);
router.get('/:id/steps', recipesController.listRecipeSteps);
router.get('/:id/categories', recipesController.listRecipeCategories);
//router.post('/', recipesController.create);
//router.post('/:id/ingredients', recipesController.addRecipeIngredients);
//router.post('/:id/steps', recipesController.addRecipeSteps);
//router.post('/:id/categories', recipesController.addRecipeCategories);
//router.delete('/', recipesController.removeAll);
//router.delete('/:id', recipesController.remove);
//router.delete('/:id/ingredients', recipesController.removeRecipeIngredients);
//router.delete('/:id/steps', recipesController.removeRecipeSteps);
//router.delete('/:id/categories', recipesController.removeRecipeCategories);
//router.put('/:id', recipesController.update);

/* Future API expansion
router.get('/:id/comments', recipesController.listRecipeComments);
router.delete('/:id/comments', recipesController.removeRecipeComments);
router.post('/:id/comments', recipesController.addRecipeComments);
router.get('/:id/steps', recipesController.listRecipeSteps);
*/

module.exports = router;