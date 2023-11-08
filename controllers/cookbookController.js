/* Add in any modules we need to use */
require('dotenv').config();
const appLogger = require('../config/winston');
const cookbookModel = require('../models/cookbookModel');
const cookbookCategoriesModel = require('../models/cookbookCategoriesModel');
const cookbookRecipesModel = require('../models/cookbookRecipesModel');

/* Returns all cookbooks stored within the DB
 * @returns {array} A collection of cookbooks stored in the database
 */
const list = async (req, res, next) => {

  try{

        /* Pagination, filter and sort  options to send to the method that requires it */
        let options = {
          page: req.page,
          size: req.limit,
          offset: req.offset,
          filterBy: req.filterBy,
          filterValues: req.filterValues,
          filter: req.filter,
          sortBy: req.sortBy,
          sortOrder: req.sortOrder
        }

    /* Get the cookbooks from the database */
    const results = await cookbookModel.findAll(options);
    
    if(!results || results.length < 1) {
      let err = new Error('There were no cookbooks to find');
      err.status = 204;
      err.success = false;
      throw err;
    };

    if(results.success === false){
      let err = new Error('There was a problem with the resource, please try again later');
      err.status = 500;
      err.success = false;
      throw err;
    }

    res.status(200).json({
      results: results.results,
      totalPages: results.totalPages,
      totalRecords: results.totalRecords,
      currentPage: results.currentPage
    });

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
    let validationErrors;
    if(req.params.id === 'undefined'){
     validationErrors = {
      status: 400,
      success: false,
      message: 'Undefined id'
     }
    }
    if(validationErrors) return next(validationErrors);

    let id = parseInt(req.params.id)
    const results = await cookbookModel.findById(id);

    if(!results || results.length < 1){
      res.status(204).json({
        status: 204,
        success: false,
        message: 'No matching cookbook found'
      })
    }

    if(results.success === false){
      res.status(500).json({
        status: 500,
        success: false,
        message: 'There was a problem with the resource, please try again later'
      })
    }

    res.status(200).json(results);

  } catch(e) {
    /* Log out the issue(s) */
    appLogger.logMessage('error', `cookbookController.getById - Status Code ${e.status}: ${e.message}`);

      return next(e);
  }

};

/*
 * Creates a new cookbook record
 */
const create = async (req, res, next) => {
  try{

    /* Validate the request variables */

    const userId = parseInt(req?.body?.userId)
    const {name, description, image} = req?.body;

    if(userId === undefined){
      let err = new Error('Undefined userId');
      err.status = 400;
      err.success = false;
      throw err;
    }

    if(typeof userId !== 'number'){
      let err = new Error('Wrong format for userId');
      err.status = 400;
      err.success = false;
      throw err;
    }

    if(name === undefined){
      let err = new Error('Undefined name');
      err.status = 400;
      err.success = false;
      throw err;
    }

    if(typeof name !== 'string'){
      let err = new Error('Wrong format for name');
      err.status = 400;
      err.success = false;
      throw err;
    }

    if(description === undefined){
      let err = new Error('Undefined description');
      err.status = 400;
      err.success = false;
      throw err;
    }

    if(typeof description !== 'string'){
      let err = new Error('Wrong format for description');
      err.status = 400;
      err.success = false;
      throw err;
    }

    /* extract the data from the request object and then create the new record */

    const results = await cookbookModel.create(userId, name, description, image);
    
    if(results.success === false){
      res.status(500).json({
        status: 500,
        success: false,
        message: 'There was a problem with the resource, please try again later',
        results: []
      });
    }

    res.status(201).json(results);

  }catch(e){
    /* Log out the issue(s) */
    appLogger.logMessage('error', `cookbookController.create - Status Code ${e.status}: ${e.message}`);

    return next(e);
  }
};

