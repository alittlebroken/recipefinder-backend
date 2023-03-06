/* Packages needed */
require('dotenv').config();
const db = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* Import helper modules */
const validation = require('../helpers/validation');
const messageHelper = require('../helpers/constants');
const pantryModel = require('../models/pantryModel');

/**
 * Insert a user into the database
 * @param {string} username - The login name of the user
 * @param {string} password - The unencrypted password of the user
 */
const insert = async (username, password, email, roles = 'Customer') => {

  try {
    /* Check that we have valid data passed in */
    if(!username || !password || !email){
      throw {
        name: 'USERMODEL_ERROR',
        message: 'You must provide values for username,password or email.'
      }
    }

    /* Hash the password */
    const hashedPassword = await hash(password)

    /* Add the record to the database */
    const result = await db('users').insert(
      {
        username: username,
        password: hashedPassword,
        email: email,
        roles: roles
      }
    ).returning('id');

    /* Get the newly added records */
    const records = await db('users')
    .select('id', 'username', 'email', 'roles')
    .where('id', result[0].id);

    /* Create for the user a pantry model */
    const pantryResult = await pantryModel.create(result[0].id);
    
    if(pantryResult.success === false){
      /* Delete the user account */
      const removeUser = await db('users').del().where('id', result[0].id)
      
      if(removeUser.length < 1)
      {
        throw {
          name: 'USERMODEL_ERROR',
          message: 'Unable to create pantry and remove user account'
        }
      }

      throw {
        name: 'USERMODEL_ERROR',
        message: 'Unable to create pantry and user successfully removed'
      }
    }

    /* No issues so return the data found */
    return records;

  } catch(e) {
    
    let message;
    if(e.name === 'USERMODEL_ERROR'){
      message = e.message
    } else if (e.code === '23505') {
      message = 'That username is already taken'
    } else {
        message = 'There was an issue using this resource, please try again later'
    }

    return {
      success: false,
      message: message
    }
  }

};

/**
 * Find a user by thier email address
 * @param {string} email - The email of the user to be found
 */
const findByEmail = async email => {

  try{

    /* Check we have data passed in */
    if(!email || typeof email !== 'string'){
      throw {
        name: 'USERMODEL_ERROR',
        message: 'You must supply a valid email address'
      }
    }

    /* Try and find the record by email */
    const result = await db('users')
     .select('id', 'username', 'email', 'roles', 'forename', 'surname', 'password')
     .where('email', email);

    if(!result || !result.length > 0){
      throw {
        name: 'USERMODEL_ERROR',
        message: 'Unable to find any records matching supplied data.'
      }
    }

    /* All OK so pass back the record */
    return result[0];

  } catch(e) {
      let message;
      if(e.name === 'USERMODEL_ERROR'){
        message = e.message;
      } else {
        message = 'There was an issue using this resource, please try again later';
      }

      return {
        success: false,
        message: message
      };

  }

};

/**
 *  Find a user by their id
 * @param {integer} id - The id of the user to be found
 */
const findById = async id => {

  try{

    /* Check the passed in ID is valid */
    if(!id){
      throw {
        name: 'USERMODEL_ERROR',
        message: 'A valid user id is required.'
      }
    }

    /* Find the user by Id */
    const result = await db('users')
     .select('id', 'username', 'email', 'roles', 'forename', 'surname')
     .where('id', id);

    /* Check we have some results */
    if(!result || !result.length > 0){
      throw {
        name: 'USERMODEL_ERROR',
        message: 'No records found matching passed in id'
      }
    }

    /* All OK so return */
    return result;

  } catch(e) {
    let message;
    if(e.name === 'USERMODEL_ERROR'){
      message = e.message;
    } else {
      message = 'There was a problem with the resource, please try again later'
    }

    return {
      success: false,
      message: message
    };
  }

};

/*
 * Update the specified record
 * @param {integer} id - Identifier of the resource being updated
 * @param {string} username - Users login name
 * @param {string} email - Users email address
 * @param {string} roles - Roles the user belong to
 * @param {string} forename - Firstname of the user
 * @param {string} surname - Lastname of the user
 */
const update = async (id, username, email, roles, forename, surname) => {

  try{

    /* Check the supplied arguments */
    if(!id || !username || !email || !roles || !forename || !surname){
      throw {
        name: 'USERMODEL_ERROR',
        message: 'One or more of the supplied arguments are missing or incorrect.'
      }
    }

    /* Update the record in the DB */
    const result = await db('users')
     .update({
       username: username,
       email: email,
       roles: roles,
       forename: forename,
       surname: surname
     })
     .where('id', id);

    /* Now get the update from the DB */
    const updatedRecord = await db('users')
     .select('id', 'username', 'email', 'roles', 'forename', 'surname')
     .where('id', id);

    if(!updatedRecord || !updatedRecord.length > 0){
      throw {
        name: 'USERMODEL_ERROR',
        message: 'No records matched supplied data'
      }
    }

    return updatedRecord;

  } catch(e) {
    let message;
    if(e.name === 'USERMODEL_ERROR'){
      message = e.message;
    } else {
      message = 'There was an issue with the resource, please try again later'
    }
    return {
      success: false,
      message: message
    }
  }

};

