/* Add in any modules we need to use */
require('dotenv').config();
const appLogger = require('../config/winston');

const moduleName = 'userController';
const userModel = require('../models/userModel');
const cookbookModel = require('../models/cookbookModel');
const recipeModel = require('../models/recipeModel');
const pantryIngredients = require('../models/pantryIngredientsModel');
const pantryModel = require('../models/pantryModel');

/* 
 * Retrieve a list of all users in the system
 */
const listAll = async (req, res, next) => {

    const moduleMethod = 'listAll';

    try{

        /* Pagination Options */
        let size = req.query.pageSize ? req.query.pageSize : 10
        let page = req.query.page ? req.querypage : 1

        if( size < 1) size = 1
        if( page < 1) page = 1

        let offset = parseInt((page - 1) * size)

        /* The pagination options to pass into the method returning results */
        const options = {
            page,
            size,
            offset
        }

        /* Validate any request headers or body parameters, if any */

        /* Extract the users from the DB */
        const results = await userModel.findAll(options);

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

        /* For non admin users we need to ensure that whenever a route requires an id
         * that we use the id for the current logged in user.
         * 
         * This ensure that a customer can't access or see another users details. Of course
         * admin roles do not have this restriction
        */
        if(req.user.roles !== 'admin'){
            /* Good, we are not an admin user so we can substitue out the id with the logged in
             * users id
             */
            console.log('User id before switch: ', id)
            id = req.user.id
            console.log('User id after switch:', id)
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
            throw{
                status: 500,
                success: false,
                message: results.message,
                results: []
            }
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

        /* Pagination Options */
        let size = req.query.pageSize ? req.query.pageSize : 10
        let page = req.query.page ? req.query.page : 1

        if( size < 1) size = 1
        if( page < 1) page = 1

        let offset = parseInt((page - 1) * size)

       /* The pagination options to pass into the method returning results */
        const options = {
            page,
            size,
            offset
        }

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

        /* For non admin users we need to ensure that whenever a route requires an id
         * that we use the id for the current logged in user.
         * 
         * This ensure that a customer can't access or see another users details. Of course
         * admin roles do not have this restriction
        */
        if(req.user.roles !== 'admin'){
            /* Good, we are not an admin user so we can substitue out the id with the logged in
             * users id
             */
            console.log('User id before switch: ', id)
            id = req.user.id
            console.log('User id after switch:', id)
        }

        /* Gather the results from the DB */
        const results = await recipeModel.findByUserId(id, options);
        
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
            throw{
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later',
                results: []
            };
        }

        /* Everything is OK, so send back the results */
        res.status(200).json({
            status: 200,
            success: true,
            message: '',
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
 * list a users cookbooks
 */
const listUserCookbooks = async (req, res, next) => {

    const moduleMethod = 'listUserCookbooks';

    try{

        /* Pagination Options */
        let size = req.query.pageSize ? req.query.pageSize : 10
        let page = req.query.page ? req.query.page : 1

        if( size < 1) size = 1
        if( page < 1) page = 1

        let offset = parseInt((page - 1) * size)

       /* The pagination options to pass into the method returning results */
        const options = {
            page,
            size,
            offset
        }

        /* Validate any passed in data */
        let id = Number.parseInt(req.params.id);

        if(!id || id === 'undefined' || id == null){
            res.status(400).json({
                status: 400,
                success: false,
                message: 'Undefined userId',
                results: []
            });
        }

        /* For non admin users we need to ensure that whenever a route requires an id
         * that we use the id for the current logged in user.
         * 
         * This ensure that a customer can't access or see another users details. Of course
         * admin roles do not have this restriction
        */
        if(req.user.roles !== 'admin'){
            /* Good, we are not an admin user so we can substitue out the id with the logged in
             * users id
             */
            console.log('User id before switch: ', id)
            id = req.user.id
            console.log('User id after switch:', id)
        }

        /* Gather the results from the DB */
        const results = await cookbookModel.findByUserId(id, options);

        /* Check the resaults if any and send back the appropriate response */
        if(results.length < 1){
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'The user currently has no cookbooks',
                results: []
            });
        }

        if(!results || results.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later',
                results: []
            };
        }

        /* Everything is OK, so send back the results */
        res.status(200).json({
            status: 200,
            success: true,
            message: '',
            results: results.results,
            totalPages: results.totalPages,
            totalRecords: results.totalRecords,
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
 * List a users ingredients from their pantry
 */
const listUserPantry = async (req, res, next) => {

    const moduleMethod = 'listUserPantry';

    try{

        /* Pagination Options */
        let size = req.query.pageSize ? req.query.pageSize : 10
        let page = req.query.page ? req.query.page : 1

        if( size < 1) size = 1
        if( page < 1) page = 1

        let offset = parseInt((page - 1) * size)

       /* The pagination options to pass into the method returning results */
        const options = {
            page,
            size,
            offset
        }

        /* Validate any passed in data */
        let id = Number.parseInt(req.params.id);

        if(!id || id === 'undefined' || id == null){
            res.status(400).json({
                status: 400,
                success: false,
                message: 'Undefined userId',
                results: []
            });
        }

        /* For non admin users we need to ensure that whenever a route requires an id
         * that we use the id for the current logged in user.
         * 
         * This ensure that a customer can't access or see another users details. Of course
         * admin roles do not have this restriction
        */
        if(req.user.roles !== 'admin'){
            /* Good, we are not an admin user so we can substitue out the id with the logged in
             * users id
             */
            console.log('User id before switch: ', id)
            id = req.user.id
            console.log('User id after switch:', id)
        }

        /* Gather the results from the DB */
        const results = await pantryIngredients.findByUser(id, options);

        /* Check the resaults if any and send back the appropriate response */
        if(results.length < 1){
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'The user currently has no pantry ingredients',
                results: []
            });
        }

        if(!results || results.success === false){
            return res.status(500).json({
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
        const result = await userModel.insert(req.body.username, req.body.password, req.body.email, );

        if(!result || result.success === false){
            throw {
                status: 500,
                success: false,
                message: result.message,
                results: []
            };
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
 * Add an ingredient to the users pantry
 */
const addUserPantry = async (req, res, next) => {

    const moduleMethod = 'addUserPantry';

    try{

        /* Validate any request parameters and or body varibales */
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

        if(!req.body.ingredientId || req.body.ingredientId === 'undefined'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined ingredientId',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.ingredientId !== 'number'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for ingredientId',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(!req.body.amount || req.body.amount === 'undefined'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined amount',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.amount !== 'number'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for amount',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(!req.body.amount_type || req.body.amount_type === 'undefined'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined amount_type',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.amount_type !== 'string'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for amount_type',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        /* Validation is ok, so lets get the users pantry and then add
           the ingredient to the desired pantry */
        const pantryResult = await pantryIngredients.findByUser(Number.parseInt(req.params.id));
        if(!pantryResult || pantryResult.length < 1 || pantryResult.success === false){
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Unable to find pantry for user',
                results: []
            })
        }
        
        const results = await pantryIngredients.create({
            pantryId: pantryResult[0].pantryId,
            ingredientId: req.body.ingredientId,
            amount: req.body.amount,
            amount_type: req.body.amount_type
        });

        if(results.success === false){
            return res.status(500).json({
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later',
                results: []
            })
        }

        /* All is OK at this point so lets return the users success */
        res.status(200).json({
            status: 200,
            success: true,
            message: 'Record successfully created',
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
 * Remove all user accounts
 */
const removeAllUsers = async (req, res, next) => {

    const moduleMethod = 'removeAllUsers';

    try{

        /* Execute the model to remove all users */
        const result = await userModel.removeAll();
        
        if(result.success === false && result.message === 'There was an issue with the resource, please try again later'){
            res.status(500).json({
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later',
                results: []
            })
        } else if(result.success === false && result.message === 'No customer accounts have been removed'){
            res.status(400).json({
                status: 400,
                success: false,
                message: 'No customer accounts have been removed',
                results: []
            })
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: 'All customer accounts successfully removed',
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
 * Remove a particular user from the system
 */
const removeUser = async (req, res, next) => {

    const moduleMethod = 'removeUser';

    try{

        /* Validate any passed in parameters */
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

        let id = req.params.id

        /* For non admin users we need to ensure that whenever a route requires an id
         * that we use the id for the current logged in user.
         * 
         * This ensure that a customer can't access or see another users details. Of course
         * admin roles do not have this restriction
        */
        if(req.user.roles !== 'admin'){
            /* Good, we are not an admin user so we can substitue out the id with the logged in
             * users id
             */
            id = req.user.id
        }

        /* Remove the user */
        const result = await userModel.remove(id);

        if(result?.success === false){
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
            message: 'The record was deleted successfully',
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
 * Delete all the recipes assigned to a specific user
 */
const removeUserRecipes = async (req, res, next) => {

    const moduleMethod = 'removeUserRecipes';

    try{

        /* Validate any passed in values */
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

        let id = req.params.id

        /* For non admin users we need to ensure that whenever a route requires an id
         * that we use the id for the current logged in user.
         * 
         * This ensure that a customer can't access or see another users details. Of course
         * admin roles do not have this restriction
        */
        if(req.user.roles !== 'admin'){
            /* Good, we are not an admin user so we can substitue out the id with the logged in
             * users id
             */
            id = req.user.id
        }

        /* remove the recipes for the user */
        const result = await recipeModel.removeAllByUser(id);

        if(result.success === false){
            switch(result.message){
                case "The user has no recipes to remove":
                    res.status(404).json({
                        status: 404,
                        success: false,
                        message: result.message,
                        results: []
                    });
                    break;
                default:
                    throw {
                        status: 500,
                        success: false,
                        message: 'There was a problem with the resource, please try again later',
                        results: []
                    };
                    break;
            }
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: 'All recipes successfully removed for specified user',
            results: []
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
 * Remove all of a users cookbooks
 */
const removeUserCookbooks = async (req, res, next) => {

    const moduleMethod = 'removeUserCookbooks';

    try{

        /* validate any passed in data that is needed */
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

        let id = req.params.id

        /* For non admin users we need to ensure that whenever a route requires an id
         * that we use the id for the current logged in user.
         * 
         * This ensure that a customer can't access or see another users details. Of course
         * admin roles do not have this restriction
        */
        if(req.user.roles !== 'admin'){
            /* Good, we are not an admin user so we can substitue out the id with the logged in
             * users id
             */
            id = req.user.id
        }

        /* remove the users cookbooks now validation has succeeded */
        const result = await cookbookModel.removeAllByUser(id);
        
        if(!result || result.success === false){
            return res.status(500).json({
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later',
                results: []
            })
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: 'All cookbooks successfully removed for the specifed user',
            results: []
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
const removeUserPantry = async (req, res, next) => {

    const moduleMethod = 'removeUserPantry';

    try{

        /* Validate any passed in values */
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

        let id = req.param.id

        /* For non admin users we need to ensure that whenever a route requires an id
         * that we use the id for the current logged in user.
         * 
         * This ensure that a customer can't access or see another users details. Of course
         * admin roles do not have this restriction
        */
        if(req.user.roles !== 'admin'){
            /* Good, we are not an admin user so we can substitue out the id with the logged in
             * users id
             */
            id = req.user.id
        }

        /* Attempt to remove the users pantries */
        const result  = await pantryModel.removeAllByUser(id);

        if(!result || result.success === false){
            res.status(500).json({
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later',
                results: []
            });
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: 'The users pantries have been removed successfully',
            results: []
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
 * Update user details
 */
const updateUser = async (req, res, next) => {

    const moduleMethod = 'updateUser';

    try{

        /* Validate passed in variables */
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

        if(!req.body.username || req.body.username === undefined){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined username',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.username !== 'string'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for username',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(!req.body.email || req.body.email === undefined){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined email',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.email !== 'string'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for email',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(!req.body.roles || req.body.roles === undefined){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined roles',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.roles !== 'string'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for roles',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(!req.body.forename || req.body.forename === undefined){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined forename',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.forename !== 'string'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for forename',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(!req.body.surname || req.body.surname === undefined){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined surname',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.surname !== 'string'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for surname',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        let id = req.params.id

        /* For non admin users we need to ensure that whenever a route requires an id
         * that we use the id for the current logged in user.
         * 
         * This ensure that a customer can't access or see another users details. Of course
         * admin roles do not have this restriction
        */
        if(req.user.roles !== 'admin'){
            /* Good, we are not an admin user so we can substitue out the id with the logged in
             * users id
             */
            id = req.user.id
        }

        /* Now update the specified user */
        const result  = await userModel.update(
            id,
            req.body.username,
            req.body.email,
            req.body.roles,
            req.body.forename,
            req.body.surname
        );

        if(result.success === false){
            switch(result.message){
                case "No records matched supplied data":
                    res.status(404).json({
                        status: 404,
                        success: false,
                        message: 'No user found matching the specified id',
                        results: []
                    });
                    break;
                default:
                    res.status(500).json({
                        status: 500,
                        success: false,
                        message: 'There was a problem with the resource, please try again later',
                        results: []
                    });
                    break;
            }
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: '',
            results: result
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
 * Update a users specified recipe
 */
const updateUserRecipe = async (req, res, next) => {

    const moduleMethod = 'updateUserRecipe';

    try{

        /* Perform validation of passed in values */
        let validationErrors;

        let {
            recipe,
            steps,
            ingredients,
            cookbooks,
            categories
        } = req.body;

        if(!req.params.id || req.params.id === 'undefined'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined userId',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);
       

        if(!recipe.recipeId || recipe.recipeId === 'undefined'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined recipeId',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof recipe.recipeId !== 'number'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for recipeId',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);
       

        if(!recipe.userId || recipe.userId === 'undefined'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined recipe userId',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof recipe.userId !== 'number'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for recipe userId',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);
       

        if(!recipe.name|| recipe.name === 'undefined'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined recipe name',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof recipe.name !== 'string'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for recipe name',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);
        

        if(!recipe.servings || recipe.servings === 'undefined'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined recipe servings',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof recipe.servings !== 'number'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for recipe servings',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);
        

        if(!recipe.calories_per_serving || recipe.calories_per_serving === 'undefined'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined recipe calories_per_serving',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof recipe.calories_per_serving !== 'number'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for recipe calories_per_serving',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);
       

        if(!recipe.prep_time || recipe.prep_time === 'undefined'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined recipe prep_time',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof recipe.prep_time !== 'number'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for recipe prep_time',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);
        

        if(!recipe.cook_time || recipe.cook_time === 'undefined'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined recipe cook_time',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof recipe.cook_time !== 'number'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for recipe cook_time',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);
       
        if(steps){
            if(!Array.isArray(steps)){
                validationErrors = {
                    status: 400,
                    success: false,
                    message: 'Wrong format for steps',
                    results: []
                }
            }
        }
        if(validationErrors) return next(validationErrors);
        
        if(ingredients){
            if(!Array.isArray(ingredients)){
                validationErrors = {
                    status: 400,
                    success: false,
                    message: 'Wrong format for ingredients',
                    results: []
                }
            }
        }
        if(validationErrors) return next(validationErrors);
        
        if(cookbooks){
            if(!Array.isArray(cookbooks)){
                validationErrors = {
                    status: 400,
                    success: false,
                    message: 'Wrong format for cookbooks',
                    results: []
                }
            }
        }
        if(validationErrors) return next(validationErrors);
       
        if(categories){
            if(!Array.isArray(categories)){
                validationErrors = {
                    status: 400,
                    success: false,
                    message: 'Wrong format for categories',
                    results: []
                }
            }
        }
        if(validationErrors) return next(validationErrors);
        
        /* Update the data within the database */
        const result = await recipeModel.update(
            {
                ...recipe,
                steps: steps,
                ingredients: ingredients,
                cookbooks: cookbooks,
                categories: categories
            }
        )
        
        if(!result || result.success === false){
            throw{
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later',
                results: []
            }
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: 'Recipe successfully updated',
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
const updateUserCookbook = async (req, res, next) => {

    const moduleMethod = 'updateUserCookbook';

    try{

        /* Validate any passed in variables */
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

        if(!req.body.cookbookId || req.body.cookbookId === undefined){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined cookbook id',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.cookbookId !== 'number'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for cookbook id',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(!req.body.name || req.body.name === undefined){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined name',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.name !== 'string'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for name',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(!req.body.description || req.body.description === undefined){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined description',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.description !== 'string'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for description',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(!req.body.image || req.body.image === undefined){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined image',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.image !== 'string'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for image',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        /* Now we can safely update the cookbook for the specified user */
        
        const result = await cookbookModel.update(
            Number.parseInt(req.body.cookbookId),
            Number.parseInt(req.params.id),
            req.body.name,
            req.body.description,
            req.body.image
        );
        
        if(!result || result.success === false){
            return res.status(500).json({
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later',
                results: []
            })
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: 'Cookbook successfully updated',
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
 * Updates a specific ingredient in a users pantry
 */
const updateUserPantry = async (req, res, next) => {

    const moduleMethod = 'updateUserPantry';

    try{

        /* Validate any passed in values */
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

        if(!req.body.id || req.body.id === 'undefined'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined record id',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.id !== 'number'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for record id',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(!req.body.pantryId || req.body.pantryId === 'undefined'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined pantryId',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.pantryId !== 'number'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for pantryId',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(!req.body.ingredientId || req.body.ingredientId === 'undefined'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined ingredientId',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.ingredientId !== 'number'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for ingredientId',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(!req.body.amount || req.body.amount === 'undefined'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined amount',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.amount !== 'number'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for amount',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(!req.body.amount_type || req.body.amount_type === 'undefined'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined amount_type',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        if(typeof req.body.amount_type !== 'string'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for amount_type',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors);

        /* Validation all ok now, so updated the appropriate record */
        const result = await pantryIngredients.update({
            id: req.body.id,
            pantryId: req.body.pantryId,
            ingredientId: req.body.ingredientId,
            amount:req.body.amount,
            amount_type: req.body.amount_type
        });

        if(!result || result.success === false){
            return res.status(500).json({
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later',
                results: []
            })
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: 'Pantry item successfully updated',
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
    createUserRecipe,
    addUserPantry,
    removeAllUsers,
    removeUser,
    removeUserRecipes,
    removeUserCookbooks,
    removeUserPantry,
    updateUser,
    updateUserRecipe,
    updateUserCookbook,
    updateUserPantry
};