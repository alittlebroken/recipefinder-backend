/* Packages needed */
require('dotenv').config();
const db = require('../database');
const dbHelper = require('../helpers/database')
const validation = require('../helpers/validation');

/*
 * Adds a recipe to a cookbook
 * @param {object} data Object containing the ids of the cookbook and the
 * recipe to be added to it
 * @returns {object} Contains the success state of the requested action and
 * any accompanying message to explain further
 */
const create = async data => {

  try {

    /* Validate the passed in data */
    if(!validation.validator(data, 'object')){
      throw {
        name: 'COOKBOOKRECIPESMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    if(!validation.validator(data.cookbookId, 'number')){
      throw {
        name: 'COOKBOOKRECIPESMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    if(!validation.validator(data.recipeId, 'number')){
      throw {
        name: 'COOKBOOKRECIPESMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

     /* Check if we have an existing entry first */
     const existing = await db('cookbook_recipes')
     .where('cookbookId', data.cookbookId)
     .where('recipeId', data.recipeId)

     
     if(existing && existing?.length >= 1){
      return {
        status: 409,
        success: false,
        message: 'The cookbook already contains the specified recipe.'
      }
     }

    /* Add the entry to the database */
    const result = await db('cookbook_recipes')
     .insert(data)
     .returning('id');

      return {
        success: true,
        message: 'Record created successfully'
      };

  } catch(e) {
    
    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;

    if(e.name === 'COOKBOOKRECIPESMODEL_ERROR'){
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
 * Removes the specified entry from the table
 * @param {number} id - The entry in the table to remove
 * @returns {object} Contains the success state of the requested action and
 * any accompanying message to explain further
 */
const remove = async id => {

  try {

    /* Validate the passed in data */
    if(!validation.validator(id, 'number')){
      throw {
        name: 'COOKBOOKRECIPESMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

   

    /* Add the entry to the database */
    const result = await db('cookbook_recipes')
     .delete()
     .where('id', id);

     /* Check we deleted a record */
     if(result && result > 0){
       return {
           success: true,
           message: 'Recipe removed from cookbook successfully'
         }
     } else {
       return []
     }

  } catch(e) {
    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;

    if(e.name === 'COOKBOOKRECIPESMODEL_ERROR'){
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
 * Removes all recipes for the specified cookbook id
 * @param {number} id - The unique identifier of the cookbook the recipes are
 * being removed from
 * @param {object} options  - Settings for manipulating the records further
 * @returns {object} Contains the success state of the requested action and
 * any accompanying message to explain further
 */
const removeByCookbook = async (id, options) => {

   try {

    /* Extract the pagination settings */
    let {page, size, offset, filterBy, filter, filterValues, limit, sortBy, sortOrder} = options

     /* Validate the passed in data */
     if(!validation.validator(id, 'number')){
       throw {
         name: 'COOKBOOKRECIPESMODEL_ERROR',
         message: 'One or more required values are missing or incorrect'
       }
     };

     /* Add the entry to the database*/
     const result = await db('cookbook_recipes')
      .modify(dbHelper.buildFilters, filter)
      .delete()

      /* Check we deleted a record */
      if(result && result > 0){
        return {
            success: true,
            message: 'Cookbook recipes removed successfully'
          }
      } else {
        return []
      }

   } catch(e) {
     /* Check for library errors and if found swap them out for a generic
        one to send back over the API for security */
     let message;

     if(e.name === 'COOKBOOKRECIPESMODEL_ERROR'){
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


 /* Removes a singular recipe from the cookbook
  * @param {number} id - The unique identifier of the cookbook being amended
  * @param {number} recipeId - The unique identifier of the recipe being removed
  * @param {object} options  - Settings for manipulating the records further
  * @returns {object} Contains the success state of the requested action and
  * any accompanying message to explain further
 */
 
 const removeCookBookRecipe = async (id, recipeId, options) => {

   try {

    /* Extract the pagination settings */
    let {page, size, offset, filterBy, filter, filterValues, limit, sortBy, sortOrder} = options

     /* Validate the passed in data */
     if(!validation.validator(id, 'number')){
       throw {
         name: 'COOKBOOKRECIPESMODEL_ERROR',
         message: 'One or more required values are missing or incorrect'
       }
     };

     /* Validate the passed in data */
     if(!validation.validator(recipeId, 'number')){
      throw {
        name: 'COOKBOOKRECIPESMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

     /* Add the entry to the database*/
     const result = await db('cookbook_recipes')
      .where('cookbookId', id)
      .where('recipeId', recipeId)
      .del()

      /* Check we deleted a record */
      if(result && result > 0){
        return {
            success: true,
            message: 'Cookbook recipes removed successfully'
          }
      } else {
        return []
      }

   } catch(e) {
     /* Check for library errors and if found swap them out for a generic
        one to send back over the API for security */
     let message;

     if(e.name === 'COOKBOOKRECIPESMODEL_ERROR'){
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
  * Removes specified recipe from all cookbooks
  * @param {number} id - The unique identifier of the recipe being removed
  * @returns {object} Contains the success state of the requested action and
  * any accompanying message to explain further
  */
const removeByRecipe = async id => {

    try {

      /* Validate the passed in data */
      if(!validation.validator(id, 'number')){
        throw {
          name: 'COOKBOOKRECIPESMODEL_ERROR',
          message: 'One or more required values are missing or incorrect'
        }
      };

      /* Add the entry to the database */
      const result = await db('cookbook_recipes')
       .delete()
       .where('recipeId', id);

       /* Check we deleted a record */
       if(result && result.length > 0){
         return {
             success: true,
             message: 'Recipe removed from all cookbooks successfully'
           }
       } else {
         return []
       }

    } catch(e) {
      /* Check for library errors and if found swap them out for a generic
         one to send back over the API for security */
      let message;

      if(e.name === 'COOKBOOKRECIPESMODEL_ERROR'){
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
 * Updates an entry to allow it to be moved from one cookbook to another if
 * needed
 * @param {object} data - Contains the values to be updated
 * @returns {object} Contains the success state of the requested action and
 * any accompanying message to explain further
 */
const update = async data => {

    try {

      /* Validate the passed in data */
      if(!validation.validator(data, 'object')){
        throw {
          name: 'COOKBOOKRECIPESMODEL_ERROR',
          message: 'One or more required values are missing or incorrect'
        }
      };

      if(!validation.validator(data.id, 'number')){
        throw {
          name: 'COOKBOOKRECIPESMODEL_ERROR',
          message: 'One or more required values are missing or incorrect'
        }
      };

      if(!validation.validator(data.cookbookId, 'number')){
        throw {
          name: 'COOKBOOKRECIPESMODEL_ERROR',
          message: 'One or more required values are missing or incorrect'
        }
      };

      if(!validation.validator(data.recipeId, 'number')){
        throw {
          name: 'COOKBOOKRECIPESMODEL_ERROR',
          message: 'One or more required values are missing or incorrect'
        }
      };

      const results = await db('cookbook_recipes')
       .where('id', data.id)
       .update(data)
       .returning('id');


      return {
        success: true,
        message: 'Cookbook recipe updated successfully'
      }

    } catch(e) {
      /* Check for library errors and if found swap them out for a generic
         one to send back over the API for security */
      let message;

      if(e.name === 'COOKBOOKRECIPESMODEL_ERROR'){
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
 * Return all recipes that belong to a cookbook
 * @param {number} id - The unique identifier of the cookbook holding the recipes
 * we wish to retrieve
 * @returns {array} Array og objects representing a list of cookbooks and the
 * recipes they contain
 */
const findByCookbook = async id => {

  try {

    /* Validate the passed in data */
    if(!validation.validator(id, 'number')){
      throw {
        name: 'COOKBOOKRECIPESMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* Get the data from the DB */
    const results = await db('cookbook_recipes as cr')
     .join('cookbooks as cb', 'cr.cookbookId', '=', 'cb.id')
     .join('users as usr', 'cb.userId', '=', 'usr.id')
     .select(
       'cb.id as cookbookId',
       'cb.name as cookbookName',
       'usr.id as userId',
       'usr.username as username',
       'cb.description as cookbookDescription',
       'cb.image as cookbookImage'
     )
     .where('cookbookId', id);

    if(results && results.length > 0){
      return results;
    } else {
      return [];
    }

  } catch(e) {
    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;

    if(e.name === 'COOKBOOKRECIPESMODEL_ERROR'){
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
 * Return all recipes that match no matter which cookbook they belong to
 * @param {number} id - The unique identifier of the recipe to retrieve
 * @returns {array} Array og objects representing a list of recipes and any
 * cookbooks they appear in
 */
const findByRecipe = async id => {

  try {

    /* Validate the passed in data */
    if(!validation.validator(id, 'number')){
      throw {
        name: 'COOKBOOKRECIPESMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* Get the data from the DB */
    const results = await db('cookbook_recipes as cr')
     .join('cookbooks as cb', 'cr.cookbookId', '=', 'cb.id')
     .join('users as usr', 'cb.userId', '=', 'usr.id')
     .select(
       'cr.id as id',
       'cb.id as cookbookId',
       'cb.name as cookbookName',
       'usr.id as userId',
       'usr.username as username',
       'cb.description as cookbookDescription',
       'cb.image as cookbookImage'
     )
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

    if(e.name === 'COOKBOOKRECIPESMODEL_ERROR'){
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
 * Return all entries in the cookbook recipes table
 * @returns {array} Array of objects representing a list of recipes and any
 * cookbooks they appear in
 */
const findAll= async () => {

  try {

    /* Get the data from the DB */
    const results = await db('cookbook_recipes as cr')
     .join('cookbooks as cb', 'cr.cookbookId', '=', 'cb.id')
     .join('users as usr', 'cb.userId', '=', 'usr.id')
     .select(
       'cb.id as cookbookId',
       'cb.name as cookbookName',
       'usr.id as userId',
       'usr.username as username',
       'cb.description as cookbookDescription',
       'cb.image as cookbookImage'
     );

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
    removeByCookbook,
    removeByRecipe,
    update,
    findByCookbook,
    findByRecipe,
    findAll,
    removeCookBookRecipe
};
