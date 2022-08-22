/*
 * Packages needed for scripts
 */
const knex = require('knex');
const db = require('../database');
const recipeModel = require('../models/recipeModel');
const { getTracker, Tracker } = require('knex-mock-client');

xdescribe('cookbookModel.<method>', () => {

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
