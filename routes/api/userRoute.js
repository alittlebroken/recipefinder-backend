/* Import any needed modules */
require('dotenv').config();
const appLogger = require('../../config/winston');

const express = require('express');
const router = express.Router();
const passport = require('passport');

const { checkRoles } = require('../../middlewares/verifyMiddleware')

const userController = require('../../controllers/usersController');

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['Admin']),
    userController.listAll
    );

router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }), 
    userController.listUser
    );

router.get(
    '/:id/recipes',
    passport.authenticate('jwt', { session: false }),
    userController.listUserRecipes
    );

router.get(
    '/:id/cookbooks',
    passport.authenticate('jwt', { session: false }),
     userController.listUserCookbooks
     );

router.get(
    '/:id/pantry', 
    passport.authenticate('jwt', { session: false }),
    userController.listUserPantry
    );

router.post(
    '/', 
    passport.authenticate('jwt', { session: false }),
    checkRoles(['Admin']),
    userController.createUser
    );

router.post(
    '/:id/recipes', 
    passport.authenticate('jwt', { session: false }),
    userController.createUserRecipe
    );

router.post(
    '/:id/pantry', 
    passport.authenticate('jwt', { session: false }),
    userController.addUserPantry
    );

router.delete(
    '/', 
    passport.authenticate('jwt', { session: false }),
    checkRoles(['Admin']),
    userController.removeAllUsers
    );

router.delete(
    '/:id', 
    passport.authenticate('jwt', { session: false }),
    userController.removeUser
    );

router.delete(
    '/:id/recipes', 
    passport.authenticate('jwt', { session: false }),
    userController.removeUserRecipes
    );

router.delete(
    '/:id/cookbooks', 
    passport.authenticate('jwt', { session: false }),
    userController.removeUserCookbooks
    );

router.delete(
    '/:id/pantry', 
    passport.authenticate('jwt', { session: false }),
    userController.removeUserPantry
    );

router.put(
    '/:id', 
    passport.authenticate('jwt', { session: false }),
    userController.updateUser
    );

router.put(
    '/:id/recipes', 
    passport.authenticate('jwt', { session: false }),
    userController.updateUserRecipe
    );

router.put(
    '/:id/cookbooks', 
    passport.authenticate('jwt', { session: false }),
    userController.updateUserCookbook
    );

router.put(
    '/:id/pantry',
    passport.authenticate('jwt', { session: false }),
    userController.updateUserPantry
    );

/* Future expansion 
router.get('/:id/comments', userController.listUserComments);
router.delete('/:id/comments', userController.removeUserComments);
router.put('/:id/comments', userController.updateUserComment);
*/
module.exports = router;