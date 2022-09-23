/*
 * Packages needed for scripts
 */
const knex = require('knex');
const db = require('../database');
const recipeIngredientsModel = require('../models/recipeIngredientsModel');
const { getTracker, Tracker } = require('knex-mock-client');

const messageHelper = require('../helpers/constants');

/* Mock the DB library */
jest.mock('../database', () => {
  const knex = require('knex');
  const { MockClient } = require('knex-mock-client');
  return knex({ client: MockClient })
});

/* Tracker for the SQL commands */
let tracker;

describe('recipeIngredientsModel.create', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {
    /* Initialize the tracker of the various commands */
    tracker = getTracker();
  });

  afterEach(() => {
    /* Reset the tracker */
    tracker.reset();
  })

  it('should create the specified record', async () => {

    /** Mock the DB responses */
    tracker.on.insert('recipe_ingredients').response([{ id: 1}]);

    /** Set the data to pass into the models function */
    const data = {
      recipeId: 1,
      ingredientId: 1,
      amount: 150,
      amount_type: 'grams'
    }

    /** Execute the function */
    const results = await recipeIngredientsModel.create(data);

    /** Test the response back from the function */
    expect(typeof results).toBe('object');
    expect(results.success).toBe(true);
    expect(results.message).toEqual('Ingredient successfully added to recipe');

  });

  it('should throw an error if data is missing or incorrect', async () => {


    /** Set the data to pass into the models function */
    const data = null;

    /** Execute the function */
    const results = await recipeIngredientsModel.create(data);

    /** Test the response back from the function */
    expect(typeof results).toBe('object');
    expect(results.success).toBe(false);
    expect(results.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should throw an error if data.recipeId is missing or incorrect', async () => {


    /** Set the data to pass into the models function */
    const data = {
      recipeId: null,
      ingredientId: 1,
      amount: 150,
      amount_type: 'grams'
    }

    /** Execute the function */
    const results = await recipeIngredientsModel.create(data);

    /** Test the response back from the function */
    expect(typeof results).toBe('object');
    expect(results.success).toBe(false);
    expect(results.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should throw an error if data.ingredientId is missing or incorrect', async () => {


    /** Set the data to pass into the models function */
    const data = {
      recipeId: 1,
      ingredientId: null,
      amount: 150,
      amount_type: 'grams'
    }

    /** Execute the function */
    const results = await recipeIngredientsModel.create(data);

    /** Test the response back from the function */
    expect(typeof results).toBe('object');
    expect(results.success).toBe(false);
    expect(results.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should throw an error if data.amount is missing or incorrect', async () => {


    /** Set the data to pass into the models function */
    const data = {
      recipeId: 1,
      ingredientId: 1,
      amount: null,
      amount_type: 'grams'
    }

    /** Execute the function */
    const results = await recipeIngredientsModel.create(data);

    /** Test the response back from the function */
    expect(typeof results).toBe('object');
    expect(results.success).toBe(false);
    expect(results.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should throw an error if data.amount_type is missing or incorrect', async () => {


    /** Set the data to pass into the models function */
    const data = {
      recipeId: 1,
      ingredientId: 1,
      amount: 150,
      amount_type: null
    }

    /** Execute the function */
    const results = await recipeIngredientsModel.create(data);

    /** Test the response back from the function */
    expect(typeof results).toBe('object');
    expect(results.success).toBe(false);
    expect(results.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should throw a generic error to hide library errors', async () => {

    /** Mock the DB responses */
    tracker.on.insert('recipe_ingredients').simulateError('Lost DB connection');

    /** Set the data to pass into the models function */
    const data = {
      recipeId: 1,
      ingredientId: 1,
      amount: 150,
      amount_type: 'grams'
    }

    /** Execute the function */
    const results = await recipeIngredientsModel.create(data);

    /** Test the response back from the function */
    expect(typeof results).toBe('object');
    expect(results.success).toBe(false);
    expect(results.message).toEqual('There was a problem with the resource, please try again later');

  });

});

describe('recipeIngredientsModel.remove', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {
    /* Initialize the tracker of the various commands */
    tracker = getTracker();
  });

  afterEach(() => {
    /* Reset the tracker */
    tracker.reset();
  })

  it('should remove the required data', async () => {

    /** Mock the DB responses */
    tracker.on.delete('recipe_ingredients').response(1);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await recipeIngredientsModel.remove(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toEqual('Recipe ingredient successfully removed');

  });

  it('should throw an error if required arguments are missing or invalid', async () => {


    /** Set the data to pass into the models function */
    const id = null;

    /** Execute the function */
    const result = await recipeIngredientsModel.remove(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return an empty array if no records found to remove', async () => {

    /** Mock the DB responses */
    tracker.on.delete('recipe_ingredients').response([]);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await recipeIngredientsModel.remove(id);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should throw a generic error to hide library errors', async () => {

    /** Mock the DB responses */
    tracker.on.delete('recipe_ingredients').simulateError('Lost DB connection');

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await recipeIngredientsModel.remove(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was a problem with the resource, please try again later');

  });

});

describe('recipeIngredientsModel.removeAllByRecipeId', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {
    /* Initialize the tracker of the various commands */
    tracker = getTracker();
  });

  afterEach(() => {
    /* Reset the tracker */
    tracker.reset();
  })

  it('should remove all ingredients for a recipe', async () => {

    /** Mock the DB responses */
    tracker.on.delete('recipe_ingredients').response(1);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await recipeIngredientsModel.removeAllByRecipeId(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toEqual('Recipe ingredient successfully removed');

  });

  it('should throw an error if required arguments are missing or invalid', async () => {

    /** Set the data to pass into the models function */
    const id = null;

    /** Execute the function */
    const result = await recipeIngredientsModel.removeAllByRecipeId(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return an empty array if no records found to remove', async () => {

    /** Mock the DB responses */
    tracker.on.delete('recipe_ingredients').response([]);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await recipeIngredientsModel.removeAllByRecipeId(id);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should throw a generic error to hide library errors', async () => {

    /** Mock the DB responses */
    tracker.on.delete('recipe_ingredients').simulateError('Lost DB connection');

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await recipeIngredientsModel.removeAllByRecipeId(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was a problem with the resource, please try again later');

  });

});

describe('recipeIngredientsModel.update', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {
    /* Initialize the tracker of the various commands */
    tracker = getTracker();
  });

  afterEach(() => {
    /* Reset the tracker */
    tracker.reset();
  })

  it('should update the specified record', async () => {

    /** Mock the DB responses */
    tracker.on.update('recipe_ingredients').response([{id : 1}]);

    /** Set the data to pass into the models function */
    const update = {
      id: 1,
      recipeId: 1,
      ingredientId: 1,
      amount: 150,
      amount_type: 'grams'
    };

    /** Execute the function */
    const result = await recipeIngredientsModel.update(update);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toEqual('Recipe ingredient successfully updated');


  });

  it('should throw an error if update object is missing or invalid', async () => {

    /** Set the data to pass into the models function */
    const update = null;

    /** Execute the function */
    const result = await recipeIngredientsModel.update(update);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should throw an error if update.id is missing or invalid', async () => {

    /** Set the data to pass into the models function */
    const update = {
      id: null,
      recipeId: 1,
      ingredientId: 1,
      amount: 150,
      amount_type: 'grams'
    };

    /** Execute the function */
    const result = await recipeIngredientsModel.update(update);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should throw an error if update.recipeId is missing or invalid', async () => {

    /** Set the data to pass into the models function */
    const update = {
      id: 1,
      recipeId: null,
      ingredientId: 1,
      amount: 150,
      amount_type: 'grams'
    };

    /** Execute the function */
    const result = await recipeIngredientsModel.update(update);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should throw an error if update.ingredientId is missing or invalid', async () => {

    /** Set the data to pass into the models function */
    const update = {
      id: 1,
      recipeId: 1,
      ingredientId: null,
      amount: 150,
      amount_type: 'grams'
    };

    /** Execute the function */
    const result = await recipeIngredientsModel.update(update);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should throw an error if update.amount is missing or invalid', async () => {

    /** Set the data to pass into the models function */
    const update = {
      id: 1,
      recipeId: 1,
      ingredientId: 1,
      amount: null,
      amount_type: 'grams'
    };

    /** Execute the function */
    const result = await recipeIngredientsModel.update(update);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should throw an error if update.amount_type is missing or invalid', async () => {

    /** Set the data to pass into the models function */
    const update = {
      id: 1,
      recipeId: 1,
      ingredientId: 1,
      amount: 150,
      amount_type: null
    };

    /** Execute the function */
    const result = await recipeIngredientsModel.update(update);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return an empty array of no records found to update', async () => {

    /** Mock the DB responses */
    tracker.on.update('recipe_ingredients').response([]);

    /** Set the data to pass into the models function */
    const update = {
      id: 1,
      recipeId: 1,
      ingredientId: 1,
      amount: 150,
      amount_type: 'grams'
    };

    /** Execute the function */
    const result = await recipeIngredientsModel.update(update);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should throw a generic error to hide library errors', async () => {

    /** Mock the DB responses */
    tracker.on.update('recipe_ingredients').simulateError('DB Connection lost');

    /** Set the data to pass into the models function */
    const update = {
      id: 1,
      recipeId: 1,
      ingredientId: 1,
      amount: 150,
      amount_type: 'grams'
    };

    /** Execute the function */
    const result = await recipeIngredientsModel.update(update);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was a problem with the resource, please try again later');

  });

});

describe('recipeIngredientsModel.findById', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {
    /* Initialize the tracker of the various commands */
    tracker = getTracker();
  });

  afterEach(() => {
    /* Reset the tracker */
    tracker.reset();
  })

  it('should find a record by the passed in id', async () => {

    /** Mock the DB responses */
    tracker.on.select('recipe_ingredients').response([{
      id: 1,
      recipeId: 1,
      ingredientId: 1,
      amount: 150,
      amount_type: 'grams'
    }]);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await recipeIngredientsModel.findById(id);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);

    expect(typeof result[0].id).toBe('number');
    expect(result[0].id).toBe(1);

    expect(typeof result[0].recipeId).toBe('number');
    expect(result[0].recipeId).toBe(1);

    expect(typeof result[0].ingredientId).toBe('number');
    expect(result[0].recipeId).toBe(1);

    expect(typeof result[0].amount).toBe('number');
    expect(result[0].amount).toBe(150);

    expect(typeof result[0].amount_type).toBe('string');
    expect(result[0].amount_type).toBe('grams');

  });

  it('should return an empty array if no records found', async () => {

    /** Mock the DB responses */
    tracker.on.select('recipe_ingredients').response([]);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await recipeIngredientsModel.findById(id);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should throw an error if the required arguments are missing or invalid', async () => {

    /** Set the data to pass into the models function */
    const id = null;

    /** Execute the function */
    const result = await recipeIngredientsModel.findById(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should throw a generic error to hide library errors', async () => {

    /** Mock the DB responses */
    tracker.on.select('recipe_ingredients').simulateError('DB connection lost');

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await recipeIngredientsModel.findById(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('There was a problem with the resource, please try again later');

  });

});

describe('recipeIngredientsModel.findByRecipeId', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {
    /* Initialize the tracker of the various commands */
    tracker = getTracker();
  });

  afterEach(() => {
    /* Reset the tracker */
    tracker.reset();
  })

  it('should return an array with the required records', async () => {

    /** Mock the DB responses */
    tracker.on.select('recipe_ingredients').response([{
      id: 1,
      recipeId: 1,
      ingredientId: 1,
      amount: 150,
      amount_type: 'grams'
    }]);

    /** Set the data to pass into the models function */
    const recipeId = 1;

    /** Execute the function */
    const results = await recipeIngredientsModel.findByRecipeId(recipeId);

    /** Test the response back from the function */
    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(1);

    expect(typeof results[0].id).toBe('number');
    expect(typeof results[0].recipeId).toBe('number');
    expect(typeof results[0].ingredientId).toBe('number');
    expect(typeof results[0].amount).toBe('number');
    expect(typeof results[0].amount_type).toBe('string');

    expect(results[0].id).toBe(1);
    expect(results[0].recipeId).toBe(1);
    expect(results[0].ingredientId).toBe(1);
    expect(results[0].amount).toBe(150);
    expect(results[0].amount_type).toBe('grams');

  });

  it('should return an empty array if no records found', async () => {

    /** Mock the DB responses */
    tracker.on.select('recipe_ingredients').response([]);

    /** Set the data to pass into the models function */
    const recipeId = 1;

    /** Execute the function */
    const results = await recipeIngredientsModel.findByRecipeId(recipeId);

    /** Test the response back from the function */
    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(0);

  });

  it('should throw an error if passed in value is missing or incorrect', async () => {

    /** Mock the DB responses */
    tracker.on.select('recipe_ingredients').response([]);

    /** Set the data to pass into the models function */
    const recipeId = null;

    /** Execute the function */
    const results = await recipeIngredientsModel.findByRecipeId(recipeId);

    /** Test the response back from the function */
    expect(typeof results).toBe('object');
    expect(results.success).toBe(false);
    expect(results.message).toBe('One or more required values are missing or incorrect');

  });

  it('should throw a generic error if library throws an error', async () => {

    /** Mock the DB responses */
    tracker.on.select('recipe_ingredients').simulateError('DB Connection Lost');

    /** Set the data to pass into the models function */
    const recipeId = 1;

    /** Execute the function */
    const results = await recipeIngredientsModel.findByRecipeId(recipeId);

    /** Test the response back from the function */
    expect(typeof results).toBe('object');
    expect(results.success).toBe(false);
    expect(results.message).toBe('There was a problem with the resource, please try again later');

  });

});

