/* Import any needed modules */
require('dotenv').config();
const appLogger = require('../../config/winston');

const express = require('express');
const router = express.Router();

const userController = require('../../controllers/usersController');

//router.get('/', userController.listAll);
//router.get('/:id', userController.listUser);
//router.get('/:id/recipes', userController.listUserRecipes);
//router.get('/:id/cookbooks, userController.listUserCookbooks);
//router.get('/:id/pantry', userController.listUserPantry);

//router.post('/', userController.createUser);
//router.post('/:id/recipes', userController.createUserRecipe);
//router.post('/:id/pantry', userController.addUserPantry);

//router.delete('/', userController.removeAllUsers);
//router.delete('/:id', userController.removeUser);
//router.delete('/:id/recipes', userController.removeUserRecipes);
//router.delete('/:id/cookbooks', userController.removeUserCookbooks);
//router.delete('/:id/pantry', userController.removeUserPantry);

//router.put('/:id', userController.updateUser);
//router.put('/:id/recipes', userController.updateUserRecipe);
//router.put('/:id/cookbooks', userController.updateUserCookbook);
//router.put('/:id/pantry', userController.updateUserPantry);

/* Future expansion 
router.get('/:id/comments', userController.listUserComments);
router.delete('/:id/comments', userController.removeUserComments);
router.put('/:id/comments', userController.updateUserComment);
*/
module.exports = router;