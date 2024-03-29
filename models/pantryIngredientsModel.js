/* Packages needed */
require('dotenv').config();
const db = require('../database');

const validation = require('../helpers/validation');
const messageHelper = require('../helpers/constants');
const dbHelper = require('../helpers/database')

/*
 * Creates a new realtionship between a users pantry and an ingredient
 * @param {object} Contains the values needed to be added
 * @returns {object} Contains if running this function was successful or not and
 * any supporting message
*/
const create = async data => {

  try{

    /* Validate the passed in data */
    if(!validation.validator(data, 'object')){
      throw {
        name: 'PANTRYINGREDIENTSMODEL_ERROR',
        message: messageHelper.ERROR_MISSING_VALUES
      }
    };

    if(!validation.validator(data.pantryId, 'number')){
      throw {
        name: 'PANTRYINGREDIENTSMODEL_ERROR',
        message: messageHelper.ERROR_MISSING_VALUES
      }
    };

    if(!validation.validator(data.ingredientId, 'number')){
      throw {
        name: 'PANTRYINGREDIENTSMODEL_ERROR',
        message: messageHelper.ERROR_MISSING_VALUES
      }
    };

    if(!validation.validator(data.amount, 'number')){
      throw {
        name: 'PANTRYINGREDIENTSMODEL_ERROR',
        message: messageHelper.ERROR_MISSING_VALUES
      }
    };

    if(!validation.validator(data.amount_type, 'string')){
      throw {
        name: 'PANTRYINGREDIENTSMODEL_ERROR',
        message: messageHelper.ERROR_MISSING_VALUES
      }
    };

    /* Insert the data */
    const result = await db('pantry_ingredients')
     .insert(data);

      return {
        success: true,
        message: messageHelper.INFO_RECORD_CREATED
      }

  } catch(e) {
    /* Check the error name, we only want to specify our own error messages
       everything else can be represented by a generic message */
    let message;
    if(e.name === 'PANTRYINGREDIENTSMODEL_ERROR'){
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

/*
 * Updates a realtionship between a users pantry and an ingredient
 * @param {object} Contains the values needed to be updated
 * @returns {object} Contains if running this function was successful or not and
 * any supporting message
*/
const update = async data => {

  try{

    /* Validate the passed in data */
    if(!validation.validator(data, 'object')){
      throw {
        name: 'PANTRYINGREDIENTSMODEL_ERROR',
        message: 'Validation failed for passed in object'
      }
    };

    if(!validation.validator(data.id, 'number')){
      throw {
        name: 'PANTRYINGREDIENTSMODEL_ERROR',
        message: 'Validation failed for id'
      }
    };

    if(!validation.validator(data.ingredients, 'array')){
      throw {
        name: 'PANTRYINGREDIENTSMODEL_ERROR',
        message: 'Validation failed for ingredientId'
      }
    };

   
     await db.transaction(async trx => {

      /* Update the users pantry */
      for(let ingredient of data.ingredients){
      
        await db('pantry_ingredients')
        .insert({
          id: ingredient.id,
          pantryId: ingredient.pantryId ? ingredient.pantryId : data.id,
          ingredientId: ingredient.ingredientId,
          amount: ingredient.amount,
          amount_type: ingredient.amount_type
        })
        .onConflict('id')
        .merge()
        .transacting(trx)
  
       }

     })
     
     return {
      success: true,
      message: messageHelper.INFO_RECORD_UPDATED
    }

  } catch(e) {
    
    /* Check the error name, we only want to specify our own error messages
       everything else can be represented by a generic message */
    let message;
    if(e.name === 'PANTRYINGREDIENTSMODEL_ERROR'){
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

/*
 * Removes a realtionship between a users pantry and an ingredient
 * @param {id} The ID of the record to be removed
 * @returns {object} Contains if running this function was successful or not and
 * any supporting message
*/
const remove = async id => {

  try{

    /* Validate the passed in data */
    if(!validation.validator(id, 'number')){
      throw {
        name: 'PANTRYINGREDIENTSMODEL_ERROR',
        message: messageHelper.ERROR_MISSING_VALUES
      }
    };

    /* Update the data */
    const result = await db('pantry_ingredients')
     .delete()
     .where('id', id);

     if(result && result > 0){
       return {
         success: true,
         message: messageHelper.INFO_RECORD_REMOVED
       }
     } else {
       return [];
     }

  } catch(e) {
    /* Check the error name, we only want to specify our own error messages
       everything else can be represented by a generic message */
    let message;
    if(e.name === 'PANTRYINGREDIENTSMODEL_ERROR'){
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

/*
 * Removes all realtionships between users pantries and an ingredient
 * @returns {object} Contains if running this function was successful or not and
 * any supporting message
*/
const removeAll = async () => {

  try{

    /* Update the data */
    const result = await db('pantry_ingredients')
     .delete();

     if(result && result > 0){
       return {
         success: true,
         message: messageHelper.INFO_RECORD_REMOVED
       }
     } else {
       return [];
     }

  } catch(e) {
    /* Check the error name, we only want to specify our own error messages
       everything else can be represented by a generic message */
    let message= messageHelper.ERROR_GENERIC_RESOURCE;

    return {
      success: false,
      message: message
    }
  }

};

/*
 * Removes a realtionship between a users pantry and an ingredient via pantry id
 * @param {id} The ID of the record to be removed
 * @returns {object} Contains if running this function was successful or not and
 * any supporting message
*/
const removeByPantry = async id => {

  try{

    /* Validate the passed in data */
    if(!validation.validator(id, 'number')){
      throw {
        name: 'PANTRYINGREDIENTSMODEL_ERROR',
        message: messageHelper.ERROR_MISSING_VALUES
      }
    };

    /* Update the data */
    const result = await db('pantry_ingredients')
     .delete()
     .where('pantryId', id);

     if(result && result > 0){
       return {
         success: true,
         message: messageHelper.INFO_RECORD_REMOVED
       }
     } else {
       return [];
     }

  } catch(e) {
    /* Check the error name, we only want to specify our own error messages
       everything else can be represented by a generic message */
    let message;
    if(e.name === 'PANTRYINGREDIENTSMODEL_ERROR'){
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


/*
 * Removes a realtionship between a users pantry and an ingredient via ingredient id
 * @param {id} The ID of the record to be removed
 * @returns {object} Contains if running this function was successful or not and
 * any supporting message
*/
const removeByIngredient = async id => {

  try{

    /* Validate the passed in data */
    if(!validation.validator(id, 'number')){
      throw {
        name: 'PANTRYINGREDIENTSMODEL_ERROR',
        message: messageHelper.ERROR_MISSING_VALUES
      }
    };

    /* Update the data */
    const result = await db('pantry_ingredients')
     .delete()
     .where('ingredientId', id);

     if(result && result > 0){
       return {
         success: true,
         message: messageHelper.INFO_RECORD_REMOVED
       }
     } else {
       return [];
     }

  } catch(e) {
    /* Check the error name, we only want to specify our own error messages
       everything else can be represented by a generic message */
    let message;
    if(e.name === 'PANTRYINGREDIENTSMODEL_ERROR'){
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

/*
 * Returns all entries in the underlying table
 * @returns {array} array of objects containing relationship data between a
 * users pantry and ingredients
*/
const findAll = async () => {

  try{

    /* Update the data */
    const result = await db('pantry_ingredients as pi')
     .join('users as u', 'pi.userId', '=', 'u.id')
     .join('ingredients as i', 'i.id', '=', 'pi.ingredientId')
     .select(
       'pi.id as id',
       'pi.pantryId as pantryId',
       'i.id as ingredientId',
       'u.id as userId',
       'u.username as username',
       'i.name as ingredientName',
       'pi.amount as amount',
       'pi.amount_type as amount_type'
     );

     if(result && result.length > 0){
       return result;
     } else {
       return [];
     }

  } catch(e) {
    /* Check the error name, we only want to specify our own error messages
       everything else can be represented by a generic message */
    let message= messageHelper.ERROR_GENERIC_RESOURCE;

    return {
      success: false,
      message: message
    }
  }

};

/*
 * returns all entries for a specific pantry id
 * @param {id} The ID of the record that has the the records wewish to see
 * @returns {array} array of objects containing relationship data between a
 * users pantry and ingredients for a specific pantry id
*/
const findByPantry = async id => {

  try{

    /* Validate the passed in data */
    if(!validation.validator(id, 'number')){
      throw {
        name: 'PANTRYINGREDIENTSMODEL_ERROR',
        message: messageHelper.ERROR_MISSING_VALUES
      }
    };

    /* Update the data */
    const result = await db('pantry_ingredients as pi')
     .join('users as u', 'pi.userId', '=', 'u.id')
     .join('ingredients as i', 'i.id', '=', 'pi.ingredientId')
     .select(
       'pi.id as id',
       'pi.pantryId as pantryId',
       'i.id as ingredientId',
       'u.id as userId',
       'u.username as username',
       'i.name as ingredientName',
       'pi.amount as amount',
       'pi.amount_type as amount_type'
     )
     .where('pi.pantryId', id);

     if(result && result.length > 0){
       return result;
     } else {
       return [];
     }

  } catch(e) {
    /* Check the error name, we only want to specify our own error messages
       everything else can be represented by a generic message */
    let message;

    if(e.name === 'PANTRYINGREDIENTSMODEL_ERROR'){
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

/*
 * returns all entries for a specific ingredient id
 * @param {id} The ID of the record that has the the records we wish to see
 * @returns {array} array of objects containing relationship data between a
 * users pantry and ingredients for a specific ingredient id
*/
const findByIngredient = async id => {

  try{

    /* Validate the passed in data */
    if(!validation.validator(id, 'number')){
      throw {
        name: 'PANTRYINGREDIENTSMODEL_ERROR',
        message: messageHelper.ERROR_MISSING_VALUES
      }
    };

    /* Update the data */
    const result = await db('pantry_ingredients as pi')
     .join('users as u', 'pi.userId', '=', 'u.id')
     .join('ingredients as i', 'i.id', '=', 'pi.ingredientId')
     .select(
       'pi.id as id',
       'pi.pantryId as pantryId',
       'i.id as ingredientId',
       'u.id as userId',
       'u.username as username',
       'i.name as ingredientName',
       'pi.amount as amount',
       'pi.amount_type as amount_type'
     )
     .where('pi.ingredientId', id);

     if(result && result.length > 0){
       return result;
     } else {
       return [];
     }

  } catch(e) {
    /* Check the error name, we only want to specify our own error messages
       everything else can be represented by a generic message */
    let message;

    if(e.name === 'PANTRYINGREDIENTSMODEL_ERROR'){
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

/*
 * returns all entries for a specific user
 * @param {id} The id of the user whos pantry we are looking at
 * @returns {array} array of objects containing relationship data between a
 * users pantry and ingredients
*/
const findByUser = async (id, options) => {

  try{

    /* Pagination options */
    let {page, size, offset, filterBy, filterValues, filter, sortBy, sortOrder} = options

    /* Validate the passed in data */
    if(!validation.validator(id, 'number')){
      throw {
        name: 'PANTRYINGREDIENTSMODEL_ERROR',
        message: messageHelper.ERROR_MISSING_VALUES
      }
    };

    /* Get the total count of records */
    const recordCount = await db('pantry_ingredients as pi')
     .join('pantries as p', 'pi.pantryId', '=', 'p.id')
     .join('ingredients as i', 'i.id', '=', 'pi.ingredientId')
     .modify(dbHelper.buildFilters, filter)
     .select(
       'pi.id',
     )
     .where('p.userId', id)
     .count('pi.id')
     .groupBy('pi.id')


    /* Update the data */
    const result = await db('pantry_ingredients as pi')
     .join('pantries as p', 'pi.pantryId', '=', 'p.id')
     .join('ingredients as i', 'i.id', '=', 'pi.ingredientId')
     .modify(dbHelper.buildFilters, filter)
     .modify(dbHelper.buildLimit, size)
     .select(
       'pi.id as id',
       'pi.pantryId as pantryId',
       'i.id as ingredientId',
       'i.name as ingredientName',
       'pi.amount as amount',
       'pi.amount_type as amount_type'
     )
     .where('p.userId', id)
     .modify(dbHelper.buildSort, { sortBy, sortOrder })
     
     .offset(offset);

     if(result && result.length > 0){
       /* Calculate number of pages */
      let numPages = parseInt(Math.floor(recordCount.length / size))
      if(numPages < 1) numPages = 1

       return {
        results: result,
        currentPage: page,
        totalPages: numPages,
        totalRecords: recordCount.length
       };
     } else {
       return [];
     }

  } catch(e) {
    
    /* Check the error name, we only want to specify our own error messages
       everything else can be represented by a generic message */
    let message;

    if(e.name === 'PANTRYINGREDIENTSMODEL_ERROR'){
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
  create,
  update,
  remove,
  removeAll,
  removeByPantry,
  removeByIngredient,
  findAll,
  findByPantry,
  findByIngredient,
  findByUser
};
