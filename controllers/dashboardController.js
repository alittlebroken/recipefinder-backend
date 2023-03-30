/* Add in any modules we need to use */
require('dotenv').config();
const appLogger = require('../config/winston');
const passport = require('passport');
const dashModel = require('../models/dashboardModel')

const moduleName = 'dashboardController';

/* 
 * Returns all neccessary details doe displaying on the admin dashboard
 */
const getDashboard = async (req, res, next) => {

    const moduleMethod = 'getDashboard';

    try{
        
        /* Build up the data we need for the dashboard */
        let recipeResults = await dashModel.countRecipes()
        let userResults = await dashModel.countUsers()
        let ingredientResults = await dashModel.countIngredients()

        let recStats = await dashModel.resourceStats('recipes')
        let usrStats = await dashModel.resourceStats('users')
        let ingStats = await dashModel.resourceStats('ingredients')

        /* Check the data returned from the models */
        let recipeStats;
        let userStats;
        let ingredientStats;

        if(Array.isArray(recipeResults) && recipeResults?.length > 0){
            recipeStats = recStats
        }

        if(Array.isArray(userResults) && userResults?.length > 0){
            userStats = usrStats
        }

        if(Array.isArray(ingredientResults) && ingredientResults?.length > 0){
            ingredientStats = ingStats
        }

        /* Before we send any data back lets build the payload */
        const payload = {
            recipes: recipeStats,
            users: userStats,
            ingredients: ingredientStats
        }
        
        res.status(200).json({
            status: 200,
            success: true,
            data: payload
        })

    } catch(e) {
        console.log(e)
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
    getDashboard
}