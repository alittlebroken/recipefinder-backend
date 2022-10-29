/* Import any needed modules */
require('dotenv').config();
const appLogger = require('../../config/winston');

const express = require('express');
const router = express.Router();

const pantriesController = require('../../controllers/pantriesController');

router.get('/', pantriesController.listAll);
router.get('/:id', pantriesController.list);
router.post('/', pantriesController.create);
router.post('/:pantryId', pantriesController.add);
router.delete('/', pantriesController.removeAll);
router.delete('/:pantryId', pantriesController.removeItems);
router.put('/:id', pantriesController.update);

module.exports = router;