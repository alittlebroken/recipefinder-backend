/* Packages needed */
require('dotenv').config();
const db = require('../database');

/*
 * Count all recipes in the DB
 */
const countRecipes = async () => {

    try{
  
      /* Validate any passed in values */
  
      /* Extract the details we need from the DB */
      const results = await db('recipes')
        .select('id')
        .count()
        .groupBy('id')

      /* Test returned data and send back */
      if(!Array.isArray(results)){
        throw('No recipes found to count')
      } 

      return results
  
    } catch(e) {
      return {
          success: false,
          message: e.message || 'There was a problem with the resource, please try again later'
      }  
    }
  
}

/*
 * Count all users in the DB
 */
const countUsers = async () => {

  try{

    /* Validate any passed in values */

    /* Extract the details we need from the DB */
    const results = await db('users')
      .select('id')
      .count()
      .groupBy('id')

    /* Test returned data and send back */
    if(!Array.isArray(results)){
      throw('No users found to count')
    } 

    return results

  } catch(e) {
    return {
        success: false,
        message: e.message || 'There was a problem with the resource, please try again later'
    }  
  }

}

/*
 * Method Description
 */
const countIngredients = async () => {

  try{

    /* Validate any passed in values */

    /* Extract the details we need from the DB */
    const results = await db('ingredients')
      .select('id')
      .count()
      .groupBy('id')

    /* Test returned data and send back */
    if(!Array.isArray(results)){
      throw('No ingredients found to count')
    } 

    return results

  } catch(e) {
    return {
        success: false,
        message: e.message || 'There was a problem with the resource, please try again later'
    }  
  }

}

/*
 * Get various stats for Recipes
 */
const resourceStats = async (tableName) => {

  try{

    /* Validate passed in params */
    if(!tableName || tableName === undefined){
      return {
        success: false,
        message: 'resource name is missing'
      }
    }

    if(typeof tableName !== 'string'){
      return {
        success: false,
        message: 'resource name must be of the type string'
      }
    }

    /* Extract the details we need from the DB */

    /* Get a total list of recipes */
    const resourceTotal = await db(tableName)
     .select('id')
     .count()
     .groupBy('id')

    /* Get a list of recipes grouped by date created */
    const resourceGroupedByMonth = await db(tableName)
     .select(db.raw(`date_trunc('month', created_at) as date`))
     .count()
     .groupBy(db.raw(`date_trunc('month', created_at)`))
     .limit(12)
     .orderBy('date', 'asc')
   
    const resourceLatestAdded = await db(tableName)
      .modify((queryBuilder) => {
        if(tableName === 'users'){
          queryBuilder.select('id', 'username', 'email', 'created_at')
        } else {
          queryBuilder.select('id', 'name', 'created_at')
        }
      })
      .orderBy('created_at', 'desc')
      .limit(5)

    let topRatedResource
    if(tableName === 'recipes'){
      topRatedResource = await db(tableName)
      .select('id', 'name', 'rating')
      .orderBy('rating', 'desc')
      .limit(10)
    }


    /* Test returned data and send back */

    let total = 0
    let groupedByMonth = []
    let recentlyCreated = []
    let topRated = []

    if(resourceTotal && resourceTotal.length > 0){
      total = resourceTotal.length
    }

    if(resourceGroupedByMonth && resourceGroupedByMonth.length > 0){
      groupedByMonth = resourceGroupedByMonth
    }

    if(resourceLatestAdded && resourceLatestAdded.length > 0){
      recentlyCreated = resourceLatestAdded
    }

    if(tableName === 'recipes'){
      if(topRatedResource && topRatedResource.length > 1){
        topRated = topRatedResource
      }
    }

    return {
      total,
      groupedByMonth,
      recentlyCreated,
      topRated
    }

  } catch(e) {
    console.log(e)
    return {
        success: false,
        message: 'There was a problem with the resource, please try again later'
    }  
  }

}

/*
 * Method Description
 */
const newModule = async () => {

  try{

    /* Validate any passed in values */

    /* Extract the details we need from the DB */
   
    /* Test returned data and send back */

  } catch(e) {
    return {
        success: false,
        message: 'There was a problem with the resource, please try again later'
    }  
  }

}


module.exports = {
  countRecipes,
  countUsers,
  countIngredients,
  resourceStats
}