/**
 * Remove a user from the system
 * @param {integer} id - ID of the user to be removed
 */
const remove = async id => {

  try{

    /* Check if the passed in id is valid */
    if(!id){
      throw {
        name: 'USERMODEL_ERROR',
        message: 'One or more of the supplied arguments are missing or incorrect.'
      }
    }

    /* Remove the user */
    await db('users').delete().where('id', id)

    return {
        success: true,
        message: 'The record was deleted successfully'
    }

  } catch(e) {
    
    let message;
    if(e.name === 'USERMODEL_ERROR'){
      message = e.message;
    } else {
      message = 'There was an issue with the resource, please try again later';
    }

    return {
      success: false,
      message: message
    }
  }

};

/**
 * Remove all users from the system
 * @returns {object} Contains details of the removal like was it successful
 * and how many records were deleted
 */
const removeAll = async () => {

  try{

    /* Remove the user */
    await db('users').del().where('roles', '=', 'customer');

    /* Check the user was deleted */
    const userCheck = await db('users')
     .select('*')
     .where('roles', '=', 'customer');

    if(userCheck?.length < 1){
      return {
        success: true,
        message: 'All customer accounts successfully removed'
      }
    } else {
      return {
        success: false,
        message: 'No customer accounts have been removed'
      }
    }

  } catch(e) {
    console.log(e)
    let message;
    if(e.name === 'USERMODEL_ERROR'){
      message = e.message;
    } else {
      message = 'There was an issue with the resource, please try again later';
    }

    return {
      success: false,
      message: message
    }
  }

};

/**
 * Has a users password for storing in the database
 * @param {string} password - The users password we wish to hash
 */
const hash = async password => {

  try {

    /* Check the passed in argument is OK */
    if(!password){
      throw {
        name: 'USERMODEL_ERROR',
        message: 'One or more of the supplied arguments are missing or incorrect.'
      }
    }

    /* Hash the password */
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

    return hashedPassword;

  } catch (e) {
    let message;
    if(e.name === 'USERMODEL_ERROR'){
      message = e.message;
    } else {
      message = 'There was an issue with the resource, please try again later'
    }

    return {
      success: false,
      message: message
    }
  }

};

/**
 * Verifies a user password to ensure it matches the hashed version
 * @param {string} password - The plain text password to verify
 * @param {string} hash - The hashed password to compare it with
*/
const verify  = async (password, hash) => {

  try{

    if(!password || !hash || password.length < 1 || hash.length < 1){
      return false;
    }

    /* Compare the password and hash */
    return await bcrypt.compare(password, hash);

  } catch(e) {
    return {
      success: false,
      message: 'There was an issue with the resource, please try again later'
    };
  }

};

/**
 * return all users in the DB
 * 
 * @param {object} Options for pagination and displaying the correct page
 * @returns {array} an array of user objects
 */
const findAll = async (options) => {

  try{

    /* Extract the pagination information passed in */
    let {page, size, offset, filterBy, filterValues, filter, sortBy, sortOrder} = options

    /* Get a count of all records affected */
    const recordCount = await db('users')
    .modify((queryBuilder) => {
      /* 
       * We now use a singular filter passed via the request query params that 
       * is an object where each key is the filed to filter by and the values 
       * are the values to filter by. 
       */
      if(filter !== undefined){

        /* parse the filter so we can work with it easier */
        let rawFilter = JSON.parse(filter)
        /* Gte the number of filters we need to apply */
        let numFilters = Object.getOwnPropertyNames(rawFilter)
        
        /* Go through each entry and apply the filter to the query */
        numFilters.map(item => {

          /* Need to check if multiple ids have been passed in or not */
          if(item === 'id' || item === 'ids' || item === 'userId'){
            /* Now check if we have multiple values to filter by */
            if(rawFilter[item].length > 1){
              /* use whereIn to filter on multiples */
              queryBuilder.whereIn('id', rawFilter[item])
            } else {
              /* Only one value to filter by */
              /* First check if we have an array of vaues, even 1 */
              if(Array.isArray(rawFilter[item])){
                queryBuilder.where('id', rawFilter[item][0])
              } else {
                queryBuilder.where('id', rawFilter[item])
              }
            }
          } else {
            /* Just use a normal where filter for this */
            queryBuilder.where(item, 'like', `%${rawFilter[item]}%`)
          }
        })

      }
      })
    .select('id')
    .count()
    .groupBy('id')

    /* Find the user by Id */

    const result = await db('users')
    .modify((queryBuilder) => {
      /* 
       * We now use a singular filter passed via the request query params that 
       * is an object where each key is the filed to filter by and the values 
       * are the values to filter by. 
       */
      if(filter !== undefined){

        /* parse the filter so we can work with it easier */
        let rawFilter = JSON.parse(filter)
        /* Gte the number of filters we need to apply */
        let numFilters = Object.getOwnPropertyNames(rawFilter)
        
        /* Go through each entry and apply the filter to the query */
        numFilters.map(item => {

          /* Need to check if multiple ids have been passed in or not */
          if(item === 'id' || item === 'ids' || item === 'userId'){
            /* Now check if we have multiple values to filter by */
            if(rawFilter[item].length > 1){
              /* use whereIn to filter on multiples */
              queryBuilder.whereIn('id', rawFilter[item])
            } else {
              /* Only one value to filter by */
              /* First check if we have an array of vaues, even 1 */
              if(Array.isArray(rawFilter[item])){
                queryBuilder.where('id', rawFilter[item][0])
              } else {
                queryBuilder.where('id', rawFilter[item])
              }
            }
          } else {
            /* Just use a normal where filter for this */
            queryBuilder.where(item, 'like', `%${rawFilter[item]}%`)
          }
        })

      }
      })
     .select('id', 'username', 'email', 'roles', 'forename', 'surname')
     .modify((queryBuilder) => {
        // order by clause
        if(sortBy !== undefined || sortOrder !== undefined){
            queryBuilder.orderBy(sortBy, sortOrder)
        }
      })
     .limit(size)
     .offset(offset)

    /* Check we have some results */
    if(!result || !result.length > 0){
      return [];
    }

    /* All OK so return */
    
    /* Calculate number of pages */
    let numPages = parseInt(Math.floor(recordCount.length / size))
    if(numPages < 1) numPages = 1

    return {
      results: result,
      totalRecords: recordCount.length,
      totalPages: numPages,
      currentPage: page
    };

  } catch(e) {
    console.log(e)
    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message = 'There was a problem with the resource, please try again later';

    return {
      success: false,
      message: message
    }
  }

};

