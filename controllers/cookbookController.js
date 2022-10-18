/* Add in any modules we need to use */
require('dotenv').config();
const appLogger = require('../config/winston');
const cookbookModel = require('../models/cookbookModel');
const cookbookCategoriesModel = require('../models/cookbookCategoriesModel');
const cookbookRecipesModel = require('../models/cookbookRecipesModel');

/* Returns all cookbooks stored within the DB
 * @returns {array} A collection of cookbooks stored in the database
 */
const get = async (req, res, next) => {

  try{

    /* Get the cookbooks from the database */
    const results = await cookbookModel.findAll();

    if(!results || results.length < 1) {
      let err = new Error('There were no cookbooks to find');
      err.status = 404;
      throw err;
    };

    res.status(200).json(results);

  } catch(e) {
    /* Log out the issue(s) */
    appLogger.logMessage('error', `cookbookController.get - Status Code ${e.status}: ${e.message}`);

    return next(e);
  }

};

/*
 * Access a cookbook via it's id
 */
const getById = async (req, res, next) => {

  try{

    /* Validate the ID passed in */
    if(!req.params){
        let err = new Error('Invalid parameter');
        err.status = 400;
        throw err;
    }

    if(req.params.id === undefined){
      let err = new Error('Invalid id');
      err.status = 400;
      throw err;
    }

    if(typeof req.params.id !== 'number'){
      let err = new Error('Invalid id format');
      err.status = 400;
      throw err;
    }

    const results = await cookbookModel.findById(req.params.id);

    if(!results || results.length < 1){
      let err = new Error('No matching cookbook found');
      err.status = 400;
      throw err;
    }

    res.status(200).json(results);

  } catch(e) {
    /* Log out the issue(s) */
    appLogger.logMessage('error', `cookbookController.getById - Status Code ${e.status}: ${e.message}`);

      return next(e);
  }

}

/*
 * Access a cookbook by it's name
 */
const getByName = async (req, res, next) => {
  try{

    /* Perform validation */
    if(!req.params || req.params === undefined){
      let err = new Error('Invalid parameters');
      err.status = 400;
      throw err;
    }

    if(req.params.name === undefined){
      let err = new Error('Invalid name');
      err.status = 400;
      throw err;
    }

    if(typeof req.params.name !== 'string'){
      let err = new Error('Invalid name format');
      err.status = 400;
      throw err;
    }

    if(req.params.name === ''){
      let err = new Error('Invalid name');
      err.status = 400;
      throw err;
    }

    const results = await cookbookModel.findByName(req.params.name);

    if(!results || results.length < 1){
      let err = new Error('No mathing cookbook(s) found');
      throw err;
    }

    res.status(200).json(results);

  } catch(e) {
    /* Log out the issue(s) */
    appLogger.logMessage('error', `cookbookController.getByName - Status Code ${e.status}: ${e.message}`);

    return next(e);
  }
}

/*
 * Creates a new cookbook record
 */
const create = async (req, res, next) => {
  try{

    /* Validate the request variables */
    if(!req.body || req.body === undefined){
      let err = new Error('Request body data undefined');
      err.status = 400;
      throw err;
    }

    if(req.body.userId === undefined || typeof req.body.userId !== 'number'){
      let err = new Error('Undefined userId or incorrect format');
      err.status = 400;
      throw err;
    }

    if(req.body.name === undefined || typeof req.body.name !== 'string'){
      let err = new Error('Undefined name or incorrect format');
      err.status = 400;
      throw err;
    }

    if(req.body.description === undefined || typeof req.body.description !== 'string'){
      let err = new Error('Undefined description or incorrect format');
      err.status = 400;
      throw err;
    }

    /* extract the data from the request object and then create the new record */
    const {userId, name, description, image} = req.body;
    const results = await cookbookModel.create(userId, name, description, image);

    if(!results){
      let err = new Error('There was a problem with the resource, please try again later');
      err.status = 500;
      throw err;
    }

    res.status(200).json(results);

  }catch(e){
    /* Log out the issue(s) */
    appLogger.logMessage('error', `cookbookController.create - Status Code ${e.status}: ${e.message}`);

    return next(e);
  }
}

