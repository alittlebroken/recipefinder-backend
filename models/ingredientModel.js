/* Packages needed */
require('dotenv').config();
const db = require('../database');
const dbHelper = require('../helpers/database')

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
     //.insert('name', name)
     .insert({ name })
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

/* Retrieve all ingredients from the DB
 * @param {object} options - Contains pagination settings
 * @returns {array} All ingredients from the DB
 * if nothing found
 */
const findAll = async (options) => {

  try{

    /* Extract the pagination settings */
    let {page, size, offset, filterBy, filterValues, limit, filter, sortBy, sortOrder} = options

    /* get the total count of records */
    const recordCount = await db('ingredients')
    .modify(dbHelper.buildFilters, filter)
    .select('id')
    .count('id')
    .groupBy('id')

    /* Search the table for the specified term */
    const results = await db('ingredients as i')
      .modify(dbHelper.buildFilters, filter)
      .modify(dbHelper.buildSort, { sortBy, sortOrder })
      .select('i.id', 'i.name')
      .limit(size)
      .offset(offset)

      /* Calculate number of pages */
      let numPages = parseInt(Math.floor(recordCount.length / size))
      if(numPages < 1) numPages = 1

     if(!results || results.length < 1){
       return [];
     } else {
       return {
        results: results,
        currentPage: page,
        totalRecords: recordCount.length,
        totalPages: numPages
       };
     }

  } catch(e) {
    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;
    message = 'There was a problem with the resource, please try again later';

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
     .where('id', id)

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
 * @param {object} options - Contaisn various options for formatting the results like pagination
 * @returns {array} Set of results for the searched for term or an emtpy array
 * if nothing found
 */
const findAllByName = async (term) => {

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
     .whereILike('name', `%${term}%`)
     

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
 * Removes all ingredients from the DB
 * @returns {object} Returns if the operation was successful or not 
 * and any supporting messages
 */
const removeAll = async () => {

  try{
    /* Search the table for the specified term */
    const results = await db('ingredients')
     .delete('*');

     if(!results || results < 1){
       return { count: 0 };
     } else {
       return { count: results };
     }
  } catch(e) {
     /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
       let message;
       message = 'There was a problem with the resource, please try again later';
   
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
  findAllByName,
  removeAll
}
