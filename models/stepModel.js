/* Packages needed */
require('dotenv').config();
const db = require('../database');

/*
 * Adds a new step to a specified recipe
 * @param {number} recipeId - The unique identifier of the recipe to add the
 *                            step to
 * @param {number} stepNo - The sequence number for the step being added to the
 *                          recipe
 * @param {string} stepContent - The steps textual content
 * @returns {array} Id of the newly inserted record
 */
const create = async (recipeId, stepNo, stepContent) => {

  try{

    /* Validate the passed in values */
    if(!recipeId || typeof recipeId !== 'number' || !stepNo || typeof stepNo !== 'number' || !stepContent || typeof stepContent !== 'string'){
      throw {
        name: 'STEPMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    /* Add the step to the recipe */
    const result = await db('steps')
     .returning('id')
     .insert({
       recipeId: recipeId,
       stepNo: stepNo,
       content: stepContent
     });


    return {
      success: true,
      message: 'Step successfully created'
    };


  } catch(e) {

    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;
    if(e.name === 'STEPMODEL_ERROR'){
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
 * Will remove one step from a recipe. Note does not recalculate the step
 * numbers.
 * @param {number} stepId - Unique identifier of the step to be removed
 * @returns {object} The object contains if the step was successfully and any
 * related message
 */
const remove = async stepId => {

  try{

    /* Validate the passed in values */
    if(!stepId || typeof stepId !== 'number'){
      throw {
        name: 'STEPMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    /* Add the step to the recipe */
    const result = await db('steps')
     .returning('id')
     .delete()
     .where('id', stepId);

     if(!result || result.length < 1){
       return [];
     } else {
       return {
         success: true,
         message: 'Step successfully removed'
       };
     }

  } catch(e) {

    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;
    if(e.name === 'STEPMODEL_ERROR'){
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
 * Will remove all the steps for a recipe
 * @param {number} recipeId - Unique identifier the recipe which is having all
 * it's steps removed
 * @returns {object} Returns wether the operation was a success and a message
 * associated with the success type of true or false
 */
const removeAllByRecipe = async recipeId => {

  try{

    /* Validate the passed in values */
    if(!recipeId || typeof recipeId !== 'number'){
      throw {
        name: 'STEPMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    /* Add the step to the recipe */
    const result = await db('steps')
     .returning('id')
     .delete()
     .where('recipeId', recipeId);

     if(!result || result.length < 1){
       return { count: 0} ;
     } else {
       return {
         success: true,
         message: 'Step(s) successfully removed'
       };
     }

  } catch(e) {
    
    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;
    if(e.name === 'STEPMODEL_ERROR'){
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
 * Will remove all steps stored in the database no matter which recipe they
 * belong to
*/
const removeAll = async () => {

  try{

    /* remove all steps */
    const result = await db('steps')
     .delete();

     if(!result || result.length < 1){
       return { count: 0 } ;
     } else { 
       return { count: result };
     }

  } catch(e) {

    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;
    if(e.name === 'STEPMODEL_ERROR'){
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

/* Update an individual step assigned to a recipe
 * @param {number} stepId - Unique identifier of the step being updated
 * @param {number} recipeId - Unique identifier of the recipe the step belongs
 * to
 * @param {number} stepNo - The number of the step, controls which order they
 * are all displayed in
 * @param {string} stepContent - The textual data of the step being changed
 * @returns {array} an array containing the id of the updated record
 */
const update = async (stepId, recipeId, stepNo, stepContent) => {

  try{

    /* Validate the passed in values */
    if(!stepId || typeof stepId !== 'number' || !recipeId || typeof recipeId !== 'number' || !stepNo || typeof stepNo !== 'number' || !stepContent || typeof stepContent !== 'string'){
      throw {
        name: 'STEPMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    /* Update the appropriate record */
    const result = await db('steps')
     .update({
       id: stepId,
       recipeId: recipeId,
       stepNo: stepNo,
       content: stepContent
     })
     .where('id', stepId);

     if(!result || result.length < 1){
      return {
        success: false,
        message: 'No steps found to update'
      }
     }

     return {
       success: true,
       message: 'Step updated successfully'
     }

  } catch(e) {

    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;
    if(e.name === 'STEPMODEL_ERROR'){
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
 * find a step belonging to a particular id
 * @param {number} stepId - The unique identifier of the step
 * @returns {array} An array containing the step we are looking for
 */
const findById = async stepId => {

  try{

    /* validate the values passed into the function */
    if(!stepId || typeof stepId !== 'number'){
      throw {
        name: 'STEPMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    /* Get the steps from the DB */
    const result = await db('steps')
     .select('*')
     .where('id', stepId);

     if(!result || result.length < 1){
       return [];
     } else {
       return result;
     }

  } catch(e) {

    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;
    if(e.name === 'STEPMODEL_ERROR'){
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
 * find all steps which belong to a particular recipe
 * @param {number} recipeId - The unique identifier of the recipe to get the
 * steps for
 * @param {object} options The settings to be used for pagination
 * @returns {array} An array containing all steps for a recipe or empty if
 * the recipe has none yet
 */
const findByRecipeId = async (recipeId, options) => {

  try{

    /* Extract the pagination values */
    let {page, size, offset, filterBy, filterValues, sortBy, sortOrder} = options

    /* validate the values passed into the function */
    if(!recipeId || typeof recipeId !== 'number'){
      throw {
        name: 'STEPMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    /* get a count of the total records we have */
    const recordCount = await db('steps')
    .modify((queryBuilder) => {
      // Where clause
      if(filterBy !== undefined || filterValues !== undefined){
        queryBuilder.whereILike(filterBy, `%${filterValues}%`)
      }
    })
    .select('id')
    .where('recipeId', recipeId)
    .count('id')
    .groupBy('id')

    /* Get the steps from the DB */
    const result = await db('steps')
      .modify((queryBuilder) => {
        // Where clause
        if(filterBy !== undefined || filterValues !== undefined){
          queryBuilder.whereILike(filterBy, `%${filterValues}%`)
        }
      })
     .select('*')
     .where('recipeId', recipeId)
     .modify((queryBuilder) => {
        // order by clause
        if(sortBy !== undefined || sortOrder !== undefined){
            queryBuilder.orderBy(sortBy, sortOrder)
        }
      })
     .limit(size)
     .offset(offset)

     if(!result || result.length < 1){
       return [];
     } else {
        /* Calculate number of pages */
        let numPages = parseInt(Math.floor(recordCount.length / size))
        if(numPages < 1) numPages = 1

       return {
        results: result,
        totalPages: numPages,
        totalRecords: recordCount.length,
        currentPage: page
       };
     }

  } catch(e) {

    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;
    if(e.name === 'STEPMODEL_ERROR'){
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
 * Get all steps from the DB
 * @params {object} Contains pagination options like page number, records per page etc
 * @returns {array} An array containing all the steps
 */
const findAll = async (options) => {

  try{

    /* Extract pagination values */
    let {page, size, offset, filterBy, filterValues, sortBy, sortOrder} = options

    /* Get a count of the records from thr DB */
    const recordCount = await db('steps')
    .modify((queryBuilder) => {
      // Where clause
      if(filterBy !== undefined || filterValues !== undefined){
        queryBuilder.whereILike(filterBy, `%${filterValues}%`)
      }
    })
    .select('id')
    .count('id')
    .groupBy('id')

    /* Get the steps from the DB */
    const result = await db('steps')
    .modify((queryBuilder) => {
        // Where clause
        if(filterBy !== undefined || filterValues !== undefined){
          queryBuilder.whereILike(filterBy, `%${filterValues}%`)
        }
      })
     .select('*')
     .modify((queryBuilder) => {
        // order by clause
        if(sortBy !== undefined || sortOrder !== undefined){
            queryBuilder.orderBy(sortBy, sortOrder)
        }
      })
     .limit(size)
     .offset(offset)

     if(!result || result.length < 1){
       return [];
     } else {
      /* Calculate number of pages */
      let numPages = parseInt(Math.floor(recordCount.length / size))
      if(numPages < 1) numPages = 1

       return {
        results: result,
        currentPage: page,
        totalRecords: recordCount.length,
        totalPages: numPages
       };
     }

  } catch(e) {

    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;
    if(e.name === 'STEPMODEL_ERROR'){
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
 * Remove one setp from the database
 * @param {number} id - The id of the step to be removed
 * @returns {object} Contains if the operation was a success or not, a message detailing why and a number of records affected
 */
const removeOneById = async id => {

  try{

    /* Validate the passed in parameter(s) */
    if(!id || id === undefined){
      return {
        success: false,
        message: 'Undefined step id',
        count: 0
      }
    }

    if(typeof id !== 'number'){
      return {
        success: false,
        message: 'Wrong format for step id',
        count: 0
      }
    }

    /* Lets delete the record provided */
    const result = await db('steps')
     .delete()
     .where('id', id)

    if(result < 1){
      /* No record deleted */
      return {
        success: false,
        message: 'No records found matching the supplied id',
        count: 0
      }
    }

    return {
      success: true,
      message: 'Specified step removed successfully',
      count: result
    }

  } catch(e) {

    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;
    if(e.name === 'STEPMODEL_ERROR'){
      message = e.message;
    } else {
      message = 'There was a problem with the resource, please try again later';
    }

    return {
      success: false,
      message: message,
      count: 0
    }

  }

};

module.exports = {
  create,
  remove,
  removeAllByRecipe,
  removeAll,
  update,
  findById,
  findByRecipeId,
  findAll,
  removeOneById
};
