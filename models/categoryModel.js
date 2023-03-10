/* Packages needed */
require('dotenv').config();
const db = require('../database');
const dbHelper = require('../helpers/database')

/*
 * Adds a new category to the database
 * @param {string} name - Name of the category to add
 */
const create = async name => {

  try{

    /* Validate the passed in arguments */
    if(!name || typeof name !== 'string'){
      throw {
        name: 'CATEGORYMODEL_ERROR',
        message: 'One or more required arguments are missing or invalid'
      }
    }

    /* Add the data to the database */
    const result = await db('categories')
     .insert({ name }).returning('id');

      return {
        success: true,
        message: 'Category successfully created'
      }

  } catch(e) {

    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;
    if(e.name === 'CATEGORYMODEL_ERROR'){
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
 * Removes a category from the database
 * @param {number} categoryId - The unique identifier of the category to remove
 * @returns {object} Returns a message and success state on whether the removal
                     successful or not
 */
const remove = async categoryId => {

  try{

    /* Validate the passed in arguments */
    if(!categoryId || typeof categoryId !== 'number'){
      throw {
        name: 'CATEGORYMODEL_ERROR',
        message: 'One or more required arguments are missing or invalid'
      }
    }

    /* Perform the desired action against the database and return the id of the
       affected record
     */
    const result = await db('categories')
     .delete()
     .where('id', categoryId)
     .returning('id');

     if(!result || result.length < 1){
      return {
        count: 0
      }
     }

      return {
        success: true,
        message: 'Category successfully removed'
      }

  } catch(e) {

    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;
    if(e.name === 'CATEGORYMODEL_ERROR'){
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
 * Removes all categories from the database
 * @returns {object} returns a count of records removed or zero if non have been
 * or a error message if there was another problem
 */
const removeAll = async () => {

  try{

    /* Perform the desired action against the database and return the id of the
       affected record
     */
    const result = await db('categories')
     .delete();

    if(result < 1){
      return { count: 0 }
    } else {
      return { count: result }
    }

  } catch(e) {

    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message= 'There was a problem with the resource, please try again later';

    return {
      success: false,
      message: message
    }

  }

};                    

/*
 * Updates an existing entry in the categories table
 * @param {number} categoryId - The unique identifier of the category affected
 * @param {string} name - The uodated name for the category
 * @returns {object} Object detailing if the operation was a success or a failure
 * as well as any relevant messages saying what happened.
 */
const update = async (categoryId, name) => {

  try{

    /* Validate the required and passed in arguments */
    if(!categoryId || typeof categoryId !== 'number' || !name || typeof name !== 'string'){
      throw {
        name: 'CATEGORYMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    /* Update the record in the database */
    const result = await db('categories')
     .update({
       name: name
     })
     .where('id', categoryId).returning('id');

     if(result.length < 1){
      return {
        count: 0
      }
     }

     return{
       success: true,
       message: 'Category successfully updated'
     }

  } catch(e) {

    /* We only wish to output our custom messages and not those passed to from
     * various libraries for security reasons */
    let message;
    if(e.name === 'CATEGORYMODEL_ERROR'){
      message = e.message;
    } else {
      /* Create a generic message for other error types */
      message = 'There was a problem with the resource, please try again later';
    }

    /* Lets let the calling process know we have failed */
    return {
      success: false,
      message: message
    }

  }

};

/*
 * Finds a category based on the passed in name
 * @param {string} name - The name of the item to find
 * @returns {array} An object array of the category details
 */
const findByName = async name => {

  try{

    /* Validate the passed in arguments */
    if(!name || typeof name !== 'string'){
      throw {
        name: 'CATEGORYMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    /* Extract the record from the database */
    const result = await db('categories')
     .select('id','name')
     .where('name', name);

     if(result.length >= 1){
       return result;
     } else {
       return [];
     }

  } catch(e) {

    /* We only wish to output our custom messages and not those passed to from
     * various libraries for security reasons */
    let message;
    if(e.name === 'CATEGORYMODEL_ERROR'){
      message = e.message;
    } else {
      /* Create a generic message for other error types */
      message = 'There was a problem with the resource, please try again later';
    }

    /* Lets let the calling process know we have failed */
    return {
      success: false,
      message: message
    }

  }

};

/*
 * Finds a category based on the passed in identifier
 * @param {number} id - The unique identifier of the category to find
 * @returns {array} An object array of the category details
 */
const findById = async id => {

  try{

    /* Validate the passed in arguments */
    if(!id || typeof id !== 'number'){
      throw {
        name: 'CATEGORYMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    /* Extract the record from the database */
    const result = await db('categories')
     .select('*')
     .where('id', id);

     if(result.length >= 1){
       return result;
     } else {
       return [];
     }

  } catch(e) {

    /* We only wish to output our custom messages and not those passed to from
     * various libraries for security reasons */
    let message;
    if(e.name === 'CATEGORYMODEL_ERROR'){
      message = e.message;
    } else {
      /* Create a generic message for other error types */
      message = 'There was a problem with the resource, please try again later';
    }

    /* Lets let the calling process know we have failed */
    return {
      success: false,
      message: message
    }

  }

};

/*
 * Returns all occurances of a category matching the passed in name
 * @param {object} options - Pagination settings
 * @returns {array} Array of objects for each match found
 */
const findAll = async (options) => {

  try{

    /* Extract the pagination options */
    let {page, size, offset, filterBy, filterValues, limit, filter, sortBy, sortOrder} = options

    /* Count the records we are interested in */
    const recordCount = await db('categories')
      .modify(dbHelper.buildFilters, filter)
      .select('id')
      .count('id')
      .groupBy('id')

    /* Extract data from the database */
    const results = await db('categories')
      .modify(dbHelper.buildFilters, filter)
      .modify(dbHelper.buildSort, { sortBy, sortOrder })
      .select('*')
      .limit(size)
      .offset(offset)

     if(results.length >= 1){
      /* gather the various resulst we need to send back */
      let numPages = parseInt(Math.floor(recordCount.length / size))
      if(numPages < 1) numPages = 1

       return {
        results: results,
        totalPages: numPages,
        totalRecords: recordCount.length,
        currentPage: page
       };
     } else {
       return [];
     }

  } catch(e){
    
    /* We only wish to output our custom messages and not those passed to from
     * various libraries for security reasons */
    message = 'There was a problem with the resource, please try again later';

    /* Lets let the calling process know we have failed */
    return {
      success: false,
      message: message
    }
  }

};

/*
 * Returns all occurances of a category matching the passed in name
 * @param {string} name - Text to match on
 * @returns {array} Array of objects for each match found
 */
const findAllByName = async name => {

  try{

    /* Validate the passed in arguments */
    if(!name || typeof name !== 'string'){
      throw {
        name: 'CATEGORYMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    /* Extract data from the database */
    const results = await db('categories')
     .select('*')
     .whereILike('name', `%${name}%`);

     if(results.length >= 1){
       return results;
     } else {
       return [];
     }

  } catch(e){
    /* We only wish to output our custom messages and not those passed to from
     * various libraries for security reasons */
    let message;
    if(e.name === 'CATEGORYMODEL_ERROR'){
      message = e.message;
    } else {
      /* Create a generic message for other error types */
      message = 'There was a problem with the resource, please try again later';
    }

    /* Lets let the calling process know we have failed */
    return {
      success: false,
      message: message
    }
  }

};

module.exports  = {
  create,
  remove,
  update,
  findByName,
  findAll,
  findById,
  findAllByName,
  removeAll
};
