/* Add in any modules we need to use */
require('dotenv').config();
const appLogger = require('../config/winston');

const passport = require('passport');

const userModel = require('../models/userModel');

const tokenModel = require('../models/tokenModel');

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
                    /*email: user.email,
                    forename: user.forename,
                    surname: user.surname,*/
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

                const cookieOptions = {
                    HttpOnly: true,
                }

                res.cookie('jwt', refreshToken, cookieOptions);
                res.status(200).json({ accessToken });
                //return res.json({ accessToken, refreshToken });

            });

        })(req, res, next);

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

            res.status(201).json({
                status: 201,
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

        /* Validate any paramaters used 
        if(!req.body.refreshToken || req.body.refreshToken === undefined){
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Undefined refresh token',
                token: ''
            })
        }*/
        
        if(!req.cookies['jwt']){
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Invalid refresh token, please login',
                token: ''
            })
        }

        /*if(typeof req.body.refreshToken !== 'string'){
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'Wrong format for refresh token',
                token: ''
            })
        }*/

        let token = req.cookies['jwt'];

        /* Validate the supplied refresh token */
        const refreshValid = await userModel.verifyRefreshToken(token)
        
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
 * remove an assigned refreshtoken from a user
 */
const removeToken = async (req, res, next) => {

    const moduleMethod = 'removeToken';

    try{

        if(!req.cookies['jwt']){
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'No refresh token found',
                token: ''
            })
        }

        /* is this refresh token in the list of assigned refresh tokens */
        const isAssigned = await tokenModel.findOne(Number.parseInt(req.user.id))
        
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
        const isRemoved = await tokenModel.removeOne(Number.parseInt(req.user.id))
        
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

        /* clear out the httpOnly cookie */
        res.clearCookie('jwt')
         .status(200)
         .json({
            status: 201,
            success: true,
            message: 'Successfully logged out',
            token: ''
        })

        /* token removed, let the calling app know
        res.status(201).json({
            status: 201,
            success: true,
            message: 'Successfully logged out',
            token: ''
        })
        */

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
 * log the user out of the system
 */
const logoutUser = async (req, res, next) => {

    const moduleMethod = 'logoutUser';

    try{

        if(!req.cookies['jwt']){
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Missing refresh token'
            })
        }

        let token = req.cookies['jwt']

        /* Check to see if the refresh token is valid */
        const isTokenValid = await userModel.verifyRefreshToken(token)
        if(isTokenValid.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There is a problem with the resource, please try again later'
            }
        }

        /* Check if token has previosuly been assigned and if it has remove it and in either case
        send back that we have logged them out */
        const isTokenAssigned = await tokenModel.findOne(isTokenValid.user.id)
        if(isTokenAssigned.id){
            await tokenModel.removeOne(isTokenValid.user.id);
        }
 
        const cookieOptions = {
                    httpOnly: true,
                    secure: false, 
                }

        res.clearCookie('jwt', cookieOptions)
         .status(200)
         .json({
            status: 200,
            success: true,
            message: 'Successfully logged out'
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
 * Resets a password for the user
 */
const resetPassword = async (req, res, next) => {

    const moduleMethod = 'resetPassword';

    try{

        /* Validate the passed in values */
        if(!req.body.userId || req.body.userId === undefined){
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Undefined user id'
            })
        }

        if(typeof req.body.userId !== 'number'){
            return res.status(400).json({
                status: 400,
                succes: false,
                message: 'User id is not in the correct format'
            })
        }

        if(!req.body.password || req.body.password === undefined){
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Undefined user password'
            })
        }

        if(typeof req.body.password !== 'string'){
            return res.status(400).json({
                status: 400,
                succes: false,
                message: 'User password is not in the correct format'
            })
        }

        /* Send the request to the datase */
        const result = await userModel.resetPassword({
            id: req.body.userId,
            password: req.body.password
        })

        /* Check the result to ensure that the pass was actually reset */
        if(result.success === false){
            return res.status(500).json({
                status: 500,
                success: false,
                message: result.message
            })
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: 'Password successfully updated'
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
 * Retrieves a users profile from the DB
 */
const profile = async (req, res, next) => {

    const moduleMethod = 'profile';

    try{

        /* ensure that we have a valid user request object */
        if(!req.user){
            return res.status(404).json({
                success: false,
                status: 404,
                message: 'No user found',
                data: {}
            })
        }

        /* Get the details from the DB */
        const result = await userModel.profile(req.user.id)

        if(result?.status === false){
            return res.status(500).json({
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later',
                data: {}
            })
        }

        res.status(200).json({ data: result.data })

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
 * Updates a users profile
 */
const updateProfile = async (req, res, next) => {

    const moduleMethod = 'updateProfile';

    try{

        /* Validate the passed in values */
        if(typeof req.body !== 'object'){
            return res.status(400).json({
               status: 400,
               success: false,
               message: 'The request body is of the wrong format',
               data: {}
            })
        }

        console.log(typeof req.body.username)
        if(typeof req.body.username !== 'string'){
            return res.status(400).json({
               status: 400,
               success: false,
               message: 'Username is not of the correct format',
               data: {} 
            })
        }
 
        if(!req.body.username || req.body.username === undefined){
            return res.status(404).json({
               status: 404,
               success: false,
               message: 'Username is missing from request',
               data: {}
            })
        }

        if(typeof req.body.forename !== 'string'){
            return res.status(400).json({
               status: 400,
               success: false,
               message: 'Forename is not of the correct format',
               data: {}
            })
        }

        if(!req.body.forename || req.body.forename === undefined){
            return res.status(404).json({
               status: 404,
               success: false,
               message: 'Forename is missing from the request',
               data: {} 
            })
        }

        if(typeof req.body.surname !== 'string'){
            return res.status(400).json({
               status: 400,
               success: false,
               message: 'Surname is of the wrong format',
               data: {} 
            })
        }

        if(!req.body.surname || req.body.surname === undefined){
            return res.status(404).json({
               status: 404,
               success: false,
               message: 'Missing Surname from request',
               data: {} 
            })
        }

        if(typeof req.body.email !== 'string'){
            return res.status(400).json({
               status: 400,
               success: false,
               message: 'Email is of the wrong format',
               data: {} 
            })
        }

        if(!req.body.email || req.body.email === undefined){
            return res.status(404).json({
               status: 404,
               success: false,
               message: 'Missing Email from request',
               data: {} 
            })
        }

        if(typeof req.body.roles !== 'string'){
            return res.status(400).json({
               status: 400,
               success: false,
               message: 'Role is of the wrong format',
               data: {} 
            })
        }

        if(!req.body.roles || req.body.roles === undefined){
            return res.status(404).json({
               status: 404,
               success: false,
               message: 'Missing Role from request',
               data: {} 
            })
        }

        let profile = {
            id: req.user.id,
            ...req.body
        }

        /* update the profile for the selected user */
        const result = await userModel.update(
            profile.id,
            profile.username,
            profile.email,
            profile.roles,
            profile.forename,
            profile.surname
        )

        if(result.success === false){
            return res.status(500).json({
                status: 500,
                success: result.success,
                message: result.message,
                data: {}
            })
        }

        if(result.length < 1){
            res.status(404).json({
                status: 404,
                success: false,
                message: 'No profile found to update',
                data: {}
            })
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: 'Profile successfully updated',
            data: result[0]
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
    removeToken,
    logoutUser,
    resetPassword,
    profile,
    updateProfile
};