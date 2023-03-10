/* Packages needed */
require('dotenv').config();
const db = require('../database');
const dbHelper = require('../helpers/database')
/* Look for an existing refresh token in the refresh
 * tokens table for a given user
 *
 * @param {number} userId  - The identifier of the user we
 *                           need to see if there are any
 *                           tokens for
 * @returns {object} - The first entry found within the table
 *                     or false if none found, otherwise a 
 *                     error message if something else went
 *                     wrong
 */ 
const findOne = async userid => {

    try{

        /* Validate our parameters */
        if(!userid || userid === undefined){
            return {
                success: false,
                message: 'Undefined user id'
            }
        }

        if(typeof userid !== 'number'){
            return {
                success: false,
                message: 'Wrong format for user id'
            }
        }

        /* try and get the data from the refreshToken table */
        const result = await db('refreshtokens')
            .select('*')
            .where('userid', userid);

        if(result.length > 0){
            return result[0]
        } 

        return false

    } catch(e) {
        return {
            success: false,
            message: 'There was a problem with the resource, please try again later'
        }
    }

}

/*
 * Removes a users refresh token from the refreshtokens table
 *
 *  @param {number} userid  -The id of the user owning the refresh token to remove
 *  @returns {object} - returns true and a supporting message if the refresh token was 
 *                      removed successfully and false and supporting message if not
 */
const removeOne = async userid => {

    try {

        /* Validate the passed in parameters */
        if(!userid || userid === undefined){
            return {
                success: false,
                message: 'Undefined user id'
            }
        }

        if(typeof userid !== 'number'){
            return {
                success: false,
                message: 'Wrong format for user id'
            }
        }

        /* Remove the entry from the DB */
        const result = await db('refreshtokens')
         .delete()
         .where('userid', userid)
         .returning('id')

        if(result.length > 0){
            return {
                success: true,
                message: 'refreshToken successfully removed'
            }
        } else {
            return {
                success: false,
                message: 'No refresh tokens were found matching supplied data'
            }
        }

    } catch(e) {
        return {
            success: false,
            message: 'There was a problem with the resource, please try again later'
        }
    }

}

/*
 *  Assigns a refresh token to a user
 *
 * @param {object} payload - Contains the user id and refresh token to assign
 * @returns {object} - Either true or false with supporting message
 */
const addOne = async payload => {

    try {

        /* Validate the passed in parameters */
        if(typeof payload !== 'object'){
            return {
                success: false,
                message: 'Wrong format for payload'
            }
        }

        if(!payload.userId || payload.userId === undefined){
            return {
                success: false,
                message: 'Undefined user id'
            }
        }

        if(typeof payload.userId !== 'number'){
            return {
                success: false,
                message: 'Wrong format for user id'
            }
        }

        if(!payload.refreshToken || payload.refreshToken === undefined){
            return {
                success: false,
                message: 'Undefined refresh token'
            }
        }

        if(typeof payload.refreshToken !== 'string'){
            return {
                success: false,
                message: 'Wrong format for refresh token'
            }
        }

        /* Try to assign the token to the user */
        const result = await db('refreshtokens')
            .insert({
                userid: payload.userId,
                token: payload.refreshToken
            })
            .returning('id')

        if(!result || result.length < 1){
            return {
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
        }

        return {
            success: true,
            message: 'Refresh token successfully added'
        }

    } catch(e) {
        return {
            success: false,
            message: 'There was a problem with the resource, please try again later'
        }
    }

}

module.exports = {
    findOne,
    removeOne,
    addOne
}