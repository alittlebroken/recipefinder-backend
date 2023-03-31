/* Import any needed modules */
require('dotenv').config();
const { checkRoles, checkToken } = require('../../middlewares/verifyMiddleware');
const { setQueryOpts } = require('../../middlewares/queriesMiddleware')
const uploadFiles = require('../../config/multer')

const express = require('express');
const router = express.Router();


const uploadController = require('../../controllers/uploadController')

router.use(
    '/',
    checkToken,
    uploadFiles,
    uploadController.upload
    )

module.exports = router