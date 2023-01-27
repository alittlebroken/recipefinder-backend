/* Add in any modules we need to use */
require('dotenv').config();
const appLogger = require('../config/winston');

const passport = require('passport');

const userModel = require('../models/userModel');

const tokenModel = require('../models/tokenModel')

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
            
                if(info?.message === 'email not registered'){
                    errorFound = {
                        status: 404,
                        success: false,
                        message: 'User not found'
                    }
                } else if(info?.message === 'supplied password does not match'){
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
                    id: user.id,
                    email: user.email,
                    forename: user.forename,
                    surname: user.surname,
                    roles: user.roles
                }

                /* create a new token */
                let { accessToken, refreshToken } = await userModel.generateTokens({ user: tokenBody });
                
                /*
                    Check to see if the refreshToken is already taken
                */
               
               const isAssigned = await tokenModel.findOne(tokenBody.id)
                if(isAssigned.id){
                    /* Remove the old refresh token */
                    await tokenModel.removeOne(tokenBody.id)
                    appLogger.logMessage('info', 'Existing refresh token found and being removed')
                }

                /* assign the refresh token for the user logging in */
                const isTokenAdded = await tokenModel.addOne({
                    userId: tokenBody.id,
                    refreshToken: refreshToken
                })

                if(isTokenAdded.success === false){
                    return next({
                        status: 500,
                        success: false,
                        message: 'There was a problem with the resource, please try again later'
                    })
                }

                return res.json({ accessToken, refreshToken });

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
 * generate a new access token based on a valid 
 * refresh token
 */
const refreshToken = async (req, res, next) => {

    const moduleMethod = 'refreshToken';

    try{

        /* Validate any paramaters used */
        if(!req.body.refreshToken || req.body.refreshToken === undefined){
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Undefined refresh token',
                token: ''
            })
        }

        if(typeof req.body.refreshToken !== 'string'){
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'Wrong format for refresh token',
                token: ''
            })
        }

        /* Validate the supplied refresh token */
        const refreshValid = await userModel.verifyRefreshToken(req.body.refreshToken)
        
        if(!refreshValid || refreshValid.success === false){
            if(refreshValid.message === 'There was a problem with the resource, please try again later'){
                return res.status(500).json({
                    status: 500,
                    success: refreshValid.success,
                    message: refreshValid.message,
                    token: ''
                })
            } else {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    token: '',
                    message: 'Not a valid refresh token, please login'
                })
            }
        } 

        /* Is the refresh token being used currently */
        const refreshTokenInUse = await tokenModel.findOne(refreshValid.id) 

        if(!refreshTokenInUse){
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'Refresh token not in use, please login',
                token: ''
            }) 
        }

        /* Generate a new access token */
        const { accessToken, refreshToken } = await userModel.generateTokens(refreshValid.user)
        
        res.status(200).json({
            status: 200,
            success: true,
            token: accessToken,
            message: 'New access token created'
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
const removeToken = async (req, res, next) => {

    const moduleMethod = 'removeToken';

    try{

        /* Validate passed in parameters */
        if(!req.body.refreshToken || req.body.refreshToken === undefined){
            res.status(404).json({
                status: 404,
                success: false,
                message: 'Undefined refresh token',
                token: ''
            })
        }

        if(typeof req.body.refreshToken !== 'string'){
            res.status(400).json({
                status: 400,
                success: false,
                message: 'Wrong format for refresh token',
                token: ''
            })
        }

        /* is this refresh token in the list of assigned refresh tokens */
        const isAssigned = await tokenModel.findOne(refreshToken.id)
        
        if(!isAssigned || isAssigned.success === false){
            if(isAssigned.message === 'There was a problem with the resource, please try again later'){
                throw {
                    status: 500,
                    success: false,
                    message: 'There was a problem with the resource, please try again later',
                    token: ''
                }
            } else {
                throw {
                    status: 404,
                    success: false,
                    message: 'Refresh token not assigned',
                    token: ''
                }
            }
            
        } 

        /* Remove the token if all OK so far */
        const isRemoved = await tokenModel.removeOne(refreshToken.id)
        
        if(!isRemoved || isRemoved.success === false){
            if(isRemoved.message === 'No refresh tokens were found matching supplied data'){
                throw {
                    status: 400,
                    success: false,
                    message: 'No refresh tokens were found matching supplied data',
                    token: ''
                }
            } else {
                throw {
                    status: 500,
                    success: false,
                    message: 'There was a problem with the resource, please try again later',
                    token: ''
                }
            }
        }

        /* token removed, let the calling app know */
        res.status(201).json({
            status: 201,
            success: true,
            message: 'Successfully logged out',
            token: ''
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
    loginUser,
    createUser,
    refreshToken,
    removeToken
};