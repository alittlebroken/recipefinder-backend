/* Add in any modules we need to use */
require('dotenv').config();
const { addListener } = require('..');
const appLogger = require('../config/winston');
const stepsModel = require('../models/stepModel');

/*
 * Finds all steps stored within the DB
 */
const find = async (req, res, next) => {

    try{

        /* Get the pagination values */
        let page = req.query.page;
        let size = req.query.pageSize;

        if(page < 1) page = 1
        if(size < 1) size = 1

        let offset = parseInt((page - 1) * size)

        /* Pagination options to send to the method that requires it */
        let options = {
            page,
            size,
            offset
        }

        /* Get the records from the DB */
        const results = await stepsModel.findAll(options);
        
        if(!results || results.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
        }
        
        if(results.length < 1){
            throw {
                status: 404,
                success: false,
                message: 'No steps were found'
            }
        }

        res.status(200).json({
            results: results.results,
            totalPages: results.totalPages,
            totalRecords: results.totalRecords,
            currentPage: results.currentPage
        });

    } catch(e) {
       
        /* Log out the issue(s) */
        appLogger.logMessage('error', `stepsController.get - Status Code ${e.status}: ${e.message}`);

        return next(e);
    }

};

/*
 * Finds the step matching the passed in unique identifier
 */
const findById = async (req, res, next) => {

    try{

        /* Validate the req parameters */
        if(!req.params || req.params === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined request parameter'
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
        
        /* Get the records from the DB */
        const results = await stepsModel.findById(id);
        
        if(!results || results.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
        }

        if(results.length < 1){
            throw {
                status: 404,
                success: false,
                message: 'No steps were found'
            }
        }

        res.status(200).json(results[0]);

    } catch(e) {
        
        /* Log out the issue(s) */
        appLogger.logMessage('error', `stepsController.get - Status Code ${e.status}: ${e.message}`);

        return next(e);
    }

};

/* Adds a new setp to a recipe */
const create = async (req, res, next) => {

    try{

        /* Validate the request values coming in */
        if(!req.body || req.body === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined request body'
            }
        }

        if(!req.body.recipeId || req.body.recipeId === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined recipeId'
            }
        }

        if(!req.body.stepNo || req.body.stepNo === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined stepNo'
            }
        }

        if(!req.body.content || req.body.content === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined content'
            }
        }

        /* Now attempt to add the new step to the recipe */
        const { recipeId, stepNo, content} = req.body;

        const result = await stepsModel.create(recipeId, stepNo, content);

        if(!result || result.success == false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
        }

        res.status(201).json(result);

    } catch(e) {
        /* Log out the issue(s) */
        appLogger.logMessage('error', `stepsController.get - Status Code ${e.status}: ${e.message}`);

        return next(e);
    }

};

/*
 * Removes a step from the DB
 */
const removeById = async (req, res, next) => {

    try{

       /* Validate any request parameters */
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
            message: 'Undefined stepId'
        }
       }

       /* Remove the steps from the recipe */
       let recipeId = parseInt(req.params.id);
       const results = await stepsModel.removeOneById(recipeId);
       
       if(!results || results.success === false){
        throw {
            status: 500,
            success: false,
            message: 'There was a problem with the resource, please try again later'
        }
       }
       
       if(results.count < 1){
        throw {
            status: 404,
            success: false,
            message: 'There are no steps to remove'
        }
       }
       
       res.status(200).json(results);

    } catch(e) {
        return next(e);
    }

};

/*
 * remove all steps in the system no matter which recipe they belong too
 */
const removeAll = async (req, res, next) => {

    try{

        /* Dlete all the steps we have */
        const result = await stepsModel.removeAll();

        if(!result || result.success === false){
            throw {
                status: 500,
                success: result.success,
                message: result.message
            }
        }

        if(result.count < 1){
            throw {
                status: 404,
                success: false,
                message: 'There are no steps to remove'
            }
        }
        
        res.status(200).json({
            status: 200,
            success: true,
            message: `Successfully removed ${result.count} steps`
        });

    } catch(e) {
        return next(e);
    }

};

/*
 * Update an existing step with new values
 */
const update = async (req, res, next) => {

    try{

        /* Perform request parameter and body validation */
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
                message: 'Undefined stepId'
            }
        }

        if(!req.body || req.body === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined request body'
            }
        }

        if(!req.body.recipeId || req.body.recipeId === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined recipeId'
            }
        }

        if(!req.body.stepNo || req.body.stepNo === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined stepNo'
            }
        }

        if(!req.body.content || req.body.content === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined content'
            }
        }

        /* Lets try an attempt to update the required step */
        let stepId = parseInt(req.params.id);
        let recipeId = parseInt(req.body.recipeId);
        let stepNo = parseInt(req.body.stepNo);
        let stepContent = req.body.content;

        const result = await stepsModel.update(stepId, recipeId, stepNo, stepContent);

        if(!result || result.success === false){
            throw {
                status: 500,
                success: result.success,
                message: result.message
            }
        }

        if(result.length < 1){
            throw {
                status: 404,
                success: false,
                message: 'No steps found to update'
            }
        }

        /* We have got this far might as well send the required data back */
        res.status(200).json({
            status: 200,
            success: true,
            message: 'Step successfully updated'
        });

    } catch(e) {
        return next(e);
    }

}

module.exports = {
    find,
    findById,
    create,
    removeById,
    removeAll,
    update
};