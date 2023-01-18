/* Import any needed modules */
require('dotenv').config();
const { checkRoles } = require('../../middlewares/verifyMiddleware');

const express = require('express');
const router = express.Router();
const passport = require('passport');

const categoriesController = require('../../controllers/categoriesController');

router.get('/', passport.authenticate('jwt', { session: false }), categoriesController.list);
router.post('/', passport.authenticate('jwt', { session: false }), categoriesController.create);
router.delete('/', passport.authenticate('jwt', { session: false }), checkRoles(['Admin']), categoriesController.removeAll);
router.delete('/:id', passport.authenticate('jwt', { session: false }), categoriesController.remove);
router.put('/:id', passport.authenticate('jwt', { session: false }), categoriesController.update);

module.exports = router;