/* updates an existing cookbook record within the database */
const update = async (req, res, next) => {

  try{

    /* Extract the required params */
    const { 
     name, description, image
    } = req.body
 
    const userId = parseInt(req.body.userId)

    /* Perform validation */
    let validationErrors;
    if(!req.params.id || req.params.id === 'undefined'){
      validationErrors = {
        status: 400,
        success: false,
        message: 'Undefined id'
      }
    }
    if(validationErrors) return next(validationErrors);

    if(!userId || userId === undefined){
      validationErrors = {
        status: 400,
        success: false,
        message: 'Undefined userId'
      }
    }
    if(validationErrors) return next(validationErrors);

    if(typeof userId !== 'number'){
      validationErrors = {
        status: 400,
        success: false,
        message: 'Wrong userId format'
      }
    }
    if(validationErrors) return next(validationErrors);

    if(!name || name === undefined){
      validationErrors = {
        status: 400,
        success: false,
        message: 'Undefined name'
      }
    }
    if(validationErrors) return next(validationErrors);

    if(typeof name !== 'string'){
      validationErrors = {
        status: 400,
        success: false,
        message: 'Wrong name format'
      }
    }
    if(validationErrors) return next(validationErrors);

    if(!description || description === undefined){
      validationErrors = {
        status: 400,
        success: false,
        message: 'Undefined description'
      }
    }
    if(validationErrors) return next(validationErrors);

    if(typeof description !== 'string'){
      validationErrors = {
        status: 400,
        success: false,
        message: 'Wrong description format'
      }
    }
    if(validationErrors) return next(validationErrors);

    /* extra the data from the req body and parameters */
    let id = parseInt(req.params.id)

    /* Update the record in the DB */
    const result = await cookbookModel.update(
      id, userId, name, description, image
    );

    if(!result || result.success == false){
      res.status(500).json({
        status: 500,
        success: false,
        message: 'There was a problem with the resource, please try again later'
      })
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Cookbook successfully updated'
    })

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

    if(!req.params.id || req.params.id === undefined){
      let err = new Error('Undefined id');
      err.sattus = 400;
      error.success = false;
      throw err;
    }

    /* remove the specified record */
    let id = parseInt(req.params.id)
    const result = await cookbookModel.remove(id);

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

    /* Pagination, filter and sort  options to send to the method that requires it */
    let options = {
      page: req.page,
      size: req.limit,
      offset: req.offset,
      filterBy: req.filterBy,
      filterValues: req.filterValues,
      filter: req.filter,
      sortBy: req.sortBy,
      sortOrder: req.sortOrder
    }

    /* Validate the request object values we need */
    let validationErrors;
    if(!req.params.id || req.params.id === 'undefined'){
      validationErrors = {
        status: 400,
        success: false,
        message: 'Undefined id'
      }
    }
    if(validationErrors) return next(validationErrors);

    /* get the desired recipes */
    let id = parseInt(req.params.id)
    let results = await cookbookModel.recipes(id, options);
   
    if(results.length < 1){
      return res.status(204).json({
        status: 204,
        success: false,
        message: 'The cookbook currently has no recipes'
      })
    }

    res.status(200).json({
      results: results.results,
      totalPages: results.totalPages,
      totalRecords: results.totalRecords,
      currentPage: results.currentPage
    });

  } catch(e) {
    /* Log out the issue(s) */
    appLogger.logMessage('error', `cookbookController.recipes - Status Code ${e.status}: ${e.message}`);

    return next(e);
  }

};

/* extract all recipes associated with a particular cookbook */
const getCategories = async (req, res, next) => {

  try{

    /* Pagination, filter and sort  options to send to the method that requires it */
    let options = {
      page: req.page,
      size: req.limit,
      offset: req.offset,
      filterBy: req.filterBy,
      filterValues: req.filterValues,
      filter: req.filter,
      sortBy: req.sortBy,
      sortOrder: req.sortOrder
    }

    /* Validate the request object values we need */
    let validationErrors;
    if(!req.params.id || req.params.id === 'undefined'){
      validationErrors = {
        status: 400,
        success: false,
        message: 'Undefined id'
      }
    }
    if(validationErrors) return next(validationErrors);

    let id = parseInt(req.params.id);

    /* get the desired recipes */
    let results = await cookbookCategoriesModel.findByCookbook(id, options);
    
    if(results.length < 1) {
      res.status(204).json({
        status: 204,
        success: false,
        message: 'The cookbook currently has no categories'
      });
    }

    if(results?.success === false){
      res.status(500).json({
        status: 500,
        success: false,
        message: 'There was a problem with the resource, please try again later'
      })
    }


    res.status(200).json({
      results: results.results,
      totalPages: results.totalPages,
      totalrecords: results.totalPages,
      currentPage: results.currentPage
    });

  } catch(e) {
    /* Log out the issue(s) */
    appLogger.logMessage('error', `cookbookController.getCategories - Status Code ${e.status}: ${e.message}`);

    return next(e);
  }

};

