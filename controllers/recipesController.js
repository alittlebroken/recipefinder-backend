/* Add in any modules we need to use */
require('dotenv').config();
const appLogger = require('../config/winston');

const recipesController = require('../controllers/recipesController');
const recipeCategoriesModel = require('../models/recipeCategoriesModel');
const recipeIngredientsModel = require('../models/recipeIngredientsModel');
const cookbookRecipesModel = require('../models/cookbookRecipesModel');
const recipeModel = require('../models/recipeModel');
const stepModel = require('../models/stepModel');
const { deserializeUser } = require('passport');

const moduleName = 'recipesController';

/* 
 * Returns all recipes stored within the database
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

        /* Get a list of all recipes */
        const results = await recipeModel.findAll(options);
        
        if(!results || results.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
        }
        
        if(results.results.length < 1){
            return res.status(200).json({
                status: 200,
                success: false,
                message: 'No recipes have been found',
                results: []
            }); 
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
 * returns the specified recipe and it's related data
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

        /* Validate the request parameters and or body values */
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

        /* Get the record from the database */
        let id = parseInt(req.params.id);
        const result = await recipeModel.findByRecipe(id, options);

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

        /* Verify any request parameters and or body values*/
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

        /* Get the required data from the DB */
        let id = parseInt(req.params.id);
        const results = await recipeIngredientsModel.findByRecipeId(id, options);

        if(!results || results.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
        }

        if(results.length < 1){
            throw {
                status: 204,
                success: false,
                message: 'Recipe currently has no ingredients'
            }
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
 * fReturns all steps for a particular recipe
 */
const listRecipeSteps = async (req, res, next) => {

    const moduleMethod = 'listRecipeSteps';

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

        /* Validate request body and parameters */
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

        /* Gather the steps from the DB */
        let id = parseInt(req.params.id);
        const results = await stepModel.findByRecipeId(id, options);

        if(!results || results.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
        }

        if(results.length < 1){
            throw {
                status: 204,
                success: false,
                message: 'This recipe currently has no steps'
            }
        }

        res.status(200).json(
            {
                results: results.results,
                totalRecords: results.totalRecords,
                totalPages: results.totalPages,
                currentPage: results.currentPage
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
 * Retrieve all categories assigned to a recipe
 */
const listRecipeCategories = async (req, res, next) => {

    const moduleMethod = 'listRecipeCategories';

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

        /* Validate request body & parameters */
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

        /* Get the data from the DB */
        let id = parseInt(req.params.id);
        const results = await recipeCategoriesModel.findByRecipe(id, options);

        if(!results || results.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
        }

        if(results.length < 1){
            throw {
                status: 204,
                success: false,
                message: 'This recipe currently has no categories'
            }
        }

        res.status(200).json({
            results: results.results,
            totalPages: results.totalPages,
            totalRecords: results.totalPages,
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
 * Add a new recipe and it's associated data
 */
const create = async (req, res, next) => {

    const moduleMethod = 'create';

    /* Destructure the passed in params so we can cast them to the correct
       types */
    const userid = parseInt(req.body.userId)
    const name = req.body.name
    const description = req.body.description
    const servings = parseInt(req.body.servings)
    const calories_per_serving = parseInt(req.body.calories_per_serving)
    const prep_time = parseInt(req.body.prep_time)
    const cook_time = parseInt(req.body.cook_time)

    try{

        /* Validate the Request parameters and body values */
        if(!userid || userid === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined userId'
            }
        }

        if(typeof userid !== 'number'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for userId'
            };
        }

        if(!name || name === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined name'
            }
        }

        if(typeof name !== 'string'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for name'
            };
        }

        if(!description || description === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined description'
            }
        }

        if(typeof description !== 'string'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for description'
            };
        }

        if(!servings || servings === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined servings'
            }
        }

        if(typeof servings !== 'number'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for servings'
            };
        }

        if(!calories_per_serving || calories_per_serving === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined calories_per_serving'
            }
        }

        if(typeof calories_per_serving !== 'number'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for calories_per_serving'
            };
        }

        if(!prep_time || prep_time === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined prep_time'
            }
        }

        if(typeof prep_time !== 'number'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for prep_time'
            };
        }

        if(!cook_time || cook_time === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined cook_time'
            }
        }

        if(typeof cook_time !== 'number'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for cook_time'
            };
        }

        


        /* Add the recipe and supporting data to the database */
        let recipe = {
            userId: userid,
            name: name,
            description: description,
            servings: servings,
            calories_per_serving: calories_per_serving,
            prep_time: prep_time,
            cook_time: cook_time
        };

        let steps = req.body.steps ? req.body.steps : null;
        let ingredients = req.body.ingredients ? req.body.ingredients : null;
        let cookbookId = req.body.cookbookId ? req.body.cookbookId : null;
        let cookbooks = req.body.cookbooks ? req.body.cookbooks : null;
        let categories = req.body.categories ? req.body.categories : null;

        const result = await recipeModel.create(recipe, steps, ingredients, cookbooks, categories);

        if(!result || result.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
        }

        res.status(201).json(result);

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
 * Adds an ingredient to a recipe
 */
