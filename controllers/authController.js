/* Add in any modules we need to use */
require('dotenv').config();
const appLogger = require('../config/winston');

const passport = require('passport');

const userModel = require('../models/userModel');

const moduleName = 'authController';

/* 
 * Log a user into the application
 */
const loginUser = async (req, res, next) => {

    const moduleMethod = 'loginUser';

    try {

        /* store state of validation error */
        let validationError = null;

        /* Validate the request body and headers */
        if(!req.body || req.body === undefined){
            validationError = {
                status: 400,
                success: false,
                message: 'Undefined request body'
            }
        }
        if(validationError) return next(validationError);

        /* if(!req.get('secret_token')){
            validationError = {
                status: 401,
                success: false,
                message: 'Undefined secret_token'
            }
        }
        if(validationError) return next(validationError);
        */

        /*if(req.get('secret_token') && req.get('secret_token') !== process.env.JWT_TOKEN_SECRET){
            validationError = {
                status: 401,
                success: false,
                message: 'Incorrect secret_token'
            }
        }
        if(validationError) return next(validationError);
        */

        if(!req.body.username || req.body.username === undefined){
            validationError = {
                status: 400,
                success: false,
                message: 'Undefined username'
            }
        }
        if(validationError) return next(validationError);

        if(typeof req.body.username !== 'string'){
            validationError = {
                status: 400,
                success: false,
                message: 'Wrong format for username'
            }
        }
        if(validationError) return next(validationError);

        if(!req.body.password || req.body.password === undefined){
            validationError = {
                status: 400,
                success: false,
                message: 'Undefined password'
            }
        }
        if(validationError) return next(validationError);

        if(typeof req.body.password !== 'string'){
            validationError = {
                status: 400,
                success: false,
                message: 'Wrong format for password'
            }
        }
        if(validationError) return next(validationError);

        /* Authenticate the user */
        await passport.authenticate('local', async (error, user, info) => {

            /* Determinesd if there was an error and what to return */
            let errorFound = null;

            /* Check to see if passport has returned an error at all */
            if(error || !user){
                
                if(info?.message === 'user not found'){
                    errorFound = {
                        status: 404,
                        success: false,
                        message: 'User not found'
                    }
                } else if(info?.message === 'Wrong password'){
                    errorFound = {
                        status: 409,
                        success: false,
                        message: 'Specified password is incorrect'
                    }
                } else if(info?.message === 'Missing credentials'){
                    errorFound = {
                        status: 404,
                        success: false,
                        message: 'Missing username or password'
                    }
                } else {
                    errorFound = {
                        status: 500,
                        success: false,
                        message: 'There was a problem with the resource, please try again later'
                    }
                }
            }
            
            if(errorFound) return next(errorFound);

            /* Generate the token to send back */
            req.login(user, { session: false }, async (err) => {
                if(err) return next(err);

                const tokenBody = {
                    id: user.user_id,
                    email: user.email,
                    forename: user.forename,
                    surname: user.surname,
                    roles: user.roles
                }

                /* create a new token */
                let token = await userModel.generateToken({ user: tokenBody });
                
                return res.json({ token });

            });

        })(req, res, next);

        } catch(e) {
            //console.log(e)
            /* Log out the issue(s) */
            appLogger.logMessage(
                'error', 
                `${moduleName}.${moduleMethod} - Status Code ${e.status}: ${e.message}`
            );

        return next(e);
    }

};

/* 
 * Registers a new user to the system
 */
const createUser = async (req, res, next) => {

    const moduleMethod = 'createUser';

    try{

        /* Validate request headers, body and parameters */
        let validationResult;

        if(!req.body.username || req.body.username === undefined){
            validationResult = {
                status: 400,
                success: false,
                message: 'Undefined username'
            }
        }
        if(validationResult) return next(validationResult);

        if(typeof req.body.username !== 'string'){
            validationResult = {
                status: 400,
                success: false,
                message: 'Wrong format for username'
            }
        }
        if(validationResult) return next(validationResult);

        if(!req.body.password || req.body.password === undefined){
            validationResult = {
                status: 400,
                success: false,
                message: 'Undefined password'
            }
        }
        if(validationResult) return next(validationResult);

        if(typeof req.body.password !== 'string'){
            validationResult = {
                status: 400,
                success: false,
                message: 'Wrong format for password'
            }
        }
        if(validationResult) return next(validationResult);

        if(!req.body.email || req.body.email === undefined){
            validationResult = {
                status: 400,
                success: false,
                message: 'Undefined email'
            }
        }
        if(validationResult) return next(validationResult);

        if(typeof req.body.email !== 'string'){
            validationResult = {
                status: 400,
                success: false,
                message: 'Wrong format for email'
            }
        }
        if(validationResult) return next(validationResult);

        if(!req.get('secret_token')){
            validationResult = {
                status: 401,
                success: false,
                message: 'Undefined secret_token'
            }
        }
        if(validationResult) return next(validationResult);
 
        if(req.get('secret_token') && req.get('secret_token') !== process.env.JWT_TOKEN_SECRET){
            validationResult = {
                status: 401,
                success: false,
                message: 'Incorrect secret_token'
            }
        }
        if(validationResult) return next(validationResult);

        /* Now get passport to register the user */
        await passport.authenticate('register', { session: false }, async (err, user, info) => {

            /* Keep track of the passport errors when registering */
            let passportError;

            if(err || !user){

                if(info?.message === 'Unable to register user'){
                    passportError = {
                        status: 400,
                        success: false,
                        message: 'Unable to register the desired user'
                    }
                } else {
                    passportError = {
                        status: 500,
                        success: false,
                        message: 'There was a problem with the resource, please try again later'
                    }
                }

            }

            if(passportError) return next(passportError)

            res.json({
                status: 200,
                message: 'Signup successful',
                success: true,
                user: user
            })

        })(req,res,next);
        

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
    loginUser,
    createUser
};