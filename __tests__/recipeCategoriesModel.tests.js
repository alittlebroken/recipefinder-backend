/*
 * Packages needed for scripts
 */
const knex = require('knex');
const db = require('../database');
const recipeCategoriesModel = require('../models/recipeCategoriesModel');
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

describe('recipeCategoriesModel.create', () => {

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

  it('should create a new entry', async () => {

    /** Mock the DB responses */
    tracker.on.insert('recipe_categories').response([{id: 1}]);

    /** Set the data to pass into the models function */
    const newRecord = {
      recipeId: 1,
      categoryId: 1
    };

    /** Execute the function */
    const result = await recipeCategoriesModel.create(newRecord);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toBe('Category successfully added to Recipe');

  });

  it('should error if the required object argument is missing or incorrect', async () => {

    /** Mock the DB responses */
    tracker.on.insert('recipe_categories').response([{id: 1}]);

    /** Set the data to pass into the models function */
    const newRecord = null;

    /** Execute the function */
    const result = await recipeCategoriesModel.create(newRecord);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should error if the required object recipeId argument is missing or incorrect', async () => {

    /** Mock the DB responses */
    tracker.on.insert('recipe_categories').response([{id: 1}]);

    /** Set the data to pass into the models function */
    const newRecord = {
      recipeId: null,
      categoryId: 1
    };

    /** Execute the function */
    const result = await recipeCategoriesModel.create(newRecord);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should error if the required object categoryId argument is missing or incorrect', async () => {

    /** Mock the DB responses */
    tracker.on.insert('recipe_categories').response([{id: 1}]);

    /** Set the data to pass into the models function */
    const newRecord = {
      recipeId: 1,
      categoryId: null
    };

    /** Execute the function */
    const result = await recipeCategoriesModel.create(newRecord);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should return a generic error if a third party library produces an error', async () => {

    /** Mock the DB responses */
    tracker.on.insert('recipe_categories').simulateError('Lost DB connection');

    /** Set the data to pass into the models function */
    const newRecord = {
      recipeId: 1,
      categoryId: 1
    };

    /** Execute the function */
    const result = await recipeCategoriesModel.create(newRecord);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('There was a problem with the resource, please try again later');

  });

});

describe('recipeCategoriesModel.update', () => {

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

  it('should update the desired entry in the database', async () => {

    /** Mock the DB responses */
    tracker.on.update('recipe_categories').response([{id: 1}]);

    /** Set the data to pass into the models function */
    const updatedRecord = {
      id: 1,
      recipeId: 1,
      categoryId: 3
    };

    /** Execute the function */
    const result = await recipeCategoriesModel.update(updatedRecord);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toBe('Recipe category successfully updated');

  });

  it('should return an empty array if no records found to update', async () => {

    /** Mock the DB responses */
    tracker.on.update('recipe_categories').response([]);

    /** Set the data to pass into the models function */
    const updatedRecord = {
      id: 1,
      recipeId: 1234,
      categoryId: 1
    };

    /** Execute the function */
    const result = await recipeCategoriesModel.update(updatedRecord);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should return an error if the required object argument is missing or incorrect', async () => {

    /** Set the data to pass into the models function */
    const updatedRecord = null;

    /** Execute the function */
    const result = await recipeCategoriesModel.update(updatedRecord);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should return an error if the required objects id is missing or incorrect', async () => {

    /** Set the data to pass into the models function */
    const updatedRecord = {
      id: null,
      recipeId: 1234,
      categoryId: 1
    };

    /** Execute the function */
    const result = await recipeCategoriesModel.update(updatedRecord);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should return an error if the required objects cookbookId is missing or incorrect', async () => {

    /** Set the data to pass into the models function */
    const updatedRecord = {
      id: 1,
      recipeId: 1234,
      categoryId: null
    };

    /** Execute the function */
    const result = await recipeCategoriesModel.update(updatedRecord);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should return an error if the required objects recipeId is missing or incorrect', async () => {

    /** Set the data to pass into the models function */
    const updatedRecord = {
      id: 1,
      recipeId: null,
      categoryId: 1
    };

    /** Execute the function */
    const result = await recipeCategoriesModel.update(updatedRecord);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should return a generic error if a third party library produces an error', async () => {

    /** Mock the DB responses */
    tracker.on.update('recipe_categories').simulateError('Lost DB Connection');

    /** Set the data to pass into the models function */
    const updatedRecord = {
      id: 1,
      recipeId: 1234,
      categoryId: 1
    };

    /** Execute the function */
    const result = await recipeCategoriesModel.update(updatedRecord);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('There was a problem with the resource, please try again later');

  });

});