const addRecipeIngredients = async (req, res, next) => {

    const moduleMethod = 'addRecipeIngredients';

    try{

        /* Validate the request values */
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

        if(!req.body.ingredientId || req.body.ingredientId === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined ingredientId'
            }
        }

        if(typeof req.body.ingredientId !== 'number'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for ingredientId'
            }
        }

        if(!req.body.amount || req.body.amount === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined amount'
            }
        }

        if(typeof req.body.amount !== 'number'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for amount'
            }
        }

        if(!req.body.amount_type || req.body.amount_type === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined amount_type'
            }
        }
        
        if(typeof req.body.amount_type !== 'string'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for amount_type'
            }
        }

        /* Add the ingredient to the recipe */
        let payload = {
            recipeId: parseInt(req.params.id),
            ingredientId: parseInt(req.body.ingredientId),
            amount: parseInt(req.body.amount),
            amount_type: req.body.amount_type
        };

        const result = await recipeIngredientsModel.create(payload);

        if(!result || result.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
        }

        res.status(201).json({
            status: 201,
            success: true,
            message: 'Ingredient successfully added to recipe'
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
 * add a new step to a recipe
 */
const addRecipeSteps = async (req, res, next) => {

    const moduleMethod = 'addRecipeSteps';

    try{

        /* Validate the request parameter and body variables */
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

        if(!req.body.stepNo || req.body.stepNo === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined stepNo'
            }
        }

        if(typeof req.body.stepNo !== 'number'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for stepNo'
            }
        }

        if(!req.body.stepContent || req.body.stepContent === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined stepContent'
            }
        }

        if(typeof req.body.stepContent !== 'string'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for stepContent'
            }
        }

        /* Add the record to the database */
        let recipeId = parseInt(req.params.id);
        let stepNo = parseInt(req.body.stepNo);
        let content = req.body.stepContent;

        const result = await stepModel.create(recipeId, stepNo, content);

        if(!result || result.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
        }

        res.status(201).json({
            success: true,
            message: 'Step has been successfully added to the recipe'
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
 * Associates a category with a recipe
 */
const addRecipeCategories = async (req, res, next) => {

    const moduleMethod = 'addRecipeCategories';

    try{

        /* Validate the request parameters and body */
        if(!req.params || req.params === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined request parameters'
            }
        }

        if(!req.params.id || req.params.id === 'undefined'){
            throw{
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

        if(!req.body.categoryId || req.body.categoryId === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined categoryId'
            }
        }

        /* Add the association between the category and recipe */
        let id = parseInt(req.params.id);
        let categoryId = parseInt(req.body.categoryId);

        const result = await recipeCategoriesModel.create({
            recipeId: id,
            categoryId
        });

        if(!result || result.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
        }

        res.status(201).json(result);

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
 * removes all recipes from the database
 */
const removeAll = async (req, res, next) => {

    const moduleMethod = 'removeAll';

    try{

        /* Remove any and or all recipes */
        const result = await recipeModel.removeAll();

        if(!result || result.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
        }

        if(result < 1){
            res.status(404).json({
                status: 404,
                success: false,
                message: 'No recipes found to be removed'
            })
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: 'All recipes removed successfully'
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
 * remove a particulare recipe from the database
 */
const remove = async (req, res, next) => {

    const moduleMethod = 'remove';

    try{

        /* Validate the request parameters and body values */
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

        /* Remove the recipe */
        let id = parseInt(req.params.id);

        const result = await recipeModel.remove(id);

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
                message: 'No recipe found to be removed'
            }
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: 'Recipe successfully removed'
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
 * remove all ingredients for a recipe
 */
const removeRecipeIngredients = async (req, res, next) => {

    const moduleMethod = 'removeRecipeIngredients';

    try{

        /* Validate the request paraaters and body  */
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

    /* Remove the ingredients */
    let id = parseInt(req.params.id);
    const result = await recipeIngredientsModel.removeAllByRecipeId(id);

    if(!result || result.success === false){
        throw {
            status: 500,
            success: false,
            message: 'There was a problem with the resource, please try again later'
        }
    }

    if(result.length < 1){
        res.status(404).json({
            status: 404,
            success: false,
            message: 'The recipe has no ingredients to remove'
        })
    } else {
        res.status(200).json({
            status: 200,
            success: true,
            message: 'All ingredients have been removed from the recipe'
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

};

/* 
 * remove all steps for a recipe
 */
const removeRecipeSteps = async (req, res, next) => {

    const moduleMethod = 'removeRecipeSteps';

    try{

        /* Validate request parameters and body */
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

        /* Remove the steps from the recipe */
        let id = parseInt(req.params.id);
        const result = await stepModel.removeAllByRecipe(id);
        
        if(!result || result.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
        }

        if(result.length < 1){
            res.status(404).json({
                status: 404,
                success: false,
                message: 'The recipe has no steps to remove'
            })
        } else {
            res.status(200).json({
                status: 200,
                success: true,
                message: 'Steps successfully removed from recipe'
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

};

/* 
 * remove all categories for a recipe
 */
const removeRecipeCategories = async (req, res, next) => {

    const moduleMethod = 'removeRecipeCategories';

    try{

        /* Validate request parameters and body */
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

        /* Remove the recipes categories */
        let id = parseInt(req.params.id);
        const result = await recipeCategoriesModel.removeByRecipe(id);

        if(!result || result.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
        }

        if(result.length < 1){
            res.status(404).json({
                status: 404,
                success: false,
                message: 'The recipe has no categories to remove'
            });
        } else {
            res.status(200).json({
                status: 200,
                success: true,
                message: 'Categories have been removed from the recipe successfully'
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

};

/* 
 * Updates the specified recipe within the database
 */
const update = async (req, res, next) => {

    const moduleMethod = 'update';

    try{

        /* Extract out all the number body parameters and convert them from strings */
        const id = parseInt(req.params.id)
        const userId = parseInt(req.body.userId)
        const servings = parseInt(req.body.servings)
        const calories_per_serving = parseInt(req.body.calories_per_serving)
        const prep_time = parseInt(req.body.prep_time)
        const cook_time = parseInt(req.body.cook_time)
       

        /* Validate request parameters and body */
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

        if(typeof req.body.name !== 'string'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for name'
            }
        }

        if(!userId || userId === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined userId'
            }
        }

        if(typeof userId !== 'number'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for userId'
            }
        }

        if(!servings || servings === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined servings'
            }
        }

        if(typeof servings !== 'number'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for servings'
            }
        }

        if(!calories_per_serving || calories_per_serving === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined calories_per_serving'
            }
        }

        if(typeof calories_per_serving !== 'number'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for calories_per_serving'
            }
        }

        if(!prep_time || prep_time === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined prep_time'
            }
        }

        if(typeof prep_time !== 'number'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for prep_time'
            }
        }

        if(!cook_time || cook_time === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined cook_time'
            }
        }

        if(typeof cook_time !== 'number'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for cook_time'
            }
        }

        /* Check we have data to pass for the various recipe related data */
        let steps = req.body.steps ? req.body.steps : undefined
        let ingredients = req.body.ingredients ? req.body.ingredients : undefined
        let cookbooks = req.body.cookbooks ? req.body.cookbooks : undefined
        let categories = req.body.categories ? req.body.categories : undefined

        /* Set the data to be added in one easy to use object */
        const recipeToAdd = {
            recipeId: id,
            name: req.body.name,
            description: req.body.description ? req.body.description : null,
            userId: userId,
            servings: servings,
            calories_per_serving: calories_per_serving,
            prep_time: prep_time,
            cook_time: cook_time,
            steps: [...steps],
            ingredients: [...ingredients],
            cookbooks: [...cookbooks],
            categories: [...categories]
        }

        const result = await recipeModel.update(recipeToAdd);

        if(!result || result.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
        }

        if(result.length < 1){
            res.status(404).json({
                status: 404,
                success: false,
                message: 'No recipe found to update'
            });
        } else {
            res.status(200).json({
                status: 200,
                success: true,
                message: 'Recipe successfully updated' 
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
   listRecipeIngredients,
   listRecipeSteps,
   listRecipeCategories,
   create,
   addRecipeIngredients,
   addRecipeSteps,
   addRecipeCategories,
   removeAll,
   remove,
   removeRecipeIngredients,
   removeRecipeSteps,
   removeRecipeCategories,
   update
};