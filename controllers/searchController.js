/* Add in any modules we need to use */
require('dotenv').config();
const appLogger = require('../config/winston');

const passport = require('passport');

const moduleName = 'searchController';

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

}