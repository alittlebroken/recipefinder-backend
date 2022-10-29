/* Add in any modules we need to use */
require('dotenv').config();
const appLogger = require('../config/winston');

const categoriesController = require('../controllers/categoriesController');
const categoryModel = require('../models/categoryModel');
const cookbookCategoriesModel = require('../models/cookbookCategoriesModel');
const recipeCategoriesModel = require('../models/recipeCategoriesModel');

const moduleName = 'categoriesController';

/* 
 * function template
 */
const method = async (req, res, next) => {

    const moduleMethod = '';

    try{

    } catch(e) {
        /* Log out the issue(s) */
        appLogger.logMessage(
            'error', 
            `${moduleName}.${moduleMethod} - Status Code ${e.status}: ${e.message}`
            );

        return next(e);
    }

};

module.exports = {
    
};