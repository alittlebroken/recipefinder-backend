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

        if(!req.params.id || req.params.id === 'undefined'){
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

        if(!req.params.id || req.params.id === 'undefined'){
            throw {
                status: 400,
                success: false,
                message: 'Undefined id'
            }
        }

        /* Get the required data from the DB */
        let id = parseInt(req.params.id);
        const results = await recipeIngredientsModel.findByRecipeId(id);

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

        if(!req.params.id || req.params.id === 'undefined'){
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

        if(!req.params.id || req.params.id === 'undefined'){
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

        res.status(200).json({
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

        const result = recipeModel.remove(id);
        
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

        if(!req.body.userId || req.body.userId === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined userId'
            }
        }

        if(typeof req.body.userId !== 'number'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for userId'
            }
        }

        if(!req.body.servings || req.body.servings === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined servings'
            }
        }

        if(typeof req.body.servings !== 'number'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for servings'
            }
        }

        if(!req.body.calories_per_serving || req.body.calories_per_serving === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined calories_per_serving'
            }
        }

        if(typeof req.body.calories_per_serving !== 'number'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for calories_per_serving'
            }
        }

        if(!req.body.prep_time || req.body.prep_time === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined prep_time'
            }
        }

        if(typeof req.body.prep_time !== 'number'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for prep_time'
            }
        }

        if(!req.body.cook_time || req.body.cook_time === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined cook_time'
            }
        }

        if(typeof req.body.cook_time !== 'number'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for cook_time'
            }
        }

        if(!req.body.rating || req.body.rating === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined rating'
            }
        }

        if(typeof req.body.rating !== 'number'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong format for rating'
            }
        }

        /* Actually update the desired record now */
        const result = await recipeModel.update({
            id: parseInt(req.params.id),
            name: req.body.name,
            userId: parseInt(req.body.userId),
            servings: parseInt(req.body.servings),
            calories_per_serving: parseInt(req.body.calories_per_serving),
            prep_time: parseInt(req.body.prep_time),
            cook_time: parseInt(req.body.cook_time),
            rating: parseInt(req.body.rating)
        });

        

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