const addRecipe = async (req, res, next) => {

  try{

    /* Validate the request object values we need */
    let validationErrors;
    if(!req.params.id || req.params.id === 'undefined'){
      validationErrors = {
        status: 400,
        success: false,
        message: 'Undefined id'
      }
    }
    if(validationErrors) return next(validationErrors);

    if(!req.body.recipeId || req.body.recipeId === undefined){
      validationErrors = {
        status: 400,
        success: false,
        message: 'Undefined recipeId'
      }
    }
    if(validationErrors) return next(validationErrors);

    if(typeof req.body.recipeId !== 'number'){
      validationErrors = {
        status: 400,
        success: false,
        message: 'Wrong format for recipeId'
      }
    }
    if(validationErrors) return next(validationErrors);

    let id = parseInt(req.params.id);
    let recipeId = parseInt(req.body.recipeId);

    /* get the desired recipes */
    const data = {
      cookbookId: id,
      recipeId: recipeId
    }

    let results = await cookbookRecipesModel.create(data);

    if(results.success === false){
      res.status(500).json({
        status: 500,
        success: false,
        message: 'There was a problem with the resource, please try again later'
      })
    }

    res.status(201).json({
      status: 201,
      success: true,
      message: 'Recipe added to cookbook successfully'
    });

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
    let validationErrors;
    if(!req.params.id || req.params.id === 'undefined'){
      validationErrors = {
        status: 400,
        success: false,
        message: 'Undefined id'
      }
    }
    if(validationErrors) return next(validationErrors)

    if(!req.body.categoryId || req.body.categoryId === undefined){
      
      validationErrors = {
        status: 400,
        success: false,
        message: 'Undefined categoryId'
      }
    }
    if(validationErrors) return next(validationErrors)

    if( typeof req.body.categoryId !== 'number'){
      validationErrors = {
        status: 400,
        success: false,
        message: 'Wrong format for categoryId'
      }
    }
    if(validationErrors) return next(validationErrors)

    let id = parseInt(req.params.id);
    let categoryId = parseInt(req.body.categoryId);

    /* get the desired recipes */
    const data = {
      cookbookId: id,
      categoryId: categoryId
    }

    let results = await cookbookCategoriesModel.create(data);

    if(results.success === false){
      res.status(500).json({
        status: 500,
        success: false,
        message: 'There was a problem with the resource, please try again later'
      })
    }

    if(results.length < 1) {
      res.status(204).json({
        status: 204,
        success: false,
        message: 'No data found matching supplied values'
      });
    }

    res.status(201).json(results);

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

    if(!req.params.id || req.params.id === 'undefined'){
      let err = new Error('Undefined id');
      err.status = 400;
      err.success = false;
      throw err;
    }

    let id = parseInt(req.params.id);

    /* Delete the cookbooks recipes */
    let results = await cookbookRecipesModel.removeByCookbook(id);

    if(results.success === false){
      res.status(500).json({
        status: 500,
        success: false,
        message: 'There was a problem with the resource, please try again later'
      });
    }

    if(!results || results.length < 1) {
      res.status(204).json({
        status: 204,
        success: false,
        message: 'No matching records found'
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: results.message
    });

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

    if(!req.params.id || req.params.id === 'undefined'){
      let err = new Error('Undefined id');
      err.status = 400;
      throw err;
    }

    let id = parseInt(req.params.id);

    /* Delete the cookbooks recipes */
    let results = await cookbookCategoriesModel.removeByCookbook(id);

    if(results.success === false){
      res.status(500).json({
        status: 500,
        success: false,
        message: 'There was a problem with the resource, please try again later'
      });
    }

    if(!results || results.length < 1) {
      res.status(404).json({
        status: 404,
        success: false,
        message: 'No categories found to be removed'
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: 'All categories for specified cookbook removed successfully'
    });

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
      res.status(500).json({
        status: 500,
        success: false,
        message: 'There was a problem with the resource, please try again later'
      })
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
   
    let validationErrors;

    if(!req.params.id || req.params.id === 'undefined'){
      validationErrors = {
        status: 400,
        success: false,
        message: 'Undefined id'
      }
    }
    if(validationErrors) return next(validationErrors);
    
    let id = parseInt(req.params.id);

    /* Delete the cookbooks recipes */
    const results = await cookbookModel.remove(id);

    if(results.success === false){
     res.status(500).json({
      status: 500,
      success: false,
      message: 'There was a problem with the resource, please try again later'
     })
    }

    res.status(200).json({
      status: 200,
      success: results.success,
      message: results.message
    });

  } catch(e) {
    
    /* Log out the issue(s) */
    appLogger.logMessage('error', `cookbookController.removeById - Status Code ${e.status}: ${e.message}`);

    return next(e);
  }

};

module.exports = {
  list,
  getById,
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
  removeById,
}
