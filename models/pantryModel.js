/* Packages needed */
require('dotenv').config();
const db = require('../database');
const dbHelper = require('../helpers/database')
const uploadsModel = require('./uploadModel')

/**
 * Creates a new pantry for a new user
 * @param {integer} userId - The id of the user to create the pantry for
 */
const create = async userId => {

  try{

    /* Validate the passed in argument */
    if(!userId || !typeof userId === 'number'){
      throw {
        name: 'PANTRYMODEL_ERROR',
        message: 'The required argument is missing or invalid'
      };
    }

    /* Check first if the user already has a pantry */
    const userPantry = await db('pantries')
     .select('id', 'userId')
     .where('userId', userId);

    if(userPantry.length > 0){
      throw {
        name: 'PANTRYMODEL_ERROR',
        message: 'The specified user already has a pantry'
      };
    };

    /* Create a pantry for the user */
    const result = await db('pantries')
     .insert({
       userId: userId
     })
     .returning('id', 'userId');


    return result;

  } catch(e) {
    
    /* Send back any error messages to the calling app. We wish to
       send back a generic message for SQL and system messages so we
      should check the name of the erro first and act accordingly. */
      let message;

      if(e.name === 'PANTRYMODEL_ERROR'){
        message = e.message;
      } else {
        message = 'There was an issue with the resource, please try again later'
      }

    /* Return the error message */
    return {
      success: false,
      message: message
    }
  }

};

/**
 * Adds an item to the pantry
 * @param {object} pantryItem - Represents the various details needed for adding
 *                              an item to the pantry
 */
const addItem = async pantryItem => {

  try{
    /* Lets validate the data passed in */
    if(typeof pantryItem !== 'object'){

      throw {
        name: 'PANTRYMODEL_ERROR',
        message: 'You must pass in the data as an object to this function'
      };

    } else if ((!pantryItem.pantryId || typeof pantryItem.pantryId !== 'number') || (!pantryItem.ingredientId || typeof pantryItem.ingredientId !== 'number') || (!pantryItem.amount || typeof pantryItem.amount !== 'number') || (!pantryItem.amount_type || typeof pantryItem.amount_type !== 'string'))
    {
      throw {
        name: 'PANTRYMODEL_ERROR',
        message: 'One or more of the passed in values are missing or incorrect'
      };
     }

    // Add the item to the pantry
    const result = await db('pantry_ingredients')
     .insert({
       id: pantryItem.pantryId,
       ingredientId: pantryItem.ingredientId,
       amount: pantryItem.amount,
       amount_type: pantryItem.amount_type
     })
     .returning('*');

     if(!result){
       throw {
         name: 'PANTRYMODEL_ERROR',
         message: 'There was an issue adding the item to the pantry'
       };
     }

     return result

  } catch(e) {

    /** Check for error message type, if not custom message then display a
        generic error message **/
    let message;
    if(e.name === 'PANTRYMODEL_ERROR'){
      message = e.message;
    } else {
      message = 'There was an issue accessing the resource, please try again later'
    }
    return {
      success: false,
      message: message
    }
  }

};

