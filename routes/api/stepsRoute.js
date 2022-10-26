/* Import any needed modules */
require('dotenv').config();
const appLogger = require('../../config/winston');

const express = require('express');
const router = express.Router();

const stepsController = require('../../controllers/stepsController');

router.get('/', stepsController.find);
router.get('/:id', stepsController.findById);
router.post('/', stepsController.create);
router.delete('/', stepsController.removeAll);
router.delete('/:id', stepsController.removeById);
router.put('/:id', stepsController.update);

module.exports = router;