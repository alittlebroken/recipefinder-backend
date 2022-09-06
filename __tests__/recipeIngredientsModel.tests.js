/*
 * Packages needed for scripts
 */
const knex = require('knex');
const db = require('../database');
const recipeIngredientsModel = require('../models/recipeIngredientsModel');
const { getTracker, Tracker } = require('knex-mock-client');

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

  xit('should create the specified record', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

  });

  xit('should throw an error if required arguments are missing or invalid', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

  });

  xit('should return an empty array if no records found', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

  });

  xit('should throw a generic error to hide library errors', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

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

  xit('should remove the required data', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

  });

  xit('should throw an error if required arguments are missing or invalid', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

  });

  xit('should throw a generic error to hide library errors', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

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

  xit('should update the specified record', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

  });

  xit('should throw an error if required arguments are missing or invalid', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

  });

  xit('should throw a generic error to hid library errors', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

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

  xit('should find a record by the passed in id', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

  });

  xit('should return an empty array if no records found', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

  });

  xit('should throw an error if the required arguments are missing or invalid', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

  });

  xit('should throw a generic error to hide library errors', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

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

  xit('should return an array with the required records', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

  });

  xit('should return an empty array if no records found', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

  });

  xit('should throw an error if required arguments are missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

  });

  xit('should throw a generic error if library throws an error', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

  });

});

describe('recipeIngredientsModel.findByIngredientId', () => {

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

  xit('should find the desired records', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

  });

  xit('should return an empty array if no records found', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

  });

  xit('should throw an error if required arguments are missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

  });

  xit('should throw a generic error if the underlying libraries used throw an error', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

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

  xit('should return all records found', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

  });

  xit('should return an empty array if no records found', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

  });

  xit('should throw a generic error if the underlying libraries throw an error', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

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

  xit('should ...', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

  });

});