describe('recipeIngredientsModel.findByIngredient', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {
    /* Initialize the tracker of the various commands */
    tracker = getTracker();
  });

  afterEach(() => {
    /* Reset the tracker */
    tracker.reset();
  })

  it('should return an array with the required records', async () => {

    /** Mock the DB responses */
    tracker.on.select('recipe_ingredients').response([{
      id: 1,
      recipeId: 1,
      ingredientId: 1,
      amount: 150,
      amount_type: 'grams'
    }]);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const results = await recipeIngredientsModel.findByIngredient(id);

    /** Test the response back from the function */
    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(1);

    expect(typeof results[0].id).toBe('number');
    expect(typeof results[0].recipeId).toBe('number');
    expect(typeof results[0].ingredientId).toBe('number');
    expect(typeof results[0].amount).toBe('number');
    expect(typeof results[0].amount_type).toBe('string');

    expect(results[0].id).toBe(1);
    expect(results[0].recipeId).toBe(1);
    expect(results[0].ingredientId).toBe(1);
    expect(results[0].amount).toBe(150);
    expect(results[0].amount_type).toBe('grams');

  });

  it('should return an empty array if no records found', async () => {

    /** Mock the DB responses */
    tracker.on.select('recipe_ingredients').response([]);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const results = await recipeIngredientsModel.findByIngredient(id);

    /** Test the response back from the function */
    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(0);

  });

  it('should throw an error if passed in value is missing or incorrect', async () => {

    /** Mock the DB responses */
    tracker.on.select('recipe_ingredients').response([]);

    /** Set the data to pass into the models function */
    const id = null;

    /** Execute the function */
    const results = await recipeIngredientsModel.findByRecipeId(id);

    /** Test the response back from the function */
    expect(typeof results).toBe('object');
    expect(results.success).toBe(false);
    expect(results.message).toBe(messageHelper.ERROR_MISSING_VALUES);

  });

  it('should throw a generic error if library throws an error', async () => {

    /** Mock the DB responses */
    tracker.on.select('recipe_ingredients').simulateError(messageHelper.ERROR_SIMULATE);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const results = await recipeIngredientsModel.findByIngredient(id);

    /** Test the response back from the function */
    expect(typeof results).toBe('object');
    expect(results.success).toBe(false);
    expect(results.message).toBe(messageHelper.ERROR_GENERIC_RESOURCE);

  });

});

