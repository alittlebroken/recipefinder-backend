/*
 * Packages needed for scripts
 */
const knex = require('knex');
const db = require('../database');
const cookbookCategoriesModel = require('../models/cookbookCategoriesModel');
const { getTracker, Tracker } = require('knex-mock-client');

/* Mock the DB library */
jest.mock('../database', () => {
  const knex = require('knex');
  const { MockClient } = require('knex-mock-client');
  return knex({ client: MockClient })
});

/* Tracker for the SQL commands */
let tracker;

describe('cookbookCategoriesModel.create', () => {

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

  it('should add the new record to the DB', async () => {

    /** Mock the DB responses */
    tracker.on.insert('cookbook_categories').response([{ id: 1}]);

    /** Set the data to pass into the models function */
    const newRecord = {
      cookbookId: 1,
      categoryId: 1
    };

    /** Execute the function */
    const result = await cookbookCategoriesModel.create(newRecord);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toBe('Category successfully added to cookbook');

  });

  it('should return an error if passed in object is missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const newRecord = null;

    /** Execute the function */
    const result = await cookbookCategoriesModel.create(newRecord);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should return an error if passed category id in object is missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const newRecord = {
      cookbookId: 1,
      categoryId: null
    };

    /** Execute the function */
    const result = await cookbookCategoriesModel.create(newRecord);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should return an error if cookbook id in object is missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const newRecord = {
      cookbookId: null,
      categoryId: 1
    };

    /** Execute the function */
    const result = await cookbookCategoriesModel.create(newRecord);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should return a generic error if any third party libraries produce an error', async () => {

    /** Mock the DB responses */
    tracker.on.insert('cookbook_recipes').simulateError('DB Connection lost');

    /** Set the data to pass into the models function */
    const newRecord = {
      cookbookId: 1,
      categoryId: 1
    };

    /** Execute the function */
    const result = await cookbookCategoriesModel.create(newRecord);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('There was an issue with the resource, please try again later');

  });

});

describe('cookbookCategoriesModel.update', () => {

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
    tracker.on.update('cookbook_categories').response([{id: 1}]);

    /** Set the data to pass into the models function */
    const updatedRecord = {
      id: 1,
      cookbookId: 1,
      categoryId: 1
    }

    /** Execute the function */
    const result = await cookbookCategoriesModel.update(updatedRecord);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toBe('Record updated successfully');

  });

  it('should return an empty array if no record found to update', async () => {

    /** Mock the DB responses */
    tracker.on.update('cookbook_categories').response([]);

    /** Set the data to pass into the models function */
    const updatedRecord = {
      id: 1,
      cookbookId: 1,
      categoryId: 1
    };

    /** Execute the function */
    const result = await cookbookCategoriesModel.update(updatedRecord);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should return an error if passed in object is missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const updatedRecord = null;

    /** Execute the function */
    const result = await cookbookCategoriesModel.update(updatedRecord);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should return an error if passed in objects id value is missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const updatedRecord = { id: null, cookbookId: 1, categoryId: 1};

    /** Execute the function */
    const result = await cookbookCategoriesModel.update(updatedRecord);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should return an error if passed in objects cookbook id is missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const updatedRecord = { id: 1, cookbookId: null, categoryId: 1};

    /** Execute the function */
    const result = await cookbookCategoriesModel.update(updatedRecord);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should return an error if passed in objects category id is missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const updatedRecord = { id: 1, cookbookId: 1, categoryId: null};

    /** Execute the function */
    const result = await cookbookCategoriesModel.update(updatedRecord);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should return a generic error if a third party library encounters an issue', async () => {

    /** Mock the DB responses */
    tracker.on.update('cookbook_categories').simulateError('Lost connection to DB');

    /** Set the data to pass into the models function */
    const updatedRecord = { id: 1, cookbookId: 1, categoryId: 1};

    /** Execute the function */
    const result = await cookbookCategoriesModel.update(updatedRecord);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('There was an issue with the resource, please try again later');

  });

});

