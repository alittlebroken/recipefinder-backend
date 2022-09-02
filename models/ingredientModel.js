/* Packages needed */
require('dotenv').config();
const db = require('../database');

/*
 * Add a new ingredient with the specified name to the DB
 * @param {string} name - Ingredients name
 * @returns {array} ID of the ingredient created
 */
const create = async name => {

  try{

    /* Validate the passed in arguments */
    if(!name || typeof name !== 'string'){
      throw {
        name: 'INGREDIENTMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    /* Add the record to the database */
    const result = await db('ingredients')
     .insert('name', name)
     .returning('id');

    if(!result || result.length < 1){
      return [];
    } else {
      return result;
    }

  } catch(e) {

    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;
    if(e.name === 'INGREDIENTMODEL_ERROR'){
      message = e.message;
    } else {
      message = 'There was a problem with the resource, please try again later';
    }

    return {
      success: false,
      message: message
    }

  }

};

const remove  = async id => {

  try{

    /* Validate the passed in arguments */
    if(!id || typeof id !== 'number'){
      throw {
        name: 'INGREDIENTMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    /* Remove the ingredient from the database */
    const result = await db('ingredients')
     .delete()
     .where('id', id)
     .returning('id');

      return {
        success: true,
        message: 'Ingredient successfully removed'
      };


  } catch(e) {

        /* Check for library errors and if found swap them out for a generic
           one to send back over the API for security */
        let message;
        if(e.name === 'INGREDIENTMODEL_ERROR'){
          message = e.message;
        } else {
          message = 'There was a problem with the resource, please try again later';
        }

        return {
          success: false,
          message: message
        }

  }

};

const update = async (id, name) => {

  try{

    /* Validate the passed in arguments */
    if(!id || typeof id !== 'number' || !name || typeof name !== 'string'){
      throw {
        name: 'INGREDIENTMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    /* Update the ingredient table entry */
    const result = await db('ingredients')
      .update('name', name)
      .where('id', id);

    return {
      success: true,
      message: 'Ingredient successfully updated'
    }

  } catch(e) {

    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;
    if(e.name === 'INGREDIENTMODEL_ERROR'){
      message = e.message;
    } else {
      message = 'There was a problem with the resource, please try again later';
    }

    return {
      success: false,
      message: message
    }

  }

};

/*
 * Find the first occurance of the pas in name otherwise send back an empty array
 * @param {string} term - Search term to look for in the table
 * returns {array} the id and name of the first matching item or an empty array
 * if no entrys found.
 */
const findOne = async term => {

  try{

    /* Validate the passed in arguments */
    if(!term || typeof term !== 'string'){
      throw {
        name: 'INGREDIENTMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    /* Search the table for the specified term */
    const result = await db('ingredients')
     .select('id', 'name')
     .where('name', term);

    if(!result || result.length < 1){
      return [];
    } else {
      return result;
    }

  } catch(e) {

    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;
    if(e.name === 'INGREDIENTMODEL_ERROR'){
      message = e.message;
    } else {
      message = 'There was a problem with the resource, please try again later';
    }

    return {
      success: false,
      message: message
    }

  }

};



/* Find all occurances of the required search term
 * @param {string} term - The search term being looked for in the DB table
 * @returns {array} Set of results for the searched for term or an emtpy array
 * if nothing found
 */
const findAll = async term => {

  try{

    /* Validate the passed in arguments */
    if(!term || typeof term !== 'string'){
      throw {
        name: 'INGREDIENTMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    /* Search the table for the specified term */
    const result = await db('ingredients')
     .select('id', 'name')
     .whereILike('name', `%${term}%`);

     if(!result || result.length < 1){
       return [];
     } else {
       return result;
     }

  } catch(e) {

    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;
    if(e.name === 'INGREDIENTMODEL_ERROR'){
      message = e.message;
    } else {
      message = 'There was a problem with the resource, please try again later';
    }

    return {
      success: false,
      message: message
    }

  }

};

/*
 * extract from the DB the ingredient which matches the passed in id
 * @param {number} id - The unique identifier of the ingredient sought
 * @returns {array} Contains an object with details of the found ingredient or
 * is empty if nothing is found
 */
const findById = async id => {

  try{

    /* Validate the passed in arguments */
    if(!id || typeof id !== 'number'){
      throw {
        name: 'INGREDIENTMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    /* Extract the recipe form the database and return it otherwise lets
       pass back an empty array */
    const results = await db('ingredients')
     .select('*')
     .where('id', id);

    if(!results || results.length < 1){
      return [];
    } else {
      return results;
    }

  } catch(e) {

    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;
    if(e.name === 'INGREDIENTMODEL_ERROR'){
      message = e.message;
    } else {
      message = 'There was a problem with the resource, please try again later';
    }

    return {
      success: false,
      message: message
    }

  }

};

/* Find all occurances of the required search term
 * @param {string} term - The search term being looked for in the DB table
 * @returns {array} Set of results for the searched for term or an emtpy array
 * if nothing found
 */
const findAllByName = async term => {

  try{

    /* Validate the passed in arguments */
    if(!term || typeof term !== 'string'){
      throw {
        name: 'INGREDIENTMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    /* Search the table for the specified term */
    const result = await db('ingredients')
     .select('id', 'name')
     .whereILike('name', `%${term}%`);

     if(!result || result.length < 1){
       return [];
     } else {
       return result;
     }

  } catch(e) {

    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;
    if(e.name === 'INGREDIENTMODEL_ERROR'){
      message = e.message;
    } else {
      message = 'There was a problem with the resource, please try again later';
    }

    return {
      success: false,
      message: message
    }

  }

};

module.exports = {
  create,
  remove,
  update,
  findOne,
  findAll,
  findById,
  findAllByName
}
