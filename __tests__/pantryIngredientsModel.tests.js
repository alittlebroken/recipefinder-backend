/*
 * Packages needed for scripts
 */
const knex = require('knex');
const db = require('../database');
const pantryIngredientsModel = require('../models/pantryIngredientsModel');
const messageHelper = require('../helpers/constants');
const { getTracker, Tracker } = require('knex-mock-client');

/* Mock the DB library */
jest.mock('../database', () => {
  const knex = require('knex');
  const { MockClient } = require('knex-mock-client');
  return knex({ client: MockClient })
});

/* Tracker for the SQL commands */
let tracker;

describe('pantryIngredientsModel.create', () => {

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

  it('creates the record', async () => {

    /** Mock the DB responses */
    tracker.on.insert('pantry_ingredients').response([{id: 1}]);

    /** Set the data to pass into the models function */
    const data = {
      pantryId: 1,
      ingredientId: 1,
      amount: 6,
      amount_type: 'medium egg(s)'
    };

    /** Execute the function */
    const result = await pantryIngredientsModel.create(data);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toBe(messageHelper.INFO_RECORD_CREATED);

  });

  it('returns an error if required value data is missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const data = null;

    /** Execute the function */
    const result = await pantryIngredientsModel.create(data);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe(messageHelper.ERROR_MISSING_VALUES);

  });

  it('returns an error if required value data.pantryId is missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const data = {
      pantryId: null,
      ingredientId: 1,
      amount: 6,
      amount_type: 'medium egg(s)'
    };

    /** Execute the function */
    const result = await pantryIngredientsModel.create(data);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe(messageHelper.ERROR_MISSING_VALUES);

  });

  it('returns an error if required value data.ingredientId is missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const data = {
      pantryId: 1,
      ingredientId: null,
      amount: 6,
      amount_type: 'medium egg(s)'
    };

    /** Execute the function */
    const result = await pantryIngredientsModel.create(data);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe(messageHelper.ERROR_MISSING_VALUES);

  });

  it('returns an error if required value data.amount is missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const data = {
      pantryId: 1,
      ingredientId: 1,
      amount: null,
      amount_type: 'medium egg(s)'
    };

    /** Execute the function */
    const result = await pantryIngredientsModel.create(data);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe(messageHelper.ERROR_MISSING_VALUES);

  });

  it('returns an error if required value data.amount_type is missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const data = {
      pantryId: 1,
      ingredientId: 1,
      amount: 6,
      amount_type: null
    };

    /** Execute the function */
    const result = await pantryIngredientsModel.create(data);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe(messageHelper.ERROR_MISSING_VALUES);

  });

  it('returns a generic error if third party libraries encounter an error', async () => {

    /** Mock the DB responses */
    tracker.on.insert('pantry_ingredients').simulateError(messageHelper.ERROR_SIMULATE);

    /** Set the data to pass into the models function */
    const data = {
      pantryId: 1,
      ingredientId: 1,
      amount: 6,
      amount_type: 'medium egg(s)'
    };

    /** Execute the function */
    const result = await pantryIngredientsModel.create(data);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe(messageHelper.ERROR_GENERIC_RESOURCE);

  });

});

