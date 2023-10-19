/* Add in any modules we need to use */
require('dotenv').config();
const { addListener } = require('..');
const appLogger = require('../config/winston');
const pantryModel = require('../models/pantryModel');
const pantryIngredientsModel = require('../models/pantryIngredientsModel');

const moduleName = 'pantriesController';

/*
 * Retrieve all pantries from the system
 */
const listAll = async (req, res, next) => {

    const moduleMethod = 'listAll';

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

        /* search the DB */
        const result = await pantryModel.listAll(options);
        
        if(!result || result.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
        }

        if(result.length < 1){
            throw {
                status: 204,
                success: false,
                message: 'There are no pantries to list'
            }
        }

        res.status(200).json({
            results: result.results,
            totalPages: result.totalPages,
            totalRecords: result.totalRecords,
            currentPage: result.currentPage
        });

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
 * Retrieve a particular pantry from the database
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
                message: 'Undefined pantryId'
            }
        }

        /* Attempt to retrieve the record from the database */
        let id = parseInt(req.params.id);
        const result = await pantryModel.list(id, options);
        
        if(!result || result.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
        }

        if(result.length < 1){
            throw {
                status: 204,
                success: false,
                message: 'No pantry matched the supplied id'
            }
        }

        res.status(200).send({
            results: result.results,
            totalPages: result.totalPages,
            totalRecords: result.totalRecords,
            currentPage: result.currentPage
        });

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
 * Create a new pantry for a user
 */
const create = async (req, res, next) => {

    const moduleMethod = 'create';

    try{

        /* Validate the request values */
        if(!req.body || req.body === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined request body'
            }
        }

        if(!req.body.id || req.body.id === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined user id'
            }
        }

        /* Actually create the new pantry for the user */
        let userId = req.body.id;
        const result = await pantryModel.create(userId); 

        if(!result || result.success === false){
            if(result.message === 'The specified user already has a pantry'){
                throw {
                    status: 400,
                    success: false,
                    message: result.message
                }
            } else {
                throw {
                    status: 500,
                    success: false,
                    message: 'There was a problem with the resource, please try again later'
                }
            }
        }

        res.status(201).json({
            status: 201,
            success: true,
            message: 'Pantry successfully created'
        });

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
 * Add a new ingredient to a pantry
 */
const add = async (req, res, next) => {

    const moduleMethod = 'add';

    try{

        /* Validate the request parameters and body values */
        if(!req.params || req.params === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined request parameters'
            }
        }

        if(!req.params.pantryId || req.params.pantryId === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined pantryId'
            }
        }

        if(!req.body || req.body === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined request body'
            }
        }

        if(typeof req.body !== 'object'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong request body format'
            }
        }

        if(!req.body.ingredientId || req.body.ingredientId === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined ingredientId'
            }
        }

        if(!req.body.amount || req.body.amount === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined amount'
            }
        }

        if(!req.body.amount_type || req.body.amount_type === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined amount_type'
            }
        }

        /* Add the item to the pantry and check if all is ok */
        let dataToAdd = {
            pantryId: parseInt(req.params.pantryId),
            ingredientId: parseInt(req.body.ingredientId),
            amount: parseInt(req.body.amount),
            amount_type: req.body.amount_type
        }

        const result = await pantryIngredientsModel.create(dataToAdd);
        
        if(!result || result.success === false){
            if(result.message === 'There was a problem with the resource, please try again later'){
                throw {
                    status: 500,
                    success: result.success,
                    message: result.message
                }
            } else {
                throw {
                    status: 404,
                    success: result.success,
                    message: result.message
                }
            }
        }

        res.status(201).json({
            status: 201,
            success: true,
            message: 'Ingredient successfully added to pantry'
        });

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
 * Remove all pantries from the system
 */
const removeAll = async (req, res, next) => {

    const moduleMethod = 'removeAll';

    try{

        /* Attempt to remove the pantries */
        const result = await pantryModel.removeAll();
        
        if(result.success === false){
            throw {
                status: 500,
                success: result.success,
                message: result.message
            }
        }

        if(result.count < 1) {
            throw {
                status: 404,
                success: false,
                message: 'No pantries found to remove'
            }
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: 'All pantries successfully removed'
        });

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
 * Removes a specififc ingredient from then pantry
*/
const removeItem = async (req, res, next) => {

    const moduleMethod = 'removeItem';

    try{

        /* Validate request parameters */
        /* Validate request parameters */
        if(!req.params || req.params === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined request parameters'
            }
        }

        if(!req.params.pantryid || req.params.pantryid === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined pantryId'
            }
        }

        if(!req.params.ingredientid || req.params.ingredientid === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined ingredientID'
            }
        }

        if(typeof parseInt(req.params.ingredientid) !== 'number'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for ingredient id'
            }
        }

        /* Remove the ingredient from the pantry */
        const result = await pantryModel.removeItem({
            pantryId: parseInt(req.params.pantryid),
            ingredientId: parseInt(req.params.ingredientid)
        })

        if(result.status === true){
            return res.status(200).json({
                status: 200,
                success: true,
                message: 'Ingredient successfully removed from the pantry'
            });
        } else {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'Unable to remove ingredient from the pantry'
            });
        }

    } catch(e) {
      /* Log out the issue(s) */
      appLogger.logMessage(
        'error', 
        `${moduleName}.${moduleMethod} - Status Code ${e.status}: ${e.message}`
        );

        return next(e);  
    }

}

/* 
 * Remove all items from a specific pantry
 */
const removeItems = async (req, res, next) => {

    const moduleMethod = 'removeItems';

    try{

        /* Validate request parameters */
        if(!req.params || req.params === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined request parameters'
            }
        }

        if(!req.params.pantryId || req.params.pantryId === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined pantryId'
            }
        }

        /* Remove the pantries ingredients */
        let id = parseInt(req.params.pantryId);
        const result = await pantryIngredientsModel.removeByPantry(id);

        if(!result || result.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
        }

        if(result?.length < 1){
            throw {
                status: 404,
                success: false,
                message: 'There are no ingredients to remove from the pantry'
            }
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: 'All ingredients removed from the pantry'
        });

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
 * Updates a pantry
 */
const update = async (req, res, next) => {

    const moduleMethod = 'update';

    try{

        /* Validate the request parameters and body values */
        if(!req.params || req.params === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined request parameters'
            }
        }

        if(!req.params.id || req.params.id === undefined){
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

        if(!req.body.ingredients || req.body.ingredients === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined ingredients'
            }
        }

        /* Lets update the specified record in the database 
         * do this one ingredient at a time
        */
        let payload = {
            id: parseInt(req.params.id),
            ingredients: req.body.ingredients,
        }

        const result = await pantryIngredientsModel.update(payload);
        
        if(!result || result.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
        }
        
        if(result?.length < 1){
            throw {
                status: 204,
                success: false,
                message: 'There was no pantry to update'
            }
        }

        res.status(200).json(
            {
                status: 200,
                success: true,
                message: 'Record successfully updated'
            }
        );

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
    listAll,
    list,
    create,
    add,
    removeAll,
    removeItems,
    removeItem,
    update
};