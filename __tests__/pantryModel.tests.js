/*
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

describe('pantryModel.create', () => {

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

  it('should create the pantry for a specified user', async () => {

    /** Mock the DB responses */
    tracker.on.select('pantries').response([]);
    tracker.on.insert('pantries').response([{
      id: 1,
      userId: 1
    }]);

    /** Set the data to pass into the models function */
    const userId = 1;

    /** Execute the function */
    const result = await pantryModel.create(userId);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);
    expect(result[0].id).toEqual(1);

  });

  it('should error if the passed in arguments are missing or empty', async () => {

    /** Mock the DB responses if needed*/

    /** Set the data to pass into the models function */
    const userId = '';

    /** Execute the function */
    const result = await pantryModel.create(userId);

    /** Test the response back from the function */
    expect(typeof result).toEqual('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('The required argument is missing or invalid');

  });

  it('should error if the user already has a pantry', async () => {

    /** Mock the DB responses */
    tracker.on.select('pantries').response([{ id: 1, userId: 1}]);
    tracker.on.insert('pantries').response({});

    /** Set the data to pass into the models function */
    const userId = 1;

    /** Execute the function */
    const result = await pantryModel.create(userId);

    /** Test the response back from the function */
    expect(typeof result).toEqual('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('The specified user already has a pantry');

  });

  it('should error if there was any other issues', async () => {

    /** Mock the DB responses */
    tracker.on.select('pantries').response([]);
    tracker.on.insert('pantries').simulateError({
      success: false,
      message: 'There was an issue with the resource, please try again later'
    });

    /** Set the data to pass into the models function */
    const userId = 1;

    /** Execute the function */
    const result = await pantryModel.create(userId);

    /** Test the response back from the function */
    expect(typeof result).toEqual('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was an issue with the resource, please try again later');

  });

});

describe('pantryModel.addItem', () => {

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

  it('should add an item to the pantry', async () => {

    /** Mock the DB responses */
    tracker.on.insert('pantry_ingredients').response([{
      success: true,
      message: 'Item added to pantry'
    }]);

    /** Set the data to pass into the models function */
    const pantryItem = {
      pantryId: 1,
      ingredientId: 1,
      amount: 200,
      amount_type: 'grams'
    }

    /** Execute the function */
    const result = await pantryModel.addItem(pantryItem);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].success).toBe(true);
    expect(result[0].message).toEqual('Item added to pantry');

  });

  it('should error if required data is missing or incorrect', async () => {

    /** Mock the DB responses if needed*/

    /** Set the data to pass into the models function */
    const pantryItem = {
      pantryId: null,
      ingredientId: null,
      amount: null,
      amount_type: null
    }

    /** Execute the function */
    const result = await pantryModel.addItem(pantryItem);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more of the passed in values are missing or incorrect');


  });

  it('should error a generic message for any other type of problem', async () => {

    /** Mock the DB responses */
    tracker.on.insert('pantry_ingredients').simulateError('Connection to DB broken');

    /** Set the data to pass into the models function */
    const pantryItem = {
      pantryId: 1,
      ingredientId: 1,
      amount: 200,
      amount_type: 'grams'
    }

    /** Execute the function */
    const result = await pantryModel.addItem(pantryItem);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was an issue accessing the resource, please try again later');

  });

});

describe('pantryModel.update', () => {

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

  it('should update the item', async () => {

    /** Mock the DB responses */
    tracker.on.update('pantry_ingredients').response({
      success: true,
      message: 'pantry item successfully updated'
    });

    /** Set the data to pass into the models function */
    const pantryItem = {
      pantryId: 1,
      ingredientId: 2,
      amount: 1,
      amount_type: 'kg'
    };

    /** Execute the function */
    const result = await pantryModel.updateItem(pantryItem);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toEqual('Pantry item successfully updated');


  });

  it('should error if one or more values are missing or incorrect', async () => {

    /** Mock the DB responses if needed*/

    /** Set the data to pass into the models function */
    const pantryItem = {
      ingredientId: '2'
    }

    /** Execute the function */
    const result = await pantryModel.updateItem(pantryItem);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more values are missing or incorrect');


  });

  it('should throw a generic error for any other issues encountered', async () => {

    /** Mock the DB responses */
    tracker.on.update('pantry_ingredients').simulateError('Lost connection to DB');

    /** Set the data to pass into the models function */
    const pantryItem = {
      pantryId: 1,
      ingredientId: 2,
      amount: 1,
      amount_type: 'kg'
    };

    /** Execute the function */
    const result = await pantryModel.updateItem(pantryItem);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was an issue with the resource, please try again later');

  });

});

