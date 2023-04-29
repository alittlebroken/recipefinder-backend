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
        const files = req.files
        
        const {
            src,
            resource,
            resourceid,
            title,
            userId
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

        if(!userId || userId === undefined){
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'User id is required'
            })
        }

        if(!title || title === undefined){
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Image title is required',
                results: [],
                pagination: {}
            })
        }

        /* Loop through the files sent and construct the 
         * Payload to send */
        let payload
        let payloads = []

        let fileBasePath = `${process.env.APP_URL}/media/`

        let result

        if(!files){
            /* There was no file specified */
            if(!src){
                return res.status(404).json({
                    status: 404,
                    success: false,
                    message: 'Src MUST be set if no image is uploaded',
                    results: [],
                    pagination: {}
                })
            } else {
                payload.src = `${fileBasePath}${src}`
                payload.mimetype = 'none/none'
                payload.resource = resource
                payload.resourceid = parseInt(resourceid)
                payload.title = title
                payload.userid = parseInt(userId)
                payloads.push(payload)
            }
        } else {

            /* Add an entry for each file uploaded */
            files.map(file => {
                /* Construct the payload for this file */
                payload = {
                    src: `${fileBasePath}${file.filename}`,
                    mimetype: file.mimetype,
                    resource: resource,
                    resourceid: parseInt(resourceid),
                    title: title,
                    userid: parseInt(userId)
                }

                payloads.push(payload)

            })

        }

        console.log(payloads)

        /* File uploaded OK, so lets add it to the DB */
        result = await uploadModel.upload(payloads)
        
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
        console.log(e)
        /* Log out the issue(s) */
        appLogger.logMessage(
            'error', 
            `${moduleName}.${moduleMethod} - Status Code ${e.status}: ${e.message}`
            );

        return next(e);
    }

};


/* 
 * List one or more files stored within the database
 */
