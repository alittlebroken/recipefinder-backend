/* Packages needed */
require('dotenv').config();
const db = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* Import helper modules */
const validation = require('../helpers/validation');
const messageHelper = require('../helpers/constants');

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
    );


    /* Get the newly added records */
    const records = db('users')
    .select('id', 'username', 'email', 'roles')
    .where('username', username);

    /* No issues so return the data found */
    return records;

  } catch(e) {
    
    let message;
    if(e.name === 'USERMODEL_ERROR'){
      message = e.message
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
    await db('users').del().where('id', id);

    /* Check the user was deleted */
    const userCheck = await db('users')
     .select('*')
     .where('id', id);

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
    await db('users').del().whereNot('username', 'admin');

    /* Check the user was deleted */
    const userCheck = await db('users')
     .select('*')
     .whereNot('username', 'admin');

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
 * @returns {array} an array of user objects
 */
const findAll = async () => {

  try{

    /* Find the user by Id */
    const result = await db('users')
     .select('id', 'username', 'email', 'roles', 'forename', 'surname');

    /* Check we have some results */
    if(!result || !result.length > 0){
      return [];
    }

    /* All OK so return */
    return result;

  } catch(e) {
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
    const accessToken = await jwt.sign(data, process.env.JWT_TOKEN_SECRET);
    const refreshToken = await jwt.sign(data, process.env.JWT_REFRESH_TOKEN_SECRET);

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
  removeAll
}
