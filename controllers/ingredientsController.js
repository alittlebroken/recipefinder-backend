/* Add in any modules we need to use */
require('dotenv').config();
const appLogger = require('../config/winston');

const ingredientModel = require('../models/ingredientModel');
const uploadsModel = require('../models/uploadModel')
const fs = require('fs')
const path = require('path')

/*
 * Returns all the ingredients within the database
 * 
*/
const get = async (req, res, next) => {

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

        /* Get the ingredients from the DB */
        const results = await ingredientModel.findAll(options);

        if(!results || results.length < 1){
            return res.status(200).json({
                status: 200,
                success: false,
                message: 'No ingredients have been found',
                results: []
            });
        } 

        if(results.success === false){
            let err = {
                status: 500,
                success: false,
                message: results.message
            };

            throw err;
        }

        return res.status(200).json({
            results: results.results,
            totalPages: results.totalPages,
            totalRecords: results.totalRecords,
            currentPage: results.currentPage
        });

    } catch(e) {
        return next(e);
    }

};

/*
 * Retrieve an individual ingredient from the database based upon it's 
 * unique identifier
 */
const getById = async (req, res, next) => {

    try{

        /* validate any passed in variables */
        if(!req.params || req.params === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined request parameters'
            }
        }

        if(!req.params.id || req.params.id === 'undefined'){
            throw {
                status: 400,
                success: false,
                message: 'Undefined id'
            }
        }

        /* Try and get the desired record */
        let id = parseInt(req.params.id);
        const result = await ingredientModel.findById(id);

        if(!result || result.length < 1){
            res.status(204).json({
                status: 204,
                success: false,
                message: 'No ingredients have been found',
                results: []
            });
        }

        if(result.success === false){
            let err = {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            };

            throw err;
        }

        res.status(200).json(result);

    } catch(e) {
        return next(e);
    }

};

/*
 * Allows the addition of a new ingredient in the database
 * 
 */
const create = async (req, res, next) => {

    try{

        /* Perform validation of passed in values */
        if(!req.body || req.body === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined body parameter'
            }
        }


        if(!req.body.name || req.body.name === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined name'
            }
        }

        if(typeof req.body.name !== 'string'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong name format'
            }
        }

        if(req.body.name === ''){
            throw {
                status: 400,
                success: false,
                message: 'Empty name'
            }
        }

        /* Add the record to the database */
        const result = await ingredientModel.create(req.body.name);
        if(!result || result.length < 1 || result.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
        }

        res.status(201).json(result);


    } catch(e) {
        return next(e);
    }

};

/*
 * Removes all ingredients from the database
 *
 */
const remove = async (req, res, next) => {

    try{

        /* remove the data from the database */
        const result = await ingredientModel.removeAll();
        
        if(!result || result.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was an issue with the resource, please try again later'
            }
        }

        if(result.count < 1){
            res.status(404).json({
                status: 404,
                success: false,
                message: 'We found no ingredients to remove',
                count: 0
            });
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: 'All ingredients removed successfully',
            count: result.count
        });

    } catch(e) {
        return next(e);
    }

};

/*
 * Removes an ingredient form the system
 *
 */
const removeById = async (req, res, next) => {

    try{

        /* Validate any passed in values */
        if(!req.params || req.params === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined request parameters'
            }
        }

        if(!req.params.id || req.params.id === 'undefined'){
            throw {
                status: 400,
                success: false,
                message: 'Undefined id'
            }
        }

        let id = parseInt(req.params.id);

        /* attempt to remove the ingredient by it's id */
        const result = await ingredientModel.remove(id);

        if(!result || result.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
        }

        if(result.count < 1){
            res.status(404).json({
                success: false,
                count: 0,
                message: 'There are no ingredients to remove'
            });
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: 'Ingredient successfully removed',
            count: result.count
        });

    } catch(e) {
        return next(e);
    }

};

/* 
 * Allows you to update an ingredient in the database
 *
 */
const update = async (req, res, next) => {

    try{

        /* validate the values passed via the request object */
        if(!req.params || req.params === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined request parameters'
            }
        }

        if(!req.params.id || req.params.id === 'undefined'){
            throw {
                status: 400,
                success: false,
                message: 'Undefined id'
            } 
        }

        if(!req.body || req.body === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined request body'
            }
        }

        if(!req.body.name || req.body.name === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined name'
            }
        }

        let id = parseInt(req.params.id);
        let name = req.body.name;
        
        /* Remove any existing entries from the files table, but only if we are uploading 
           a new file*/
        let removedFiles
        if(req?.files){
            removedFiles = await uploadsModel.remove(JSON.stringify({
                filter: {
                    resource: 'Ingredients',
                    resourceid: id
                }
            }))
        }

        /* Extract the params */
        const files = req.files
        const userId = req.body.userId ? parseInt(req.body.userId) : parseInt(req.user.id)

        /* The base path for any file uploads */
        let fileBasePath = `${process.env.APP_URL}/media/`

        /* Set the image source for the update */
        let imageSource
        if(req.files && req.files?.length > 0){
            imageSource = `${fileBasePath}${req?.files[0]?.filename}`
        } else {
            imageSource = req?.body?.pictures?.src
        }

        /* Construct the payload to send to upload method */
        const payload = [{
            src: imageSource,
            mimetype: 'none/none',
            resource: 'Ingredients',
            resourceid: parseInt(req?.body?.id),
            title: req.body?.pictures?.title,
            userid: parseInt(userId),
        }]

        /* Update the ingredient record within the files table 
         * Check that we first have some entries to update, otherwise
         * we just add a new entry
         */
        let existing = await uploadsModel.list({
            filter: JSON.stringify({
                resource: 'Ingredients',
                resourceid: parseInt(req?.body?.id)
            })
        })

        if(existing?.results && existing?.results?.length > 0){

            /* Update the existing entry only rather than create a new entry each time */
            const updatedRecord = await uploadsModel.update({
                id: existing?.results[0]?.id,
                src: imageSource,
                title: req.body?.pictures?.title,
                alt: req.body?.pictures?.title,
                mimetype: 'none/none',
                resource: 'Ingredients',
                resourceid: parseInt(req?.body?.id),
                userid: parseInt(userId)
            },
            {
                filter: JSON.stringify({
                    id: existing?.results[0]?.id
                })
            })

            /* Check the return value and act accordingly to the returned
             * state
             */
            if(existing.success === false){
                throw {
                    status: 500,
                    success: false,
                    message: 'Unable to update the image details for this resource, please try again later.'
                }
            }

        } else {

            const result = await uploadsModel.upload(payload)

            /* Check that the upload went OK, if not then we need to remove the file
            * that was uploaded */
            if(!result || result.success === false){
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
                    message: 'There was a problem with the resource whilst updating, please try again later',
                }
            }

        }

        /* Update the product */
        const updateResult = await ingredientModel.update(id, name);

        if(!updateResult || updateResult.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
        }
        
        res.status(200).send(updateResult);

    } catch(e) {
        return next(e);
    }

};



module.exports = {
  get,
  getById,
  create,
  remove,
  removeById,
  update
}
