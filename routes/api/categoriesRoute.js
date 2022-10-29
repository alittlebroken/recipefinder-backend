/* Import any needed modules */
require('dotenv').config();
const appLogger = require('../../config/winston');

const express = require('express');
const router = express.Router();

const categoriesController = require('../../controllers/categoriesController');

router.get('/', categoriesController.get);
router.post('/', categoriesController.create);
router.delete('/', categoriesController.remove);
router.put('/', categoriesController.update);

module.exports = router;