describe('pantryIngredientsModel.update', () => {

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

  it('updates the specified record', async () => {

    /** Mock the DB responses */
    tracker.on.update('pantry_ingredients').response([{id: 1}]);

    /** Set the data to pass into the models function */
    const data = {
      id: 1,
      pantryId: 1,
      ingredientId: 1,
      amount: 6,
      amount_type: 'large egg(s)'
    };

    /** Execute the function */
    const result = await pantryIngredientsModel.update(data);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toBe(messageHelper.INFO_RECORD_UPDATED);

  });

  it('returns an empty array if no record found to update', async () => {

    /** Mock the DB responses */
      tracker.on.update('pantry_ingredients').response([]);

      /** Set the data to pass into the models function */
      const data = {
        id: 1,
        pantryId: 1,
        ingredientId: 1,
        amount: 6,
        amount_type: 'large egg(s)'
      };

      /** Execute the function */
      const result = await pantryIngredientsModel.update(data);

      /** Test the response back from the function */
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(0);

  });

  it('returns an error if required object data is missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const data = null;

    /** Execute the function */
    const result = await pantryIngredientsModel.update(data);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe(messageHelper.ERROR_MISSING_VALUES);

  });

  it('returns an error if required value data.id is missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const data = {
      id: null,
      pantryId: 1,
      ingredientId: 1,
      amount: 6,
      amount_type: 'large egg(s)'
    };

    /** Execute the function */
    const result = await pantryIngredientsModel.update(data);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe(messageHelper.ERROR_MISSING_VALUES);

  });

  it('returns an error if required data.pantryId is missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const data = {
      id: 1,
      pantryId: null,
      ingredientId: 1,
      amount: 6,
      amount_type: 'large egg(s)'
    };

    /** Execute the function */
    const result = await pantryIngredientsModel.update(data);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe(messageHelper.ERROR_MISSING_VALUES);

  });

  it('returns an error if required data.ingredientId is missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const data = {
      id: 1,
      pantryId: 1,
      ingredientId: null,
      amount: 6,
      amount_type: 'large egg(s)'
    };

    /** Execute the function */
    const result = await pantryIngredientsModel.update(data);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe(messageHelper.ERROR_MISSING_VALUES);

  });

  it('returns an error if required data.amount is missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const data = {
      id: 1,
      pantryId: 1,
      ingredientId: 1,
      amount: null,
      amount_type: 'large egg(s)'
    };

    /** Execute the function */
    const result = await pantryIngredientsModel.update(data);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe(messageHelper.ERROR_MISSING_VALUES);

  });

  it('returns an error if required data.amount_type is missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const data = {
      id: 1,
      pantryId: 1,
      ingredientId: 1,
      amount: 6,
      amount_type: null
    };

    /** Execute the function */
    const result = await pantryIngredientsModel.update(data);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe(messageHelper.ERROR_MISSING_VALUES);

  });

  it('returns a generic error if third party library has an error', async () => {

    /** Mock the DB responses */
    tracker.on.update('pantry_ingredients').simulateError(messageHelper.ERROR_SIMULATE);

    /** Set the data to pass into the models function */
    const data = {
      id: 1,
      pantryId: 1,
      ingredientId: 1,
      amount: 6,
      amount_type: 'large egg(s)'
    };

    /** Execute the function */
    const result = await pantryIngredientsModel.update(data);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe(messageHelper.ERROR_GENERIC_RESOURCE);

  });

});