const list = async (req, res, next) => {

    const moduleMethod = 'list';

    try{

        /* Pagination, filter and sort  options to send to the method that requires it */
        let options = {
            page: req.page,
            size: req.limit,
            offset: req.offset,
            filterBy: req.filterBy,
            filterValues: req.filterValues,
            filter: req.filter,
            sortBy: req.sortBy,
            sortOrder: req.sortOrder
          }

        /* Execute the appropriate models method */
        const result = await uploadModel.list(options)
        
        if(!result || (Array.isArray(result?.results) !== true && result.success === false)){
            return res.status(500).json({
                success: false,
                status: 500,
                message: 'There was a problem with the resource, please try again later',
                results: [],
                pagination: {
                    total: 1,
                    records: 0,
                    current: 1
                }
            })
        }

        if(result?.results?.length < 1){
            return res.status(404).json({
                success: false,
                status: 404,
                message: 'There were no records found',
                results: [],
                pagination: {
                    records: 0,
                    total: 1,
                    current: 1
                }
            })
        }

        res.status(200).send({
            success: result.success,
            status: 200,
            message: '',
            results: result.results,
            pagination: result.pagination
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
 * Remove one or more files from the DB
 */
const remove = async (req, res, next) => {

    const moduleMethod = 'remove';

    try{

        /* Pagination, filter and sort  options to send to the method that requires it */
        let options = {
            page: req.page,
            size: req.limit,
            offset: req.offset,
            filterBy: req.filterBy,
            filterValues: req.filterValues,
            filter: req.filter,
            sortBy: req.sortBy,
            sortOrder: req.sortOrder
        }

        const result = await uploadModel.remove(options)

        if(result?.results < 1){
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'No records to delete',
                results: 0,
                pagination: {
                    total: 1,
                    current: 1,
                    records: 0
                }
            })
        }

        if(result?.message === "There was a problem with the resource, please try again later"){
            return res.status(500).json({
                status: 500,
                success: false,
                message: result.message,
                results: 0,
                pagination: {
                    total: 1,
                    current: 1,
                    records: 0
                } 
            })
        }

        /* No isses return the results */
        res.status(200).json({
            status: 200,
            success: result.success,
            message: result.message,
            results: result.results,
            pagination: result.pagination
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
 * Update an existing file already stored within the system
 */
const update = async (req, res, next) => {

    const moduleMethod = 'update';

    try{

        /* Extract required data from the request */
        const {
            files
        } = req

        const {
            resource,
            resourceid,
            title
        } = req.body

        let recordid = req?.params?.id ? req?.params?.id : undefined
        let userid = req?.user?.id ? req?.user?.id : undefined

        if(!resource || resource === undefined){
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Resource name is required',
                results: [],
                pagination: {}
            })
        }
        
        if(typeof resource !== 'string' ||  !isNaN(parseInt(resource))){
            return res.status(400).json({
                status: 400,
                success: false, 
                message: 'Resource name must be a string',
                results: [],
                pagination: {}
            })   
        }

        if(!resourceid || resourceid === undefined){
            return res.status(404).json({
                status: 404,
                success: false, 
                message: 'Resource id is required',
                results: [],
                pagination: {}
            }) 
        }

        if(typeof parseInt(resourceid) !== 'number' || isNaN(parseInt(resourceid))){
            return res.status(400).json({
                status: 400,
                success: false, 
                message: 'Resource id must be a number',
                results: [],
                pagination: {}
            })   
        }

        if(!recordid || recordid === undefined){

            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Record id is required',
                results: [],
                pagination: {}
            })
        }

        if(typeof parseInt(recordid) !== 'number' || isNaN(parseInt(recordid))){
            return res.status(400).json({
                status: 400,
                success: false, 
                message: 'Record id must be a number',
                results: [],
                pagination: {}
            })   
        }

        if(!userid || userid === undefined){
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'User id is required',
                results: [],
                pagination: {}
            })
        }

        if(typeof parseInt(userid) !== 'number' || isNaN(parseInt(userid))){
            return res.status(400).json({
                status: 400,
                success: false, 
                message: 'User id must be a number',
                results: [],
                pagination: {}
            })   
        }

        if(!title || title === undefined){
            return res.status(404).json({
                status: 404,
                success: false, 
                message: 'Image title is required',
                results: [],
                pagination: {} 
            })
        }

        if(typeof title !== 'string' || !isNaN(parseInt(title))){
            return res.status(400).json({
                status: 400,
                success: false, 
                message: 'Image title must be a string',
                results: [],
                pagination: {}
            })
        }


        /* Pagination, filter and sort  options to send to the method that requires it */
        let options = {
            page: req.page,
            size: req.limit,
            offset: req.offset,
            filterBy: req.filterBy,
            filterValues: req.filterValues,
            filter: JSON.stringify({ ids: parseInt(recordid)}),
            sortBy: req.sortBy,
            sortOrder: req.sortOrder
        }

        /* Extract the existing record details first */
        const existing = await uploadModel.list(options)

        let existingRecord
        if(existing && existing?.results?.length > 0){
            existingRecord = existing.results[0]
        } else if (existing?.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later',
                results: [],
                pagination: {}
            }
        } else {
            throw {
                status: 404,
                success: false,
                message: 'No existing record found',
                results: [],
                pagination: {}
            }
        }

        /* Create the payload to send to the models method */
        let payload = {}

            // id
            payload.id = parseInt(recordid)
            let newFile
            
            if(files?.length > 0){
                newFile = files[0]
            }

            if(newFile?.filename){
                payload.src = `${process.env.APP_URL}/media/${newFile.filename}`
                payload.mimetype = newFile.mimetype
            } else {
                if(existingRecord.src.includes('http')){
                    payload.src = existingRecord.src
                } else {
                    payload.src = `${process.env.APP_URL}/media/${existingRecord.src}`
                }
                payload.mimetype = existingRecord.mimetype
            }
            payload.resource = resource
            payload.title = title
            payload.resourceid = parseInt(resourceid)
            payload.userid = parseInt(userid)

            console.log(payload)

        /* Update the record with the new data */
        const result = await uploadModel.update(payload, options)
        
        /* Check if the update went OK and if so remove file we replaced from the filesystem.*/
        if(result?.success == true){

            /* Check that a new file was uploaded so we dont remove the existing file if the associated 
             * data only was updated
             */
            if(files?.filename || files?.filename !== undefined){

                /* Ensure that the new file is different to the xisting one and only then
                   should it be removed */
                if(files.filename !== existingRecord.name){
                    let fullPath = path.join(process.cwd(), '/public/media')
                    fs.unlink(path.join(fullPath, existingRecord.name), err => {
                        if (err) throw {
                            status: 500,
                            success: false,
                            message: 'Unable to delete the existing file'
                        }
                    })
                } 

            }

        } else {

            /* remove the new file we just uploaded */
            let fullPath = path.join(process.cwd(), '/public/media')

            fs.unlink(path.join(fullPath, existingRecord.name), err => {
                if (err) throw {
                    status: 500,
                    success: false,
                    message: 'Unable to delete the newly uploaded file'
                }
              })

        }

        /* Send back the update was successful */
        res.status(201).json({
            success: true,
            status: 201,
            message: 'Record successfully updated',
            results: result.results,
            pagination: result.pagination
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
    upload,
    list,
    remove,
    update
 }