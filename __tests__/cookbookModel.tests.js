/*
 * Packages needed for scripts
 */
const knex = require('knex');
const db = require('../database');
const cookbookModel = require('../models/cookbookModel');
const { getTracker, Tracker } = require('knex-mock-client');

/* Mock the DB library */
jest.mock('../database', () => {
  const knex = require('knex');
  const { MockClient } = require('knex-mock-client');
  return knex({ client: MockClient })
});

/* Tracker for the SQL commands */
let tracker;

describe('cookbookModel.create', () => {

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

  it('should create a new cookbook', async () => {

    /** Mock the DB responses */
    tracker.on.insert('cookbooks').response({
      success: true,
      message: 'Cookbook successfully added'
    });

    /** Set the data to pass into the models function */
    const userId = 1;
    const name = 'Ultimate Vegan Cookbook';
    const description = 'Collection of vegan recipes I have made';
    const image = null;

    /** Execute the function */
    const result = await cookbookModel.create(userId, name, description, image);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toEqual('Cookbook successfully added');

  });

  it('should error if required values are missing or incorrect', async () => {

    /** Mock the DB responses if needed*/

    /** Set the data to pass into the models function */
    const userId = null;
    const name = 'Ultimate Vegan Cookbook';
    const description = 'Collection of vegan recipes I have made';
    const image = null;

    /** Execute the function */
    const result = await cookbookModel.create(userId, name, description, image);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should display a generic error for all other error types', async () => {

    /** Mock the DB responses */
    tracker.on.insert('cookbooks').simulateError('connection to database has been lost');

    /** Set the data to pass into the models function */
    const userId = 1;
    const name = 'Ultimate Vegan Cookbook';
    const description = 'Collection of vegan recipes I have made';
    const image = null;

    /** Execute the function */
    const result = await cookbookModel.create(userId, name, description, image);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was an issue with the resource, please try again later')

  });

});

describe('cookbookModel.remove', () => {

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

  it('should remove the desired cookbook', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbooks').response({
      success: true,
      message: 'Cookbook removed successfully'
    });

    /** Set the data to pass into the models function */
    const cookbookId = 1;

    /** Execute the function */
    const result = await cookbookModel.remove(cookbookId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toEqual('Cookbook successfully removed');

  });

  it('should error if required data is missing or invalid', async () => {

    /** Mock the DB responses if needed*/

    /** Set the data to pass into the models function */
    const cookbookId = null;

    /** Execute the function */
    const result = await cookbookModel.remove(cookbookId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or invalid');

  });

  it('should dispay a generic error for all other error types', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbooks').simulateError('lost connection to database');

    /** Set the data to pass into the models function */
    const cookbookId = 1;

    /** Execute the function */
    const result = await cookbookModel.remove(cookbookId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was an issue with the resource, please try again later');

  });

});

describe('cookbookModel.update', () => {

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

  it('should update the specified cookbook', async () => {

    /** Mock the DB responses */
    tracker.on.update('cookbooks').response({
      success: true,
      message: 'Cookbook successfully updated'
    });

    /** Set the data to pass into the models function */
    const cookbookId = 1;
    const userId = 2;
    const name = 'Updated cookbook';
    const description = 'Changed cook to new owner';
    const image = null;

    /** Execute the function */
    const result = await cookbookModel.update(cookbookId, userId, name, description, image);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toEqual('Cookbook successfully updated');

  });

  it('should error if the required values are missing or incorrect', async () => {

    /** Mock the DB responses if needed*/

    /** Set the data to pass into the models function */
    const cookbookId = null;
    const userId = 2;
    const name = 'Updated cookbook';
    const description = 'Changed cook to new owner';
    const image = null;

    /** Execute the function */
    const result = await cookbookModel.update(cookbookId, userId, name, description, image);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return a generic error message for all other errors', async () => {

    /** Mock the DB responses */
    tracker.on.update('cookbooks').simulateError('lost connection to database');

    /** Set the data to pass into the models function */
    const cookbookId = 1;
    const userId = 2;
    const name = 'Updated cookbook';
    const description = 'Changed cook to new owner';
    const image = null;

    /** Execute the function */
    const result = await cookbookModel.update(cookbookId, userId, name, description, image);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was an issue with the resource, please try again later');

  });

});