describe('recipeCategoriesModel.removeByRecipe', () => {

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

  it('should remove an entry by recipe id', async () => {

    /** Mock the DB responses */
    tracker.on.delete('recipe_categories').response(1);

    /** Set the data to pass into the models function */
    const recipeId = 1;

    /** Execute the function */
    const result = await recipeCategoriesModel.removeByRecipe(recipeId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toBe('All recipe categories have been removed successfully');

  });

  it('should return an empty array if no records found to be removed', async () => {

    /** Mock the DB responses */
    tracker.on.delete('recipe_categories').response([]);

    /** Set the data to pass into the models function */
    const recipeId = 12;

    /** Execute the function */
    const result = await recipeCategoriesModel.removeByRecipe(recipeId);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should return an error if one or more required arguments are missing or incorrect', async () => {

    /** Set the data to pass into the models function */
    const recipeId = null;

    /** Execute the function */
    const result = await recipeCategoriesModel.removeByRecipe(recipeId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should return a generic error if a third party library produces an error', async () => {

    /** Mock the DB responses */
    tracker.on.delete('recipe_categories').simulateError('Lost DB connection');

    /** Set the data to pass into the models function */
    const recipeId = 1;

    /** Execute the function */
    const result = await recipeCategoriesModel.removeByRecipe(recipeId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('There was a problem with the resource, please try again later');

  });

});

describe('recipeCategoriesModel.removeByCategory', () => {

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

  it('should remove all records matching the passed in category', async () => {

    /** Mock the DB responses */
    tracker.on.delete('recipe_categories').response(1);

    /** Set the data to pass into the models function */
    const categoryId = 1;

    /** Execute the function */
    const result = await recipeCategoriesModel.removeByCategory(categoryId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toBe('All matching categories that belong to recipes have been removed successfully');

  });

  it('should return an empty array if no records found to be removed', async () => {

    /** Mock the DB responses */
    tracker.on.delete('recipe_categories').response([]);

    /** Set the data to pass into the models function */
    const categoryId = 1094635;

    /** Execute the function */
    const result = await recipeCategoriesModel.removeByCategory(categoryId);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should return an error if the required arguments are missing or incorrect', async () => {

    /** Set the data to pass into the models function */
    const categoryId = null;

    /** Execute the function */
    const result = await recipeCategoriesModel.removeByCategory(categoryId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should return a generic error if a third party library produces an error', async () => {

    /** Mock the DB responses */
    tracker.on.delete('recipe_categories').simulateError('Lost DB connection');

    /** Set the data to pass into the models function */
    const categoryId = 1;

    /** Execute the function */
    const result = await recipeCategoriesModel.removeByCategory(categoryId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('There was a problem with the resource, please try again later');

  });

});

describe('recipeCategoriesModel.removeAll', () => {

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

  it('should remove all records', async () => {

    /** Mock the DB responses */
    tracker.on.delete('recipe_categories').response(12);

    /** Execute the function */
    const result = await recipeCategoriesModel.removeAll();

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toBe('All entries have been removed successfully');

  });

  it('should return an error if no entries to to be removed', async () => {

    /** Mock the DB responses */
    tracker.on.delete('recipe_categories').response([]);

    /** Execute the function */
    const result = await recipeCategoriesModel.removeAll();

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should return a generic error if a third party library produces an error', async () => {

    /** Mock the DB responses */
    tracker.on.delete('recipe_categories').simulateError('Lost connection to DB');

    /** Execute the function */
    const result = await recipeCategoriesModel.removeAll();

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('There was a problem with the resource, please try again later');

  });

});

describe('recipeCategoriesModel.findAll', () => {

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

  it('should find all required entries', async () => {

    /** Mock the DB responses */
    tracker.on.select('recipe_categories').response([
      {
        id: 1,
        recipeId: 1,
        categoryId: 1
      }
    ])

    /** Execute the function */
    const results = await recipeCategoriesModel.findAll();

    /** Test the response back from the function */
    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(1);

    expect(typeof results[0].id).toBe('number');
    expect(results[0].id).toBe(1);

    expect(typeof results[0].recipeId).toBe('number');
    expect(results[0].recipeId).toBe(1);

    expect(typeof results[0].categoryId).toBe('number');
    expect(results[0].categoryId).toBe(1);


  });

  it('should return an empty array if no records are to be found', async () => {

    /** Mock the DB responses */
    tracker.on.select('recipe_categories').response([]);

    /** Execute the function */
    const results = await recipeCategoriesModel.findAll();

    /** Test the response back from the function */
    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(0);

  });

  it('should return a generic error if a third party library produces an error', async () => {

    /** Mock the DB responses */
    tracker.on.select('recipe_categories').simulateError('Lost connection to DB');

    /** Execute the function */
    const results = await recipeCategoriesModel.findAll();

    /** Test the response back from the function */
    expect(typeof results).toBe('object');
    expect(results.success).toBe(false);
    expect(results.message).toBe('There was a problem with the resource, please try again later');

  });

});

describe('recipeCategoriesModel.findByRecipe', () => {

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

  it('should find all entries matching the passed in recipe id', async () => {

    /** Mock the DB responses */
    tracker.on.select('recipe_categories').response([
      {
        id: 1,
        recipeId: 1,
        categoryId: 1
      }
    ])

    /** Set the data to pass into the models function */
    const recipeId = 1;

    /** Execute the function */
    const results = await recipeCategoriesModel.findByRecipe(recipeId);

    /** Test the response back from the function */
    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(1);

    expect(typeof results[0].id).toBe('number');
    expect(typeof results[0].recipeId).toBe('number');
    expect(typeof results[0].categoryId).toBe('number');

    expect(results[0].id).toBe(1);
    expect(results[0].recipeId).toBe(1);
    expect(results[0].categoryId).toBe(1);

  });

  it('should return an empty array if no records found', async () => {

    /** Mock the DB responses */
    tracker.on.select('recipe_categories').response([]);

    /** Set the data to pass into the models function */
    const recipeId = 1;

    /** Execute the function */
    const results = await recipeCategoriesModel.findByRecipe(recipeId);

    /** Test the response back from the function */
    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(0);

  });

  it('should return an error if one or more required arguments are missing or incorrect', async () => {

    /** Set the data to pass into the models function */
    const recipeId = null;

    /** Execute the function */
    const results = await recipeCategoriesModel.findByRecipe(recipeId);

    /** Test the response back from the function */
    expect(typeof results).toBe('object');
    expect(results.success).toBe(false);
    expect(results.message).toBe('One or more required values are missing or incorrect');

  });

  it('should return a generic error if a third party library produces an error', async () => {

    /** Mock the DB responses */
    tracker.on.select('recipe_categories').simulateError('Lost connection to DB');

    /** Set the data to pass into the models function */
    const recipeId = 1;

    /** Execute the function */
    const results = await recipeCategoriesModel.findByRecipe(recipeId);

    /** Test the response back from the function */
    expect(typeof results).toBe('object');
    expect(results.success).toBe(false);
    expect(results.message).toBe('There was a problem with the resource, please try again later');

  });

});

describe('recipeCategoriesModel.findByCategory', () => {

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

  it('should find all entries matching the passed in category id', async () => {

    /** Mock the DB responses */
    tracker.on.select('recipe_categories').response([
      {
        id: 1,
        recipeId: 1,
        categoryId: 1
      }
    ])

    /** Set the data to pass into the models function */
    const categoryId = 1;

    /** Execute the function */
    const results = await recipeCategoriesModel.findByCategory(categoryId);

    /** Test the response back from the function */
    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(1);

    expect(typeof results[0].id).toBe('number');
    expect(typeof results[0].recipeId).toBe('number');
    expect(typeof results[0].categoryId).toBe('number');

    expect(results[0].id).toBe(1);
    expect(results[0].recipeId).toBe(1);
    expect(results[0].categoryId).toBe(1);

  });

  it('should return an empty array if there are no records to be found', async () => {

    /** Mock the DB responses */
    tracker.on.select('recipe_categories').response([])

    /** Set the data to pass into the models function */
    const categoryId = 1;

    /** Execute the function */
    const results = await recipeCategoriesModel.findByCategory(categoryId);

    /** Test the response back from the function */
    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(0);


  });

  it('should return an error if one or more arguments are missing or incorrect', async () => {

    /** Set the data to pass into the models function */
    const categoryId = null;

    /** Execute the function */
    const results = await recipeCategoriesModel.findByCategory(categoryId);

    /** Test the response back from the function */
    expect(typeof results).toBe('object');
    expect(results.success).toBe(false);
    expect(results.message).toBe('One or more required values are missing or incorrect');

  });

  it('should return a generic error if a third party library produces an error', async () => {

    /** Mock the DB responses */
    tracker.on.select('recipe_categories').simulateError('Lost DB Connection');

    /** Set the data to pass into the models function */
    const categoryId = 1;

    /** Execute the function */
    const results = await recipeCategoriesModel.findByCategory(categoryId);

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
