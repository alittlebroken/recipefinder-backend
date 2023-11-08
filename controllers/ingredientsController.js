/* Add in any modules we need to use */
require('dotenv').config();
const appLogger = require('../config/winston');

const ingredientModel = require('../models/ingredientModel');

/*
 * Returns all the ingredients within the database
 * 
*/
const get = async (req, res, next) => {

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

        /* Get the ingredients from the DB */
        const results = await ingredientModel.findAll(options);

        if(!results || results.length < 1){
            return res.status(204).json({
                status: 204,
                success: false,
                message: 'No ingredients have been found',
                results: []
            });
        } 

        if(results.success === false){
            let err = {
                status: 500,
                success: false,
                message: results.message
            };

            throw err;
        }

        return res.status(200).json({
            results: results.results,
            totalPages: results.totalPages,
            totalRecords: results.totalRecords,
            currentPage: results.currentPage
        });

    } catch(e) {
        return next(e);
    }

};

/*
 * Retrieve an individual ingredient from the database based upon it's 
 * unique identifier
 */
const getById = async (req, res, next) => {

    try{

        /* validate any passed in variables */
        if(!req.params || req.params === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined request parameters'
            }
        }

        if(!req.params.id || req.params.id === 'undefined'){
            throw {
                status: 400,
                success: false,
                message: 'Undefined id'
            }
        }

        /* Try and get the desired record */
        let id = parseInt(req.params.id);
        const result = await ingredientModel.findById(id);

        if(!result || result.length < 1){
            res.status(204).json({
                status: 204,
                success: false,
                message: 'No ingredients have been found',
                results: []
            });
        }

        if(result.success === false){
            let err = {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            };

            throw err;
        }

        res.status(200).json(result);

    } catch(e) {
        return next(e);
    }

};

/*
 * Allows the addition of a new ingredient in the database
 * 
 */
const create = async (req, res, next) => {

    try{

        /* Perform validation of passed in values */
        if(!req.body || req.body === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined body parameter'
            }
        }


        if(!req.body.name || req.body.name === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined name'
            }
        }

        if(typeof req.body.name !== 'string'){
            throw {
                status: 400,
                success: false,
                message: 'Wrong name format'
            }
        }

        if(req.body.name === ''){
            throw {
                status: 400,
                success: false,
                message: 'Empty name'
            }
        }

        /* Add the record to the database */
        const result = await ingredientModel.create(req.body.name);
        if(!result || result.length < 1 || result.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
        }

        res.status(201).json(result);


    } catch(e) {
        return next(e);
    }

};

/*
 * Removes all ingredients from the database
 *
 */
const remove = async (req, res, next) => {

    try{

        /* remove the data from the database */
        const result = await ingredientModel.removeAll();
        
        if(!result || result.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was an issue with the resource, please try again later'
            }
        }

        if(result.count < 1){
            res.status(404).json({
                status: 404,
                success: false,
                message: 'We found no ingredients to remove',
                count: 0
            });
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: 'All ingredients removed successfully',
            count: result.count
        });

    } catch(e) {
        return next(e);
    }

};

/*
 * Removes an ingredient form the system
 *
 */
const removeById = async (req, res, next) => {

    try{

        /* Validate any passed in values */
        if(!req.params || req.params === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined request parameters'
            }
        }

        if(!req.params.id || req.params.id === 'undefined'){
            throw {
                status: 400,
                success: false,
                message: 'Undefined id'
            }
        }

        let id = parseInt(req.params.id);

        /* attempt to remove the ingredient by it's id */
        const result = await ingredientModel.remove(id);

        if(!result || result.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
        }

        if(result.count < 1){
            res.status(404).json({
                success: false,
                count: 0,
                message: 'There are no ingredients to remove'
            });
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: 'Ingredient successfully removed',
            count: result.count
        });

    } catch(e) {
        return next(e);
    }

};

/* 
 * Allows you to update an ingredient in the database
 *
 */
const update = async (req, res, next) => {

    try{

        /* validate the values passed via the request object */
        if(!req.params || req.params === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined request parameters'
            }
        }

        if(!req.params.id || req.params.id === 'undefined'){
            throw {
                status: 400,
                success: false,
                message: 'Undefined id'
            } 
        }

        if(!req.body || req.body === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined request body'
            }
        }

        if(!req.body.name || req.body.name === undefined){
            throw {
                status: 400,
                success: false,
                message: 'Undefined name'
            }
        }

        let id = parseInt(req.params.id);
        let name = req.body.name;

        /* Update the product */
        const result = await ingredientModel.update(id, name);

        if(!result || result.success === false){
            throw {
                status: 500,
                success: false,
                message: 'There was a problem with the resource, please try again later'
            }
        }
        
        res.status(200).send(result);

    } catch(e) {
        return next(e);
    }

};



module.exports = {
  get,
  getById,
  create,
  remove,
  removeById,
  update
}
