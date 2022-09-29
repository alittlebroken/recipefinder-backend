/* Packages needed */
require('dotenv').config();
const db = require('../database');

const validation = require('../helpers/validation');

/*
 * Assigns a category to a cookbook
 * @param {object} Contains the values needed to add a category to the cookbook
 * @returns {object} Contains if running this function was successful or not and
 * any supporting message
 */
const create = async data => {

  try{

    /* Validate the passed in data */
    if(!validation.validator(data, 'object')){
      throw {
        name: 'COOKBOOKCATEGORYMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    if(!validation.validator(data.cookbookId, 'number')){
      throw {
        name: 'COOKBOOKCATEGORYMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    if(!validation.validator(data.categoryId, 'number')){
      throw {
        name: 'COOKBOOKCATEGORYMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* Add the record to the database */
    await db('cookbook_categories')
     .insert(data);

    return {
      success: true,
      message: 'Category successfully added to cookbook'
    }

  } catch(e) {

    /* Check the error name, we only want to specify our own error messages
       everything else can be represented by a generic message */
    let message;
    if(e.name === 'COOKBOOKCATEGORYMODEL_ERROR'){
      message = e.message;
    } else {
      message = 'There was an issue with the resource, please try again later';
    }

    return {
      success: false,
      message: message
    }

  }

};

/*
 * Updates the relationship between a cookbook and it's cookbook_categories
 * @param {object} Contains the values needed tp update the record
 * @returns {object} Contains if running this function was successful or not and
 * any supporting message
 */
const update = async data => {

  try{

    /* Validate the passed in data */
    if(!validation.validator(data, 'object')){
      throw {
        name: 'COOKBOOKCATEGORYMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    if(!validation.validator(data.id, 'number')){
      throw {
        name: 'COOKBOOKCATEGORYMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    if(!validation.validator(data.cookbookId, 'number')){
      throw {
        name: 'COOKBOOKCATEGORYMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    if(!validation.validator(data.categoryId, 'number')){
      throw {
        name: 'COOKBOOKCATEGORYMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* Add the record to the database */
    const result = await db('cookbook_categories')
     .update(data)
     .where('id', data.id);

    if(result && result.length > 0){
      return {
        success: true,
        message: 'Record updated successfully'
      }
    } else {
      return [];
    }



  } catch(e) {

    /* Check the error name, we only want to specify our own error messages
       everything else can be represented by a generic message */
    let message;
    if(e.name === 'COOKBOOKCATEGORYMODEL_ERROR'){
      message = e.message;
    } else {
      message = 'There was an issue with the resource, please try again later';
    }

    return {
      success: false,
      message: message
    }

  }

};

/*
 * Removes a singular relationship between cookbook and category
 * @param {number} id - The identifier of the record to be removed
 * @returns {object} Contains if running this function was successful or not and
 * any supporting message
 */
const remove = async id => {

  try{

    /* Validate the passed in data */
    if(!validation.validator(id, 'number')){
      throw {
        name: 'COOKBOOKCATEGORYMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* Add the record to the database */
    const result = await db('cookbook_categories')
     .delete()
     .where('id', id);

    if(result && result > 0){
      return {
        success: true,
        message: 'Cookbook category removed successfully'
      }
    } else {
      return [];
    }

  } catch(e) {

    /* Check the error name, we only want to specify our own error messages
       everything else can be represented by a generic message */
    let message;
    if(e.name === 'COOKBOOKCATEGORYMODEL_ERROR'){
      message = e.message;
    } else {
      message = 'There was an issue with the resource, please try again later';
    }

    return {
      success: false,
      message: message
    }

  }

};

/*
 * Removes all relationships between cookbook and category
 * @returns {object} Contains if running this function was successful or not and
 * any supporting message
 */
const removeAll = async () => {

  try{

    /* Add the record to the database */
    const result = await db('cookbook_categories')
     .delete();

    if(result && result > 0){
      return {
        success: true,
        message: 'All cookbook categories removed successfully'
      }
    } else {
      return [];
    }

  } catch(e) {

    /* Check the error name, we only want to specify our own error messages
       everything else can be represented by a generic message */
    let message =  'There was an issue with the resource, please try again later';

    return {
      success: false,
      message: message
    }

  }

};

/*
 * Removes all categories for a cookbook
 * @param {number} id - The identifier of the record to be removed
 * @returns {object} Contains if running this function was successful or not and
 * any supporting message
 */
const removeByCookbook = async id => {

  try{

    /* Validate the passed in data */
    if(!validation.validator(id, 'number')){
      throw {
        name: 'COOKBOOKCATEGORYMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* Add the record to the database */
    const result = await db('cookbook_categories')
     .delete()
     .where('cookbookId', id);

    if(result && result > 0){
      return {
        success: true,
        message: 'All categories for specified cookbook removed successfully'
      }
    } else {
      return [];
    }

  } catch(e) {

    /* Check the error name, we only want to specify our own error messages
       everything else can be represented by a generic message */
    let message;
    if(e.name === 'COOKBOOKCATEGORYMODEL_ERROR'){
      message = e.message;
    } else {
      message = 'There was an issue with the resource, please try again later';
    }

    return {
      success: false,
      message: message
    }

  }

};

/*
 * Removes a particular category from all cookbooks
 * @param {number} id - The identifier of the record(s) to be removed
 * @returns {object} Contains if running this function was successful or not and
 * any supporting message
 */
const removeByCategory = async id => {

  try{

    /* Validate the passed in data */
    if(!validation.validator(id, 'number')){
      throw {
        name: 'COOKBOOKCATEGORYMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* Add the record to the database */
    const result = await db('cookbook_categories')
     .delete()
     .where('categoryId', id);

    if(result && result > 0){
      return {
        success: true,
        message: 'All categories matching if successfully removed'
      }
    } else {
      return [];
    }

  } catch(e) {

    /* Check the error name, we only want to specify our own error messages
       everything else can be represented by a generic message */
    let message;
    if(e.name === 'COOKBOOKCATEGORYMODEL_ERROR'){
      message = e.message;
    } else {
      message = 'There was an issue with the resource, please try again later';
    }

    return {
      success: false,
      message: message
    }

  }

};

/*
 * Returns all cookbook/category relationships
 * @returns {array} Array of cookbook/category objects
 */
const findAll = async () => {

  try{

    /* Add the record to the database */
    const result = await db('cookbook_categories as cc')
     .join('cookbooks as c', 'cc.cookbookId', '=', 'cookbooks.id')
     .join('categories as cat', 'cat.id', '=', 'cc.categoryId')
     .select(
       'cc.id',
       'c.name as cookbookName',
       'c.id as categoryId',
       'cat.name as categoryName',
       'cat.id as categoryId'
     );

    if(result && result.length > 0){
      return result;
    } else {
      return [];
    }

  } catch(e) {

    /* Check the error name, we only want to specify our own error messages
       everything else can be represented by a generic message */
    let message = 'There was an issue with the resource, please try again later';

    return {
      success: false,
      message: message
    }

  }

};

/*
 * Returns all cookbook/category relationships for a particular cookbook
 * @param {number} id - The identifier of the record(s) to be removed
 * @returns {array} Array of cookbook/category objects
 */
const findByCookbook = async id => {

  try{

    /* Validate the passed in data */
    if(!validation.validator(id, 'number')){
      throw {
        name: 'COOKBOOKCATEGORYMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* Add the record to the database */
    const result = await db('cookbook_categories as cc')
     .join('cookbooks as c', 'cc.cookbookId', '=', 'cookbooks.id')
     .join('categories as cat', 'cat.id', '=', 'cc.categoryId')
     .select(
       'cc.id',
       'c.name as cookbookName',
       'c.id as categoryId',
       'cat.name as categoryName',
       'cat.id as categoryId'
     )
     .where('cookbookId', id);

    if(result && result.length > 0){
      return result;
    } else {
      return [];
    }

  } catch(e) {

    /* Check the error name, we only want to specify our own error messages
       everything else can be represented by a generic message */
    let message;
    if(e.name === 'COOKBOOKCATEGORYMODEL_ERROR'){
      message = e.message;
    } else {
      message = 'There was an issue with the resource, please try again later';
    }

    return {
      success: false,
      message: message
    }

  }

};

/*
 * Returns all cookbook/category relationships for a particular category
 * @param {number} id - The identifier of the record(s) to be removed
 * @returns {array} Array of cookbook/category objects
 */
const findByCategory = async id => {

  try{

    /* Validate the passed in data */
    if(!validation.validator(id, 'number')){
      throw {
        name: 'COOKBOOKCATEGORYMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* Add the record to the database */
    const result = await db('cookbook_categories as cc')
     .join('cookbooks as c', 'cc.cookbookId', '=', 'cookbooks.id')
     .join('categories as cat', 'cat.id', '=', 'cc.categoryId')
     .select(
       'cc.id',
       'c.name as cookbookName',
       'c.id as categoryId',
       'cat.name as categoryName',
       'cat.id as categoryId'
     )
     .where('categoryId', id);

    if(result && result.length > 0){
      return result;
    } else {
      return [];
    }

  } catch(e) {

    /* Check the error name, we only want to specify our own error messages
       everything else can be represented by a generic message */
    let message;
    if(e.name === 'COOKBOOKCATEGORYMODEL_ERROR'){
      message = e.message;
    } else {
      message = 'There was an issue with the resource, please try again later';
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
  removeByCookbook,
  removeByCategory,
  findAll,
  findByCookbook,
  findByCategory
};
