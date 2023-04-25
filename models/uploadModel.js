/* Packages needed */
require('dotenv').config();
const db = require('../database');
const dbHelper = require('../helpers/database')

const fs = require('fs')
const path = require('path')

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

            if(!image.src || image.src === undefined){
                 return foundErrors = 'Image src is required'
            }

            if(typeof image.src !== 'string'){
                return foundErrors = 'Image src must be a string'
            }

            if(!image.title || image.title === undefined){
              return foundErrors = 'Title is required'
            }

            if(typeof image.title !== 'string'){
              return foundErrors = 'Title must be a string'
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

/* Retrieves information about all files in the system
 *
 * @params {object} options - Data for modifying the query and pagination data
 * @returns {object} returns an object containg details on the query performed
*/
const list = async (options) => {
  try{

      /* get the query options */
      let {page, size, offset, filterBy, filterValues, filter, sortBy, sortOrder} = options

      /* Get a record count */
      const recordCount = await db('files')
       .modify(dbHelper.buildFilters, filter)
       .select('id')
       .count('id')
       .groupBy('id')

      /* Now get the actual data we want */
      const results = await db('files')
      .select('*')
      .modify(dbHelper.buildFilters, filter)
      .modify(dbHelper.buildSort, { sortBy, sortOrder })
      .limit(size)
      .offset(offset)

     /* Check we have data to return */
     if(results && results.length > 0){
      /* Build up the pagination information to send back */
      let numPages = parseInt(Math.floor(recordCount.length / size))
      if(numPages < 1) numPages = 1

      /* Return the data */
      return {
        success: true,
        results: results,
        pagination: {
          current: page,
          total: numPages,
          records: recordCount.length
        }
      }
     } else {
      /* No records found so lets return an empty array for the results */
      return {
        success: false,
        results: [],
        message: 'There are currently no files',
        pagination: {
          current: 1,
          total: 1,
          records: 0
        }
      }
     }


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

/* Deletes one or more file records from the database
 *
 * @params {object} options - Data for modifying the query and pagination data
 * @returns {object} returns an object containg details on the query performed
*/
const remove = async (options) => {
  try{

      /* get the query options */
      let {page, size, offset, filterBy, filterValues, filter, sortBy, sortOrder} = options

      /* Return value for the function */
      let returnResult

      /* Remove the records */
      await db.transaction(async trx => {

        const results = await db('files')
          .delete()
          .modify(dbHelper.buildFilters, filter)
          .returning('src')
          .transacting(trx)

        /* Check if any records were deleted */
        if(results.length > 0){

          /* Remove the files */
          results.map(result => {
            let fullPath = path.join(process.cwd(), '/public/media')
            
            fs.unlink(path.join(fullPath, result), err => {
              if (err) throw {
                  status: 500,
                  success: false,
                  message: 'Unable to delete the uploaded files'
              }
              
            })
          })

          returnResult = {
            success: true,
            message: 'Records deleted successfully',
            results: results.length,
            pagination: {}
          }
          
        } else {
          throw {
            success: false,
            message: 'No records to delete',
            results: 0,
            pagination: {}
          }
        }

      })

      return returnResult
      
  } catch(e) {
    
    let message
    if(e.message === 'delete from \"files\" - Problem connecting to the database'){
      message = 'There was a problem with the resource, please try again later'
    } else {
      message = e.message
    }
    return {
      success: e.success || false,
      message: message,
      results: e.results || 0,
      pagination: e.pagination || {}
    }

  }
}

/* Updates a file record witin the DB 
 *
 * @params {object} payload - Contains the details of the file to be updated
 * @returns {object} returns an object containg the result of updating the
 * file info to the database
*/
const update = async (payload) => {
  try{

      /* Deconstruct the payload */
      let {
        id, src, title, mimetype, resource, resourceid, userid
      } = payload

      /* Validate the payload */
      if(!id || id === undefined){
        return {
          success: false,
          message: 'Record id is required',
          results: [],
          pagination: {}
        }
      }

      if(typeof id !== 'number'){
        return {
          success: false,
          message: 'Record id must be a number',
          results: [],
          pagination: {}
        }
      }

      if(!src || src === undefined){
        return {
          success: false,
          message: 'Src is required',
          results: [],
          pagination: {}
        }
      }

      if(typeof src !== 'string'){
        return {
          success: false,
          message: 'Src must be a string',
          results: [],
          pagination: {}
        }
      }

      if(!title || title === undefined){
        return {
          success: false,
          message: 'Title is required',
          results: [],
          pagination: {}
        }
      }

      if(typeof title !== 'string'){
        return {
          success: false,
          message: 'Title must be a string',
          results: [],
          pagination: {}
        }
      }

      if(!mimetype || mimetype === undefined){
        return {
          success: false,
          message: 'Mimetype is required',
          results: [],
          pagination: {}
        }
      }
      
      if(typeof mimetype !== 'string'){
        return {
          success: false,
          message: 'Mimetype must be a string',
          results: [],
          pagination: {}
        }
      }

      if(!resource || resource === undefined){
        return {
          success: false,
          message: 'Resource is required',
          results: [],
          pagination: {}
        }
      }

      if(typeof resource !== 'string'){
        return {
          success: false,
          message: 'Resource must be a string',
          results: [],
          pagination: {}
        }
      }

      if(!resourceid || resourceid === undefined){
        return {
          success: false,
          message: 'Resource ID is required',
          results: [],
          pagination: {}
        }
      }

      if(typeof resourceid !== 'number'){
        return {
          success: false,
          message: 'Resource ID must be a number',
          results: [],
          pagination: {}
        }
      }

      if(!userid || userid === undefined){
        return {
          success: false,
          message: 'User ID is required',
          results: [],
          pagination: {}
        }
      }

      if(typeof userid !== 'number'){
        return {
          success: false,
          message: 'User ID must be a number',
          results: [],
          pagination: {}
        }
      }

      /* Update the record in the DB */
      const results = await db('files')
       .update({
        src: src,
        title: title,
        mimetype: mimetype,
        resource: resource,
        resourceid: parseInt(resourceid),
        userid: parseInt(userid)
       })
       .returning('id')

      if(results.length > 0){
        return {
          success: true,
          message: 'Record successfully updated',
          results: results,
          pagination: {}
        }
      }else{
        return {
          success: false,
          message: 'No records found to update',
          results: 0,
          pagination: {}
        }
      }

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
    upload,
    list,
    remove,
    update
}