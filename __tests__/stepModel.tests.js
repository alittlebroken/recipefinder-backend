/*
 * Packages needed for scripts
 */
const knex = require('knex');
const db = require('../database');
const stepModel = require('../models/stepModel');
const { getTracker, Tracker } = require('knex-mock-client');

/* Mock the DB library */
jest.mock('../database', () => {
  const knex = require('knex');
  const { MockClient } = require('knex-mock-client');
  return knex({ client: MockClient })
});

/* Tracker for the SQL commands */
let tracker;

describe('stepModel.create', () => {

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

  it('should create a new step', async () => {

    /** Mock the DB responses */
    tracker.on.insert('steps').response([ { id: 1 } ]);

    /** Set the data to pass into the models function */
    const recipeId = 1;
    const stepNo = 2;
    const stepContent = 'Preheat Oven to 200 degress centigrade';

    /** Execute the function */
    const result = await stepModel.create(recipeId, stepNo, stepContent);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toEqual('Step successfully created');

  });

  it('should error if one or more required values are missing or incorrect', async () => {

    /** Mock the DB responses */
    tracker.on.insert('steps').response([ { id: 1 } ]);

    /** Set the data to pass into the models function */
    const recipeId = null;
    const stepNo = null;
    const stepContent = null;

    /** Execute the function */
    const result = await stepModel.create(recipeId, stepNo, stepContent);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return a generic error to hide library errors', async () => {

    /** Mock the DB responses */
    tracker.on.insert('steps').simulateError('Lost connection to database');

    /** Set the data to pass into the models function */
    const recipeId = 1;
    const stepNo = 2;
    const stepContent = 'Preheat Oven to 200 degress centigrade';

    /** Execute the function */
    const result = await stepModel.create(recipeId, stepNo, stepContent);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was a problem with the resource, please try again later');

  });

});

