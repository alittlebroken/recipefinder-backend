/* Packages needed */
require('dotenv').config();
const db = require('../database');

/* Include any other needed modules */
const stepModel = require('./stepModel');
const ingredientModel = require('./ingredientModel');
const cookbookModel = require('./cookbookModel');
const categoryModel = require('./categoryModel');

const cookbookRecipesModel = require('./cookbookRecipesModel');
const recipeIngredientsModel = require('./recipeIngredientsModel');
const recipeCategoriesModel = require('./recipeCategoriesModel');

const validation = require('../helpers/validation');
const messageHelper = require('../helpers/constants');
const dbHelper = require('../helpers/database');
const e = require('express');

/* require lodash to allow comparing of objects */
const _ = require('lodash')

/*
 * Transactional knex method to add a recipe to the database as well as it's
 * associated data.
 * @param {object} recipe - All the relevant data for the main recipe enscapulated
 * within an object
 * @param {array} steps - All relevant steps needed to make the recipe
 * @param {array} ingredients - All ingredients for the recipe
 * @param {number} cookbooks - The cookbooks the recipe should be added to
 * @param {array} categories - The catgeories the recipe belong to
 * @returns {object} Detailing if the process was a success or not and any
 * supporting messages
 */
const create = async (recipe, steps, ingredients, cookbooks, categories) => {

  try{

    /* validate the data passed in */
    /* Recipe data */
    if(!validation.validator(recipe, 'object')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'Recipe object is missing or incorrect'
      }
    };

    if(!validation.validator(recipe.userId, 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'recipe userId is missing or incorrect'
      }
    };

    if(!validation.validator(recipe.name, 'string')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'recipe name is missing or incorrect'
      }
    };

    if(!validation.validator(recipe.description, 'string')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'recipe description is missing or incorrect'
      }
    };

    if(!validation.validator(recipe.servings, 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'recipe servimgs is missing or incorrect'
      }
    };

    if(!validation.validator(recipe.calories_per_serving, 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'recipe calories_per_serving is missing or incorrect'
      }
    };

    if(!validation.validator(recipe.prep_time, 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'recipe prep_time is missing or incorrect'
      }
    };

    if(!validation.validator(recipe.cook_time, 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'recipe cook_time is missing or incorrect'
      }
    };

    /* Add the recipe and related data via a transaction */
    return await db.transaction( async trx => {

      /* Add the recipe and return the ID to use later */
      const recipeId = await db('recipes')
       .insert(recipe, 'id')
       .transacting(trx);

      if(steps){
        for(let step of steps){
          await db('steps')
           .insert({
              recipeId: recipeId[0].id,
              stepNo: step.stepNo,
              content: step.content
           })
           .transacting(trx)
        }
      }

      if(ingredients){
        for(let ingredient of ingredients){
          await db('recipe_ingredients')
           .insert({
              recipeId: recipeId[0].id,
              ingredientId: ingredient.id,
              amount: ingredient.amount,
              amount_type: ingredient.amount_type
           })
           .transacting(trx)
        }
      }

      if(cookbooks){
        for(let cookbook of cookbooks){
          await db('cookbook_recipes')
           .insert({
            recipeId: recipeId[0].id,
            cookbookId: cookbook.id
           })
           .transacting(trx)
        }
      }

      if(categories){
        for(let category of categories){
          await db('recipe_categories')
           .insert({
            recipeId: recipeId[0].id,
            categoryId: category.id
           })
           .transacting(trx)
        }
      }
      
      return {
        success: true,
        message: 'Recipe successfully added',
        results: recipeId
      }

    });

  } catch(e) {
    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;

    if(e.name === 'RECIPEMODEL_ERROR'){
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

/* remove from the database a recipe and all it's related data
 * @param {number} recipeId - The unique identifier of the record to remove
 * @returns {object} Detailing if the process was a success or not and any
 * supporting messages
 */
const remove  = async recipeId => {

  try{

    /* Validate the passed in values */
    if(!validation.validator(recipeId, 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

      /* Delete the data in the reverse order it was created */
      return await db.transaction( async trx => {

        await db('recipe_categories')
         .delete().where('recipeId', recipeId).transacting(trx);

        await db('cookbook_recipes')
         .delete().where('recipeId',recipeId).transacting(trx);

        await db('recipe_ingredients')
         .delete().where('recipeId', recipeId).transacting(trx);

        await db('steps')
         .delete().where('recipeId', recipeId).transacting(trx);

        const recipeCount = await db('recipes')
         .delete().where('id', recipeId).transacting(trx);

        if(recipeCount < 1){
          return [];
        }

        return {
          success: true,
          message: 'Recipe successfully removed'
        }

      });

  } catch(e) {

    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;
    
    if(e.name === 'RECIPEMODEL_ERROR'){
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

/* Remove all recipes
 * @returns {any} A count of how many records were deleted or an
 * empty array if no records to delete
 */
const removeAll  = async () => {

  try{

      /* Delete the data in the reverse order it was created */
      return await db.transaction( async trx => {

        const recipeCount = await db('recipes')
         .delete()
         .transacting(trx);

        if(recipeCount > 0){
          return {
            success: true,
            message: 'All recipes successfully removed'
          }
        } else {
          return []
        }

      });

  } catch(e) {

    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;
    
    if(e.name === 'RECIPEMODEL_ERROR'){
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

/* Using the supplied values within an object update the specified record within
 * the database.
 * @param {object} recipe - JS Object holiding the updates to the recipe
 * @returns {object} Detailing if the process was a success or not and any
 * supporting messages
 */
const update = async recipe => {

  try{

    /* Validate the passed in values stored in the object */
    if(!validation.validator(recipe.recipeId, 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'Validation failed for recipeId'
      }
    }
   

    if(!validation.validator(recipe.name, 'string')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'Validation failed for name'
      }
    }
    

    if(!validation.validator(recipe.userId, 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'Validation failed for userId'
      }
    }
    
    if(!validation.validator(recipe.servings, 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'Validation failed for servings'
      }
    }
    

    if(!validation.validator(recipe.calories_per_serving, 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'Validation failed for calories_per_serving'
      }
    }
    

    if(!validation.validator(recipe.prep_time, 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'Validation failed for prep_time'
      }
    }
    

    if(!validation.validator(recipe.cook_time, 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'Validation failed for cook_time'
      }
    }
    
    /* Update the specifed record with the new values passed in */
    return await db.transaction(async trx => {

      /* Add the recipe*/
        await db('recipes')
        .update({
          id: recipe.recipeId,
          userId: recipe.userId,
          name: recipe.name,
          description: recipe.description,
          servings: recipe.servings,
          calories_per_serving: recipe.calories_per_serving,
          prep_time: recipe.prep_time,
          cook_time: recipe.cook_time
        })
        .where('id', recipe.recipeId)
        .transacting(trx)
      
        if(recipe?.steps){
          for(let step of recipe.steps){
            await db('steps')
            .insert({
              id: step.id,
              stepNo: step.stepNo,
              content: step.content,
              recipeId: recipe.recipeId
            })
            .onConflict('id')
            .merge()
            .transacting(trx)
          }
        }

        if(recipe?.ingredients){
          for(let ingredient of recipe.ingredients){
            await db('recipe_ingredients')
            .insert({
              id: ingredient.id,
              ingredientId: ingredient.ingredientId,
              amount: ingredient.amount,
              amount_type: ingredient.amount_type,
              recipeId: recipe.recipeId
            })
            .onConflict('id')
            .merge()
            .transacting(trx)
          }
        }
        
        if(recipe?.cookbooks){
          for(let cookbook of recipe.cookbooks){
            await db('cookbook_recipes')
            .insert({
              id: cookbook.id,
              cookbookId: cookbook.cookbookId,
              recipeId: recipe.recipeId
            })
            .onConflict('id')
            .merge()
            .transacting(trx)
          }
        }
        
        if(recipe?.categories){
          for(let category of recipe.categories){
            await db('recipe_categories')
            .insert({
              id: category.id,
              categoryId: category.categoryId,
              recipeId: recipe.recipeId
            })
            .onConflict('id')
            .merge()
            .transacting(trx)
          }
            
        }
        
        return {
          success: true,
          message: 'Recipe successfully updated'
        }

    });

  
  } catch(e) {
    
    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;

    if(e.name === 'RECIPEMODEL_ERROR'){
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

/* based on the provided search term should find zero or more recipes by a
 * recipes name.
 * @param {string} terms - The search terms to look for
 * @returns {object} Contains the recipes and all it's related data like steps,
 * ingredients etc
 */
const find = async (terms, options) => {

  try{

    let {page, size, offset, filter, filterBy, filterValues, sortBy, sortOrder} = options

    /* Validate the passed in arguments */
    if(!validation.validator(terms, 'string')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    /* Gather the required data from the database, use a transaction for this
     * to keep it all nice and tidy ( IMHO )
    */
    return await db.transaction( async trx => {

      let recipes = [];

      /* Find all the recipes which match first */
      const results = await trx('recipes')
       .modify(dbHelper.buildFilters, filter)
       .modify(dbHelper.buildLimit, size)
       .select(
         'id as recipeId',
         'userId',
         'name',
         'description',
         'servings',
         'calories_per_serving',
         'prep_time',
         'cook_time',
         'rating'
       )
       .whereILike('name',`%${terms}%`)
       .modify(dbHelper.buildSort, { sortBy, sortOrder })
       .offset((page - 1) * size)
       .transacting(trx);

       const resultCount = await trx('recipes')
        .modify(dbHelper.buildFilters, filter)
        .select('id')
        .whereILike('name',`%${terms}%`)
        .count()
        .groupBy('id')
        .transacting(trx);

       /* Loop through all recipes found and gather the supporting data */
       if(results && results.length > 0)
       {

         for(let result of results) {
         //results.forEach( async result => {
          
          let ingredientResults = await trx('recipe_ingredients as ri')
            .join('ingredients as i', 'ri.ingredientId', '=', 'i.id')
            .select(
              'i.id as id',
              'i.name as name',
              'ri.amount as amount',
              'ri.amount_type as amount_type'
            )
            .where('ri.recipeId', result.recipeId).transacting(trx);
           
          let cookbookResults = await trx('cookbook_recipes as cr')
           .join('cookbooks as c', 'cr.cookbookId', '=', 'c.id')
           .select('c.id as id', 'c.name as name')
           .where('cr.recipeId', result.recipeId).transacting(trx);
          

          let stepResults = await trx('steps')
           .select('id', 'stepNo', 'content')
           .where('recipeId', result.recipeId).transacting(trx);
         

          let categoryResults = await trx('recipe_categories as rc')
           .join('categories as cat', 'rc.categoryId', '=', 'cat.id')
           .select('cat.id as id', 'cat.name as name')
           .where('rc.recipeId', result.recipeId).transacting(trx);
          
          /* get the images for the current recipe */
          let imageResults = await trx('files')
          .select(
            'id',
            'src as source',
            'title',
            'alt'
          )
          .where('resource', '=', 'recipe')
          .where('resourceid', '=', result.recipeId)

          let recipe = {
            ...result,
            ingredients: [...ingredientResults],
            cookbooks: [...cookbookResults],
            steps: [...stepResults],
            categories: [...categoryResults],
            images: [...imageResults]
          };

          recipes.push(recipe);

         };

       } else {
         return [];
       }

       /* Calculate number of pages */
       let numPages = parseInt(Math.floor(resultCount.length / size)) + 1
       if(numPages < 1) numPages = 1

       return {
         results: [...recipes],
         totalRecords: resultCount.length,
         totalPages: numPages,
         currentPage: page
        };

    });


  } catch(e) {
        
        /* Check for library errors and if found swap them out for a generic
           one to send back over the API for security */
        let message;

        if(e.name === 'RECIPEMODEL_ERROR'){
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

/* Returns all recipes held in the database
 * @options {object} Cpntains options for pagination of the record set
 * @returns {object} Contains the recipes and all it's related data like steps,
 * ingredients etc
 */
const findAll = async (options) => {

  try{

    /* Gather the required data from the database, use a transaction for this
     * to keep it all nice and tidy ( IMHO )
    */

    let {page, size, offset, filterBy, filterValues, limit, filter, sortBy, sortOrder} = options

    return await db.transaction( async trx => {

      let recipes = [];

      /* Find all the recipes which match first */
      const results = await trx('recipes')
       .modify(dbHelper.buildFilters, filter)
       .modify(dbHelper.buildLimit, size)
       .select(
         'id',
         'userId',
         'name',
         'description',
         'servings',
         'calories_per_serving',
         'prep_time',
         'cook_time',
         'rating'
       )
       .offset(offset)
       .modify(dbHelper.buildSort, { sortBy, sortOrder })
       .transacting(trx);

      const recordCount = await trx('recipes')
        .modify(dbHelper.buildFilters, filter)
        .select('id')
        .count()
        .groupBy('id')
        .transacting(trx)
      
        

       /* Loop through all recipes found and gather the supporting data */
       if(results && results.length > 0)
       {

         for( let result of results) {
         //results.forEach( async result => {


          let ingredientResults = await trx('recipe_ingredients as ri')
            .join('ingredients as i', 'ri.ingredientId', '=', 'i.id')
            .select(
              'i.id as id',
              'i.name as name',
              'ri.amount as amount',
              'ri.amount_type as amount_type'
            )
            .where('ri.recipeId', result.id).transacting(trx);

          let cookbookResults = await trx('cookbook_recipes as cr')
           .join('cookbooks as c', 'cr.cookbookId', '=', 'c.id')
           .select('c.id as id', 'c.name as name')
           .where('cr.recipeId', result.id).transacting(trx);

          let stepResults = await trx('steps')
           .select('id', 'stepNo', 'content')
           .where('recipeId', result.id).transacting(trx);

          let categoryResults = await trx('recipe_categories as rc')
           .join('categories as cat', 'rc.categoryId', '=', 'cat.id')
           .select('cat.id as id', 'cat.name as name')
           .where('rc.recipeId', result.id).transacting(trx);

          let imageResults = await trx('files as f')
           .select(
            'f.id as imageId',
            'f.src as source',
            'f.title as title',
            'f.alt as alt',
           )
           .where('f.resource', '=', 'recipe')
           .andWhere('f.resourceid', '=', result.id)
           .transacting(trx)

          let recipe = {
            ...result,
            ingredients: [...ingredientResults],
            cookbooks: [...cookbookResults],
            steps: [...stepResults],
            categories: [...categoryResults],
            images: [...imageResults]
          };

          recipes.push(recipe);

         };

       } else {
         return [];
       }

       /* Calculate number of pages */
      let numPages = parseInt(Math.floor(recordCount.length / size)) + 1
      if(numPages < 1) numPages = 1

       return {
        results: recipes,
        totalRecords: recordCount.length,
        totalPages: numPages,
        currentPage: page
       };

    });


  } catch(e) {


        /* Check for library errors and if found swap them out for a generic
           one to send back over the API for security */
        let message = 'There was a problem with the resource, please try again later';

        return {
          success: false,
          message: message
        }

  }

};

/* Return the recipe matching the passed in recipe ID
 * @param {number} id - The ID of the record you are intersted in
 * @returns {array} Contains the specified recipe if founf otherwise it returns
 * an empty array
 */
const findByRecipe = async (id, options) => {

  let {page, size, offset, filterBy, filterValues, limit, filter, sortBy, sortOrder} = options

  try {
    
    /* Validate the passed in arguments */
    if(!validation.validator(id, 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: messageHelper.ERROR_MISSING_VALUES
      }
    }

    let steps = [];
    let categories = [];
    let cookbooks = [];
    let ingredients = [];
    let finalRecipe = [];

    /* Gather the required data from the database */
    const result = await db('recipes')
     .select('id',
     'name',
     'userId',
     'description',
     'servings',
     'calories_per_serving',
     'prep_time',
     'cook_time',
     'rating')
     .where('id', id);

    
    /* Only if we have found a recipe should we then go ahead and retrieve from
       the database all the supporting data like steps and categories */
    if(result && result.length > 0){

      /* Get the images for the record */
      let imageResults = await db('files as f')
        .select(
          'f.id as imageId',
          'f.src as source',
          'f.title as title',
          'f.alt as alt',
          )
          .where('f.resource', '=', 'recipe')
          .andWhere('f.resourceid', '=', result[0].id)


      /* Find appropriate steps and only if we have found some do we then add
      them to the local steps array ready to be added to the recipe and
      returned */
      const recipeSteps = await stepModel.findByRecipeId(result[0].id, options);
      
      if(recipeSteps?.results && recipeSteps?.results?.length > 0){
        for( let recipeStep of recipeSteps.results){
          steps.push({
            id: recipeStep.id,
            stepNo: recipeStep.stepNo,
            content: recipeStep.content
          });
        };
      };

      /* Now find the categories for the specified recipe and again check that
      we have some to populate the correct array */
      const recipeCategories = await recipeCategoriesModel.findByRecipe(result[0].id, options);
      if(recipeCategories?.results && recipeCategories?.results?.length > 0){
        for( let recipeCategory of recipeCategories.results){
          categories.push({
              id: recipeCategory.id,
              categoryId: recipeCategory.categoryId,
              name: recipeCategory.categoryName
            });
        };
      };

      /* Now get all cookbooks the recipe has been added to and again only if we
      have data to check, lopp through and assign to the cookbooks array */
      const recipeCookbooks = await cookbookRecipesModel.findByRecipe(result[0].id, options);
      if(recipeCookbooks && recipeCookbooks.length > 0){
        for( let recipeCookbook of recipeCookbooks){
          cookbooks.push({
            id: recipeCookbook.id,
            cookbookId: recipeCookbook.cookbookId,
            name: recipeCookbook.cookbookName,
            description: recipeCookbook.cookbookDescription,
            image: recipeCookbook.cookbookImage
          });
        };
      };

      /* Finally get all ingredients for the recipe, check we actually have
      some and then add them to the ingredients array */
      const recipeIngredients = await recipeIngredientsModel.findByRecipeId(result[0].id, options);
      
      if(recipeIngredients?.results && recipeIngredients?.results?.length > 0){
        
        for( let recipeIngredient of recipeIngredients.results){
          ingredients.push({
            id: recipeIngredient.id,
            ingredientId: recipeIngredient.ingredientId,
            name: recipeIngredient.name,
            amount: recipeIngredient.amount,
            amount_type: recipeIngredient.amount_type
          });
        };
      };


     
      /* build the recipe object we wish to return */
      finalRecipe.push(
        {
          id: result[0].id,
          userId: result[0].userId,
          name: result[0].name,
          description: result[0].description,
          servings: result[0].servings,
          calories_per_serving: result[0].calories_per_serving,
          prep_time: result[0].prep_time,
          cook_time: result[0].cook_time,
          rating: result[0].rating,
          ingredients: [...ingredients],
          steps: [...steps],
          categories: [...categories],
          cookbooks: [...cookbooks],
          images: [...imageResults]
        }
      );
      return finalRecipe;

    } else {
      return [];
    }


  } catch(e) {
        /* Check for library errors and if found swap them out for a generic
           one to send back over the API for security */
        let message;

        if(e.name === 'RECIPEMODEL_ERROR'){
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
 * Fetch all recipes within the database that contain the specified ingredients
 * @param {string} terms - Ingredients for a recipe to have
 * @param {object} options - Contains options for formating the results like pagination
 * @returns {array} An array of recipe objects
 */
const findByIngredients = async (terms, options) => {

  /* Keep track of the pagination options */
  let totalPages;
  let totalRecords;
  let currentPage;

  try{

    /* Store any recipes we found to be returned */
    let recipes = [];

    /* Holds all ingredients found for a recipe */
    let recipeIngredients = []

    /* Validate the passed in values */
    if(!validation.validator(terms, 'string')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: messageHelper.ERROR_MISSING_VALUES
      }
    }

    /* Gather a list of recipes that match */
    return await db.transaction( async trx => {

      /* Get all ingredients which match first */
      
      /* Split out each term we have been sent */
      const ingredientList = terms.split(',')
      
      let ingredientResults = []
      for(let i = 0; i < ingredientList.length; i++){
        let tempIngredient = await ingredientModel.findAllByName(ingredientList[i]);
        ingredientResults.push(tempIngredient)
      }
      
      /* Check to see if the results contain any errors and handle
       them appropriately */
      if(!Array.isArray(ingredientResults)){

        if(!ingredientResults.message){
          throw {
            name: 'RECIPEMODEL_ERROR',
            message: ingredientResults.message
          }
        } else {
          throw {
            name: 'LIBERROR',
            message: ingredientResults.message
          }
        }
      }

      /* Keep a tally of the number of records found for each ingredient */
      let recipesFound = 0

      /* Check we have ingredients to look through for the next phase */
      if(ingredientResults && ingredientResults.length > 0){
        /* Loop through each result and gather all supporting data */
        for ( ingredient of ingredientResults ){
         
          /* For each ingredient just get the id of the recipe it belongs to as well as further details
          on how much of that ingredient it needs */
          if(Array.isArray(ingredient) && ingredient?.length > 0){
            for(let i = 0; i < ingredient.length; i++){
              let tmp = await recipeIngredientsModel.findByIngredient(ingredient[i].id, options);
              
              if(tmp?.data?.length > 0){
                recipeIngredients.push(tmp)
              }
            }
            
          } 

          /* get the pagination options and any data returned*/
          
          /* Extract the data and assign to an arry or ease of use */
          let data = []
          for(let x = 0; x < recipeIngredients.length; x++){
            data.push(recipeIngredients[x].data[0])
          }
          
          totalPages = recipeIngredients.totalPages
          totalRecords = recipeIngredients.totalRecords
          currentPage = recipeIngredients.currentPage
          
          recipesFound += totalRecords

          /*
            If we have any errors, just throw them back up to the calling
            function
          */
          if(recipeIngredients?.message){
            throw {
              name: 'LIBERROR',
              message: recipeIngredients.message
            }
          }

          /* 
            For each recipeId found loop throught and get the actual
            recipe and then assign to the recipe array we will be
            returning and if none found then return an empty array
          */
            
            if(data?.length > 0){
            
              await Promise.all(data.map(async record => {
                
                let found = await findByRecipe(record.recipeId, options)
               
                await Promise.all(found.map(async findee => { 
                  recipes.push(findee)
                }))
               
               

              }))

          } else {
            return []
          }

        }

      } else {
        return [];
      }

      /*
        Return the found list of recipes and also the pagination data
      */
      
      return {
        results: recipes,
        currentPage,
        totalPages: parseInt(recipesFound / options.size) < 1 ? 1 : parseInt(recipesFound / options.size),
        totalRecords: recipesFound
      };

    });

  } catch(e) {
        
        /* Check for library errors and if found swap them out for a generic
           one to send back over the API for security */
        let message;

        if(e.name === 'RECIPEMODEL_ERROR'){
          message = e.message;
        } else {
          message = messageHelper.ERROR_GENERIC_RESOURCE;
        }

        return {
          success: false,
          message: message
        }

  }

}

/* Find all recipes that match a certain category
 * @param {string} terms - The category names to find recipes by
 * @returns {array} An array of recipes in object form
 */
const findByCategory = async (terms, options) => {

  /* Keep track of the pagination options */
  let totalPages;
  let totalRecords;
  let currentPage;

  try {

    /* Validate the passed in values */
    if(!validation.validator(terms, 'string')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: messageHelper.ERROR_MISSING_VALUES
      }
    }

    /* The final list of recipes to return */
    let recipes = [];

    /* Get a list of categories which match the search terms passed
       into the function */
    const foundCategories = await categoryModel.findAllByName(terms);

    if(!foundCategories || foundCategories.length < 1){
      return recipes;
    } else {

      /* Get the ids of each recipe that has this category listed */
      for( let foundCategory of foundCategories){

        let foundRecipeIds = await recipeCategoriesModel.findByCategory(foundCategory.id, options);
        
        /* get the pagination options and any data returned*/
        let { data } = foundRecipeIds
        totalPages = foundRecipeIds.totalPages
        totalRecords = foundRecipeIds.totalRecords
        currentPage = foundRecipeIds.currentPage

        /* Go through all the results from the findByCategory method */
        await Promise.all(data.map(async entry => {

          /* for each entry returned get the recipe details and assign to the results array we will
             return later
          */
         let recipe = await findByRecipe(entry.recipeId, options);
         
         if(recipe.length > 0){
          
          await Promise.all(recipe.map(item => {
            recipes.push(item)
          }))

         }

        }))

        
      }

      return {
        results: recipes,
        totalRecords,
        totalPages,
        currentPage
      };

    }

  } catch(e) {
    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;
    if(e.name === 'RECIPEMODEL_ERROR'){
      message = e.message;
    } else {
      message = messageHelper.ERROR_GENERIC_RESOURCE;
    }

    return {
      success: false,
      message: message
    }
  }

};

/* Return the recipes for a particular user
 * @param {number} id - The ID of the user whose recipes you are interested in
 * @returns {array} Contains the specified recipes if found otherwise it returns
 * an empty array
 */
const findByUserId = async (id, options) => {

  try {
    
    /* get the pagination options */
    let {page, size, offset, filterBy, filterValues, filter, sortBy, sortOrder} = options

    /* Validate the passed in arguments */
    if(!validation.validator(Number.parseInt(id), 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: messageHelper.ERROR_MISSING_VALUES
      }
    }

    /* Get a count of all records being affected */
    const recordCount = await db('recipes')
    .modify(dbHelper.buildFilters, filter)
    .select('id')
    .where('userId', id)
    .count()
    .groupBy('id');

    /* Gather the required data from the database */
    const results = await db('recipes')
     .modify(dbHelper.buildFilters, filter)
     .modify(dbHelper.buildLimit, size)
     .select('*')
     .where('userId', id)
     .modify(dbHelper.buildSort, { sortBy, sortOrder })
     .offset(offset);

    /* If we any results then send them back  */
    if(results && results.length > 0){
      /* Calculate number of pages */
      let numPages = parseInt(Math.floor(recordCount.length / size)) + 1
      if(numPages < 1) numPages = 1

      return {
        results, 
        totalRecords: recordCount.length,
        totalPages: numPages,
        currentPage: page
      };
    } else {
      return [];
    }


  } catch(e) {

        /* Check for library errors and if found swap them out for a generic
           one to send back over the API for security */
        let message;

        if(e.name === 'RECIPEMODEL_ERROR'){
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

/* Remove all recipes owned by a particular user id
 * @returns {any} A count of how many records were deleted or an
 * empty array if no records to delete
 */
const removeAllByUser  = async id => {

  try{

      /* Delete the data in the reverse order it was created */

      if(!id || id === undefined){
        return {
          success: false,
          message: 'Undefined userId'
        }
      }

      return await db.transaction( async trx => {

        const recipeCount = await db('recipes')
         .delete()
         .where('userId', id)
         .transacting(trx);

        if(recipeCount > 0){
          return {
            success: true,
            message: 'All recipes successfully removed'
          }
        } else {
          return {
            success: false,
            message: 'The user has no recipes to remove'
          }
        }

      });

  } catch(e) {
    
    /* Check for library errors and if found swap them out for a generic
       one to send back over the API for security */
    let message;
    
    if(e.name === 'RECIPEMODEL_ERROR'){
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

/* This method checks an individual ingredient from the panty against an recipe to see if it can be used
 * @param {number} recipe_id  The id of the recipe whose ingredients we are interested in
 * @Param {object} ingredient The ingredient to be checking
 * @returns {boolean} true if we have enough of our ingredient, false if not
 * TODO: Take into account of an amount_type so if a client has more than the recipe it still matches
 */
const canIBeUsed = async (recipe_id, ingredient) => {

  try {

    /* Validate the passed in arguments */
    if(!recipe_id || typeof recipe_id !== 'number' || recipe_id !== null || recipe_id !== undefined || !isNaN(parseInt(recipe__id))){
      return false
    }

    if(!ingredient){
      return false
    }

    /* Get the recipe Ingredient */
    const result = await db("recipe_ingredients")
     .select('*')
     .where('recipeId', '=', recipe_id)
     .where('ingredientId', '=', ingredient.id)

    
    /* removed old if conditional as not quite ready to test out ingredients amount, but leaving here for future expansion */
    //if(result[0].amount === ingredient.amount && result[0].amount_type === ingredient.amount_type){
    if(result && result?.length > 1) {
      return true
    } else {
      return false
    }

  } catch(e) {

    return false
  }

}
   
/* The method checks an ingredient agaisnt a recipes list of ingredients to see if it matches at all
 * @param {number} recipe_id  The id of the recipe whose ingredients we are interested in
 * @param {array} ingredients The ingredients we wish to check against
 * @returns {boolean} true if we have enough ingredients to make the recipe but false if we do not
 */
const canIBeMade = async (recipe_id, ingredients) => {

  try {

    /* Validate the passed in arguments */
    if(!recipe_id || typeof recipe_id !== 'number' || recipe_id !== null || recipe_id !== undefined || !isNaN(parseInt(recipe__id))){
      return false
    }

    if(!Array.isArray(ingredients) || ingredients?.length < 1){
      return false
    }

    /* Keep a count of all the ingredients that match */
    let matches = 0

    /* Check each ingredient against the recipe */
    for(let idx = 0; idx < ingredients.length; idx++){
      if(canIBeUsed(recipe_id, ingredients[idx])){
        matches++
      } 
    }

    /* If we can make the recipe, then the number of matches should equal the number of ingredients we have checked */
    if(matches >= ingredients.length){
      return true
    } else {
      return false
    }

  } catch(e) {


    return false

  }

}

/* This method will check an array to see if an item already exists within it */
const doIExist = (element, target) => {

  if(target?.length < 1) {
 
    return false
  }

  for(let loop = 0; loop < target?.length; loop++){
    
    let tmp = target[loop]

    if(_.isEqual(element, tmp)){
      
      return true
    } else {
      
    }

    return false

  }

}

/*
 * This method determines if a recipe can be made or not based on the passed in ingredients
 * @param {array} ingredients The list of ingredient objects with which we have to make a recipe
 * @returns {any} false if not found or we don't have enough of the ingredient otherwise it returns the recipe
 * 
*/
const whatCanIMake = async (ingredients, options) => {

  try{

    /* Validate the passed in arguments */

    if(!Array.isArray(ingredients)){
      return false
    }

    if(ingredients?.length < 1) {
      return false
    }

    /* Keeps track of the recipes we have found so far */
    let recipesWeCanMake = []

    /* Keep a count of how many ingredients failed to find a recipe they are in */
    let failedMatches = 0

    /*
      Loop through each ingredient and check the recipe has it
    */
   
    for(let i = 0; i < ingredients.length; i++){

      /* Check the recipe ingredients table for the information we need */
      let recipes = await db('recipe_ingredients')
       .select('*')
       .where('ingredientId', '=', ingredients[i].ingredientId)

       /* Check each recipe in turn against the pantry ingredients and see if we can make the recipe
       */
       for(let y = 0; y < recipes.length; y++){
            
            let recipeMatches = await findByRecipe(recipes[y].recipeId, options)
            
            /* For each recipe found add it to the final list of recipes we can make ready 
             * to be sent back to the client. We also need to remove duplciates here as well */
            for(let x = 0; x < recipeMatches?.length; x++){
            
              recipesWeCanMake = [...recipesWeCanMake, recipeMatches[x]]

            } 

        }
      
      
    }

    if(!recipesWeCanMake || recipesWeCanMake?.length < 1){
      return false
    } else {

      /* Get rid of duplicates we may have */
      let finalisedArray = []
      let uniqueObjects = {}

      /* Loop through the recipes found and assign them to a new object dictionary using the recipe name as a key.
      This should then mean any duplicates overwrite the existing entry leavinf at then end, hopefully a set of
      unique recipes */
      for(let j = 0; j < recipesWeCanMake.length; j++){

        let keyName = recipesWeCanMake[j].name
        uniqueObjects[keyName] = recipesWeCanMake[j]
        
      }

      /* Add in each unique entry into the array before sending it back to the client */
      for(i in uniqueObjects){
        finalisedArray.push(uniqueObjects[i])
      }

      return finalisedArray
    }

  } catch(e) {


    return false

  }

}




module.exports = {
  create,
  remove,
  update,
  find,
  findAll,
  findByRecipe,
  findByIngredients,
  findByCategory,
  removeAll,
  findByUserId,
  removeAllByUser,
  whatCanIMake
};
