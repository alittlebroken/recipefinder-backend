/* Add in any modules we need to use */
require('dotenv').config();
const appLogger = require('../config/winston');

const recipesController = require('../controllers/recipesController');
const recipeCategoriesModel = require('../models/recipeCategoriesModel');
const recipeIngredientsModel = require('../models/recipeIngredientsModel');
const cookbookRecipesModel = require('../models/cookbookRecipesModel');
const recipeModel = require('../models/recipeModel');
const stepModel = require('../models/stepModel');

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
 * fReturns all steps for a particular recipe
 */
const listRecipeSteps = async (req, res, next) => {

    const moduleMethod = 'listRecipeSteps';

    try{

        /* Validate request body and parameters */
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

        /* Gather the steps from the DB */
        let id = parseInt(req.params.id);
        const results = await stepModel.findByRecipeId(id);

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
                message: 'This recipe currently has no steps'
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
 * Retrieve all categories assigned to a recipe
 */
const listRecipeCategories = async (req, res, next) => {

    const moduleMethod = 'listRecipeCategories';

    try{

        /* Validate request body & parameters */
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

        /* Get the data from the DB */
        let id = parseInt(req.params.id);
        const results = await recipeCategoriesModel.findByRecipe(id);

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
                message: 'This recipe currently has no categories'
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
 * Add a new recipe and it's associated data
 */
const create = async (req, res, next) => {

    const moduleMethod = 'create';

    try{

        /* Validate the Request parameters and body values */
        if(!req.body || req.body === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined request body'
            }
        }

        if(!req.body.recipe || req.body.recipe === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined recipe'
            }
        }

        if(typeof req.body.recipe !== 'object'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for recipe'
            }
        }

        if(!req.body.recipe.userId || req.body.recipe.userId === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined userId'
            }
        }

        if(typeof req.body.recipe.userId !== 'number'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for userId'
            };
        }

        if(!req.body.recipe.name || req.body.recipe.name === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined name'
            }
        }

        if(typeof req.body.recipe.name !== 'string'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for name'
            };
        }

        if(!req.body.recipe.servings || req.body.recipe.servings === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined servings'
            }
        }

        if(typeof req.body.recipe.servings !== 'number'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for servings'
            };
        }

        if(!req.body.recipe.calories_per_serving || req.body.recipe.calories_per_serving === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined calories_per_serving'
            }
        }

        if(typeof req.body.recipe.calories_per_serving !== 'number'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for calories_per_serving'
            };
        }

        if(!req.body.recipe.prep_time || req.body.recipe.prep_time === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined prep_time'
            }
        }

        if(typeof req.body.recipe.prep_time !== 'number'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for prep_time'
            };
        }

        if(!req.body.recipe.cook_time || req.body.recipe.cook_time === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined cook_time'
            }
        }

        if(typeof req.body.recipe.cook_time !== 'number'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for cook_time'
            };
        }

        if(!req.body.steps || req.body.steps === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined steps'
            };
        }

        if(Array.isArray(req.body.steps) !== true){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for steps'
            }
        }

        if(!req.body.ingredients || req.body.ingredients === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined ingredients'
            };
        }

        if(Array.isArray(req.body.ingredients) !== true){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for ingredients'
            }
        }

        if(!req.body.cookbookId || req.body.cookbookId === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined cookbookId'
            }
        }

        if(typeof req.body.cookbookId !== 'number'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for cookbookId'
            };
        }

        if(!req.body.categories || req.body.categories === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined categories'
            };
        }

        if(Array.isArray(req.body.categories) === false){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for categories'
            }
        }

        /* Add the recipe and supporting data to the database */
        let recipe = req.body.recipe;
        let steps = req.body.steps;
        let ingredients = req.body.ingredients;
        let cookbookId = req.body.cookbookId;
        let categories = req.body.categories;

        const result = await recipeModel.create(recipe, steps, ingredients, cookbookId, categories);

        if(!result || result.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
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

        res.status(200).json({
            status: 200,
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
   addRecipeIngredients
};