const removeItem = async pantryItem => {

  try {

    /* validate the passed in values */
    if(typeof pantryItem !== 'object'){
      throw {
        name: 'PANTRYMODEL_ERROR',
        message: 'The passed in values must be contained within an object'
      }
    } else if ((!pantryItem.pantryId || typeof pantryItem.pantryId !== 'number') || (!pantryItem.ingredientId || typeof pantryItem.ingredientId !== 'number')){
      throw {
        name: 'PANTRYMODEL_ERROR',
        message: 'One or more values are missing or incorrect'
      }
    }

    /* Remove the item */
    await db('pantry_ingredients')
     .where({
       pantryId: pantryItem.pantryId,
       ingredientId: pantryItem.ingredientId
     })
     .del();

     return {
       success: true,
       message: 'Item removed from pantry successfully'
     }

  } catch(e) {
    /* Determine if we display a generic error or one of our own messages */
    let message;
  
    if(e.name === 'PANTRYMODEL_ERROR'){
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

/*
 * Removes all pantries
 */
const removeAll = async () => {

  try {

    /* Remove all pantries */
    const result = await db('pantries').del();

    return { count: result };

  } catch(e) {
    /* Determine if we display a generic error or one of our own messages */
    let message = 'There was an issue with the resource, please try again later';
  
    return {
      success: false,
      message: message
    }

  }

};

const updateItem = async pantryItem => {

  try {

    /* validate the passed in values */
    if(typeof pantryItem !== 'object'){
      throw {
        name: 'PANTRYMODEL_ERROR',
        message: 'The values must be supplied to the function within an object'
      }
    } else if (!pantryItem.pantryId || typeof pantryItem.pantryId !== 'number' || !pantryItem.ingredientId || typeof pantryItem.ingredientId !== 'number' || !pantryItem.amount || typeof pantryItem.amount !== 'number' || typeof pantryItem.amount_type !== 'string' || !pantryItem.amount_type) {
      throw {
        name: 'PANTRYMODEL_ERROR',
        message: 'One or more values are missing or incorrect'
      }
    }

    /* Perform the update */
    const result = await db('pantry_ingredients')
     .update({
       pantryId: pantryItem.pantryId,
       ingredientId: pantryItem.ingredientId,
       amount: pantryItem.amount,
       amount_type: pantryItem.amount_type
     })
     .where({
       pantryId: pantryItem.pantryId,
       ingredientId: pantryItem.ingredientId
     })
     .returning('*');
     
     if(!result){
       throw {
         name: 'PANTRYMODEL_ERROR',
         message: 'There was an issue updating the specified resource'
       }
     }

     return {
       success: true,
       message: 'Pantry item successfully updated'
     };

  } catch(e) {
    /* We only wish to have the errors specific to the model reported back others are caught as
    a generic error */
    let message;
    
    if(e.name === 'PANTRYMODEL_ERROR'){
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

/* Returns a list of all pantries stored in the database
 * @param {object} options Settings for pagination
 * @returns {array} A list of pantry objects
 */
const listAll = async (options) => {

  try{

    /* Extract the pagination options */
    let {page, size, offset, filterBy, filterValues, filter, sortBy, sortOrder} = options


    /* Get a total count of the records we are interested in */
    const recordCount = await db('pantries as p')
    .modify(dbHelper.buildFilters, filter)
    .join('users as u', 'p.userId', '=', 'u.id')
    //.count('pi.pantryId as numIngredients')
    .select(
     'p.id'
    )
    .count('p.id')
    .groupBy('p.id')

    /* Get the list if pantries from the DB */
    const results = await db('pantries as p')
     .join('users as u', 'p.userId', '=', 'u.id')
     .modify(dbHelper.buildFilters, filter)
     .modify(dbHelper.buildLimit, size)
     .select(
      'p.id as id',
      'u.id as userId',
      'u.username as username',
      db('pantry_ingredients as pi')
       .count('*')
       .whereRaw('?? = ??', ['pi.pantryId', 'p.id'])
       .as('numIngredients')
     )
     .modify(dbHelper.buildSort, { sortBy, sortOrder })
     .offset(offset)

     if(!results){
      throw {
        name: 'PANTRYMODEL_ERROR',
        message: 'There was a problem with the resource, please try again'
      }
     }

     if(results.length < 1){
      return [];
     }

     /* Calculate number of pages */
     let numPages = parseInt(Math.floor(recordCount.length / size))
     if(numPages < 1) numPages = 1

     return {
      results: results,
      totalRecords: recordCount.length,
      totalPages: numPages,
      currentPage: page
     };

  } catch(e) {
    /* We only wish to have the errors specific to the model reported back others are caught as
    a generic error */
    let message;
    
    if(e.name === 'PANTRYMODEL_ERROR'){
      message = e.message;
    } else {
      message = 'There was a problem with the resource, please try again later'
    }

    return {
      success: false,
      message: message
    }
  }

};

/* Returns a list of a particular pantry
 * @param {object} options Contains the pagination settings
 * @returns {array} A pantry object
 */
const list = async (pantryId, options) => {

  try{

    /* Extract the pagination settings */
    let {page, size, offset, filterBy, filterValues, limit, filter, sortBy, sortOrder} = options

    /* Validate the passed in value(s) */
    if(!pantryId || pantryId === undefined || typeof pantryId !== 'number'){
      throw {
        name: 'PANTRYMODEL_ERROR',
        message: 'Undefined pantryId'
      }
    }

    /* Get the list if pantries from the DB */
     let pantry

     /* Get the particular pantry we are interested in */
     const pantryResults = await db('pantries as p')
      .join('users as u', 'u.id', '=', 'p.userId')
      .select(
        'p.id as pantryId',
        'u.id as userId'
      )
      .where('p.id', pantryId)

      /* Get a total count of the records we will get */
      const recordCount = await db('pantry_ingredients as pi')
      .modify(dbHelper.buildFilters, filter)
      .join('ingredients as i', 'i.id', '=', 'pi.ingredientId')
      .select('pi.id')
      .where('pi.pantryId', pantryResults[0].pantryId)
      .count('pi.id')
      .groupBy('pi.id')

      const ingredientResults = await db('pantry_ingredients as pi')
       .modify(dbHelper.buildFilters, filter)
       .modify(dbHelper.buildLimit, size)
       .join('ingredients as i', 'i.id', '=', 'pi.ingredientId')
       .select(
        'pi.id as id',
        'pi.pantryId',
        'i.id as ingredientId',
        'i.name',
        'pi.amount',
        'pi.amount_type'
        )
       .where('pi.pantryId', pantryResults[0].pantryId)
       .offset(offset)

      /* For each ingredient we have found get all the details on any images 
      * associated with it */
     /* Stores the final results for getting a list of ingredients belonging to a pantry */
      let finalResults = []
      for(let i = 0; i < ingredientResults.length; i++){
        let ingredient
        const images = await uploadsModel.getFile('Ingredients', ingredientResults[i].ingredientId)

        ingredient = {
          ...ingredientResults[i],
          images: images.results
        }

        finalResults.push(ingredient)
      }

      pantry = [
        {
         ...pantryResults[0],
         numIngredients: Number.parseInt(recordCount?.length),
         ingredients: finalResults
        }
      ]

      if(!pantry || pantry === undefined){
      throw {
        name: 'PANTRYMODEL_ERROR',
        message: 'There was a problem with the resource, please try again later'
      }
     }

     if(pantry.length < 1){
      return [];
     }

     return {
      results: pantry,
      totalRecords: recordCount.length,
      totalPages: parseInt(Math.ceil(recordCount.length/size)),
      currentPage: page
     };

  } catch(e) {
    
    /* We only wish to have the errors specific to the model reported back others are caught as
    a generic error */
    let message;
    
    if(e.name === 'PANTRYMODEL_ERROR'){
      message = e.message;
    } else {
      message = 'There was a problem with the resource, please try again later'
    }

    return {
      success: false,
      message: message
    }
  }

};

/*
 * Removes all pantries associated with a particluar user
 */
const removeAllByUser = async id => {

  try {

    /* Validate passed in parameters */
    if(!id || id === undefined){
      return {
        success: false,
        message: 'Undefined userId',
        count: 0
      }
    }

    /* Remove all pantries */
    const result = await db('pantries').del();

    return { count: result };

  } catch(e) {
    /* Determine if we display a generic error or one of our own messages */
    let message = 'There was an issue with the resource, please try again later';
  
    return {
      success: false,
      message: message
    }

  }

};

module.exports = {
  create,
  addItem,
  removeItem,
  updateItem,
  listAll,
  list,
  removeAll,
  removeAllByUser
};