describe('cookbookCategoriesModel.remove', () => {

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

  it('should remove the specified record', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbook_categories').response(1);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await cookbookCategoriesModel.remove(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toBe('Cookbook category removed successfully');

  });

  it('should return an empty array if no records found to be removed', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbook_categories').response([]);

    /** Set the data to pass into the models function */
    const cookbookCategoryId = 1234;

    /** Execute the function */
    const result = await cookbookCategoriesModel.remove(cookbookCategoryId);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);


  });

  it('should return an error if id is missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const cookbookCategoryId = null;

    /** Execute the function */
    const result = await cookbookCategoriesModel.remove(cookbookCategoryId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should return a generic error if third party library encounters an issue', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbook_categories').simulateError('Lost DB connection');

    /** Set the data to pass into the models function */
    const cookbookCategoryId = 1;

    /** Execute the function */
    const result = await cookbookCategoriesModel.remove(cookbookCategoryId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('There was an issue with the resource, please try again later');

  });

});

describe('cookbookCategoriesModel.removeAll', () => {

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

  it('should remove all entries', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbook_categories').response(5);

    /** Set the data to pass into the models function */

    /** Execute the function */
    const result = await cookbookCategoriesModel.removeAll();

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toBe('All cookbook categories removed successfully');

  });

  it('should return an empty array if no records to remove', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbook_categories').response([]);

    /** Set the data to pass into the models function */

    /** Execute the function */
    const result = await cookbookCategoriesModel.removeAll();

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should return a generic error if a third party library porduces an error', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbook_categories').simulateError('Lost DB connection');

    /** Set the data to pass into the models function */

    /** Execute the function */
    const result = await cookbookCategoriesModel.removeAll();

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('There was an issue with the resource, please try again later');

  });

});

describe('cookbookCategoriesModel.removeByCookbook', () => {

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

  it('should remove entries based on the cookbook id', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbook_categories').response(3);

    /** Set the data to pass into the models function */
    const cookbookId = 1;

    /** Execute the function */
    const result = await cookbookCategoriesModel.removeByCookbook(cookbookId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toBe('All categories for specified cookbook removed successfully');

  });

  it('should return an empty array if no records to remove', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbook_categories').response([]);

    /** Set the data to pass into the models function */
    const cookbookId = 1;

    /** Execute the function */
    const result = await cookbookCategoriesModel.removeByCookbook(cookbookId);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should return an error if cookbook id is missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const cookbookId = null;

    /** Execute the function */
    const result = await cookbookCategoriesModel.removeByCookbook(cookbookId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should return a generic error if a third party library produces an error', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbook_categories').simulateError('DB Connection lost');

    /** Set the data to pass into the models function */
    const cookbookId = 1;

    /** Execute the function */
    const result = await cookbookCategoriesModel.removeByCookbook(cookbookId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('There was an issue with the resource, please try again later');

  });

});

describe('cookbookCategoriesModel.removeByCategory', () => {

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

  it('should remove the chosen category entries', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbook_categories').response(1);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await cookbookCategoriesModel.removeByCategory(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toBe('All categories matching if successfully removed');

  });

  it('should return an empty array if no records found to be removed', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbook_categories').response([]);

    /** Set the data to pass into the models function */
    const id = 2;

    /** Execute the function */
    const result = await cookbookCategoriesModel.removeByCategory(id);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should return an error if one or more required values are missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const id = null;

    /** Execute the function */
    const result = await cookbookCategoriesModel.removeByCategory(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should return a generic error if third party library produces and error', async () => {

    /** Mock the DB responses */
    tracker.on.delete('cookbook_categories').simulateError('Lost DB Connection');

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await cookbookCategoriesModel.removeByCategory(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('There was an issue with the resource, please try again later');

  });

});

