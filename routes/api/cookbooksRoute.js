/* Require needed modules */
require('dotenv').config();
const express = require('express');
const router = express.Router();
const cookbookController = require('../../controllers/cookbookController');

  /* Add the various routes */
  router.get('/', cookbookController.get);
  router.get('/:id', cookbookController.getById);
  router.get('/:id/recipes', cookbookController.recipes);
  router.get('/:id/category', cookbookController.getCategories);
  router.post('/', cookbookController.create);
  router.post('/:id/recipe', cookbookController.addRecipe);
  router.post('/:id/category', cookbookController.addCategory);
  router.delete('/', cookbookController.removeAll);
  router.delete('/:id', cookbookController.removeById);
  router.delete('/:id/recipes', cookbookController.removeRecipes);
  router.delete('/:id/categories', cookbookController.removeCategories);
  router.put('/', cookbookController.update);


module.exports = router;
