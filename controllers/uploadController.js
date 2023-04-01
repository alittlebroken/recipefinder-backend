require('dotenv').config();
const appLogger = require('../config/winston');
const uploadModel = require('../models/uploadModel');
const fs = require('fs')
const path = require('path')

const moduleName = 'uploadController'

/* 
 * Uploads files to the server
 */
const upload = async (req, res, next) => {

    const moduleMethod = 'upload';

    try{

        /* Extract the params */
        const {
            files
        } = req

        const {
            resource,
            resourceid,
        } = req.body

        /* Validate the passed in values */
        if(files.length < 1){
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'You must supply one or more images to upload'
            })
        }

        if(!resource || resource === undefined){
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Resource type is required'
            })
        }

        if(!resourceid || resourceid === undefined){
            return res.status(404).json({
                status: 404,
                success: false, 
                message: 'Resource id is required'
            }) 
        }

        /* Loop through the files sent and construct the 
         * Payload to send */
        let payload
        files.map(file => {

            /* Construct the payload for this file */
            payload = {
                name: `${file.filename}`,
                mimetype: file.mimetype,
                resource: resource,
                resourceid: parseInt(resourceid),
                userid: req.user.id
            }

        })

        /* File uploaded OK, so lets add it to the DB */
        const result = await uploadModel.upload(payload)

        if(!result || result.success === false) {

            /* Delete the files uploaded */
            files.map(file => {
                let fullPath = path.join(process.cwd(), '/public/media')
                fs.unlink(path.join(fullPath, file.filename), err => {
                    if (err) throw {
                        status: 500,
                        success: false,
                        message: 'Unable to delete the uploaded files'
                    }
                })
            })

            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later',
            }
        }

        /* All ok at this point */
        res.status(200).json({
            status: 200,
            success: true,
            message: 'File(s) successfully uploaded'
        })


    } catch(e) {
        /* Log out the issue(s) */
        appLogger.logMessage(
            'error', 
            `${moduleName}.${moduleMethod} - Status Code ${e.status}: ${e.message}`
            );

        return next(e);
    }

};


/* 
 * function template
 */
const method = async (req, res, next) => {

    const moduleMethod = '';

    try{

    } catch(e) {
        /* Log out the issue(s) */
        appLogger.logMessage(
            'error', 
            `${moduleName}.${moduleMethod} - Status Code ${e.status}: ${e.message}`
            );

        return next(e);
    }

};

 module.exports = {
    upload
 }