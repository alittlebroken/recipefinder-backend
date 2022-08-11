/*
 * Packages needed for scripts
 */
const knex = require('knex');
const db = require('../database');
const categoryModel = require('../models/categoryModel');
const { getTracker, Tracker } = require('knex-mock-client');

/* Mock the DB library */
jest.mock('../database', () => {
  const knex = require('knex');
  const { MockClient } = require('knex-mock-client');
  return knex({ client: MockClient })
});

/* Tracker for the SQL commands */
let tracker;

describe('categoryModel.create', () => {

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

  it('should create a new category', async () => {

    /** Mock the DB responses */
    tracker.on.insert('categories').response([{id: 1}]);

    /** Set the data to pass into the models function */
    const name = 'Vegan';

    /** Execute the function */
    const result = await categoryModel.create(name);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toEqual('Category successfully created');

  });

  it('should return an error if one or more required arguments are missing', async () => {

    /** Mock the DB responses */
    tracker.on.insert('categories').response([]);

    /** Set the data to pass into the models function */
    const name = null;

    /** Execute the function */
    const result = await categoryModel.create(name);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required arguments are missing or invalid');

  });

  it('should return a generic error to hide library errors', async () => {

    /** Mock the DB responses */
    tracker.on.insert('categories').simulateError('Lost connection to database');

    /** Set the data to pass into the models function */
    const name = 'Gluten Free';

    /** Execute the function */
    const result = await categoryModel.create(name);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was a problem with the resource, please try again later');
  });

});

describe('categoryModel.remove', () => {

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

  it('should remove a category', async () => {

    /** Mock the DB responses */
    tracker.on.delete('categories').response([{id: 1}]);

    /** Set the data to pass into the models function */
    const categoryId = 1;

    /** Execute the function */
    const result = await categoryModel.remove(categoryId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toEqual('Category successfully removed');

  });

  it('should return an error if required arguments are missing or invalid', async () => {

    /** Mock the DB responses */
    tracker.on.delete('categories').response([{ id: 1}]);

    /** Set the data to pass into the models function */
    const categoryId = null;

    /** Execute the function */
    const result = await categoryModel.remove(categoryId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required arguments are missing or invalid');

  });

  it('should should return a generic error to hide library errors', async () => {

    /** Mock the DB responses */
    tracker.on.delete('categories').simulateError('Lost connection to database');

    /** Set the data to pass into the models function */
    const categoryId = 1;

    /** Execute the function */
    const result = await categoryModel.remove(categoryId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was a problem with the resource, please try again later');

  });

});

describe('categoryModel.update', () => {

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

  it('should update a category', async () => {

    /** Mock the DB responses */
    tracker.on.update('categories').response([{
      id: 1,
      name: 'Vegetarian'
    }]);

    /** Set the data to pass into the models function */
    const categoryId = 1;
    const name = 'Vegetarian';

    /** Execute the function */
    const result = await categoryModel.update(categoryId, name);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toEqual('Category successfully updated');

  });

  it('should return an error if required arguments are missing or invalid', async () => {

    /** Mock the DB responses */
    tracker.on.update('categories').response([]);

    /** Set the data to pass into the models function */
    const categoryId = null;
    const name = null;

    /** Execute the function */
    const result = await categoryModel.update(categoryId, name);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should should return a generic error to hide library errors', async () => {

    /** Mock the DB responses */
    tracker.on.update('categories').simulateError('Lost connection database');

    /** Set the data to pass into the models function */
    const categoryId = 1;
    const name = 'Vegan';

    /** Execute the function */
    const result = await categoryModel.update(categoryId, name);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was a problem with the resource, please try again later');

  });

});

describe('categoryModel.findOne', () => {

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

  it('should return a specific category', async () => {

    /** Mock the DB responses */
    tracker.on.select('categories').response([
      { id: 1, name: 'Vegan'}
    ]);

    /** Set the data to pass into the models function */
    const name = 'Vegan';

    /** Execute the function */
    const result = await categoryModel.findOne(name);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual(name);

  });

  it('should return an empty array if no entries found', async () => {

    /** Mock the DB responses */
    tracker.on.select('categories').response([]);

    /** Set the data to pass into the models function */
    const name = 'Vegon';

    /** Execute the function */
    const result = await categoryModel.findOne(name);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should return an error if required arguments are missing or invalid', async () => {

    /** Mock the DB responses */
    tracker.on.select('categories').response([]);

    /** Set the data to pass into the models function */
    const name = null;

    /** Execute the function */
    const result = await categoryModel.findOne(name);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should should return a generic error to hide library errors', async () => {

    /** Mock the DB responses */
    tracker.on.select('categories').simulateError('DB Connection lost');

    /** Set the data to pass into the models function */
    const name = 'Vegan';

    /** Execute the function */
    const result = await categoryModel.findOne(name);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was a problem with the resource, please try again later');

  });

});

describe('categoryModel.findAll', () => {

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

  it('should return all categories', async () => {

    /** Mock the DB responses */
    tracker.on.select('categories').response([
      { id: 1, name: 'Vegan' },
      { id: 2, name: 'Vegan pies'},
      { id: 3, name: 'Vegan treats'}
    ]);

    /** Set the data to pass into the models function */
    const name = 'Vegan';

    /** Execute the function */
    const result = await categoryModel.findAll(name);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(3);

    expect(typeof result[0].id).toBe('number');
    expect(result[0].id).toEqual(1);
    expect(typeof result[0].name).toBe('string');
    expect(result[0].name).toEqual('Vegan');

    expect(typeof result[1].id).toBe('number');
    expect(result[1].id).toEqual(2);
    expect(typeof result[1].name).toBe('string');
    expect(result[1].name).toEqual('Vegan pies');

    expect(typeof result[2].id).toBe('number');
    expect(result[2].id).toEqual(3);
    expect(typeof result[2].name).toBe('string');
    expect(result[2].name).toEqual('Vegan treats');

  });

  it('should throw an error if input argument validation fails', async () => {

    /** Mock the DB responses */
    tracker.on.select('categories').response([]);

    /** Set the data to pass into the models function */
    const name = null;

    /** Execute the function */
    const result = await categoryModel.findAll(name);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return an empty array if no entries found', async () => {

    /** Mock the DB responses */
    tracker.on.select('categories').response([]);

    /** Set the data to pass into the models function */
    const name = 'Vegon';

    /** Execute the function */
    const result = await categoryModel.findAll(name);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should should return a generic error to hide library errors', async () => {

    /** Mock the DB responses */
    tracker.on.select('categories').simulateError('Lost connection to database');

    /** Set the data to pass into the models function */
    const name = 'vegan';

    /** Execute the function */
    const result = await categoryModel.findAll(name);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was a problem with the resource, please try again later');

  });

});