describe('cookbookCategoriesModel.findAll', () => {

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

  it('should return all entries in the table', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbook_categories').response([{
      id: 1,
      cookbookId: 1,
      cookbookName: 'Fantastic meals and where to find them',
      categoryId: 1,
      categoryName: 'Breakfasts'
    }]);

    /** Set the data to pass into the models function */

    /** Execute the function */
    const result = await cookbookCategoriesModel.findAll();

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);

    expect(typeof result[0].id).toBe('number');
    expect(result[0].id).toBe(1);

    expect(typeof result[0].cookbookId).toBe('number');
    expect(result[0].cookbookId).toBe(1);

    expect(typeof result[0].cookbookName).toBe('string');
    expect(result[0].cookbookName).toBe('Fantastic meals and where to find them');

    expect(typeof result[0].categoryId).toBe('number');
    expect(result[0].categoryId).toBe(1);

    expect(typeof result[0].categoryName).toBe('string');
    expect(result[0].categoryName).toBe('Breakfasts');


  });

  it('should return an empty array if no records to be found', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbook_categories').response([]);

    /** Set the data to pass into the models function */

    /** Execute the function */
    const result = await cookbookCategoriesModel.findAll();

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should return a generic error if the third party library produces and error', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbook_categories').simulateError('Lost DB Connection');

    /** Set the data to pass into the models function */

    /** Execute the function */
    const result = await cookbookCategoriesModel.findAll();

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('There was an issue with the resource, please try again later');

  });

});

describe('cookbookCategoriesModel.findByCookbook', () => {

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

  it('should find all categories for a cookbook', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbook_categories').response([{
      id: 1,
      cookbookId: 1,
      cookbookName: 'Fantastic meals and where to find them',
      categoryId: 1,
      categoryName: 'Breakfasts'
    }]);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await cookbookCategoriesModel.findByCookbook(id);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);

    expect(typeof result[0].id).toBe('number');
    expect(result[0].id).toBe(1);

    expect(typeof result[0].cookbookId).toBe('number');
    expect(result[0].cookbookId).toBe(1);

    expect(typeof result[0].cookbookName).toBe('string');
    expect(result[0].cookbookName).toBe('Fantastic meals and where to find them');

    expect(typeof result[0].categoryId).toBe('number');
    expect(result[0].categoryId).toBe(1);

    expect(typeof result[0].categoryName).toBe('string');
    expect(result[0].categoryName).toBe('Breakfasts');

  });

  it('should return an empty array if no records found', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbook_categories').response([]);

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await cookbookCategoriesModel.findByCookbook(id);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should return an error if required values are missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const id = null;

    /** Execute the function */
    const result = await cookbookCategoriesModel.findByCookbook(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should return a generic error if third party libraries produce and error', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbook_categories').simulateError('Lost connection to DB');

    /** Set the data to pass into the models function */
    const id = 1;

    /** Execute the function */
    const result = await cookbookCategoriesModel.findByCookbook(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('There was an issue with the resource, please try again later');

  });

});

describe('cookbookCategoriesModel.findByCategory', () => {

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

  it('should find all cookbooks that have a certain category', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbook_categories').response([{
      id: 1,
      cookbookId: 1,
      cookbookName: 'Fantastic meals and where to find them',
      categoryId: 1,
      categoryName: 'Breakfasts'
    }]);

    /** Set the data to pass into the models function */
    const id = 3;

    /** Execute the function */
    const result = await cookbookCategoriesModel.findByCategory(id);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);

    expect(typeof result[0].id).toBe('number');
    expect(result[0].id).toBe(1);

    expect(typeof result[0].cookbookId).toBe('number');
    expect(result[0].cookbookId).toBe(1);

    expect(typeof result[0].cookbookName).toBe('string');
    expect(result[0].cookbookName).toBe('Fantastic meals and where to find them');

    expect(typeof result[0].categoryId).toBe('number');
    expect(result[0].categoryId).toBe(1);

    expect(typeof result[0].categoryName).toBe('string');
    expect(result[0].categoryName).toBe('Breakfasts');

  });

  it('should return an empty array if no records found', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbook_categories').response([]);

    /** Set the data to pass into the models function */
    const id = 3;

    /** Execute the function */
    const result = await cookbookCategoriesModel.findByCategory(id);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

  });

  it('should return an error if required values are missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const id = null;

    /** Execute the function */
    const result = await cookbookCategoriesModel.findByCategory(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('One or more required values are missing or incorrect');

  });

  it('should return a generic error if third party libraries produce and error', async () => {

    /** Mock the DB responses */
    tracker.on.select('cookbook_categories').simulateError('Lost connection to DB');

    /** Set the data to pass into the models function */
    const id = 3;

    /** Execute the function */
    const result = await cookbookCategoriesModel.findByCategory(id);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('There was an issue with the resource, please try again later');

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
