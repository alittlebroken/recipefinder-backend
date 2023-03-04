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
   const results = await db('recipe_ingredients ri')
    .join('ingredients i', 'ri.ingredientId', '=', 'i.id')
    .select('i.id as id', 'i.name as name', 'ri.amount as amount', 'ri.amount_type as amount_type')
    .where('ri.id', id);


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
 * @param {object} options The list of pagination options
 * @returns {array} Array of objects with details on each ingredient found
 */
 const findByRecipeId = async (id, options) => {

   try{

     /* get the pagination values */
     let {page, size, offset, filterBy, filterValues, filter, sortBy, sortOrder} = options


     /* Validate the passed in data */
     if(!validation.validator(id, 'number')){
       throw {
         name: 'RECIPEINGREDIENTMODEL_ERROR',
         message: 'One or more required values are missing or incorrect'
       }
     };

     /* Get a record count */
    const recordCount = await db('recipe_ingredients as ri')
    .join('ingredients as i', 'ri.ingredientId', '=', 'i.id')
    .join('recipes as r', 'r.id', '=', 'ri.recipeId')
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

          /* Now check if we have multiple values to filter by */
          if(rawFilter[item].length > 1){
            /* use whereIn to filter on multiples */
            queryBuilder.whereIn('id', rawFilter[item])
          } else {
            /* Only one value to filter by */
            queryBuilder.where('id', rawFilter[item][0])
          }

        })

      }
      })
    .select('ri.id')
    .where('ri.recipeId', id)
    .count('ri.id')
    .groupBy('ri.id')

    /* Gather the data from the DB */
    const results = await db('recipe_ingredients as ri')
     .join('ingredients as i', 'ri.ingredientId', '=', 'i.id')
     .join('recipes as r', 'r.id', '=', 'ri.recipeId')
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

          /* Now check if we have multiple values to filter by */
          if(rawFilter[item].length > 1){
            /* use whereIn to filter on multiples */
            queryBuilder.whereIn('id', rawFilter[item])
          } else {
            /* Only one value to filter by */
            queryBuilder.where('id', rawFilter[item][0])
          }

        })

      }
      })
     .select('i.id as id', 'i.name as name', 'ri.amount as amount', 'ri.amount_type as amount_type')
     .where('ri.recipeId', id)
     .modify((queryBuilder) => {
        // order by clause
        if(sortBy !== undefined || sortOrder !== undefined){
            queryBuilder.orderBy(sortBy, sortOrder)
        }
      })
     .limit(size)
     .offset(offset)
     
    if(results && results.length > 0){
      /* Calculate number of pages */
      let numPages = parseInt(Math.floor(recordCount.length / size))
      if(numPages < 1) numPages = 1

      return {
        results: results,
        totalRecords: recordCount.length,
        totalPages: numPages,
        currentPage: page
      };
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
  * @param {object} options The pagination and other record options to apply  
  * @returns {array} Array of objects with details on each ingredient found
  */
  const findByIngredient = async (id, options) => {

    try{

      let {page, size, offset, filterBy, filterValues, result, sortBy, sortOrder} = options

      /* Validate the passed in data */
      if(!validation.validator(id, 'number')){
        throw {
          name: 'RECIPEINGREDIENTMODEL_ERROR',
          message: 'One or more required values are missing or incorrect'
        }
      };

     /* Gather the data from the DB */
     const results = await db('recipe_ingredients as ri')
      .join('ingredients as i', 'ri.ingredientId', '=', 'i.id')
      .modify((queryBuilder) => {
        // Where clause
        if(filterBy !== undefined || filterValues !== undefined){
          queryBuilder.whereILike(filterBy, `%${filterValues}%`)
        }
      })
      .select('i.id as id', 'i.name as name', 'ri.amount as amount', 'ri.amount_type as amount_type', 'ri.recipeId as recipeId')
      .where('ri.ingredientId', id)
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
    
              /* Now check if we have multiple values to filter by */
              if(rawFilter[item].length > 1){
                /* use whereIn to filter on multiples */
                queryBuilder.whereIn('id', rawFilter[item])
              } else {
                /* Only one value to filter by */
                queryBuilder.where('id', rawFilter[item][0])
              }
    
            })
    
          }
        })
      .limit(size)
      .offset((page - 1) * size);

    const resultCount = await db('recipe_ingredients as ri')
     .join('ingredients as i', 'ri.ingredientId', '=', 'i.id')
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

          /* Now check if we have multiple values to filter by */
          if(rawFilter[item].length > 1){
            /* use whereIn to filter on multiples */
            queryBuilder.whereIn('id', rawFilter[item])
          } else {
            /* Only one value to filter by */
            queryBuilder.where('id', rawFilter[item][0])
          }

        })

      }
     })
     .select('ri.id')
     .where('ri.ingredientId', id)
     .count()
     .groupBy('ri.id')

     if(results && results.length > 0){
      /* Calculate number of pages */
        let numPages = parseInt(Math.floor(recordCount.length / size))
        if(numPages < 1) numPages = 1

       return {
        data: results,
        totalRecords: resultCount.length,
        totalPages: numPages,
        currentPage: page
       }
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
    const results = await db('recipe_ingredients ri')
     .join('ingredients i', 'ri.ingredientId', '=', 'i.id')
     .select('i.id as id', 'i.name as name', 'ri.amount as amount', 'ri.amount_type as amount_type');

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
