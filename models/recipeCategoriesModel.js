/* Packages needed */
require('dotenv').config();
const db = require('../database');

const validation = require('../helpers/validation');
const dbHelper = require('../helpers/database')

/*
 * Adds a category to a recipe
 * @param {object} Contains values that are to be inserted into the database
 * @returns {object} Contains if the required action was successfull and a
 * supporting message to further explain the result of running this function
 */
const create = async data => {

  try{

    /* Validate the passed in data */
    if(!validation.validator(data, 'object')){
      throw {
        name: 'RECIPECATEGORIESMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* Validate the passed in data */
    if(!validation.validator(data.recipeId, 'number')){
      throw {
        name: 'RECIPECATEGORIESMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* Validate the passed in data */
    if(!validation.validator(data.categoryId, 'number')){
      throw {
        name: 'RECIPECATEGORIESMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* Add the data to the database */
    const result = await db('recipe_categories')
     .insert(data);

      return {
        success: true,
        message: 'Category successfully added to Recipe'
      }


  } catch(e) {

    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;

    if(e.name === 'RECIPECATEGORIESMODEL_ERROR'){
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
 * Updates a recipes categories
 * @param {object} data - The values that are to be updated
 * @returns {object} Contains if the required action was successfull and a
 * supporting message to further explain the result of running this function
 */
const update = async data => {

  try{

    /* Validate the passed in data */
    if(!validation.validator(data, 'object')){
      throw {
        name: 'RECIPECATEGORIESMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    if(!validation.validator(data.id, 'number')){
      throw {
        name: 'RECIPECATEGORIESMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    if(!validation.validator(data.recipeId, 'number')){
      throw {
        name: 'RECIPECATEGORIESMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    if(!validation.validator(data.categoryId, 'number')){
      throw {
        name: 'RECIPECATEGORIESMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* Updated the record in the database */
    const result = await db('recipe_categories')
     .update({
       recipeId: data.recipeId,
       categoryId: data.categoryId
     })
     .where('id', data.id)
     .returning('id');

    if(result && result.length > 0){
      return {
        success: true,
        message: 'Recipe category successfully updated'
      }
    } else {
      return [];
    }

  } catch(e) {

    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;

    if(e.name === 'RECIPECATEGORIESMODEL_ERROR'){
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
 * Removes entries by recipe Id
 * @param {number} id - The unique recipe identifier
 * @returns {object} Contains if the required action was successfull and a
 * supporting message to further explain the result of running this function
 */
const removeByRecipe = async id => {

  try{

    /* Validate the passed in data */
    if(!validation.validator(id, 'number')){
      throw {
        name: 'RECIPECATEGORIESMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* Remove the specified record(s) */
    const result = await db('recipe_categories')
     .delete()
     .where('recipeId', id);

    if(result && result > 0){
      return {
        success: true,
        message: 'All recipe categories have been removed successfully'
      }
    } else {
      return [];
    }

  } catch(e) {

    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;

    if(e.name === 'RECIPECATEGORIESMODEL_ERROR'){
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
 * Removes entries by category Id
 * @param {number} id - The unique category identifier
 * @returns {object} Contains if the required action was successfull and a
 * supporting message to further explain the result of running this function
 */
const removeByCategory = async id => {

  try{

    /* Validate the passed in data */
    if(!validation.validator(id, 'number')){
      throw {
        name: 'RECIPECATEGORIESMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* Remove the specified record(s) */
    const result = await db('recipe_categories')
     .delete()
     .where('categoryId', id);

    if(result && result > 0){
      return {
        success: true,
        message: 'All matching categories that belong to recipes have been removed successfully'
      }
    } else {
      return [];
    }

  } catch(e) {

    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;

    if(e.name === 'RECIPECATEGORIESMODEL_ERROR'){
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
 * Remove all entries from the table
 * @returns {object} Contains if the required action was successfull and a
 * supporting message to further explain the result of running this function
 */
const removeAll = async () => {

  try{

    /* Remove the specified record(s) */
    const result = await db('recipe_categories')
     .delete();

    if(result && result > 0){
      return {
        success: true,
        message: 'All entries have been removed successfully'
      }
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

/*
 * Return all entries in the table
 * @returns {object} Contains if the required action was successfull and a
 * supporting message to further explain the result of running this function
 */
const findAll = async () => {

  try{

    /* Retrieve the specified record(s) */
    const result = await db('recipe_categories as rc')
     .join('categories as cat', 'cat.id', '=', 'rc.categoryId')
     .select(
       'rc.id as id',
       'rc.recipeId as recipeId',
       'cat.id as categoryId',
       'cat.name as categoryName'
     );

    if(result && result.length > 0){
      return result;
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

/*
 * Return all entries in the table that have a recipe Id matching the passed in
 * function argument
 * @param {number} id - The id of the recipe
 * @param {object} options The pagination settings
 * @returns {object} Contains if the required action was successfull and a
 * supporting message to further explain the result of running this function
 */
const findByRecipe = async (id, options) => {

  try{

    /* extract the pagination settings */
    let {page, size, offset, filterBy, filterValues, filter, limit, sortBy, sortOrder} = options

    /* Validate the passed in data */
    if(!validation.validator(id, 'number')){
      throw {
        name: 'RECIPECATEGORIESMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* Generate a total count of the data we are insterested in */
    const recordCount = await db('recipe_categories as rc')
    .join('categories as cat', 'cat.id', '=', 'rc.categoryId')
    .modify(dbHelper.buildFilters, filter)
    .select('rc.id',)
    .where('rc.recipeId', id)
    .count('rc.id')
    .groupBy('rc.id')

    /* Retrieve the specified record(s) */
    const result = await db('recipe_categories as rc')
     .join('categories as cat', 'cat.id', '=', 'rc.categoryId')
     .modify(dbHelper.buildFilters, filter)
     .select(
       'rc.id as id',
       'rc.recipeId as recipeId',
       'cat.id as categoryId',
       'cat.name as categoryName'
     )
     .where('rc.recipeId', id)
     .modify(dbHelper.buildSort, { sortBy, sortOrder })

    if(result && result.length > 0){
      /* Calculate number of pages */
      let numPages = parseInt(Math.floor(recordCount.length / size))
      if(numPages < 1) numPages = 1

      return {
        results: result,
        currentPage: page,
        totalRecords: recordCount.length,
        totalPages: numPages
      };
    } else {
      return [];
    }

  } catch(e) {
    
    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;

    if(e.name === 'RECIPECATEGORIESMODEL_ERROR'){
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
 * Return all entries in the table that have a category Id matching the passed in
 * function argument
 * @param {number} id - The id of the category
 * @returns {object} Contains if the required action was successfull and a
 * supporting message to further explain the result of running this function
 */
const findByCategory = async (id, options) => {

  let {page, size, offset, filter, filterBy, filterValues, limit, sortBy, sortOrder} = options

  sortBy = `rc.${sortBy}`

  try{

    /* Validate the passed in data */
    if(!validation.validator(id, 'number')){
      throw {
        name: 'RECIPECATEGORIESMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* Retrieve the specified record(s) */
    const result = await db('recipe_categories as rc')
     .join('categories as cat', 'cat.id', '=', 'rc.categoryId')
     .modify(dbHelper.buildFilters, filter)
     .select(
       'rc.id as id',
       'rc.recipeId as recipeId',
       'cat.id as categoryId',
       'cat.name as categoryName'
     )
     .where('rc.categoryId', id)
     .modify(dbHelper.buildSort, { sortBy, sortOrder })
     .limit(parseInt(size))
     .offset((page - 1) * size);

    const totalCount = await db('recipe_categories as rc')
    .join('categories as cat', 'cat.id', '=', 'rc.categoryId')
    .modify(dbHelper.buildFilters, filter)
    .select(
      'rc.id as id',
    )
    .where('rc.categoryId', id)
    .count('rc.id')
    .groupBy('rc.id')

    if(result && result.length > 0){
      /* Calculate number of pages */
      let numPages = parseInt(Math.floor(totalCount.length / size))
      if(numPages < 1) numPages = 1
      
      return {
        data: result,
        totalRecords: totalCount.length,
        totalPages: parseInt(Math.floor(totalCount.length / size)) + 1,
        currentPage: page
      };
    } else {
      return [];
    }

  } catch(e) {
    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;

    if(e.name === 'RECIPECATEGORIESMODEL_ERROR'){
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
  update,
  removeByRecipe,
  removeByCategory,
  removeAll,
  findAll,
  findByRecipe,
  findByCategory
};
