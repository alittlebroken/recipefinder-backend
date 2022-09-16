/*
 * Packages needed for scripts
 */
const knex = require('knex');
const db = require('../database');
const cookbookRecipesModel = require('../models/cookbookRecipesModel');
const { getTracker, Tracker } = require('knex-mock-client');

/* Mock the DB library */
jest.mock('../database', () => {
  const knex = require('knex');
  const { MockClient } = require('knex-mock-client');
  return knex({ client: MockClient })
});

/* Tracker for the SQL commands */
let tracker;

describe('cookbookRecipesModel.create', () => {

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
    tracker.on.insert('cookbook_recipes').response([{id: 1234}]);

    /** Set the data to pass into the models function */
    const newRecord = {
      cookbookId: 1,
      recipeId: 1
    };

    /** Execute the function */
    const result = await cookbookRecipesModel.create(newRecord);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toBe('Record created successfully');

  });

  it('should error if object argument is missing or incorrect', async () => {

    /** Set the data to pass into the models function */
    const newRecord = null;

    /** Execute the function */
    const result = await cookbookRecipesModel.create(newRecord);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should error if object argument value cookbookId is missing or incorrect', async () => {

    /** Set the data to pass into the models function */
    const newRecord = {
      cookbookId: null,
      recipeId: 1
    };

    /** Execute the function */
    const result = await cookbookRecipesModel.create(newRecord);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should error if object argument value recipeId is missing or incorrect', async () => {

    /** Set the data to pass into the models function */
    const newRecord = {
      cookbookId: 1,
      recipeId: null
    };

    /** Execute the function */
    const result = await cookbookRecipesModel.create(newRecord);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should throw a generic error if any third party libraries generate an error', async () => {

    /** Mock the DB responses */
    tracker.on.insert('cookbook_recipes').simulateError('Lost connection to DB');

    /** Set the data to pass into the models function */
    const newRecord = {
      cookbookId: 1,
      recipeId: 1
    };

    /** Execute the function */
    const result = await cookbookRecipesModel.create(newRecord);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('There was a problem with the resource, please try again later');

  });

});

describe('cookbookRecipesModel.remove', () => {

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

  it('should remove the specified entry', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbook_recipes').response(1);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await cookbookRecipesModel.remove(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toBe('Recipe removed from cookbook successfully');

  });

  it('should return an empty array if no records to remove ', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbook_recipes').response([]);

    /** Set the data to pass into the models function */
    const id = 1234;

    /** Execute the function */
    const result = await cookbookRecipesModel.remove(id);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should error if required values are missing or incorrect', async () => {

    /** Set the data to pass into the models function */
    const id = null;

    /** Execute the function */
    const result = await cookbookRecipesModel.remove(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should throw a generic error if any third party libraries generate an error', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbook_recipes').simulateError('Lost DB Connection');

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await cookbookRecipesModel.remove(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('There was a problem with the resource, please try again later');

  });

});

describe('cookbookRecipesModel.removeByCookbook', () => {

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

  it('should remove all entries for a specified cookbook', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbook_recipes').response([1]);

    /** Set the data to pass into the models function */
    const cookbookId = 1;

    /** Execute the function */
    const result = await cookbookRecipesModel.removeByCookbook(cookbookId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toBe('Cookbook recipes removed successfully');

  });

  it('should return a message if no records to remove ', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbook_recipes').response([]);

    /** Set the data to pass into the models function */
    const cookbookId = 1;

    /** Execute the function */
    const result = await cookbookRecipesModel.removeByCookbook(cookbookId);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should error if required values are missing or incorrect', async () => {

    /** Set the data to pass into the models function */
    const cookbookId = null;

    /** Execute the function */
    const result = await cookbookRecipesModel.removeByCookbook(cookbookId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should throw a generic error if any third party libraries generate an error', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbook_recipes').simulateError('Lost connection to DB');

    /** Set the data to pass into the models function */
    const cookbookId = 1;

    /** Execute the function */
    const result = await cookbookRecipesModel.removeByCookbook(cookbookId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('There was a problem with the resource, please try again later');

  });

});

describe('cookbookRecipesModel.removeByRecipe', () => {

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

  it('should remove all entries for a specified recipe', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbook_recipes').response([1]);

    /** Set the data to pass into the models function */
    const recipeId = 1;

    /** Execute the function */
    const result = await cookbookRecipesModel.removeByRecipe(recipeId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toBe('Recipe removed from all cookbooks successfully');

  });

  it('should return a message if no records to remove ', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbook_recipes').response([]);

    /** Set the data to pass into the models function */
    const recipeId = 1;

    /** Execute the function */
    const result = await cookbookRecipesModel.removeByRecipe(recipeId);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should error if required values are missing or incorrect', async () => {

    /** Set the data to pass into the models function */
    const recipeId = null;

    /** Execute the function */
    const result = await cookbookRecipesModel.removeByRecipe(recipeId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should throw a generic error if any third party libraries generate an error', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbook_recipes').simulateError('Lost connection to DB');

    /** Set the data to pass into the models function */
    const recipeId = 1;

    /** Execute the function */
    const result = await cookbookRecipesModel.removeByRecipe(recipeId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('There was a problem with the resource, please try again later');

  });

});

