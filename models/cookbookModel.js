/* Packages needed */
require('dotenv').config();
const { off } = require('..');
const db = require('../database');

/**
 * Create a new cookbook
 * @param {integer} userId - The user the cookbook will belong to
 * @param {string} name - The name for the cookbook
 * @param {string} description - Descriptiong for the cookbook
 * @param {string} image - The picture to use for the cookbook
 */
const create = async (userId, name, description, image) => {

  try{

    /* Validate the passed in values */
    if(!userId || typeof userId !== 'number' || !name || typeof name !== 'string'){
      throw {
        name: 'COOKBOOKMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    /* Attempt to add the cookbook */
    await db('cookbooks').
     insert({
       userId: userId,
       name: name,
       description: description,
       image: image
     })

     return {
       success: true,
       message: 'Cookbook successfully added'
     }

  } catch(e) {

    /* Check the error name, we only want to specify our own error messages
       everything else can be represented by a generic message */
    let message;
    if(e.name === 'COOKBOOKMODEL_ERROR'){
      message = e.message;
    } else {
      message = 'There was an issue with the resource, please try again later';
    }

    return {
      success: false,
      message: message
    }

  }

}

/**
 * Removes a cookbook
 * @param {integer} cookbookId - Id of the cookbook to delete
 */
const remove = async cookbookId => {

  try{

    /* Validate the passed in arguments */
    if(!cookbookId || typeof cookbookId !== 'number'){
      throw {
        name: 'COOKBOOKMODEL_ERROR',
        message: 'One or more required values are missing or invalid'
      }
    }

    /* remove the cookbook */
    await db('cookbooks')
     .where('id', cookbookId)
     .delete();

    return {
      success: true,
      message: 'Cookbook successfully removed'
    }

  } catch(e) {

    /* We wish to only pass back via the api our own errors, all others from
       the DB etc get passed back as a generic message */
    let message;

    if(e.name === 'COOKBOOKMODEL_ERROR'){
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
 * Removes all cookbooks from the system
 * @returns {object} Details on how successful the operation was and anyway
 * supporting messages
 */
const removeAll = async () => {

   try{

     /* remove the cookbook */
     await db('cookbooks').delete();

     return {
       success: true,
       message: 'All cookbooks removed successfully'
     }

   } catch(e) {

     return {
       success: false,
       message: 'There was an issue with the resource, please try again later'
     }

   }

 };

/*
 * Updates a users cookbook
 * @param {integer} cookbookId - The ID of the cookbook to be updated
 * @param {integer} userId - The ID of the user owning the cookbook
 * @param {string} name - The cookbooks name
 * @param {string} description - Description of the cookbook and its contents
 * @param {string} image - The image to be used for the cookbooks cover
 */
const update = async (cookbookId, userId, name, description, image) => {

  try{

    /* Validate the passed in values */
    if(!cookbookId || typeof cookbookId !== 'number' || !userId || typeof userId !== 'number' || !name || typeof name !== 'string'){
      throw {
        name: 'COOKBOOKMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    /* updste the DB with the new details */
    await db('cookbooks')
     .where('id', cookbookId)
     .update({
       id: cookbookId,
       userId: userId,
       name: name,
       description: description,
       image: image
     });

     return {
       success: true,
       message: 'Cookbook successfully updated'
     }

  } catch(e) {

    /* Send back our custom errors but for all other errors like DB etc then
       send back a generic message */
    let message;
    if(e.name === 'COOKBOOKMODEL_ERROR'){
      message  = e.message;
    } else {
      message = 'There was an issue with the resource, please try again later';
    }

    /* Lets send the final object message back */
    return {
      success: false,
      message: message
    }

  }

};

/*
 * Return all cookbooks stored in the database
 */
const findAll = async () => {

  try{

    /* No need for validation so return all cookbooks */
    const results = await db('cookbooks')
     .select('*')

    /* Check if any results have been returned */
    if(!results || results.length == 0){
      return [];
    } else {
      return results;
    }

  } catch(e) {

    /* Non custom messages should be returned as a generic message to the front
       end */
    const message = 'There was an issue with the resource, please try again later';

    return {
      success: false,
      message: message
    }

  }

};

/*
 * Find one particular cookbook from the DB via an ID
 * @param {integer} id - ID of the cookbook to return
 */
const findById = async id => {

  try {

    /* Validate the passed in values */
    if(!id || typeof id !== 'number'){
      throw {
        name: 'COOKBOOKMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    /* gather the data from the database */
    const result = await db('cookbooks')
     .where('id', id)
     .select('*');

    if(!result || result.length === 0){
      return [];
    }

    return result;

  } catch(e) {

    /* Non custom messages should be returned as a generic message to the front
       end */
    let message;

    if(e.name === 'COOKBOOKMODEL_ERROR'){
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
 * Find a cookbook by it's name
 * @param {string} term - The term used to find the cookbook
 * @returns {Array} Returns the cookbook or an empty array if non found
 */
const findByName = async term => {

  try {

    /* Validate the passed in values */
    if(!term || typeof term !== 'string'){
      throw {
        name: 'COOKBOOKMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    /* gather the data from the database */
    const results = await db('cookbooks')
     .where('name', term)
     .select('*');

    if(!results || results.length < 1){
      return [];
    }

    return results;

  } catch(e) {

    /* Non custom messages should be returned as a generic message to the front
       end */
    let message;

    if(e.name === 'COOKBOOKMODEL_ERROR'){
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
 * Find all the cookbooks where their name matches the passed in terms
 * @param {string} terms - The term used to find the cookbook
 * @returns {Array} Returns the matching cookbooks or an empty array if non are
 * found
 */
const findAllByName = async terms => {

  try {

    /* Validate the passed in values */
    if(!terms || typeof terms !== 'string'){
      throw {
        name: 'COOKBOOKMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    /* gather the data from the database */
    const results = await db('cookbooks')
     .whereILike('name', `%${terms}%`)
     .select('*');

    if(!results || results.length < 1){
      return [];
    }

    return results;

  } catch(e) {

    /* Non custom messages should be returned as a generic message to the front
       end */
    let message;

    if(e.name === 'COOKBOOKMODEL_ERROR'){
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
 * gets all recipes associated with a cookbook
 * @param {integer} cookbookId - The cookbooks identifier within the db
 * @returns {array} Array of recipes
 */
const recipes = async cookbookId => {

  try{

    /* array of recipe objects to return */
    let recipes = [];

    /* Validate the passed in arguments */
    if(!cookbookId || typeof cookbookId !== 'number'){
      throw {
        name: 'COOKBOOKMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }


  /* Extract a list of categories and recipes */
  const results = await db('cookbook_recipes as cbr')
   .join('recipes as r', 'r.id', 'cbr.recipeId')
   .select('r.id as recipeId', 'r.name', 'r.rating')
   .where('cbr.cookbookId', cookbookId);

  const cats = await db('recipe_categories as rcat')
     .join('categories as cat', 'cat.id', 'rcat.categoryId')
     .select('cat.name as name', 'cat.id as categoryId', 'rcat.recipeId as recipeId')

  /* For each recipe create a new recipe object and assign the appropriate
     categories for the recipe */
  results.map(recipe => {

    /* Filter out the cats for the current recipe */
    let recipeCats = cats.filter(cat => cat.recipeId === recipe.recipeId);

    recipes.push(
      {
        id: recipe.recipeId,
        name: recipe.name,
        rating: recipe.rating,
        categories: recipeCats
      }
    );
  })

  return recipes;

  } catch(e) {
    /* Determine if we have a custom or module produced error. We hide away
      module based messages produced by the DB for security */
    let message;
    if(e.name === 'COOKBOOKMODEL_ERROR'){
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
 * Find all cookbooks that beloiing to a particular user
 * @param {integer} id - ID of the user owing the cookbooks we are interested in
 * @returns {array} A list of cookbooks owned by the user
 */
const findByUserId = async id => {

  try {

    /* Validate the passed in values */
    if(!id || typeof id !== 'number'){
      throw {
        name: 'COOKBOOKMODEL_ERROR',
        message: 'Missing user id'
      }
    }

    /* gather the data from the database */
    const result = await db('cookbooks')
     .where('id', id)
     .select('*');

    if(!result || result.length === 0){
      return [];
    }

    return result;

  } catch(e) {

    /* Non custom messages should be returned as a generic message to the front
       end */
    let message;

    if(e.name === 'COOKBOOKMODEL_ERROR'){
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
 * Removes all cookbooks for a particuler user
 * @returns {object} Details on how successful the operation was and anyway
 * supporting messages
 */
const removeAllByUser = async id => {

  try{

    /* Validate the passed in values */
    if(!id || id === undefined){
      return {
        success: false,
        message: 'Undefined userId'
      }
    }

    /* remove the cookbook */
    await db('cookbooks').delete();

    return {
      success: true,
      message: 'All cookbooks removed successfully'
    }

  } catch(e) {

    return {
      success: false,
      message: 'There was an issue with the resource, please try again later'
    }

  }

};

module.exports = {
  create,
  remove,
  update,
  findAll,
  findById,
  findByName,
  findAllByName,
  recipes,
  removeAll,
  findByUserId,
  removeAllByUser
};