describe('stepModel.remove', () => {

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

  it('should remove the specified step', async () => {

    /** Mock the DB responses */
    tracker.on.delete('steps').response([{ id: 1 }]);

    /** Set the data to pass into the models function */
    const stepId = 1;

    /** Execute the function */
    const result = await stepModel.remove(stepId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toEqual('Step successfully removed');

  });

  it('should return an message if no records to delete', async () => {

    /** Mock the DB responses */
    tracker.on.delete('steps').response(0);

    /** Set the data to pass into the models function */
    const recipeId = 2;

    /** Execute the function */
    const result = await stepModel.remove(recipeId);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should error if one or more required values are missing or incorrect', async () => {

    /** Mock the DB responses */
    tracker.on.delete('steps').response([{ id: 1 }]);

    /** Set the data to pass into the models function */
    const stepId = null;

    /** Execute the function */
    const result = await stepModel.remove(stepId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return a generic error to hide library errors', async () => {

    /** Mock the DB responses */
    tracker.on.delete('steps').simulateError('Lost connection to the database');

    /** Set the data to pass into the models function */
    const stepId = 1;

    /** Execute the function */
    const result = await stepModel.remove(stepId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was a problem with the resource, please try again later');

  });

});

describe('stepModel.removeAll', () => {

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

  it('should remove all steps for a recipe', async () => {

    /** Mock the DB responses */
    tracker.on.delete('steps').response(5);

    /** Set the data to pass into the models function */
    const recipeId = 1;

    /** Execute the function */
    const result = await stepModel.removeAll(recipeId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toEqual('Step(s) successfully removed');

  });

  it('should return an message if no records to delete', async () => {

    /** Mock the DB responses */
    tracker.on.delete('steps').response(0);

    /** Set the data to pass into the models function */
    const recipeId = 2;

    /** Execute the function */
    const result = await stepModel.removeAll(recipeId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('No data found for removal');

  });

  it('should error if one or more required values are missing or incorrect', async () => {

    /** Mock the DB responses */
    tracker.on.delete('steps').response(5);

    /** Set the data to pass into the models function */
    const recipeId = null;

    /** Execute the function */
    const result = await stepModel.removeAll(recipeId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return a generic error to hide library errors', async () => {

    /** Mock the DB responses */
    tracker.on.delete('steps').simulateError('lost connection to database');

    /** Set the data to pass into the models function */
    const recipeId = 1;

    /** Execute the function */
    const result = await stepModel.removeAll(recipeId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was a problem with the resource, please try again later');

  });

});

describe('stepModel.update', () => {

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

  it('should update the specified step', async () => {

    /** Mock the DB responses */
    tracker.on.update('steps').response([{ id: 1 }]);

    /** Set the data to pass into the models function */
    const stepId = 1;
    const recipeId = 1;
    const stepNo = 1;
    const stepContent = 'Preheat oven to 400 degrees celcius';

    /** Execute the function */
    const result = await stepModel.update(recipeId, stepId, stepNo, stepContent);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toEqual('Step updated successfully');

  });

  it('should error if one or more required values are missing or incorrect', async () => {

    /** Mock the DB responses */
    tracker.on.update('steps').response([{ id: 1 }]);

    /** Set the data to pass into the models function */
    const stepId = null;
    const recipeId = 1;
    const stepNo = 1;
    const stepContent = 'Preheat oven to 400 degrees celcius';

    /** Execute the function */
    const result = await stepModel.update(recipeId, stepId, stepNo, stepContent);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return a generic error to hide library errors', async () => {

    /** Mock the DB responses */
    tracker.on.update('steps').simulateError('Lost connection to database');

    /** Set the data to pass into the models function */
    const stepId = 1;
    const recipeId = 1;
    const stepNo = 1;
    const stepContent = 'Preheat oven to 400 degrees celcius';

    /** Execute the function */
    const result = await stepModel.update(recipeId, stepId, stepNo, stepContent);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was a problem with the resource, please try again later');

  });

});

describe('stepModel.findById', () => {

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

  it('should return all steps for a recipe', async () => {

    /** Mock the DB responses */
    tracker.on.select('steps').response([
      {id: 1, recipeId: 1, stepNo: 1, content: 'Preheat oven to 180 degrees centigrade' },
      {id: 2, recipeId: 1, stepNo: 2, content: 'Mix dry ingredients together' },
      {id: 3, recipeId: 1, stepNo: 3, content: 'Pour in the wet ingredients' },
      {id: 4, recipeId: 1, stepNo: 4, content: 'Use an electric whisk on medium speed for 2 minutes until smooth' },
      {id: 5, recipeId: 1, stepNo: 5, content: 'Grease two 20inch round sandwich tins' },
      {id: 6, recipeId: 1, stepNo: 6, content: 'Split the mixture evenly between the two tins' },
      {id: 7, recipeId: 1, stepNo: 7, content: 'Place in the middle of the oven for 30 minutes or until golden brown' },
      {id: 8, recipeId: 1, stepNo: 8, content: 'Place on a cake rack to cool down for 5 minutes' },
    ]);

    /** Set the data to pass into the models function */
    const recipeId = 1;

    /** Execute the function */
    const result = await stepModel.findById(recipeId);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(8);

    /* Check the content returned is OK */
    expect(typeof result[0].id).toBe('number');
    expect(typeof result[1].id).toBe('number');
    expect(typeof result[2].id).toBe('number');
    expect(typeof result[3].id).toBe('number');
    expect(typeof result[4].id).toBe('number');
    expect(typeof result[5].id).toBe('number');
    expect(typeof result[6].id).toBe('number');
    expect(typeof result[7].id).toBe('number');

    expect(typeof result[0].recipeId).toBe('number');
    expect(typeof result[1].recipeId).toBe('number');
    expect(typeof result[2].recipeId).toBe('number');
    expect(typeof result[3].recipeId).toBe('number');
    expect(typeof result[4].recipeId).toBe('number');
    expect(typeof result[5].recipeId).toBe('number');
    expect(typeof result[6].recipeId).toBe('number');
    expect(typeof result[7].recipeId).toBe('number');

    expect(typeof result[0].stepNo).toBe('number');
    expect(typeof result[1].stepNo).toBe('number');
    expect(typeof result[2].stepNo).toBe('number');
    expect(typeof result[3].stepNo).toBe('number');
    expect(typeof result[4].stepNo).toBe('number');
    expect(typeof result[5].stepNo).toBe('number');
    expect(typeof result[6].stepNo).toBe('number');
    expect(typeof result[7].stepNo).toBe('number');

    expect(typeof result[0].content).toBe('string');
    expect(typeof result[1].content).toBe('string');
    expect(typeof result[2].content).toBe('string');
    expect(typeof result[3].content).toBe('string');
    expect(typeof result[4].content).toBe('string');
    expect(typeof result[5].content).toBe('string');
    expect(typeof result[6].content).toBe('string');
    expect(typeof result[7].content).toBe('string');

    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(2);
    expect(result[2].id).toBe(3);
    expect(result[3].id).toBe(4);
    expect(result[4].id).toBe(5);
    expect(result[5].id).toBe(6);
    expect(result[6].id).toBe(7);
    expect(result[7].id).toBe(8);

    expect(result[0].recipeId).toBe(1);
    expect(result[1].recipeId).toBe(1);
    expect(result[2].recipeId).toBe(1);
    expect(result[3].recipeId).toBe(1);
    expect(result[4].recipeId).toBe(1);
    expect(result[5].recipeId).toBe(1);
    expect(result[6].recipeId).toBe(1);
    expect(result[7].recipeId).toBe(1);

    expect(result[0].stepNo).toBe(1);
    expect(result[1].stepNo).toBe(2);
    expect(result[2].stepNo).toBe(3);
    expect(result[3].stepNo).toBe(4);
    expect(result[4].stepNo).toBe(5);
    expect(result[5].stepNo).toBe(6);
    expect(result[6].stepNo).toBe(7);
    expect(result[7].stepNo).toBe(8);

    expect(result[0].content).toEqual('Preheat oven to 180 degrees centigrade');
    expect(result[1].content).toEqual('Mix dry ingredients together');
    expect(result[2].content).toEqual('Pour in the wet ingredients');
    expect(result[3].content).toEqual('Use an electric whisk on medium speed for 2 minutes until smooth');
    expect(result[4].content).toEqual('Grease two 20inch round sandwich tins');
    expect(result[5].content).toEqual('Split the mixture evenly between the two tins');
    expect(result[6].content).toEqual('Place in the middle of the oven for 30 minutes or until golden brown');
    expect(result[7].content).toEqual('Place on a cake rack to cool down for 5 minutes');

  });

  it('should return an empty array if nothing found', async () => {

    /** Mock the DB responses */
    tracker.on.select('steps').response([]);

    /** Set the data to pass into the models function */
    const recipeId = 1;

    /** Execute the function */
    const result = await stepModel.findById(recipeId);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should error if one or more required values are missing or incorrect', async () => {

    /** Mock the DB responses */
    tracker.on.select('steps').response([
      {id: 1, recipeId: 1, stepNo: 1, content: 'Preheat oven to 180 degrees centigrade' },
      {id: 2, recipeId: 1, stepNo: 2, content: 'Mix dry ingredients together' },
      {id: 3, recipeId: 1, stepNo: 3, content: 'Pour in the wet ingredients' },
      {id: 4, recipeId: 1, stepNo: 4, content: 'Use an electric whisk on medium speed for 2 minutes until smooth' },
      {id: 5, recipeId: 1, stepNo: 5, content: 'Grease two 20inch round sandwich tins' },
      {id: 6, recipeId: 1, stepNo: 6, content: 'Split the mixture evenly between the two tins' },
      {id: 7, recipeId: 1, stepNo: 7, content: 'Place in the middle of the oven for 30 minutes or until golden brown' },
      {id: 8, recipeId: 1, stepNo: 8, content: 'Place on a cake rack to cool down for 5 minutes' },
    ]);

    /** Set the data to pass into the models function */
    const recipeId = null;

    /** Execute the function */
    const result = await stepModel.findById(recipeId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return a generic error to hide library errors', async () => {

    /** Mock the DB responses */
    tracker.on.select('steps').simulateError('Lost connection to the database');

    /** Set the data to pass into the models function */
    const recipeId = 1;

    /** Execute the function */
    const result = await stepModel.findById(recipeId);

    /** Test the response back from the function */
    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was a problem with the resource, please try again later');

  });

});
