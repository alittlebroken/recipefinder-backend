/* Import any needed modules */
require('dotenv').config();
const appLogger = require('../../config/winston');

const express = require('express');
const router = express.Router();
const passport = require('passport');

const { checkRoles, checkToken } = require('../../middlewares/verifyMiddleware');
const { setQueryOpts } = require('../../middlewares/queriesMiddleware')

const userController = require('../../controllers/usersController');

router.get('/', checkToken, checkRoles(['Admin']), setQueryOpts, userController.listAll);
router.get('/:id', checkToken, userController.listUser);
router.get('/:id/recipes', checkToken, setQueryOpts, userController.listUserRecipes);
router.get('/:id/cookbooks',checkToken, setQueryOpts, userController.listUserCookbooks);
router.get('/:id/pantry', checkToken, setQueryOpts, userController.listUserPantry);
router.post('/', checkToken, checkRoles(['Admin']), userController.createUser);
/*
== Not needed covered by POST /recipes route ==
router.post('/:id/recipes', checkToken,userController.createUserRecipe);

== Not needed as created when a user is created ==
router.post('/:id/pantry', checkToken, userController.addUserPantry);

*/
router.delete('/', checkToken, checkRoles(['Admin']), userController.removeAllUsers);
router.delete('/:id', checkToken, userController.removeUser);
router.delete('/:id/recipes', checkToken, userController.removeUserRecipes);
router.delete('/:id/cookbooks', checkToken, userController.removeUserCookbooks);
/* Should this be removed? Should the remove user route do this instead. One less point of attack */ 
router.delete('/:id/pantry', checkToken, userController.removeUserPantry);
router.put('/:id', checkToken, userController.updateUser);
/*
== Not needed covered by PUT /recipes/:id route ==
router.put('/:id/recipes', checkToken, userController.updateUserRecipe);

== Not needed covered by PUT /cookbooks/:id route ==
router.put('/:id/cookbooks', checkToken, userController.updateUserCookbook);

== Not needed covered by PUT /pantries/:id route ==
router.put('/:id/pantry', checkToken, userController.updateUserPantry);
*/

/* Future expansion 
router.get('/:id/comments', userController.listUserComments);
router.delete('/:id/comments', userController.removeUserComments);
router.put('/:id/comments', userController.updateUserComment);
*/
module.exports = router;