describe('pantryModel.remove', () => {

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

  it('should remove an ingredient from the pantry', async () => {

    /** Mock the DB responses */
    tracker.on.delete('pantry_ingredients').response([{
      success: true,
      message: 'Item removed from pantry successfully'
    }]);

    /** Set the data to pass into the models function */
    const pantryItem = {
      pantryId: 1,
      ingredientId: 1,
    };

    /** Execute the function */
    const result = await pantryModel.removeItem(pantryItem);

    /** Test the response back from the function */
    expect(typeof result).toBe('object')
    expect(result.success).toBe(true);
    expect(result.message).toEqual('Item removed from pantry successfully');

  });

  it('should throw an error if required values are missing or incorrect', async () => {

    /** Mock the DB responses if need be*/

    /** Set the data to pass into the models function */
    const pantryItem = {
      pantryId: null,
    }

    /** Execute the function */
    const result = await pantryModel.removeItem(pantryItem);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more values are missing or incorrect');

  });

  it('should throw a generic error for other issues', async () => {

    /** Mock the DB responses */
    tracker.on.delete('pantry_ingredients').simulateError('Lost connection to DB');

    /** Set the data to pass into the models function */
    const pantryItem = {
      pantryId: 1,
      ingredientId: 2
    };

    /** Execute the function */
    const result = await pantryModel.removeItem(pantryItem);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was an issue with the resource, please try again later')

  });

});

describe('pantryModel.removeAll', () => {

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

  it('should remove all pantries', async () => {

    /** Mock the DB responses */
    tracker.on.delete('pantries').response(6);

    /** Set the data to pass into the models function */
    
    /** Execute the function */
    const result = await pantryModel.removeAll();

    /** Test the response back from the function */
    expect(typeof result).toBe('object');

    expect(typeof result.count).toBe('number');
    expect(result.count).toEqual(6);

  });

  it('should return an error if no pantries to remove', async () => {

    /** Mock the DB responses if need be*/
    tracker.on.delete('pantries').response(0);

    /** Set the data to pass into the models function */
    
    /** Execute the function */
    const result = await pantryModel.removeAll();

    /** Test the response back from the function */
    expect(typeof result).toBe('object');

    expect(typeof result.count).toBe('number');
    expect(result.count).toEqual(0);
  });

  it('should throw a generic error for other issues', async () => {

    /** Mock the DB responses */
    tracker.on.delete('pantries')
      .simulateError('Lost connection to DB');

    /** Set the data to pass into the models function */
   
    /** Execute the function */
    const result = await pantryModel.removeAll();

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was an issue with the resource, please try again later')

  });

});

describe('pantryModel.listAll', () => {

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

  it('should return all pantries', async () => {

    /** Mock the DB responses */
    tracker.on.select('pantries').response([
      { id: 1, userId: 1, username: 'admin', numIngredients: 0},
      { id: 2, userId: 2, username: 'twatkins', numIngredients: 2}
    ]);

    /** Set the data to pass into the models function */
    
    /** Execute the function */
    const result = await pantryModel.listAll();

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
    
    expect(typeof result[0].id).toBe('number');
    expect(typeof result[0].userId).toBe('number');
    expect(typeof result[0].username).toBe('string');
    expect(typeof result[0].numIngredients).toBe('number');

    expect(typeof result[1].id).toBe('number');
    expect(typeof result[1].userId).toBe('number');
    expect(typeof result[1].username).toBe('string');
    expect(typeof result[1].numIngredients).toBe('number');

    expect(result[0].id).toEqual(1);
    expect(result[0].userId).toEqual(1);
    expect(result[0].username).toEqual('admin');
    expect(result[0].numIngredients).toEqual(0);

    expect(result[1].id).toEqual(2);
    expect(result[1].userId).toEqual(2);
    expect(result[1].username).toEqual('twatkins');
    expect(result[1].numIngredients).toEqual(2);

  });

  it('should return an empty array if no records found', async () => {

    /** Mock the DB responses if need be*/
    tracker.on.select('pantries').response([]);

    /** Set the data to pass into the models function */
    
    /** Execute the function */
    const result = await pantryModel.listAll();

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should throw a generic error for other issues', async () => {

    /** Mock the DB responses */
    tracker.on.delete('pantry_ingredients')
      .simulateError('Lost connection to DB');

    /** Set the data to pass into the models function */

    /** Execute the function */
    const result = await pantryModel.listAll();

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was a problem with the resource, please try again later')

  });

});