/* Create a new JWT token with the supplied payload
 * @param {object} payload - The data to be included within the JWT token
 * @returns {string} The token generated with the specified payload
 */
const generateTokens = async data => {

  try{

    /* Validate the passed in data */
    if(!validation.validator(data, 'object')){
      throw {
        name: 'USERMODEL_ERROR',
        message: messageHelper.ERROR_MISSING_VALUES
      }
    };

    /* Generate the token and refresh token */
    const accessTokenExpiry = process.env.ENVIRONMENT === "production" ? process.env.JWT_TOKEN_EXPIRY : "24h"
    const refreshTokenExpiry = process.env.ENVIRONMENT === "production" ? process.env.JWT_REFRESH_TOKEN_EXPIRY : "24h"

    const accessToken = await jwt.sign(
        data, 
        process.env.JWT_TOKEN_SECRET,
        { expiresIn: accessTokenExpiry }
        );
    const refreshToken = await jwt.sign(
      data, 
      process.env.JWT_REFRESH_TOKEN_SECRET,
      { expiresIn: refreshTokenExpiry }
      );


    return { accessToken, refreshToken };

  } catch(e) {
    
    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;

    if(e.name === 'USERMODEL_ERROR'){
      message = e.message;
    } else {
      message = messageHelper.ERROR_GENERIC_RESOURCE;
    }

    return {
      success: false,
      message: message
    }
  }

};

/* Verify that the passed in token is valid and if so return the original
 * payload
 * @param {string} token - The JWT token to be validated
 * @returns {object} The original payload that was tokenized
 */
const verifyToken = async token => {

  try{

    /* Validate the passed in data */
    if(!validation.validator(token, 'string')){
      throw {
        name: 'USERMODEL_ERROR',
        message: messageHelper.ERROR_MISSING_VALUES
      }
    };

    /* Sign the payload and return the generated token */
    const payload = await jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    return payload;

  } catch(e) {
    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;

    if(e.name === 'USERMODEL_ERROR'){
      message = e.message;
    } else {
      message = messageHelper.ERROR_GENERIC_RESOURCE;
    }

    return {
      success: false,
      message: message
    }
  }

};


/* Verify that the passed in refresh token is valid and if so return the original
 * payload
 * @param {string} token - The JWT refresh token to be validated
 * @returns {object} The original payload that was tokenized
 */
const verifyRefreshToken = async token => {

  try{

    /* Validate the passed in data */
    if(!validation.validator(token, 'string')){
      throw {
        name: 'USERMODEL_ERROR',
        message: messageHelper.ERROR_MISSING_VALUES
      }
    };

    /* Sign the payload and return the generated token */
    const payload = await jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
    
    return payload;

  } catch(e) {
    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;

    if(e.name === 'USERMODEL_ERROR'){
      message = e.message;
    } else {
      message = messageHelper.ERROR_GENERIC_RESOURCE;
    }

    return {
      success: false,
      message: message
    }
  }

};

module.exports = {
  insert,
  findByEmail,
  findById,
  update,
  remove,
  hash,
  verify,
  findAll,
  generateTokens,
  verifyToken,
  removeAll,
  verifyRefreshToken
}