describe('cookbookModel.findAll', () => {

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

  it('should return a list of all cookbooks', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbooks').response([
      { id: 1, userId: 1, name: 'Ultimate Vegan Recipes', description: 'Collection of some amazingly tasty vegan recipes', image: ''},
      { id: 2, userId: 2, name: 'Choclovers paradise', description: 'A small collection of chocholate dishes for everyones taste', image: ''}
    ]);

    /** Set the data to pass into the models function */

    /** Execute the function */
    const result = await cookbookModel.findAll();

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);

    /* Check each record returned */
    expect(typeof result[0].id).toBe('number');
    expect(result[0].id).toEqual(1);
    expect(typeof result[0].userId).toBe('number');
    expect(result[0].userId).toEqual(1);
    expect(typeof result[0].name).toBe('string');
    expect(result[0].name).toEqual('Ultimate Vegan Recipes');
    expect(typeof result[0].description).toBe('string');
    expect(result[0].description).toEqual('Collection of some amazingly tasty vegan recipes');
    expect(typeof result[0].image).toBe('string');
    expect(result[0].image).toEqual('');

    expect(typeof result[1].id).toBe('number');
    expect(result[1].id).toEqual(2);
    expect(typeof result[1].userId).toBe('number');
    expect(result[1].userId).toEqual(2);
    expect(typeof result[1].name).toBe('string');
    expect(result[1].name).toEqual('Choclovers paradise');
    expect(typeof result[1].description).toBe('string');
    expect(result[1].description).toEqual('A small collection of chocholate dishes for everyones taste');
    expect(typeof result[1].image).toBe('string');
    expect(result[1].image).toEqual('');

  });

  it('should return an empty array if no cookbooks to find', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbooks').response([]);

    /** Set the data to pass into the models function */

    /** Execute the function */
    const result = await cookbookModel.findAll();

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should show a generic error if any other issue occurs', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbooks').simulateError('lost connection to database');

    /** Set the data to pass into the models function */

    /** Execute the function */
    const result = await cookbookModel.findAll();

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was an issue with the resource, please try again later');

  });

});

describe('cookbookModel.recipes', () => {

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

  it('should return cookbooks recipes', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbook_recipes').response(
      [
        {
          recipeId: 1,
          name: 'Vegan oaty chocolate bars',
          rating: 6
        },
        {
          recipeId: 2,
          name: 'Gluten free focaccia bread',
          rating: 12
        }
      ]
    );

    tracker.on.select('recipe_categories').response([
      {
        name: 'Vegan',
        categoryId: 1,
        recipeId: 1,
      },
      {
        name: 'Gluten free',
        categoryId: 2,
        recipeId: 1,
      },
      {
        name: 'Gluten free',
        categoryId: 2,
        recipeId: 2,
      },
      {
        name: 'Milk Free',
        categoryId: 3,
        recipeId: 1,
      },
      {
        name: 'Vegetarian',
        categoryId: 4,
        recipeId: 6,
      },
    ]);

    /** Set the data to pass into the models function */
    const cookbookId = 1;

    /** Execute the function */
    const result = await cookbookModel.recipes(cookbookId);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);

    /* Check the data returned is not malformed in anyway */
    expect(typeof result[0].id).toBe('number');
    expect(result[0].id).toEqual(1);

    expect(typeof result[0].name).toBe('string');
    expect(result[0].name).toEqual('Vegan oaty chocolate bars');

    expect(typeof result[0].rating).toBe('number');
    expect(result[0].rating).toEqual(6);

    expect(Array.isArray(result[0].categories)).toBe(true);
    expect(result[0].categories).toHaveLength(3);

    expect(typeof result[1].id).toBe('number');
    expect(result[1].id).toEqual(2);

    expect(typeof result[1].name).toBe('string');
    expect(result[1].name).toEqual('Gluten free focaccia bread');

    expect(typeof result[1].rating).toBe('number');
    expect(result[1].rating).toEqual(12);

    expect(Array.isArray(result[1].categories)).toBe(true);
    expect(result[1].categories).toHaveLength(1);

  });

  it('should return an empty array if no recipes', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbook_recipes').response([]);
    tracker.on.select('recipe_categories').response([]);

    /** Set the data to pass into the models function */
    const cookbookId = 1;

    /** Execute the function */
    const result = await cookbookModel.recipes(cookbookId);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should error if required values are missing or incorrect', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbook_recipes').response([]);
    tracker.on.select('recipe_categories').response([]);

    /** Set the data to pass into the models function */
    const cookbookId = null;

    /** Execute the function */
    const result = await cookbookModel.recipes(cookbookId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return a generic error for all non custom errors', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbook_recipes').simulateError('lost connection to DB');
    tracker.on.select('recipe_categories').response([]);

    /** Set the data to pass into the models function */
    const cookbookId = 1;

    /** Execute the function */
    const result = await cookbookModel.recipes(cookbookId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was a problem with the resource, please try again later');

  });

});

