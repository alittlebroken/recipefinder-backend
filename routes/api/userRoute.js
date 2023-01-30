/* Import any needed modules */
require('dotenv').config();
const appLogger = require('../../config/winston');

const express = require('express');
const router = express.Router();
const passport = require('passport');

const { checkRoles, checkToken } = require('../../middlewares/verifyMiddleware');

const userController = require('../../controllers/usersController');

router.get(
    '/',
    checkToken,
    checkRoles(['Admin']),
    userController.listAll
    );

router.get(
    '/:id',
    checkToken, 
    userController.listUser
    );

router.get(
    '/:id/recipes',
    checkToken,
    userController.listUserRecipes
    );

router.get(
    '/:id/cookbooks',
    checkToken,
     userController.listUserCookbooks
     );

router.get(
    '/:id/pantry', 
    checkToken,
    userController.listUserPantry
    );

router.post(
    '/', 
    checkToken,
    checkRoles(['Admin']),
    userController.createUser
    );

router.post(
    '/:id/recipes', 
    checkToken,
    userController.createUserRecipe
    );

router.post(
    '/:id/pantry', 
    checkToken,
    userController.addUserPantry
    );

router.delete(
    '/', 
    checkToken,
    checkRoles(['Admin']),
    userController.removeAllUsers
    );

router.delete(
    '/:id', 
    checkToken,
    userController.removeUser
    );

router.delete(
    '/:id/recipes', 
    checkToken,
    userController.removeUserRecipes
    );

router.delete(
    '/:id/cookbooks', 
    checkToken,
    userController.removeUserCookbooks
    );

router.delete(
    '/:id/pantry', 
    checkToken,
    userController.removeUserPantry
    );

router.put(
    '/:id', 
    checkToken,
    userController.updateUser
    );

router.put(
    '/:id/recipes', 
    checkToken,
    userController.updateUserRecipe
    );

router.put(
    '/:id/cookbooks', 
    checkToken,
    userController.updateUserCookbook
    );

router.put(
    '/:id/pantry',
    checkToken,
    userController.updateUserPantry
    );

/* Future expansion 
router.get('/:id/comments', userController.listUserComments);
router.delete('/:id/comments', userController.removeUserComments);
router.put('/:id/comments', userController.updateUserComment);
*/
module.exports = router;