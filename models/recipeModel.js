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

/*
 * Transactional knex method to add a recipe to the database as well as it's
 * associated data.
 * @param {object} recipe - All the relevant data for the main recipe enscapulated
 * within an object
 * @param {array} steps - All relevant steps needed to make the recipe
 * @param {array} ingredients - All ingredients for the recipe
 * @param {number} cookbook - The cookbook the recipe should be added to
 * @param {array} categories - The catgeories the recipe belong to
 * @returns {object} Detailing if the process was a success or not and any
 * supporting messages
 */
const create = async (recipe, steps, ingredients, cookbookId, categories) => {

  try{

    /* validate the data passed in */
    /* Recipe data */
    if(!validation.validator(recipe, 'object')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    if(!validation.validator(recipe.userId, 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    if(!validation.validator(recipe.name, 'string')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    if(!validation.validator(recipe.servings, 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    if(!validation.validator(recipe.calories_per_serving, 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    if(!validation.validator(recipe.prep_time, 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    if(!validation.validator(recipe.cook_time, 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* steps data */
    if(!validation.validator(steps, 'array')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* ingredients data */
    if(!validation.validator(ingredients, 'array')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* cookbook id */
    if(!validation.validator(cookbookId, 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* categories data */
    if(!validation.validator(categories, 'array')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    };

    /* Add the recipe and related data via a transaction */
    return await db.transaction( async trx => {

      /* Add the recipe and return the ID to use later */
      const recipeId = await db('recipes')
       .insert(recipe, 'id')
       .transacting(trx);

      steps.forEach(step => step.recipeId = recipeId);
      await db('steps').insert(steps).transacting(trx);

      ingredients.forEach(ingredient => ingredient.recipeId = recipeId);
      await db('recipe_ingredients').insert(ingredients).transacting(trx);

      await db('cookbook_recipes').insert(
        { cookbookid: cookbookId, recipeid: recipeId}
      ).transacting(trx);

      categories.forEach(cat => cat.recipeId = recipeId);
      await db('recipe_categories').insert(categories).transacting(trx);

      return {
        success: true,
        message: 'Recipe successfully added'
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
    if(!validation.validator(recipe.id, 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    if(!validation.validator(recipe.name, 'string')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    if(!validation.validator(recipe.userId, 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    if(!validation.validator(recipe.servings, 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    if(!validation.validator(recipe.calories_per_serving, 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    if(!validation.validator(recipe.prep_time, 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    if(!validation.validator(recipe.cook_time, 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    if(!validation.validator(recipe.rating, 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: 'One or more required values are missing or incorrect'
      }
    }

    /* Update the stored database entry now all is OK */
    const result = await db('recipes')
     .update(recipe).where('id', recipe.id);

    return {
      success: true,
      message: 'Recipe successfully updated'
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

/* based on the provided search term should find zero or more recipes by a
 * recipes name.
 * @param {string} terms - The search terms to look for
 * @returns {object} Contains the recipes and all it's related data like steps,
 * ingredients etc
 */
const find = async terms => {

  try{

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
       .select(
         'id as recipeId',
         'name',
         'description',
         'servings',
         'calories_per_serving',
         'prep_time',
         'cook_time',
         'rating'
       )
       .whereILike('name',`%${terms}%`).transacting(trx);

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

          let recipe = {
            ...result,
            ingredients: [...ingredientResults],
            cookbooks: [...cookbookResults],
            steps: [...stepResults],
            categories: [...categoryResults]
          };

          recipes.push(recipe);

         };

       } else {
         return [];
       }

       return recipes;

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
 * @returns {object} Contains the recipes and all it's related data like steps,
 * ingredients etc
 */
const findAll = async () => {

  try{

    /* Gather the required data from the database, use a transaction for this
     * to keep it all nice and tidy ( IMHO )
    */
    return await db.transaction( async trx => {

      let recipes = [];

      /* Find all the recipes which match first */
      const results = await trx('recipes')
       .select(
         'id as recipeId',
         'name',
         'description',
         'servings',
         'calories_per_serving',
         'prep_time',
         'cook_time',
         'rating'
       ).transacting(trx);

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

          let recipe = {
            ...result,
            ingredients: [...ingredientResults],
            cookbooks: [...cookbookResults],
            steps: [...stepResults],
            categories: [...categoryResults]
          };

          recipes.push(recipe);

         };

       } else {
         return [];
       }

       return recipes;

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
const findByRecipe = async id => {

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
     .select('*')
     .where('id', id);

    /* Only if we have found a recipe should we then go ahead and retrieve from
       the database all the supporting data like steps and categories */
    if(result && result.length > 0){

      /* Find appropriate steps and only if we have found some do we then add
      them to the local steps array ready to be added to the recipe and
      returned */
      const recipeSteps = await stepModel.findByRecipeId(result[0].id);
      if(recipeSteps && recipeSteps.length > 0){
        for( let recipeStep of recipeSteps){
          steps.push({
            id: recipeStep.id,
            stepNo: recipeStep.stepNo,
            content: recipeStep.content
          });
        };
      };

      /* Now find the categories for the specified recipe and again check that
      we have some to populate the correct array */
      const recipeCategories = await recipeCategoriesModel.findByRecipe(result[0].id);
      if(recipeCategories && recipeCategories.length > 0){
        for( let recipeCategory of recipeCategories){
          categories.push({
              id: recipeCategory.categoryId,
              name: recipeCategory.categoryName
            });
        };
      };

      /* Now get all cookbooks the recipe has been added to and again only if we
      have data to check, lopp through and assign to the cookbooks array */
      const recipeCookbooks = await cookbookRecipesModel.findByRecipe(result[0].id);
      if(recipeCookbooks && recipeCookbooks.length > 0){
        for( let recipeCookbook of recipeCookbooks){
          cookbooks.push({
            id: recipeCookbook.cookbookId,
            name: recipeCookbook.cookbookName,
            description: recipeCookbook.cookbookDescription,
            image: recipeCookbook.cookbookImage
          });
        };
      };

      /* Finally get all ingredients for the recipe, check we actually have
      some and then add them to the ingredients array */
      const recipeIngredients = await recipeIngredientsModel.findByRecipeId(result[0].id);
      if(recipeIngredients && recipeIngredients.length > 0){
        for( let recipeIngredient of recipeIngredients){
          ingredients.push({
            id: recipeIngredient.id,
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
          cookbooks: [...cookbooks]
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
 * @returns {array} An array of recipe objects
 */
const findByIngredients = async terms => {

  try{

    /* Validate the passed in values */
    if(!validation.validator(terms, 'string')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: messageHelper.ERROR_MISSING_VALUES
      }
    }

    /* Gather a list of recipes that match */
    return await db.transaction( async trx => {

      /* Holds the final list of recipes to return */
      let recipes  = [];

      /* Get all ingredients which match first */
      const ingredientResults = await ingredientModel.findAllByName(terms);


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

      /* Check we have ingredients to look through for the next phase */
      if(ingredientResults && ingredientResults.length > 0){

        /* Loop through each result and gather all supporting data */
        for ( let ingredient of ingredientResults ){

          let recipeIngredients = await recipeIngredientsModel.findByIngredient(ingredient.id);


          if(recipeIngredients && recipeIngredients.length > 0){

              for ( recipeIngredient of recipeIngredients) {

                let foundRecipes = await findByRecipe(recipeIngredient.recipeId);

                if(foundRecipes && foundRecipes.length > 0){

                  for ( found of foundRecipes ){
                    recipes.push(found);
                  }

                }

              }

          } else {

            if(!recipeIngredients.message){
              throw {
                name: 'RECIPEMODEL_ERROR',
                message: recipeIngredients.message
              }
            } else {
              throw {
                name: 'LIBERROR',
                message: recipeIngredients.message
              }
            }

          }

        }

      } else {
        return [];
      }


      return recipes;

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
const findByCategory = async terms => {

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

        let foundRecipeIds = await recipeCategoriesModel.findByCategory(foundCategory.id);
        if(!foundRecipeIds || foundRecipeIds.length < 1){
          recipes.push(null);
        } else {

          /* Now get each recipe and it's details and then add to the final
             recipes array */
          for(let foundRecipeId of foundRecipeIds){

            /* Extract the recipes and it's supporting information based
            on the ID passed in and add to the final array being returned */
            let foundRecipes = await findByRecipe(foundRecipeId.recipeId);

            if(foundRecipes && foundRecipes.length > 0){

              for ( found of foundRecipes ){
                recipes.push(found);
              }

            }

          }

        }

      }

      return recipes;

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
const findByUserId = async id => {

  try {

    /* Validate the passed in arguments */
    if(!validation.validator(id, 'number')){
      throw {
        name: 'RECIPEMODEL_ERROR',
        message: messageHelper.ERROR_MISSING_VALUES
      }
    }

    let finalRecipe = [];

    /* Gather the required data from the database */
    const result = await db('recipes')
     .select('*')
     .where('userId', id);

    /* Only if we have found a recipe should we then go ahead and retrieve from
       the database all the supporting data like steps and categories */
    if(result && result.length > 0){

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
  findByUserId
};