describe('pantryIngredientsModel.remove', () => {

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

  it('removes the specified record', async () => {

    /** Mock the DB responses */
    tracker.on.delete('pantry_ingredients').response(1);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await pantryIngredientsModel.remove(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toBe(messageHelper.INFO_RECORD_REMOVED);

  });

  it('returns an error if required value id is missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const id = null;

    /** Execute the function */
    const result = await pantryIngredientsModel.remove(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe(messageHelper.ERROR_MISSING_VALUES);


  });

  it('returns an empty array if no record found to update', async () => {

    /** Mock the DB responses */
    tracker.on.delete('pantry_ingredients').response([]);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await pantryIngredientsModel.remove(id);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);


  });

  it('returns a generic error if third party library produces an error', async () => {

    /** Mock the DB responses */
    tracker.on.delete('pantry_ingredients').simulateError(messageHelper.ERROR_SIMULATE);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await pantryIngredientsModel.remove(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe(messageHelper.ERROR_GENERIC_RESOURCE);

  });

});

describe('pantryIngredientsModel.removeAll', () => {

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

  it('removes all records from underlying table', async () => {

    /** Mock the DB responses */
    tracker.on.delete('pantry_ingredients').response(1);

    /** Set the data to pass into the models function */

    /** Execute the function */
    const result = await pantryIngredientsModel.removeAll();

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toBe(messageHelper.INFO_RECORD_REMOVED);

  });

  it('returns an empty array if no records to remove', async () => {

    /** Mock the DB responses */
    tracker.on.delete('pantry_ingredients').response([]);

    /** Set the data to pass into the models function */

    /** Execute the function */
    const result = await pantryIngredientsModel.removeAll();

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('returns a generic error if third party library produces an error', async () => {

    /** Mock the DB responses */
    tracker.on.delete('pantry_ingredients').simulateError(messageHelper.ERROR_SIMULATE);

    /** Set the data to pass into the models function */

    /** Execute the function */
    const result = await pantryIngredientsModel.removeAll();

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe(messageHelper.ERROR_GENERIC_RESOURCE);

  });

});

describe('pantryIngredientsModel.removeByPantry', () => {

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

  it('removes all entries for specified id', async () => {

    /** Mock the DB responses */
    tracker.on.delete('pantry_ingredients').response(1);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await pantryIngredientsModel.removeByPantry(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toBe(messageHelper.INFO_RECORD_REMOVED);

  });

  it('returns an empty array if no records found to remove', async () => {

    /** Mock the DB responses */
    tracker.on.delete('pantry_ingredients').response([]);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await pantryIngredientsModel.removeByPantry(id);

    /** Test the response back from the function */
   expect(Array.isArray(result)).toBe(true);
   expect(result).toHaveLength(0);

  });

  it('returns an error if required value id is missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const id = null;

    /** Execute the function */
    const result = await pantryIngredientsModel.removeByPantry(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe(messageHelper.ERROR_MISSING_VALUES);

  });

  it('returns a generic error if third party library produces an error', async () => {

    /** Mock the DB responses */
    tracker.on.delete('pantry_ingredients').simulateError(messageHelper.ERROR_SIMULATE);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await pantryIngredientsModel.removeByPantry(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe(messageHelper.ERROR_GENERIC_RESOURCE);

  });

});

describe('pantryIngredientsModel.removeByIngredient', () => {

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

  it('removes all records matching specified id', async () => {

    /** Mock the DB responses */
    tracker.on.delete('pantry_ingredients').response(1);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await pantryIngredientsModel.removeByIngredient(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toBe(messageHelper.INFO_RECORD_REMOVED);

  });

  it('returns an empty array if no records found to be removed', async () => {

    /** Mock the DB responses */
    tracker.on.delete('pantry_ingredients').response([]);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await pantryIngredientsModel.removeByIngredient(id);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('returns an error if required value id is missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const id = null;

    /** Execute the function */
    const result = await pantryIngredientsModel.removeByIngredient(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe(messageHelper.ERROR_MISSING_VALUES);

  });

  it('returns a generic error if third party library prodces an error', async () => {

    /** Mock the DB responses */
    tracker.on.delete('pantry_ingredients').simulateError(messageHelper.ERROR_SIMULATE);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await pantryIngredientsModel.removeByIngredient(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe(messageHelper.ERROR_GENERIC_RESOURCE);

  });

});

describe('pantryIngredientsModel.findAll', () => {

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

  it('returns an array with all records from underlying table', async () => {

    /** Mock the DB responses */
    tracker.on.select('pantry_ingredients').response([{
      id: 1,
      pantryId: 1,
      ingredientId: 1,
      userId: 3,
      username: 'Newt Scaremonger',
      ingredientId: 2,
      ingredientName: 'Dragon fruit',
      amount: 6,
      amount_type: 'large'
    }]);

    /** Set the data to pass into the models function */

    /** Execute the function */
    const result = await pantryIngredientsModel.findAll();

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);

    expect(typeof result[0].id).toBe('number');
    expect(result[0].id).toBe(1);

    expect(typeof result[0].pantryId).toBe('number');
    expect(result[0].pantryId).toBe(1);

    expect(typeof result[0].userId).toBe('number');
    expect(result[0].userId).toBe(3);

    expect(typeof result[0].username).toBe('string');
    expect(result[0].username).toBe('Newt Scaremonger');

    expect(typeof result[0].ingredientName).toBe('string');
    expect(result[0].ingredientName).toBe('Dragon fruit');

    expect(typeof result[0].ingredientId).toBe('number');
    expect(result[0].ingredientId).toBe(2);

    expect(typeof result[0].amount).toBe('number');
    expect(result[0].amount).toBe(6);

    expect(typeof result[0].amount_type).toBe('string');
    expect(result[0].amount_type).toBe('large');

  });

  it('returns an empty array if no records found', async () => {

    /** Mock the DB responses */
    tracker.on.select('pantry_ingredients').response([]);

    /** Set the data to pass into the models function */

    /** Execute the function */
    const result = await pantryIngredientsModel.findAll();

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('returns a generic error if third party library produces an error', async () => {

    /** Mock the DB responses */
    tracker.on.select('pantry_ingredients').simulateError(messageHelper.ERROR_SIMULATE);

    /** Set the data to pass into the models function */

    /** Execute the function */
    const result = await pantryIngredientsModel.findAll();

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe(messageHelper.ERROR_GENERIC_RESOURCE);

  });

});

describe('pantryIngredientsModel.findByPantry', () => {

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

  it('returns all rows matching the supplied id', async () => {

    /** Mock the DB responses */
    tracker.on.select('pantry_ingredients').response([{
      id: 1,
      pantryId: 1,
      ingredientId: 1,
      userId: 3,
      username: 'Newt Scaremonger',
      ingredientId: 2,
      ingredientName: 'Dragon fruit',
      amount: 6,
      amount_type: 'large'
    }]);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await pantryIngredientsModel.findByPantry(id);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);

    expect(typeof result[0].id).toBe('number');
    expect(result[0].id).toBe(1);

    expect(typeof result[0].pantryId).toBe('number');
    expect(result[0].pantryId).toBe(1);

    expect(typeof result[0].userId).toBe('number');
    expect(result[0].userId).toBe(3);

    expect(typeof result[0].username).toBe('string');
    expect(result[0].username).toBe('Newt Scaremonger');

    expect(typeof result[0].ingredientName).toBe('string');
    expect(result[0].ingredientName).toBe('Dragon fruit');

    expect(typeof result[0].ingredientId).toBe('number');
    expect(result[0].ingredientId).toBe(2);

    expect(typeof result[0].amount).toBe('number');
    expect(result[0].amount).toBe(6);

    expect(typeof result[0].amount_type).toBe('string');
    expect(result[0].amount_type).toBe('large');


  });

  it('returns an empty array if no records found', async () => {

    /** Mock the DB responses */
    tracker.on.select('pantry_ingredients').response([]);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await pantryIngredientsModel.findByPantry(id);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('returns an error if required value id is missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const id = null;

    /** Execute the function */
    const result = await pantryIngredientsModel.findByPantry(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe(messageHelper.ERROR_MISSING_VALUES);

  });

  it('returns a generic error if third party library produces an error', async () => {

    /** Mock the DB responses */
    tracker.on.select('pantry_ingredients').simulateError(messageHelper.ERROR_SIMULATE);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await pantryIngredientsModel.findByPantry(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe(messageHelper.ERROR_GENERIC_RESOURCE);

  });

});

describe('pantryIngredientsModel.findByIngredient', () => {

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

  it('returns all entries matching supplied id', async () => {

    /** Mock the DB responses */
    tracker.on.select('pantry_ingredients').response([{
      id: 1,
      pantryId: 1,
      ingredientId: 1,
      userId: 3,
      username: 'Newt Scaremonger',
      ingredientId: 2,
      ingredientName: 'Dragon fruit',
      amount: 6,
      amount_type: 'large'
    }]);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await pantryIngredientsModel.findByIngredient(id);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);

    expect(typeof result[0].id).toBe('number');
    expect(result[0].id).toBe(1);

    expect(typeof result[0].pantryId).toBe('number');
    expect(result[0].pantryId).toBe(1);

    expect(typeof result[0].userId).toBe('number');
    expect(result[0].userId).toBe(3);

    expect(typeof result[0].username).toBe('string');
    expect(result[0].username).toBe('Newt Scaremonger');

    expect(typeof result[0].ingredientName).toBe('string');
    expect(result[0].ingredientName).toBe('Dragon fruit');

    expect(typeof result[0].ingredientId).toBe('number');
    expect(result[0].ingredientId).toBe(2);

    expect(typeof result[0].amount).toBe('number');
    expect(result[0].amount).toBe(6);

    expect(typeof result[0].amount_type).toBe('string');
    expect(result[0].amount_type).toBe('large');

  });

  it('returns an empty array if no records found', async () => {

    /** Mock the DB responses */
    tracker.on.select('pantry_ingredients').response([]);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await pantryIngredientsModel.findByIngredient(id);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('returns an error if required value id is missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const id = null;

    /** Execute the function */
    const result = await pantryIngredientsModel.findByIngredient(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe(messageHelper.ERROR_MISSING_VALUES);

  });

  it('returns a generic error if third party library produces an error', async () => {

    /** Mock the DB responses */
    tracker.on.select('pantry_ingredients').simulateError(messageHelper.ERROR_SIMULATE);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await pantryIngredientsModel.findByIngredient(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe(messageHelper.ERROR_GENERIC_RESOURCE);

  });

});

describe('pantryIngredientsModel.findByUser', () => {

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

  it('returns all entries matching supplied user id', async () => {

    /** Mock the DB responses */
    tracker.on.select('pantry_ingredients').response([{
      id: 1,
      pantryId: 1,
      ingredientId: 1,
      userId: 3,
      username: 'Newt Scaremonger',
      ingredientId: 2,
      ingredientName: 'Dragon fruit',
      amount: 6,
      amount_type: 'large'
    }]);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await pantryIngredientsModel.findByUser(id);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);

    expect(typeof result[0].id).toBe('number');
    expect(result[0].id).toBe(1);

    expect(typeof result[0].pantryId).toBe('number');
    expect(result[0].pantryId).toBe(1);

    expect(typeof result[0].userId).toBe('number');
    expect(result[0].userId).toBe(3);

    expect(typeof result[0].username).toBe('string');
    expect(result[0].username).toBe('Newt Scaremonger');

    expect(typeof result[0].ingredientName).toBe('string');
    expect(result[0].ingredientName).toBe('Dragon fruit');

    expect(typeof result[0].ingredientId).toBe('number');
    expect(result[0].ingredientId).toBe(2);

    expect(typeof result[0].amount).toBe('number');
    expect(result[0].amount).toBe(6);

    expect(typeof result[0].amount_type).toBe('string');
    expect(result[0].amount_type).toBe('large');

  });

  it('returns an empty array if no records found', async () => {

    /** Mock the DB responses */
    tracker.on.select('pantry_ingredients').response([]);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await pantryIngredientsModel.findByUser(id);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('returns an error if required value id is missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const id = null;

    /** Execute the function */
    const result = await pantryIngredientsModel.findByUser(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe(messageHelper.ERROR_MISSING_VALUES);

  });

  it('returns a generic error if third party library produces an error', async () => {

    /** Mock the DB responses */
    tracker.on.select('pantry_ingredients').simulateError(messageHelper.ERROR_SIMULATE);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await pantryIngredientsModel.findByUser(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe(messageHelper.ERROR_GENERIC_RESOURCE);

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

  it('returns ...', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

  });

});
