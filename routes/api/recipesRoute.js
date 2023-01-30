/* Import any needed modules */
require('dotenv').config();
const { checkRoles, checkToken } = require('../../middlewares/verifyMiddleware');

const express = require('express');
const router = express.Router();
const passport = require('passport');

const recipesController = require('../../controllers/recipesController');

router.get('/',checkToken, recipesController.listAll);
router.get('/:id',checkToken, recipesController.list);
router.get('/:id/ingredients',checkToken, recipesController.listRecipeIngredients);
router.get('/:id/steps',checkToken, recipesController.listRecipeSteps);
router.get('/:id/categories',checkToken, recipesController.listRecipeCategories);
router.post('/',checkToken, recipesController.create);
router.post('/:id/ingredients',checkToken, recipesController.addRecipeIngredients);
router.post('/:id/steps',checkToken, recipesController.addRecipeSteps);
router.post('/:id/categories',checkToken, recipesController.addRecipeCategories);
router.delete('/',checkToken, checkRoles(['Admin']), recipesController.removeAll);
router.delete('/:id',checkToken, recipesController.remove);
router.delete('/:id/ingredients',checkToken, recipesController.removeRecipeIngredients);
router.delete('/:id/steps',checkToken, recipesController.removeRecipeSteps);
router.delete('/:id/categories',checkToken, recipesController.removeRecipeCategories);
router.put('/:id',checkToken, recipesController.update);

/* Future API expansion
router.get('/:id/comments', recipesController.listRecipeComments);
router.delete('/:id/comments', recipesController.removeRecipeComments);
router.post('/:id/comments', recipesController.addRecipeComments);
router.get('/:id/steps', recipesController.listRecipeSteps);
*/

module.exports = router;