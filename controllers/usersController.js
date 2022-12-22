/* Add in any modules we need to use */
require('dotenv').config();
const appLogger = require('../config/winston');

const passport = require('passport');
const moduleName = 'userController';
const userModel = require('../models/userModel');

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
    listAll
};