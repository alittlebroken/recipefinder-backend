/* Add in any modules we need to use */
require('dotenv').config();
const appLogger = require('../config/winston');

const recipesController = require('../controllers/recipesController');
const recipeCategoriesModel = require('../models/recipeCategoriesModel');
const recipeIngredientsModel = require('../models/recipeIngredientsModel');
const cookbookRecipesModel = require('../models/cookbookRecipesModel');
const recipeModel = require('../models/recipeModel');

const moduleName = 'recipesController';

/* 
 * Returns all recipes stored within the database
 */
const listAll = async (req, res, next) => {

    const moduleMethod = 'listAll';

    try{

        /* Get a list of all recipes */
        const results = await recipeModel.findAll();

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
                message: 'There are currently no recipes'
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
 * returns the specified recipe and it's related data
 */
const list = async (req, res, next) => {

    const moduleMethod = 'list';

    try{

        /* Validate the request parameters and or body values */
        if(!req.params || req.params === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined request parameter'
            }
        }

        if(!req.params.id || req.params.id === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined id'
            }
        }

        /* Get the record from the database */
        let id = parseInt(req.params.id);
        const result = await recipeModel.findByRecipe(id);

        if(!result || result.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
        }

        if(result.length < 1){
            throw {
                status: 404,
                success: false,
                message: 'No recipe found matching supplied id'
            }
        }

        res.status(200).json(result);

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
 * Returns a list of ingredients for a specific recipe
 */
const listRecipeIngredients = async (req, res, next) => {

    const moduleMethod = 'listRecipeIngredients';

    try{

        /* Verify any request parameters and or body values*/
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

        /* Get the required data from the DB */
        let id = parseInt(req.params.id);
        const results = await recipeIngredientsModel.findByRecipeId();

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
                message: 'Recipe currently has no ingredients'
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
   listRecipeIngredients
};