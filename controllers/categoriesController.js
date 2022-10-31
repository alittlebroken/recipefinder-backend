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

        /* List all the categories we have */
        const results = await categoryModel.findAll();

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
                message: 'There are no categories to return'
            }
        }

        res.status(200).json(results);

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

        /* Add the new category */
        const result = await categoryModel.create(req.body.name);

        if(!result || result.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
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
                message: 'No categories found to be removed'
            }
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
    removeAll
};