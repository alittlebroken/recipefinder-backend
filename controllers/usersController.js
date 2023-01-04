/* Add in any modules we need to use */
require('dotenv').config();
const appLogger = require('../config/winston');

const passport = require('passport');
const moduleName = 'userController';
const userModel = require('../models/userModel');
const cookbookModel = require('../models/cookbookModel');
const recipeModel = require('../models/recipeModel');
const pantryIngredients = require('../models/pantryIngredientsModel');
const { emptyQuery } = require('pg-protocol/dist/messages');

/* 
 * Retrieve a list of all users in the system
 */
const listAll = async (req, res, next) => {

    const moduleMethod = 'listAll';

    try{

        /* Validate any request headers or body parameters, if any */

        /* Extract the users from the DB */
        const results = await userModel.findAll();

        if(!results || results.length < 1){
            res.status(404).json({
                status: 404,
                success: false,
                message: "There currently no users in the system",
                results: []
            })
        }

        if(results.success === false){
            res.status(500).json({
                success: false,
                status: 500,
                message: 'There was a problem with the resource, please try again later',
                results: []
            })
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: '',
            results: results
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
 * Retrieve a particular users Information
 */
const listUser = async (req, res, next) => {

    const moduleMethod = 'listUser';

    try{

        /* Validate request parameters, headers and body if required */
        let id = req.params.id;
        
        if(id === 'undefined' || !id || id === null){
            res.status(400).json({
                status: 400,
                success: false,
                message: 'Undefined userId',
                results: []
            });
        }

        /* All appears correct in the request parameters, now actually extract the
         * record from the database */
        const results = await userModel.findById(parseInt(id));

        /* Process any results and then send the expected output back */
        if(!results || results.length < 1){
            res.status(404).json({
                status: 404,
                success: false,
                message: 'No user found matching that id',
                results: []
            });
        }

        if(results.success === false){
            res.status(500).json({
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later',
                results: []
            })
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: '',
            results: results
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
 * List all of a users recipes otherwise return an empty array
 */
const listUserRecipes = async (req, res, next) => {

    const moduleMethod = 'listUserRecipes';

    try{

        /* Validate any passed in data */
        let id = req.params.id;

        if(!id || id === 'undefined' || id == null){
            res.status(400).json({
                status: 400,
                success: false,
                message: 'Undefined userId',
                results: []
            });
        }

        /* Gather the results from the DB */
        const results = await recipeModel.findByUserId(id);

        /* Check the resaults if any and send back the appropriate response */
        if(results.length < 1){
            res.status(404).json({
                status: 404,
                success: false,
                message: 'The user currently has no recipes',
                results: []
            });
        }

        if(!results || results.success === false){
            res.status(500).json({
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later',
                results: []
            });
        }

        /* Everything is OK, so send back the results */
        res.status(200).json({
            status: 200,
            success: true,
            message: '',
            results: results
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
 * list a users cookbooks
 */
const listUserCookbooks = async (req, res, next) => {

    const moduleMethod = 'listUserCookbooks';

    try{

        /* Validate any passed in data */
        let id = req.params.id;

        if(!id || id === 'undefined' || id == null){
            res.status(400).json({
                status: 400,
                success: false,
                message: 'Undefined userId',
                results: []
            });
        }

        /* Gather the results from the DB */
        const results = await cookbookModel.findByUserId(id);

        /* Check the resaults if any and send back the appropriate response */
        if(results.length < 1){
            res.status(404).json({
                status: 404,
                success: false,
                message: 'The user currently has no cookbooks',
                results: []
            });
        }

        if(!results || results.success === false){
            res.status(500).json({
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later',
                results: []
            });
        }

        /* Everything is OK, so send back the results */
        res.status(200).json({
            status: 200,
            success: true,
            message: '',
            results: results
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
 * List a users ingredients from their pantry
 */
const listUserPantry = async (req, res, next) => {

    const moduleMethod = 'listUserPantry';

    try{

        /* Validate any passed in data */
        let id = req.params.id;

        if(!id || id === 'undefined' || id == null){
            res.status(400).json({
                status: 400,
                success: false,
                message: 'Undefined userId',
                results: []
            });
        }

        /* Gather the results from the DB */
        const results = await pantryIngredients.findByUser(id);

        /* Check the resaults if any and send back the appropriate response */
        if(results.length < 1){
            res.status(404).json({
                status: 404,
                success: false,
                message: 'The user currently has no pantry ingredients',
                results: []
            });
        }

        if(!results || results.success === false){
            res.status(500).json({
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later',
                results: []
            });
        }

        /* Everything is OK, so send back the results */
        res.status(200).json({
            status: 200,
            success: true,
            message: '',
            results: results
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
 * Creates a new user
 */
const createUser = async (req, res, next) => {

    const moduleMethod = 'createUser';

    try{

        /* Validate any passed in variables */
        let validationErrors;

        if(!req.body.username || req.body.username === undefined){
            validationErrors = {
                status: 400,
                success: false,
                results: [],
                message: 'Undefined username'
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.username !== 'string'){
            validationErrors = {
                status: 400,
                success: false,
                results: [],
                message: 'Wrong format for username'
            }
        }
        if(validationErrors) return next(validationErrors);

        if(!req.body.email || req.body.email === undefined){
            validationErrors = {
                status: 400,
                success: false,
                results: [],
                message: 'Undefined email'
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.email !== 'string'){
            validationErrors = {
                status: 400,
                success: false,
                results: [],
                message: 'Wrong format for email'
            }
        }
        if(validationErrors) return next(validationErrors);

        if(!req.body.password || req.body.password === undefined){
            validationErrors = {
                status: 400,
                success: false,
                results: [],
                message: 'Undefined password'
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.password !== 'string'){
            validationErrors = {
                status: 400,
                success: false,
                results: [],
                message: 'Wrong format for password'
            }
        }
        if(validationErrors) return next(validationErrors);

        /* Add the user to the DB */
        const result = await userModel.insert(req.body.username, req.body.email, req.body.password);

        if(!result || result.success === false){
            res.status(500).json({
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later',
                results: []
            });
        }

        /* No issues found send back the details of the newly created user */
        res.status(200).json({
            status: 200,
            success: true,
            message: '',
            results: result
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
 * Adds a new recipe for a user
 */
const createUserRecipe = async (req, res, next) => {

    const moduleMethod = 'createUserRecipe';

    try{

        /* Validate any request params and or body variables */
        let validationErrors;
        if(!req.params.id || req.params.id === 'undefined'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined userId',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(!req.body.recipe || req.body.recipe === undefined){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined recipe',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.recipe !== 'object'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for recipe',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(!req.body.recipe.userId || req.body.recipe.userId === undefined){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined recipe userId',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.recipe.userId !== 'number'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for recipe userId',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(!req.body.recipe.name || req.body.recipe.name === undefined){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined recipe name',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.recipe.name  !== 'string'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for recipe name',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(!req.body.recipe.servings || req.body.recipe.servings === undefined){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined recipe servings',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.recipe.servings !== 'number'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for recipe servings',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(!req.body.recipe.calories_per_serving || req.body.recipe.calories_per_serving === undefined){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined recipe calories_per_serving',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.recipe.calories_per_serving !== 'number'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for recipe calories_per_serving',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(!req.body.recipe.prep_time || req.body.recipe.prep_time === undefined){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined recipe prep_time',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.recipe.prep_time !== 'number'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for recipe prep_time',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(!req.body.recipe.cook_time || req.body.recipe.cook_time === undefined){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined recipe cook_time',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.recipe.cook_time !== 'number'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for recipe cook_time',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(!req.body.steps || req.body.steps === undefined){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined steps',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(Array.isArray(req.body.steps) !== true){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for steps',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(!req.body.ingredients || req.body.ingredients === undefined){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined ingredients',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(Array.isArray(req.body.ingredients) !== true){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for ingredients',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(!req.body.cookbookId || req.body.cookbookId === undefined){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined cookbookId',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.cookbookId !== 'number'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for cookbookId',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(!req.body.categories || req.body.categories === undefined){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined categories',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(Array.isArray(req.body.categories) !== true){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for categories',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        /* Validation must have passed at this point so lets just insert 
            the record */
        const result = await recipeModel.create(req.body.recipe, req.body.steps, req.body.ingredients, req.body.cookbookId, req.body.categories);

        if(result.success === false){
            res.status(500).json({
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later',
                results: []
            });
        }

        /* Send back any results */
        res.status(200).json({
            status: 200,
            success: true,
            message: 'Recipe successfully added',
            results: []
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
    listAll,
    listUser,
    listUserRecipes,
    listUserCookbooks,
    listUserPantry,
    createUser,
    createUserRecipe
};