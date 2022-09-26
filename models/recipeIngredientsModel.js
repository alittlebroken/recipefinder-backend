/* Packages needed */
require('dotenv').config();
const db = require('../database');

const validation = require('../helpers/validation');

/*
 * Adds a new ingredient for a recipe
 * @param {object} data - Object containing the relevant data to be added to
 * to the model
 * @returns {object} - Contains if the operation was successful or not and a
 * supporting message
 */
const create = async data => {

  try {

    /* Validate the passed in data */
    if(!validation.validator(data, 'object')){
      throw {
        name: 'RECIPEINGREDIENTMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    if(!validation.validator(data.recipeId, 'number')){
      throw {
        name: 'RECIPEINGREDIENTMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    if(!validation.validator(data.ingredientId, 'number')){
      throw {
        name: 'RECIPEINGREDIENTMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    if(!validation.validator(data.amount, 'number')){
      throw {
        name: 'RECIPEINGREDIENTMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    if(!validation.validator(data.amount_type, 'string')){
      throw {
        name: 'RECIPEINGREDIENTMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* Add the entry to the database */
    const result = await db('recipe_ingredients')
     .insert(data)
     .returning('id');

      return {
        success: true,
        message: 'Ingredient successfully added to recipe'
      };

  } catch(e) {
    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;

    if(e.name === 'RECIPEINGREDIENTMODEL_ERROR'){
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
 * Allows you to specify a recipes ingredient record to be removed from the database
 * @param {number} id - The unique identifier of the record to be removed
 * @returns {object} Sets a success var of either true or false and a message
 * to give more information on the actions result
 */
const remove = async id => {

  try{

    /* Validate the passed in data */
    if(!validation.validator(id, 'number')){
      throw {
        name: 'RECIPEINGREDIENTMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* Now delete the record */
    const result = await db('recipe_ingredients')
     .delete()
     .where('id', id);

    /* Check we deleted a record */
    if(result && result > 0){
      return {
          success: true,
          message: 'Recipe ingredient successfully removed'
        }
    } else {
      return []
    }


  } catch(e) {
    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;

    if(e.name === 'RECIPEINGREDIENTMODEL_ERROR'){
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
 * Removes all ingredients that belong to a specififc recipe
 * @params {object} id - The unique identifier of the recipe to remove all
 * ingredients
 * @returns {object} Sets a success var of either true or false and a message
 * to give more information on the actions result
 */
const removeAllByRecipeId = async id => {

  try{

    /* Validate the passed in data */
    if(!validation.validator(id, 'number')){
      throw {
        name: 'RECIPEINGREDIENTMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* Now delete the record */
    const result = await db('recipe_ingredients')
     .delete()
     .where('recipeId', id);

    /* Check we deleted a record */
    if(result && result > 0){
      return {
          success: true,
          message: 'Recipe ingredient successfully removed'
        }
    } else {
      return []
    }


  } catch(e) {
    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;

    if(e.name === 'RECIPEINGREDIENTMODEL_ERROR'){
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
 * Updates a recipes ingredient with new details
 * @params {object} update - An object containing all the values that need to
 * be updated
 * @returns {object} Sets a success var of either true or false and a message
 * to give more information on the actions result
 */
const update = async update => {

  try{

    /* Validate the passed in data */
    if(!validation.validator(update, 'object')){
      throw {
        name: 'RECIPEINGREDIENTMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* Validate the passed in data */
    if(!validation.validator(update.id, 'number')){
      throw {
        name: 'RECIPEINGREDIENTMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* Validate the passed in data */
    if(!validation.validator(update.recipeId, 'number')){
      throw {
        name: 'RECIPEINGREDIENTMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* Validate the passed in data */
    if(!validation.validator(update.ingredientId, 'number')){
      throw {
        name: 'RECIPEINGREDIENTMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* Validate the passed in data */
    if(!validation.validator(update.amount, 'number')){
      throw {
        name: 'RECIPEINGREDIENTMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* Validate the passed in data */
    if(!validation.validator(update.amount_type, 'string')){
      throw {
        name: 'RECIPEINGREDIENTMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* Now delete the record */
    const result = await db('recipe_ingredients')
     .update(update)
     .where('id', update.id);

    /* Check we updated the specified record */
    if(result && result.length > 0){
      return {
          success: true,
          message: 'Recipe ingredient successfully updated'
        }
    } else {
      return []
    }


  } catch(e) {
    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;

    if(e.name === 'RECIPEINGREDIENTMODEL_ERROR'){
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
 * Extracts all ingredints from the database with a specific Id
 * @param {number} id  The unique id of the record we want
 * @returns {array} An object array containg the matching record
 */
const findById = async id => {

  try{

    /* Validate the passed in data */
    if(!validation.validator(id, 'number')){
      throw {
        name: 'RECIPEINGREDIENTMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

   /* Gather the data from the DB */
   const results = await db('recipe_ingredients')
    .select('*')
    .where('id', id);

   if(results && results.length > 0){
     return results;
   } else {
     return [];
   }

  } catch(e) {
    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;

    if(e.name === 'RECIPEINGREDIENTMODEL_ERROR'){
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
 * Retrieve all ingredients associated with a specific recipe
 * @param {number} id The unique identifier for the recipe whose ingredients
 * we are extracting
 * @returns {array} Array of objects with details on each ingredient found
 */
 const findByRecipeId = async id => {

   try{

     /* Validate the passed in data */
     if(!validation.validator(id, 'number')){
       throw {
         name: 'RECIPEINGREDIENTMODEL_ERROR',
         message: 'One or more required values are missing or incorrect'
       }
     };

    /* Gather the data from the DB */
    const results = await db('recipe_ingredients')
     .select('*')
     .where('recipeId', id);

    if(results && results.length > 0){
      return results;
    } else {
      return [];
    }

   } catch(e) {
     /* Check for library errors and if found swap them out for a generic
        one to send back over the API for security */
     let message;

     if(e.name === 'RECIPEINGREDIENTMODEL_ERROR'){
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
  * Retrieve all entries associated with a specific ingredient
  * @param {number} id The unique identifier for the recipe whose ingredients
  * we are extracting
  * @returns {array} Array of objects with details on each ingredient found
  */
  const findByIngredient = async id => {

    try{

      /* Validate the passed in data */
      if(!validation.validator(id, 'number')){
        throw {
          name: 'RECIPEINGREDIENTMODEL_ERROR',
          message: 'One or more required values are missing or incorrect'
        }
      };

     /* Gather the data from the DB */
     const results = await db('recipe_ingredients')
      .select('*')
      .where('ingredientId', id);

     if(results && results.length > 0){
       return results;
     } else {
       return [];
     }

    } catch(e) {
      /* Check for library errors and if found swap them out for a generic
         one to send back over the API for security */
      let message;

      if(e.name === 'RECIPEINGREDIENTMODEL_ERROR'){
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
 * returns all ingredients for all available recipes
 * @returns {array} An array of ingredient objects for each recipe we have stored
 * in the database
 */
 const findAll = async () => {

   try{

    /* Gather the data from the DB */
    const results = await db('recipe_ingredients')
     .select('*');

    if(results && results.length > 0){
      return results;
    } else {
      return [];
    }

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

module.exports = {
  create,
  remove,
  removeAllByRecipeId,
  update,
  findById,
  findByRecipeId,
  findAll,
  findByIngredient
}