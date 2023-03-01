/* Require needed modules */
require('dotenv').config();

const { checkRoles, checkToken } = require('../../middlewares/verifyMiddleware');
const { setQueryOpts } = require('../../middlewares/queriesMiddleware')


const express = require('express');
const router = express.Router();
const passport = require('passport');

const cookbookController = require('../../controllers/cookbookController');

/* Add the various routes */
router.get('/', checkToken, checkRoles(['Admin']), setQueryOpts, cookbookController.list);
router.get('/:id', checkToken, cookbookController.getById);
router.get('/:id/recipes', checkToken, setQueryOpts, cookbookController.recipes);
router.get('/:id/categories', checkToken, setQueryOpts, cookbookController.getCategories);
router.post('/', checkToken, cookbookController.create);
router.post('/:id/recipe', checkToken, cookbookController.addRecipe);
router.post('/:id/categories', checkToken, cookbookController.addCategory);
router.delete('/', checkToken, checkRoles(['Admin']),cookbookController.removeAll);
router.delete('/:id', checkToken, cookbookController.removeById);
router.delete('/:id/recipes', checkToken, cookbookController.removeRecipes);
router.delete('/:id/categories', checkToken, cookbookController.removeCategories);
router.put('/:id', checkToken, cookbookController.update);

module.exports = router;
