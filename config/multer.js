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

/* Change the filedName based on the environment we are on */
let uploadFieldName
process.env.ENVIRONMENT === 'production' ? uploadFieldName = 'images' : uploadFieldName = 'tests'

const upload = multer(
    {
        storage: storage
    }
)
.array(uploadFieldName, 10)

module.exports = upload