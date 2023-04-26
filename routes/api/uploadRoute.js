/* Import any needed modules */
require('dotenv').config();
const { checkRoles, checkToken } = require('../../middlewares/verifyMiddleware');
const { setQueryOpts } = require('../../middlewares/queriesMiddleware')
const uploadFiles = require('../../config/multer')

const express = require('express');
const router = express.Router();


const uploadController = require('../../controllers/uploadController')

//router.get('/:id/recipes', checkToken, setQueryOpts, userController.listUserRecipes);

router.post(
    '/',
    checkToken,
    setQueryOpts,
    uploadFiles,
    uploadController.upload
    )

router.get(
    '/',
    checkToken,
    setQueryOpts,
    setQueryOpts,
    uploadController.list
)

router.delete(
    '/',
    checkToken,
    setQueryOpts,
    checkRoles(['Admin']),
    uploadController.remove
)

router.put(
    '/:id',
    checkToken,
    setQueryOpts,
    uploadFiles,
    uploadController.update
)

module.exports = router