describe('cookbookModel.findById', () => {

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

  it('should return the requested item', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbooks').response([
      {
        id: 1,
        userId: 3,
        name: 'Gluten Free bread recipes',
        description: 'Collection of bread recipes made with gluten free flour',
        image: 'gluten_free.jpg'
      }
    ]);

    /** Set the data to pass into the models function */
    const cookbookId = 1;

    /** Execute the function */
    const result = await cookbookModel.findById(cookbookId);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);
    expect(typeof result[0].id).toBe('number');
    expect(result[0].id).toEqual(1);
    expect(typeof result[0].userId).toBe('number');
    expect(result[0].userId).toEqual(3);
    expect(typeof result[0].name).toBe('string');
    expect(result[0].name).toEqual('Gluten Free bread recipes');
    expect(typeof result[0].description).toBe('string');
    expect(result[0].description).toEqual('Collection of bread recipes made with gluten free flour');
    expect(typeof result[0].image).toBe('string');
    expect(result[0].image).toEqual('gluten_free.jpg');

  });

  it('should error if required values are missing or incorrect', async () => {

    /** Mock the DB responses if needed */

    /** Set the data to pass into the models function */
    const cookbookId = null;

    /** Execute the function */
    const result = await cookbookModel.findById(cookbookId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return nothing if no items found', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbooks').response([]);

    /** Set the data to pass into the models function */
    const cookbookId = 2309;

    /** Execute the function */
    const result = await cookbookModel.findById(cookbookId);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should show a generic error for non custom errors', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbooks').simulateError('lost connection to database');

    /** Set the data to pass into the models function */
    const cookbookId = 1;

    /** Execute the function */
    const result = await cookbookModel.findById(cookbookId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was an issue with the resource, please try again later');


  });

});

describe('cookbookModel.findByName', () => {

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

  it('should return the requested item', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbooks').response([
      {
        id: 1,
        userId: 3,
        name: 'Gluten Free bread recipes',
        description: 'Collection of bread recipes made with gluten free flour',
        image: 'gluten_free.jpg'
      }
    ]);

    /** Set the data to pass into the models function */
    const term = 'bread';

    /** Execute the function */
    const result = await cookbookModel.findByName(term);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);
    expect(typeof result[0].id).toBe('number');
    expect(result[0].id).toEqual(1);
    expect(typeof result[0].userId).toBe('number');
    expect(result[0].userId).toEqual(3);
    expect(typeof result[0].name).toBe('string');
    expect(result[0].name).toEqual('Gluten Free bread recipes');
    expect(typeof result[0].description).toBe('string');
    expect(result[0].description).toEqual('Collection of bread recipes made with gluten free flour');
    expect(typeof result[0].image).toBe('string');
    expect(result[0].image).toEqual('gluten_free.jpg');

  });

  it('should error if required values are missing or incorrect', async () => {

    /** Mock the DB responses if needed */

    /** Set the data to pass into the models function */
    const term = null;

    /** Execute the function */
    const result = await cookbookModel.findByName(term);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return nothing if no items found', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbooks').response([]);

    /** Set the data to pass into the models function */
    const term = 'balls';

    /** Execute the function */
    const result = await cookbookModel.findByName(term);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should show a generic error for non custom errors', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbooks').simulateError('lost connection to database');

    /** Set the data to pass into the models function */
    const term = 'bread';

    /** Execute the function */
    const result = await cookbookModel.findByName(term);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was an issue with the resource, please try again later');


  });

});

describe('cookbookModel.findAllByName', () => {

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

  it('should return a list of all cookbooks', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbooks').response([
      { id: 1, userId: 1, name: 'Ultimate Vegan Recipes', description: 'Collection of some amazingly tasty vegan recipes', image: ''},
      { id: 2, userId: 2, name: 'Choclovers paradise', description: 'A small collection of chocholate dishes for everyones taste', image: ''}
    ]);

    /** Set the data to pass into the models function */
    const terms = 'e';

    /** Execute the function */
    const result = await cookbookModel.findAllByName(terms);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);

    /* Check each record returned */
    expect(typeof result[0].id).toBe('number');
    expect(result[0].id).toEqual(1);
    expect(typeof result[0].userId).toBe('number');
    expect(result[0].userId).toEqual(1);
    expect(typeof result[0].name).toBe('string');
    expect(result[0].name).toEqual('Ultimate Vegan Recipes');
    expect(typeof result[0].description).toBe('string');
    expect(result[0].description).toEqual('Collection of some amazingly tasty vegan recipes');
    expect(typeof result[0].image).toBe('string');
    expect(result[0].image).toEqual('');

    expect(typeof result[1].id).toBe('number');
    expect(result[1].id).toEqual(2);
    expect(typeof result[1].userId).toBe('number');
    expect(result[1].userId).toEqual(2);
    expect(typeof result[1].name).toBe('string');
    expect(result[1].name).toEqual('Choclovers paradise');
    expect(typeof result[1].description).toBe('string');
    expect(result[1].description).toEqual('A small collection of chocholate dishes for everyones taste');
    expect(typeof result[1].image).toBe('string');
    expect(result[1].image).toEqual('');

  });

  it('should error if required values are missing or incorrect', async () => {

    /** Mock the DB responses if needed */

    /** Set the data to pass into the models function */
    const terms = null;

    /** Execute the function */
    const result = await cookbookModel.findAllByName(terms);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return an empty array if no cookbooks to find', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbooks').response([]);

    /** Set the data to pass into the models function */
    const terms = 'fourteen';

    /** Execute the function */
    const result = await cookbookModel.findAllByName(terms);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should show a generic error if any other issue occurs', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbooks').simulateError('lost connection to database');

    //** Set the data to pass into the models function */
    const terms = 'e';

    /** Execute the function */
    const result = await cookbookModel.findAllByName(terms);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was an issue with the resource, please try again later');

  });

});

