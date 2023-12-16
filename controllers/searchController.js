/* Add in any modules we need to use */
require('dotenv').config();
const appLogger = require('../config/winston');

const passport = require('passport');

const recipeModel = require('../models/recipeModel');

const moduleName = 'searchController';

/* 
 * Search for recipes by name, ingredients or via specefic categories
 */
const performSearch = async (req, res, next) => {

    const moduleMethod = 'performSearch';

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

        /* Validate any request variables */
        let validationErrors;

        if(typeof req.body.terms !== 'string'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for search terms',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors)

        if(!req.body.typeOfSearch || req.body.typeOfSearch === undefined){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Undefined search type',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors)

        if(typeof req.body.typeOfSearch !== 'string'){
            validationErrors = {
                status: 400,
                success: false,
                message: 'Wrong format for search type',
                results: []
            }
        }
        if(validationErrors) return next(validationErrors)

        /* Now find the recipes */
        let results;
        /* If no search terms have been set then return all recipes */
        if(req.body.terms === '' || req.body.terms.length === 0){
            results = await recipeModel.findAll(options);
        } else {
            /* some terms have been set.
             * next we have to check if the search term is applicable to
             * recipes being found by name or if they are being found by
             * one or more ingredients
             */
            
            if(req.body.typeOfSearch.toLowerCase() === 'recipes'){
                results = await recipeModel.find(req.body.terms, options);
                
            } else if (req.body.typeOfSearch.toLowerCase() === 'ingredients') {
                results = await recipeModel.findByIngredients(req.body.terms, options);
                
            } else {
                results = await recipeModel.findByCategory(req.body.terms, options);
                
            }
        }

        /* Run some checks against the results and determine what needs to be returned */
        if(results?.success === false){
            return next({
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later',
                results: []
            })
        }

        let returnMessage;
        if(!results || results?.length < 1){
            /* Check the search type to allow us to return the correct message to return */
            if(req.body.typeOfSearch === 'recipes'){
                returnMessage = 'No matching recipes found by name';
            } else if(req.body.typeOfSearch === 'ingredients') {
                returnMessage = 'No recipes found using the supplied ingredients';
            } else {
                returnMessage = 'No recipes found for the supplied category';
            }

            return res.status(204).json({
                status: 204,
                success: false,
                message: returnMessage,
                results: []
            })
        }

        res.status(200).json(
            {
                status: 200,
                success: true,
                message: '',
                results: results
            }
        )

        
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
    performSearch
}