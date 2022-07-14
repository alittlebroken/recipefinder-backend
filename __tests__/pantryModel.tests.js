*
 * Packages needed for scripts
 */
const knex = require('knex');
const db = require('../database');
const pantryModel = require('../models/pantryModel');
const { getTracker, Tracker } = require('knex-mock-client');

/* Mock the DB library */
jest.mock('../database', () => {
  const knex = require('knex');
  const { MockClient } = require('knex-mock-client');
  return knex({ client: MockClient })
});

/* Tracker for the SQL commands */
let tracker;

xdescribe('', () => {

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

  xit('should ....', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */
    

  });
});