describe('cookbookRecipesModel.update', () => {

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
    tracker.on.update('cookbook_recipes').response([{id: 1}]);

    /** Set the data to pass into the models function */
    const data = {
      id: 1,
      cookbookId: 1,
      recipeId: 3
    };

    /** Execute the function */
    const result = await cookbookRecipesModel.update(data);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toBe('Cookbook recipe updated successfully');

  });

  it('should error if required object is missing or incorrect', async () => {

    /** Set the data to pass into the models function */
    const data = null;

    /** Execute the function */
    const result = await cookbookRecipesModel.update(data);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should error if required object id is missing or incorrect', async () => {

    /** Set the data to pass into the models function */
    const data = {
      id: null,
      cookbookId: 1,
      recipeId: 3
    };

    /** Execute the function */
    const result = await cookbookRecipesModel.update(data);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should error if required object cookbookId is missing or incorrect', async () => {

    /** Set the data to pass into the models function */
    const data = {
      id: 1,
      cookbookId: null,
      recipeId: 3
    };

    /** Execute the function */
    const result = await cookbookRecipesModel.update(data);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should error if required object recipeId is missing or incorrect', async () => {

    /** Mock the DB responses */
    tracker.on.update('cookbook_recipes').response([{id : 1}]);

    /** Set the data to pass into the models function */
    const data = {
      id: 1,
      cookbookId: 1,
      recipeId: null
    };

    /** Execute the function */
    const result = await cookbookRecipesModel.update(data);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should return a generic error if any thrid party library generates and error', async () => {

    /** Mock the DB responses */
    tracker.on.update('cookbook_recipes').simulateError('Lost connection to DB');

    /** Set the data to pass into the models function */
    const data = {
      id: 1,
      cookbookId: 1,
      recipeId: 3
    };

    /** Execute the function */
    const result = await cookbookRecipesModel.update(data);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('There was a problem with the resource, please try again later');

  });

});

describe('cookbookRecipesModel.findByCookbook', () => {

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

  it('should find all entries that match the passed in cookbook id', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbook_recipes').response([{
      id: 1,
      cookbookId: 1,
      recipeId: 3
    }]);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await cookbookRecipesModel.findByCookbook(id);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);

    expect(typeof result[0].id).toBe('number');
    expect(typeof result[0].cookbookId).toBe('number');
    expect(typeof result[0].recipeId).toBe('number');

    expect(result[0].id).toBe(1);
    expect(result[0].cookbookId).toBe(1);
    expect(result[0].recipeId).toBe(3);

  });

  it('should return an empty array if no entries found', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbook_recipes').response([]);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await cookbookRecipesModel.findByCookbook(id);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should error if the required arguments are missing or incorrect', async () => {

    /** Set the data to pass into the models function */
    const id = null;

    /** Execute the function */
    const result = await cookbookRecipesModel.findByCookbook(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should return a generic error if any third party libraries produce an error', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbook_recipes').simulateError('Lost connection to DB');

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await cookbookRecipesModel.findByCookbook(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('There was a problem with the resource, please try again later');

  });

});

describe('cookbookRecipesModel.findByRecipe', () => {

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

  it('should find all entries that match the passed in recipe id', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbook_recipes').response([{
      id: 1,
      cookbookId: 1,
      recipeId: 3
    }]);

    /** Set the data to pass into the models function */
    const id = 3;

    /** Execute the function */
    const result = await cookbookRecipesModel.findByRecipe(id);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);

    expect(typeof result[0].id).toBe('number');
    expect(typeof result[0].cookbookId).toBe('number');
    expect(typeof result[0].recipeId).toBe('number');

    expect(result[0].id).toBe(1);
    expect(result[0].cookbookId).toBe(1);
    expect(result[0].recipeId).toBe(3);

  });

  it('should return an empty array if no entries found', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbook_recipes').response([]);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await cookbookRecipesModel.findByRecipe(id);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should error if the required arguments are missing or incorrect', async () => {

    /** Set the data to pass into the models function */
    const id = null;

    /** Execute the function */
    const result = await cookbookRecipesModel.findByRecipe(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should return a generic error if any third party libraries produce an error', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbook_recipes').simulateError('Lost connection to DB');

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await cookbookRecipesModel.findByRecipe(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('There was a problem with the resource, please try again later');

  });

});

describe('cookbookRecipesModel.findAll', () => {

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

  it('should return all entries', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbook_recipes').response([{
      id: 1,
      cookbookId: 1,
      recipeId: 3
    }]);


    /** Execute the function */
    const results = await cookbookRecipesModel.findAll();

    /** Test the response back from the function */
    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(1);

    expect(typeof results[0].id).toBe('number');
    expect(typeof results[0].cookbookId).toBe('number');
    expect(typeof results[0].recipeId).toBe('number');

    expect(results[0].id).toBe(1);
    expect(results[0].cookbookId).toBe(1);
    expect(results[0].recipeId).toBe(3);

  });

  it('should return an empty array if no records found', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbook_recipes').response([]);

    /** Execute the function */
    const results = await cookbookRecipesModel.findAll();

    /** Test the response back from the function */
    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(0);

  });

  it('should return a generic error if any third party libraries produce an error', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbook_recipes').simulateError('Lost connection to DB');


    /** Execute the function */
    const results = await cookbookRecipesModel.findAll();

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
