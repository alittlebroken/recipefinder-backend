/* Add in any modules we need to use */
require('dotenv').config();
const appLogger = require('../config/winston');

const categoriesController = require('../controllers/categoriesController');
const categoryModel = require('../models/categoryModel');
const cookbookCategoriesModel = require('../models/cookbookCategoriesModel');
const recipeCategoriesModel = require('../models/recipeCategoriesModel');

const moduleName = 'categoriesController';

/* 
 * Lists all categories stored in the DB
 */
const list = async (req, res, next) => {

    const moduleMethod = 'list';

    try{

        /* Get the pagination values */
        let page = req.query.page ? req.query.page : 1;
        let size = req.query.pageSize ? req.query.pageSize : 10;

        if(page < 1) page = 1
        if(size < 1) size = 1

        let offset = parseInt((page - 1) * size)

        /* Pagination options to send to the method that requires it */
        let options = {
            page,
            size,
            offset
        }

        /* List all the categories we have */
        const results = await categoryModel.findAll(options);

        if(!results || results.success === false){
            res.status(500).json(
                {
                    status: 500,
                    success: false,
                    message: 'There was a problem with the resource, please try again later'
                }
            )
        }

        if(results.length < 1){
            res.status(404).json({
                status: 404,
                success: false,
                message: 'There are no categories to return'
            })
        }

        res.status(200).json({
            results: results.results,
            totalRecords: results.totalRecords,
            totalPages: results.totalPages,
            currentPage: results.currentPage
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
 * Add a new categiry to the system
 */
const create = async (req, res, next) => {

    const moduleMethod = 'create';

    try{

        /* Validate any passed in values via request */
        let validationErrors;

        if(!req.body.name || req.body.name === undefined){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined category name'
            }
        }
        if(validationErrors) return next(validationErrors)

        if(typeof req.body.name !== 'string'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for category name'
            }
        }
        if(validationErrors) return next(validationErrors)

        /* Add the new category */
        const result = await categoryModel.create(req.body.name);

        if(!result || result.success === false){
            res.status(500).json({
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            })
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: 'Category successfully added'
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
 * Removes all categories from the database
 */
const removeAll = async (req, res, next) => {

    const moduleMethod = 'removeAll';

    try{

        /* Remove all categories */
        const result = await categoryModel.removeAll();

        if(!result || result.success === false){
            res.status(500).json({
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            })
        }

        if(result.length < 1){
            res.status(404).json({
                status: 404,
                success: false,
                message: 'There are no categories to remove'
            })
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: 'All categories removed successfully'
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
 * Remove a singular occurance of a category
 */
const remove = async (req, res, next) => {

    const moduleMethod = 'remove';

    try{

        /* Validate any req parameters */
        let validationErrors;

        if(!req.params.id || req.params.id === 'undefined'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined category id'
            }
        }
        if(validationErrors) return next(validationErrors);

        /* Remove the requested category */
        let id = parseInt(req.params.id);
        const result = await categoryModel.remove(id);

        if(!result || result.success === false){
            res.status(500).json({
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            })
        }

        if(result.length < 1){
            res.status(404).json({
                status: 404,
                success: false,
                message: 'No matching category found to be removed'
            })
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: 'Category successfully removed'
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
 * Update a particular category in the database
 */
const update = async (req, res, next) => {

    const moduleMethod = 'update';

    try{

        /* Validate the request parameters */
        let validationErrors;

        if(!req.params.id || req.params.id === 'undefined'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined category id'
            }
        }
        if(validationErrors) return next(validationErrors)

        if(!req.body.name || req.body.name === undefined){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined category name'
            }
        }
        if(validationErrors) return next(validationErrors)

        if(typeof req.body.name !== 'string'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for category name'
            }
        }
        if(validationErrors) return next(validationErrors)
        
        /* Update the specified parameter */
        let id = parseInt(req.params.id);
        let name = req.body.name;

        const result = await categoryModel.update(id, name);
        
        if(!result || result.success === false){
            res.status(500).json({
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            })
        }

        if(result.length < 1){
            res.status(404).json({
                status: 404,
                success: false,
                message: 'There are no records to update matching the supplied id'
            })
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: result.message
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
    list,
    create,
    removeAll,
    remove,
    update
};