/* updates an existing cookbook record within the database */
const update = async (req, res, next) => {

  try{

    /* Perform validation */
    if(!req.body || req.body === undefined){
      let error = new Error('Undefined request body');
      error.status = 400;
      throw error;
    }

    if(!req.params || req.params === undefined){
      let error = new Error('Undefined request parameters');
      error.status = 400;
      throw error;
    }

    if(!req.params.id || req.params.id === undefined){
      let error = new Error('Undefined id');
      error.status = 400;
      throw error;
    }

    if(typeof req.params.id !== 'number'){
      let error = new Error('Wrong id format');
      error.status = 400
      throw error;
    }

    if(!req.body.userId || req.body.userId === undefined){
      let error = new Error('Undefined userId');
      error.status = 400
      throw error;
    }

    if(typeof req.body.userId !== 'number'){
      let error = new Error('Wrong userId format');
      error.status = 400
      throw error;
    }

    if(!req.body.name || req.body.name === undefined){
      let error = new Error('Undefined name');
      error.status = 400
      throw error;
    }

    if(typeof req.body.name !== 'string'){
      let error = new Error('Wrong name format');
      error.status = 400
      throw error;
    }

    if(!req.body.description || req.body.description === undefined){
      let error = new Error('Undefined description');
      error.status = 400
      throw error;
    }

    if(typeof req.body.description !== 'string'){
      let error = new Error('Wrong description format');
      error.status = 400
      throw error;
    }

    /* extra the data from the req body and parameters */
    const { id } = req.params;
    const {
      name,
      description,
      userId,
      image
    } = req.body;

    /* Update the record in the DB */
    const result = await cookbookModel.update(
      id, userId, name, description, image
    );

    if(!result || result.success == false){
      let error = new Error(result.message);
      error.status = 500;
      throw error;
    }

    res.status(200).json(result)

  } catch(e) {
    /* Log out the issue(s) */
    appLogger.logMessage('error', `cookbookController.update - Status Code ${e.status}: ${e.message}`);

    return next(e);
  }

};

/* remove a cookbook by it's id */
const remove = async (req, res, next) => {

  try{

    /* Validte the request data */
    if(!req.params){
      let err = new Error('Request parameters undefined');
      err.status = 400;
      throw err;
    }

    if(!req.params.id || req.params.id === undefined){
      let err = new Error('Undefined id');
      err.sattus = 400;
      throw err;
    }

    if(typeof req.params.id !== 'number'){
      let err = new Error('Wrong id format');
      err.status = 400;
      throw err;
    }

    /* remove the specified record */
    const result = await cookbookModel.remove(req.params.id);

    if(!result){
      let err = new Error('There was a problem with the resource, please try again later');
      err.status = 500;
      throw err;
    }

    res.status(200).json(result);

  } catch(e) {
    /* Log out the issue(s) */
    appLogger.logMessage('error', `cookbookController.remove - Status Code ${e.status}: ${e.message}`);

    return next(e);
  }


};

/* extract all recipes associated with a particular cookbook */
const recipes = async (req, res, next) => {

  try{

    /* Validate the request object values we need */
    if(!req.params || req.params === undefined){
      let err = new Error('Undefined request parameters');
      err.status = 400;
      throw err;
    }

    if(!req.params.id || req.params.id === undefined){
      let err = new Error('Undefined id');
      err.status = 400;
      throw err;
    }

    if(typeof req.params.id !== 'number'){
      let err = new Error('Wrong id format');
      err.status = 400;
      throw err;
    }

    /* get the desired recipes */
    let results = await cookbookModel.recipes(req.params.id);

    if(results.success === false){
      let err = new Error(results.message);
      err.status = 500;
      throw err;
    }

    res.status(200).json(results);

  } catch(e) {
    /* Log out the issue(s) */
    appLogger.logMessage('error', `cookbookController.recipes - Status Code ${e.status}: ${e.message}`);

    return next(e);
  }

};

/* extract all recipes associated with a particular cookbook */
const getCategories = async (req, res, next) => {

  try{

    /* Validate the request object values we need */
    if(!req.params || req.params === undefined){
      let err = new Error('Undefined request parameters');
      err.status = 400;
      throw err;
    }

    if(!req.params.id || req.params.id === undefined){
      let err = new Error('Undefined id');
      err.status = 400;
      throw err;
    }

    let id = parseInt(req.params.id);

    /* get the desired recipes */
    let results = await cookbookCategoriesModel.findByCookbook(id);

    if(results.success === false){
      let err = new Error(results.message);
      err.status = 500;
      throw err;
    }

    if(!results || results.length < 1) {
      res.status(404).json([]);
    }


    res.status(200).json(results);

  } catch(e) {
    /* Log out the issue(s) */
    appLogger.logMessage('error', `cookbookController.getCategories - Status Code ${e.status}: ${e.message}`);

    return next({
      status: e.status,
      success: false,
      message: e.message
    });
  }

};

const addRecipe = async (req, res, next) => {

  try{

    /* Validate the request object values we need */
    if(!req.params || req.params === undefined){
      let err = new Error('Undefined request parameters');
      err.status = 400;
      throw err;
    }

    if(!req.params.id || req.params.id === undefined){
      let err = new Error('Undefined id');
      err.status = 400;
      throw err;
    }

    if(!req.body || req.body === undefined){
      let err = new Error('Undefined request body');
      err.status = 400;
      throw err;
    }

    if(!req.body.recipeId || req.body.recipeId === undefined){
      let err = new Error('Undefined recipeId');
      err.status = 400;
      throw err;
    }

    let id = parseInt(req.params.id);
    let recipeId = parseInt(req.body.recipeId);

    /* get the desired recipes */
    const data = {
      cookbookId: id,
      recipeId: recipeId
    }

    let results = await cookbookRecipesModel.create(data);

    if(results.success === false){
      let err = new Error(results.message);
      err.status = 500;
      throw err;
    }

    if(!results || results.length < 1) {
      res.status(404).json([]);
    }

    res.status(200).json(results);

  } catch(e) {
    /* Log out the issue(s) */
    appLogger.logMessage('error', `cookbookController.addRecipe - Status Code ${e.status}: ${e.message}`);

    return next({
      status: e.status,
      success: false,
      message: e.message
    });
  }

};

