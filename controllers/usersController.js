/* Add in any modules we need to use */
require('dotenv').config();
const appLogger = require('../config/winston');

const passport = require('passport');
const moduleName = 'userController';
const userModel = require('../models/userModel');
const recipeModel = require('../models/recipeModel');

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
    listUserRecipes
};