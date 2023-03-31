/* Allows us to use the env variables */
require('dotenv').config();

/* Load any additional supporting libraries */
const path = require('path')

/* Load the main multer library */
const multer = require('multer')

/* Set the storage for multer */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), '/public/media'))
    },
    filename: (req, file, cb) => {
        const fileExt = file.originalname.split('.').pop()
        const uniqSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
        cb(null, `${file.fieldname}-${uniqSuffix}.${fileExt}`)
    }
})

const upload = multer(
    {
        storage: storage
    }
)
.array('images', 10)

module.exports = upload