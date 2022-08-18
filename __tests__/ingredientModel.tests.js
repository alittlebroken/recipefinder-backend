/*
 * Packages needed for scripts
 */
const knex = require('knex');
const db = require('../database');
const ingredientModel = require('../models/ingredientModel');
const { getTracker, Tracker } = require('knex-mock-client');

/* Mock the DB library */
jest.mock('../database', () => {
  const knex = require('knex');
  const { MockClient } = require('knex-mock-client');
  return knex({ client: MockClient })
});

/* Tracker for the SQL commands */
let tracker;

describe('ingredientModel.create', () => {

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

  it('should create the ingredient', async () => {

    /** Mock the DB responses */
    tracker.on.insert('ingredients').response([{id: 1}]);

    /** Set the data to pass into the models function */
    const name  = 'Gluten free flour';

    /** Execute the function */
    const result = await ingredientModel.create(name);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);
    expect(result[0].id).toEqual(1);

  });

  it('should return an empty array if unable to add new ingredient', async () => {

    /** Mock the DB responses */
    tracker.on.insert('ingredients').response([]);

    /** Set the data to pass into the models function */
    const name = 'Carrot';

    /** Execute the function */
    const result = await ingredientModel.create(name);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should produce an error if passed in arguments are missing or inavlid', async () => {

    /** Mock the DB responses */
    tracker.on.insert('ingredients').response([]);

    /** Set the data to pass into the models function */
    const name = null;

    /** Execute the function */
    const result = await ingredientModel.create(name);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return a generic error to hide library errors', async () => {

    /** Mock the DB responses */
    tracker.on.insert('ingredients').simulateError('Lost connection to the database');

    /** Set the data to pass into the models function */
    const name = 'Gluten free flour';

    /** Execute the function */
    const result = await ingredientModel.create(name);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was a problem with the resource, please try again later');

  });

});

describe('ingredientModel.remove', () => {

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

  it('should remove the ingredient', async () => {

    /** Mock the DB responses */
    tracker.on.delete('ingredient').response([ { id: 1 } ]);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await ingredientModel.remove(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toEqual('Ingredient successfully removed');

  });

  it('should throw an error if passed in arguments are missing or incorrect', async () => {

    /** Mock the DB responses */
    tracker.on.delete('ingredients').response([]);

    /** Set the data to pass into the models function */
    const id = null;

    /** Execute the function */
    const result = await ingredientModel.remove(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should throw a generic error to hide library errors', async () => {

    /** Mock the DB responses */
    tracker.on.delete('ingredients').simulateError('Lost connection to the database');

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await ingredientModel.remove(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was a problem with the resource, please try again later');

  });

});

describe('ingredientModel.update', () => {

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

  it('should update the ingredient', async () => {

    /** Mock the DB responses */
    tracker.on.update('ingredients').response([ { id: 1 } ]);

    /** Set the data to pass into the models function */
    const id = 1;
    const name = 'Vegan Cheese';

    /** Execute the function */
    const result = await ingredientModel.update(id, name);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toEqual('Ingredient successfully updated');

  });

  it('should throw an error if one or more required arguments are missing or invalid', async () => {

    /** Mock the DB responses */
    tracker.on.update('ingredients').response([ { id: 1 } ]);

    /** Set the data to pass into the models function */
    const id = null;
    const name = 'Vegan Cheese';

    /** Execute the function */
    const result = await ingredientModel.update(id, name);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should throw a generic error to hide library errors', async () => {

    /** Mock the DB responses */
    tracker.on.update('ingredients').simulateError('Lost connection to the database');

    /** Set the data to pass into the models function */
    const id = 1;
    const name = 'Vegan Cheese';

    /** Execute the function */
    const result = await ingredientModel.update(id, name);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was a problem with the resource, please try again later');

  });

});

describe('ingredientModel.findOne', () => {

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

  it('should find the specified ingredient', async () => {

    /** Mock the DB responses */
    tracker.on.select('ingredients').response([ { id: 1, name: 'Vegan Cheese' }]);

    /** Set the data to pass into the models function */
    const term = 'Vegan Cheese';

    /** Execute the function */
    const result = await ingredientModel.findOne(term);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
    expect(result[0].name).toEqual('Vegan Cheese');

  });

  it('should return an empty array if no ingredients found', async () => {

    /** Mock the DB responses */
    tracker.on.select('ingredients').response([]);

    /** Set the data to pass into the models function */
    const term = 'Vegan Cheese';

    /** Execute the function */
    const result = await ingredientModel.findOne(term);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should throw an error if one or more required values are missing or incorrect', async () => {

    /** Mock the DB responses */
    tracker.on.select('ingredients').response([ { id: 1, name: 'Vegan Cheese' }]);

    /** Set the data to pass into the models function */
    const term = null;

    /** Execute the function */
    const result = await ingredientModel.findOne(term);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should throw a generic error to hide library errors', async () => {

    /** Mock the DB responses */
    tracker.on.select('ingredients').simulateError('Lost connection to database');

    /** Set the data to pass into the models function */
    const term = 'Vegan Cheese';

    /** Execute the function */
    const result = await ingredientModel.findOne(term);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was a problem with the resource, please try again later');

  });

});

describe('ingredientModel.findAll', () => {

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

  it('should find the specified matching ingredients', async () => {

    /** Mock the DB responses */
    tracker.on.select('ingredients').response([
      { id: 1, name: 'Vegan Cheese'},
      { id: 2, name: 'Vegan Oat Milk'},
      { id: 3, name: 'Vegan Puff Pastry'}
    ]);

    /** Set the data to pass into the models function */
    const term = 'vegan';

    /** Execute the function */
    const result = await ingredientModel.findAll(term);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(3);

    /* Check the data returned */
    expect(typeof result[0].id).toBe('number');
    expect(result[0].id).toBe(1);
    expect(typeof result[0].name).toBe('string');
    expect(result[0].name).toEqual('Vegan Cheese');

    expect(typeof result[1].id).toBe('number');
    expect(result[1].id).toBe(2);
    expect(typeof result[1].name).toBe('string');
    expect(result[1].name).toEqual('Vegan Oat Milk');

    expect(typeof result[2].id).toBe('number');
    expect(result[2].id).toBe(3);
    expect(typeof result[2].name).toBe('string');
    expect(result[2].name).toEqual('Vegan Puff Pastry');

  });

  it('should return an empty array if no ingredients found', async () => {

    /** Mock the DB responses */
    tracker.on.select('ingredients').response([]);

    /** Set the data to pass into the models function */
    const term = 'vegon';

    /** Execute the function */
    const result = await ingredientModel.findAll(term);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should throw an error if one or more required values are missing or incorrect', async () => {

    /** Mock the DB responses */
    tracker.on.select('ingredients').response([
      { id: 1, name: 'Vegan Cheese'},
      { id: 2, name: 'Vegan Oat Milk'},
      { id: 3, name: 'Vegan Puff Pastry'}
    ]);

    /** Set the data to pass into the models function */
    const term = null;

    /** Execute the function */
    const result = await ingredientModel.findAll(term);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should throw a generic error to hide library errors', async () => {

    /** Mock the DB responses */
    tracker.on.select('ingredients').simulateError('Lost connection to the database');

    /** Set the data to pass into the models function */
    const term = 'vegan';

    /** Execute the function */
    const result = await ingredientModel.findAll(term);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was a problem with the resource, please try again later');

  });

});