const addCategory = async (req, res, next) => {

  try{

    /* Validate the request object values we need */
    if(!req.params || req.params === undefined){
      let err = new Error('Undefined request parameters');
      err.status = 400;
      throw err;
    }

    if(!req.params.id || req.params.id === undefined){
      let err = new Error('Undefined id');
      err.status = 400;
      throw err;
    }

    if(!req.body || req.body === undefined){
      let err = new Error('Undefined request body');
      err.status = 400;
      throw err;
    }

    if(!req.body.categoryId || req.body.categoryId === undefined){
      let err = new Error('Undefined categoryId');
      err.status = 400;
      throw err;
    }

    let id = parseInt(req.params.id);
    let categoryId = parseInt(req.body.categoryId);

    /* get the desired recipes */
    const data = {
      cookbookId: id,
      categoryId: categoryId
    }

    let results = await cookbookCategoriesModel.create(data);

    if(results.success === false){
      let err = new Error(results.message);
      err.status = 500;
      throw err;
    }

    if(!results || results.length < 1) {
      res.status(404).json([]);
    }

    res.status(200).json(results);

  } catch(e) {
    /* Log out the issue(s) */
    appLogger.logMessage('error', `cookbookController.addCategory - Status Code ${e.status}: ${e.message}`);

    return next({
      status: e.status,
      success: false,
      message: e.message
    });
  }

};

const removeRecipes = async (req, res, next) => {

  try{

    /* Validate the request object values we need */
    if(!req.params || req.params === undefined){
      let err = new Error('Undefined request parameters');
      err.status = 400;
      throw err;
    }

    if(!req.params.id || req.params.id === undefined){
      let err = new Error('Undefined id');
      err.status = 400;
      throw err;
    }

    let id = parseInt(req.params.id);

    /* Delete the cookbooks recipes */
    let results = await cookbookRecipesModel.removeByCookbook(id);

    if(results.success === false){
      let err = new Error(results.message);
      err.status = 500;
      throw err;
    }

    if(!results || results.length < 1) {
      res.status(404).json([]);
    }

    res.status(200).json(results);

  } catch(e) {
    /* Log out the issue(s) */
    appLogger.logMessage('error', `cookbookController.removeRecipes - Status Code ${e.status}: ${e.message}`);

    return next({
      status: e.status,
      success: false,
      message: e.message
    });
  }

};

const removeCategories = async (req, res, next) => {

  try{

    /* Validate the request object values we need */
    if(!req.params || req.params === undefined){
      let err = new Error('Undefined request parameters');
      err.status = 400;
      throw err;
    }

    if(!req.params.id || req.params.id === undefined){
      let err = new Error('Undefined id');
      err.status = 400;
      throw err;
    }

    let id = parseInt(req.params.id);

    /* Delete the cookbooks recipes */
    let results = await cookbookCategoriesModel.removeByCookbook(id);

    if(results.success === false){
      let err = new Error(results.message);
      err.status = 500;
      throw err;
    }

    if(!results || results.length < 1) {
      res.status(404).json([]);
    }

    res.status(200).json(results);

  } catch(e) {
    /* Log out the issue(s) */
    appLogger.logMessage('error', `cookbookController.removeCategories - Status Code ${e.status}: ${e.message}`);

    return next({
      status: e.status,
      success: false,
      message: e.message
    });
  }

};

const removeAll = async (req, res, next) => {

  try{

    /* Delete the cookbooks recipes */
    let results = await cookbookModel.removeAll();

    if(results.success === false){
      let err = new Error(results.message);
      err.status = 500;
      throw err;
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: 'All cookbooks removed successfully'
    });

  } catch(e) {
    /* Log out the issue(s) */
    appLogger.logMessage('error', `cookbookController.removeAll - Status Code ${e.status}: ${e.message}`);

    return next({
      status: e.status,
      success: false,
      message: e.message
    });
  }

};

const removeById = async (req, res, next) => {

  try{

    /* Validate the request object values we need */
    if(!req.params || req.params === undefined){
      let err = new Error('Undefined request parameters');
      err.status = 400;
      throw err;
    }

    if(!req.params.id || req.params.id === undefined){
      let err = new Error('Undefined id');
      err.status = 400;
      throw err;
    }

    let id = parseInt(req.params.id);

    /* Delete the cookbooks recipes */
    let results = await cookbookModel.remove(id);

    if(results.success === false){
      let err = new Error(results.message);
      err.status = 500;
      throw err;
    }

    res.status(200).json(results);

  } catch(e) {
    /* Log out the issue(s) */
    appLogger.logMessage('error', `cookbookController.removeById - Status Code ${e.status}: ${e.message}`);

    return next({
      status: e.status,
      success: false,
      message: e.message
    });
  }

};

module.exports = {
  get,
  getById,
  getByName,
  create,
  update,
  remove,
  recipes,
  getCategories,
  addRecipe,
  addCategory,
  removeRecipes,
  removeCategories,
  removeAll,
  removeById
};