describe('pantryModel.list', () => {

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
  
    it('should return all pantries', async () => {
  
      /** Mock the DB responses */
      tracker.on.select('pantries').response([
        { id: 1, userId: 1, username: 'admin', numIngredients: 0},
      ]);
  
      /** Set the data to pass into the models function */
      const pantryId = 1;
      
      /** Execute the function */
      const result = await pantryModel.list(pantryId);
  
      /** Test the response back from the function */
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
      
      expect(typeof result[0].id).toBe('number');
      expect(typeof result[0].userId).toBe('number');
      expect(typeof result[0].username).toBe('string');
      expect(typeof result[0].numIngredients).toBe('number');
  
      expect(result[0].id).toEqual(1);
      expect(result[0].userId).toEqual(1);
      expect(result[0].username).toEqual('admin');
      expect(result[0].numIngredients).toEqual(0);
  
    });
  
    it('should return an empty array if no records found', async () => {
  
      /** Mock the DB responses if need be*/
      tracker.on.select('pantries').response([]);
  
      /** Set the data to pass into the models function */
      const pantryId = 10;
      
      /** Execute the function */
      const result = await pantryModel.list(pantryId);
  
      /** Test the response back from the function */
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(0);
  
    });
  
    it('should throw a generic error for other issues', async () => {
  
      /** Mock the DB responses */
      tracker.on.delete('pantry_ingredients')
        .simulateError('Lost connection to DB');
  
      /** Set the data to pass into the models function */
      const pantryId = 1;
      
      /** Execute the function */
      const result = await pantryModel.list(pantryId);
  
      /** Test the response back from the function */
      expect(typeof result).toBe('object');
      expect(result.success).toBe(false);
      expect(result.message).toEqual('There was a problem with the resource, please try again later')
  
    });

});

describe('pantryModel.removeAllByUserId', () => {

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

  it('should remove all pantries for a specified user', async () => {

    /** Mock the DB responses */
    tracker.on.delete('pantries').response(1);

    /** Set the data to pass into the models function */
    const userId = 1;
    
    /** Execute the function */
    const result = await pantryModel.removeAllByUser(userId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');

    expect(typeof result.count).toBe('number');
    expect(result.count).toEqual(1);

  });

  it('should throw an error if the userId is undefined', async () => {

    /** Mock the DB responses */
    tracker.on.delete('pantries').response(0);

    /** Set the data to pass into the models function */
    let userId;
    
    /** Execute the function */
    const result = await pantryModel.removeAllByUser(userId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');

    expect(typeof result.count).toBe('number');
    expect(result.count).toEqual(0);

    expect(typeof result.success).toBe('boolean');
    expect(result.success).toEqual(false);

    expect(typeof result.message).toBe('string');
    expect(result.message).toEqual('Undefined userId');

  });

  it('should return an error if no pantries to remove', async () => {

    /** Mock the DB responses if need be*/
    tracker.on.delete('pantries').response(0);

    /** Set the data to pass into the models function */
    const userId = 1;
    
    /** Execute the function */
    const result = await pantryModel.removeAllByUser(userId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');

    expect(typeof result.count).toBe('number');
    expect(result.count).toEqual(0);
  });

  it('should throw a generic error for other issues', async () => {

    /** Mock the DB responses */
    tracker.on.delete('pantries')
      .simulateError('Lost connection to DB');

    /** Set the data to pass into the models function */
    const userId = 1;
   
    /** Execute the function */
    const result = await pantryModel.removeAllByUser(userId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was an issue with the resource, please try again later')

  });

});