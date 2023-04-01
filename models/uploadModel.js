/* Packages needed */
require('dotenv').config();
const db = require('../database');
const dbHelper = require('../helpers/database')

/* Stores information about an uploaded file to the DB 
 *
 * @params {object} payload - Contains the details of the file
 * @returns {object} returns an object containg the result of uplaoding the
 * file info to the database
*/
const upload = async (payload) => {
    try{

        /* Validate the payload */
        if(!payload || payload === undefined || payload.length < 1){
            throw {
                name: 'UPLOADMODEL_ERROR',
                success: false,
                message: 'You must supply details of files uploaded'
            }
        }
  
        let foundErrors
        payload.map(image => {

            if(!image.name || image.name === undefined){
                 return foundErrors = 'Image name is required'
            }

            if(typeof image.name !== 'string'){
                return foundErrors = 'Image name must be a string'
            }

            if(!image.mimetype || image.mimetype === undefined){
                return foundErrors = 'Mime type is required'
            }

            if(typeof image.mimetype !== 'string'){
                return foundErrors = 'Mime type must be a string'
            }

            if(!image.resource || image.resource === undefined){
                return foundErrors = 'Resource name is required'
            }

            if(typeof image.resource !== 'string'){
                return foundErrors = 'Resource name must be a string'
            }

            if(!image.resourceid || image.resourceid === undefined){
                return foundErrors = 'Resource ID is required'
            }

            if(typeof image.resourceid !== 'number'){
                return foundErrors = 'Resource id must be a number'
            }

            if(!image.userid || image.userid === undefined){
                return foundErrors = 'User id is required'
            }

            if(typeof image.userid !== 'number'){
                return foundErrors = 'User id must be a number'
            }

        })

        if(foundErrors){
            throw {
                success: false,
                message: foundErrors,
                name: 'UPLOADMODEL_ERROR'
            }
        }

        return await db.transaction( async trx => {
  
          const result = await db('files')
           .insert(payload, ['id'])

          if(result.length > 0){
            return {
              success: true,
              message: 'File(s) successfully uploaded'
            }
          } else {
            return {
              success: false,
              message: 'There was a problem with the resorce, please try again later'
            }
          }
  
        });
  
    } catch(e) {
      /* Check for library errors and if found swap them out for a generic
         one to send back over the API for security */
      let message;
      
      if(e.name === 'UPLOADMODEL_ERROR'){
        message = e.message;
      } else {
        message = 'There was a problem with the resource, please try again later';
      }
  
      return {
        success: false,
        message: message
      }
  
    }
}

module.exports = {
    upload
}