describe('recipeIngredientsModel.findAll', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {
    /* Initialize the tracker of the various commands */
    tracker = getTracker();
  });

  afterEach(() => {
    /* Reset the tracker */
    tracker.reset();
  })

  it('should return all records found', async () => {

    /** Mock the DB responses */
    tracker.on.select('recipe_ingredients').response([
      {
        id: 1,
        recipeId: 1,
        ingredientId: 1,
        amount: 150,
        amount_type: 'grams'
      },
      {
        id: 2,
        recipeId: 2,
        ingredientId: 2,
        amount: 4,
        amount_type: 'medium sized'
      }
  ]);

    /** Execute the function */
    const results = await recipeIngredientsModel.findAll();

    /** Test the response back from the function */
    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(2);

    expect(typeof results[0].id).toBe('number');
    expect(typeof results[0].recipeId).toBe('number');
    expect(typeof results[0].ingredientId).toBe('number');
    expect(typeof results[0].amount).toBe('number');
    expect(typeof results[0].amount_type).toBe('string');

    expect(typeof results[1].id).toBe('number');
    expect(typeof results[1].recipeId).toBe('number');
    expect(typeof results[1].ingredientId).toBe('number');
    expect(typeof results[1].amount).toBe('number');
    expect(typeof results[1].amount_type).toBe('string');

    expect(results[0].id).toBe(1);
    expect(results[0].recipeId).toBe(1);
    expect(results[0].ingredientId).toBe(1);
    expect(results[0].amount).toBe(150);
    expect(results[0].amount_type).toBe('grams');

    expect(results[1].id).toBe(2);
    expect(results[1].recipeId).toBe(2);
    expect(results[1].ingredientId).toBe(2);
    expect(results[1].amount).toBe(4);
    expect(results[1].amount_type).toBe('medium sized');

  });

  it('should return an empty array if no records found', async () => {

    /** Mock the DB responses */
    tracker.on.select('recipe_ingredients').response([]);

    /** Execute the function */
    const results = await recipeIngredientsModel.findAll();

    /** Test the response back from the function */
    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(0);

  });

  it('should throw a generic error if the underlying libraries throw an error', async () => {

    /** Mock the DB responses */
    tracker.on.select('recipe_ingredients').simulateError('DB Connection lost');

    /** Execute the function */
    const results = await recipeIngredientsModel.findAll();

    /** Test the response back from the function */
    expect(typeof results).toBe('object');
    expect(results.success).toBe(false);
    expect(results.message).toBe('There was a problem with the resource, please try again later');

  });

});

xdescribe('<model>Model.<method>', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {
    /* Initialize the tracker of the various commands */
    tracker = getTracker();
  });

  afterEach(() => {
    /* Reset the tracker */
    tracker.reset();
  })

  it('should ...', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

  });

});