describe('cookbookModel.removeAll', () => {

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

  it('should remove all cookbooks', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbooks').response({
      success: true,
      message: 'Cookbooks successfully removed'
    });

    /** Execute the function */
    const result = await cookbookModel.removeAll();

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toEqual('All cookbooks removed successfully');

  });

  it('should dispay a generic error for all other error types', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbooks').simulateError('lost connection to database');

    /** Execute the function */
    const result = await cookbookModel.removeAll();

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was an issue with the resource, please try again later');

  });

});

describe('cookbookModel.findByUserId', () => {

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

  it('should return the desired users cookbooks', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbooks').response([
      {
        id: 1,
        userId: 3,
        name: 'Gluten free bread recipes',
        description: 'Collection of bread recipes made with gluten free flour',
        image: 'gluten_free.jpg'
      }
    ]);

    /** Set the data to pass into the models function */
    const userId = 3;

    /** Execute the function */
    const result = await cookbookModel.findByUserId(userId);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);

    expect(typeof result[0].id).toBe('number');
    expect(typeof result[0].userId).toBe('number');
    expect(typeof result[0].name).toBe('string');
    expect(typeof result[0].description).toBe('string');
    expect(typeof result[0].image).toBe('string');

    expect(result[0].id).toEqual(1);
    expect(result[0].userId).toEqual(userId);
    expect(result[0].name).toEqual('Gluten free bread recipes');
    expect(result[0].description).toEqual('Collection of bread recipes made with gluten free flour');
    expect(result[0].image).toEqual('gluten_free.jpg');

  });

  it('should return an empty array if no records found', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbooks').response([]);

    /** Set the data to pass into the models function */
    const userId = 3243;

    /** Execute the function */
    const result = await cookbookModel.findByUserId(userId);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should return an error if the user ID is missing', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbooks').response([]);

    /** Set the data to pass into the models function */
    let userId;

    /** Execute the function */
    const result = await cookbookModel.findByUserId(userId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');

    expect(typeof result.success).toBe('boolean');
    expect(typeof result.message).toBe('string');

    expect(result.success).toEqual(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return an error if the resource encountered a problem', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbooks').simulateError('lost connection to database');

    /** Set the data to pass into the models function */
    let userId = 12;

    /** Execute the function */
    const result = await cookbookModel.findByUserId(userId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');

    expect(typeof result.success).toBe('boolean');
    expect(typeof result.message).toBe('string');

    expect(result.success).toEqual(false);
    expect(result.message).toEqual('There was a problem with the resource, please try again later');

  });

});

describe('cookbookModel.removeAllByUser', () => {

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

  it('should remove all cookbooks for a particular userId', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbooks').response({
      success: true,
      message: 'Cookbooks successfully removed'
    });

    /* Set any values to pass to method to be tested */
    const userId = 1;

    /** Execute the function */
    const result = await cookbookModel.removeAllByUser(userId);
    
    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toEqual('All cookbooks removed successfully');

  });

  it('should return an error if the userId is undefined', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbooks').response([]);

    /* Set any values to pass to method to be tested */
    let userId;

    /** Execute the function */
    const result = await cookbookModel.removeAllByUser(userId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('Undefined userId');

  });

  it('should dispay a generic error for all other error types', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbooks').simulateError('lost connection to database');

    /* Set any values to pass to method to be tested */
    const userId = 1;

    /** Execute the function */
    const result = await cookbookModel.removeAllByUser(userId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was an issue with the resource, please try again later');

  });

});

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
