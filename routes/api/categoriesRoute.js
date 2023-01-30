/* Import any needed modules */
require('dotenv').config();
const { checkRoles, checkToken } = require('../../middlewares/verifyMiddleware');

const express = require('express');
const router = express.Router();
const passport = require('passport');

const categoriesController = require('../../controllers/categoriesController');

router.get('/', checkToken, categoriesController.list);
router.post('/', checkToken, categoriesController.create);
router.delete('/', checkToken, checkRoles(['Admin']), categoriesController.removeAll);
router.delete('/:id', checkToken, categoriesController.remove);
router.put('/:id', checkToken, categoriesController.update);

module.exports = router;