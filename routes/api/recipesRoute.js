/* Import any needed modules */
require('dotenv').config();
const { checkRoles, checkToken } = require('../../middlewares/verifyMiddleware');
const { setQueryOpts } = require('../../middlewares/queriesMiddleware')

const express = require('express');
const router = express.Router();
const passport = require('passport');

const recipesController = require('../../controllers/recipesController');

const uploadFiles = require('../../config/multer')

//router.get('/',checkToken, setQueryOpts, recipesController.listAll);
router.get('/', setQueryOpts, recipesController.listAll);
router.get('/:id', recipesController.list);
router.get('/:id/ingredients',checkToken, setQueryOpts, recipesController.listRecipeIngredients);
router.get('/:id/steps',checkToken, setQueryOpts, recipesController.listRecipeSteps);
router.get('/:id/categories',checkToken, setQueryOpts, recipesController.listRecipeCategories);
router.post('/',checkToken, uploadFiles, recipesController.create);
router.post('/:id/ingredients',checkToken, uploadFiles, recipesController.addRecipeIngredients);
router.post('/:id/steps',checkToken, uploadFiles, recipesController.addRecipeSteps);
router.post('/:id/categories',checkToken, uploadFiles, recipesController.addRecipeCategories);
router.delete('/',checkToken, checkRoles(['Admin']), recipesController.removeAll);
router.delete('/:id',checkToken, recipesController.remove);
router.delete('/:id/ingredients',checkToken, recipesController.removeRecipeIngredients);
router.delete('/:id/steps',checkToken, recipesController.removeRecipeSteps);
router.delete('/:id/categories',checkToken, recipesController.removeRecipeCategories);
router.put('/:id',checkToken, uploadFiles, recipesController.update);

/* Future API expansion
router.get('/:id/comments', recipesController.listRecipeComments);
router.delete('/:id/comments', recipesController.removeRecipeComments);
router.post('/:id/comments', recipesController.addRecipeComments);
router.get('/:id/steps', recipesController.listRecipeSteps);
*/

module.exports = router;