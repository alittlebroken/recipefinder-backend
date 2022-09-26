/*
 * Packages needed for scripts
 */
const knex = require('knex');
const db = require('../database');
const recipeModel = require('../models/recipeModel');
const { getTracker, Tracker } = require('knex-mock-client');

/* Mock the DB library */
jest.mock('../database', () => {
  const knex = require('knex');
  const { MockClient } = require('knex-mock-client');
  return knex({ client: MockClient })
});

/* Tracker for the SQL commands */
let tracker;
xdescribe('recipeModel.create', () => {

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

  it('should add the recipe', async () => {

    /** Mock the DB responses */
    tracker.on.insert('recipes').responseOnce([ { id: 1 }]);
    tracker.on.insert('steps').responseOnce([ { id: 1 } ]);
    tracker.on.insert('recipe_ingredients').responseOnce([ { id: 1} ]);
    tracker.on.insert('cookbook_recipes').responseOnce([ { id: 1 }]);
    tracker.on.insert('recipe_categories').responseOnce([ { id: 1} ]);

    /** Set the data to pass into the models function */
    const recipe = {
      userId: 1,
      name: 'Decadent Jackfruit and Basil Pizza with Chillis',
      description: 'Simple pizza with a perfect taste combination',
      author: null,
      servings: 2,
      calories_per_serving: 248,
      prep_time: 5,
      cook_time: 15,
      rating: 1
    };

    const steps = [{recipeID: 0, stepNo: 1, content: 'Preheat oven to 180 degrees centigrade'}];
    const ingredients = [{recipeId: 0, ingredientId: 1, amount: 150, amount_type: 'grams'}];
    const cookbookId = 1;
    const categories = [{recipeId: 0, categoryId: 1}];

    /** Execute the function */
    const result = await recipeModel.create(recipe, steps, ingredients, cookbookId, categories);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toEqual('Recipe successfully added');

    /* We need to ensure that the transaction called the inserts */
    expect(tracker.history.insert).toHaveLength(5);

  });

  it('should return an error if recipe object is not valid', async () => {

    /** Set the data to pass into the models function */
    const recipe = null;

    const steps = [{recipeID: 0, stepNo: 1, content: 'Preheat oven to 180 degrees centigrade'}];
    const ingredients = [{recipeId: 0, ingredientId: 1, amount: 150, amount_type: 'grams'}];
    const cookbookId = null;
    const categories = [{recipeId: 0, categoryId: 1}];

    /** Execute the function */
    const result = await recipeModel.create(recipe, steps, ingredients, cookbookId, categories);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return an error if recipe.userId is not valid', async () => {

    /** Set the data to pass into the models function */
    const recipe = { userid: 'ten' };

    const steps = [{recipeID: 0, stepNo: 1, content: 'Preheat oven to 180 degrees centigrade'}];
    const ingredients = [{recipeId: 0, ingredientId: 1, amount: 150, amount_type: 'grams'}];
    const cookbookId = null;
    const categories = [{recipeId: 0, categoryId: 1}];

    /** Execute the function */
    const result = await recipeModel.create(recipe, steps, ingredients, cookbookId, categories);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return an error if recipe.name is not valid', async () => {

    /** Set the data to pass into the models function */
    const recipe = { userId: 1, name: 26 };

    const steps = [{recipeID: 0, stepNo: 1, content: 'Preheat oven to 180 degrees centigrade'}];
    const ingredients = [{recipeId: 0, ingredientId: 1, amount: 150, amount_type: 'grams'}];
    const cookbookId = null;
    const categories = [{recipeId: 0, categoryId: 1}];

    /** Execute the function */
    const result = await recipeModel.create(recipe, steps, ingredients, cookbookId, categories);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return an error if recipe.servings is not valid', async () => {

    /** Set the data to pass into the models function */
    const recipe = { userId: 1, name: 'Vegan Squash', servings: 'twelve' };

    const steps = [{recipeID: 0, stepNo: 1, content: 'Preheat oven to 180 degrees centigrade'}];
    const ingredients = [{recipeId: 0, ingredientId: 1, amount: 150, amount_type: 'grams'}];
    const cookbookId = null;
    const categories = [{recipeId: 0, categoryId: 1}];

    /** Execute the function */
    const result = await recipeModel.create(recipe, steps, ingredients, cookbookId, categories);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return an error if recipe.calories_per_serving is not valid', async () => {

    /** Set the data to pass into the models function */
    const recipe = { userId: 1, name: 'Vegan Squash', servings: 12, calories_per_serving: {} };

    const steps = [{recipeID: 0, stepNo: 1, content: 'Preheat oven to 180 degrees centigrade'}];
    const ingredients = [{recipeId: 0, ingredientId: 1, amount: 150, amount_type: 'grams'}];
    const cookbookId = null;
    const categories = [{recipeId: 0, categoryId: 1}];

    /** Execute the function */
    const result = await recipeModel.create(recipe, steps, ingredients, cookbookId, categories);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return an error if recipe.prep_time is not valid', async () => {

    /** Set the data to pass into the models function */
    const recipe = {
      userId: 1, name: 'Vegan Squash', servings: 12, calories_per_serving: 54, prep_time: 'done'
    };

    const steps = [{recipeID: 0, stepNo: 1, content: 'Preheat oven to 180 degrees centigrade'}];
    const ingredients = [{recipeId: 0, ingredientId: 1, amount: 150, amount_type: 'grams'}];
    const cookbookId = null;
    const categories = [{recipeId: 0, categoryId: 1}];

    /** Execute the function */
    const result = await recipeModel.create(recipe, steps, ingredients, cookbookId, categories);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return an error if recipe.cook_time is not valid', async () => {

    /** Set the data to pass into the models function */
    const recipe = {
      userId: 1,
      name: 'Vegan Squash',
      servings: 12,
      calories_per_serving: 54,
      prep_time: 1,
      cook_time: 'never silly'
    };

    const steps = [{recipeID: 0, stepNo: 1, content: 'Preheat oven to 180 degrees centigrade'}];
    const ingredients = [{recipeId: 0, ingredientId: 1, amount: 150, amount_type: 'grams'}];
    const cookbookId = null;
    const categories = [{recipeId: 0, categoryId: 1}];

    /** Execute the function */
    const result = await recipeModel.create(recipe, steps, ingredients, cookbookId, categories);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return an error if steps array is not valid', async () => {

    /** Set the data to pass into the models function */
    const recipe = {
      userId: 1,
      name: 'Vegan Squash',
      servings: 12,
      calories_per_serving: 54,
      prep_time: 1,
      cook_time: 1
    };
    const steps = [];
    const ingredients = [{recipeId: 0, ingredientId: 1, amount: 150, amount_type: 'grams'}];
    const cookbookId = null;
    const categories = [{recipeId: 0, categoryId: 1}];

    /** Execute the function */
    const result = await recipeModel.create(recipe, steps, ingredients, cookbookId, categories);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return an error if ingredients array is not valid', async () => {

    /** Set the data to pass into the models function */
    const recipe = {
      userId: 1,
      name: 'Vegan Squash',
      servings: 12,
      calories_per_serving: 54,
      prep_time: 1,
      cook_time: 1
    };

    const steps = [{recipeID: 0, stepNo: 1, content: 'Preheat oven to 180 degrees centigrade'}];
    const ingredients = [];
    const cookbookId = null;
    const categories = [{recipeId: 0, categoryId: 1}];

    /** Execute the function */
    const result = await recipeModel.create(recipe, steps, ingredients, cookbookId, categories);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return an error if cookbookId is not valid', async () => {

    /** Set the data to pass into the models function */
    const recipe = {
      userId: 1,
      name: 'Vegan Squash',
      servings: 12,
      calories_per_serving: 54,
      prep_time: 1,
      cook_time: 1
    };

    const steps = [{recipeID: 0, stepNo: 1, content: 'Preheat oven to 180 degrees centigrade'}];
    const ingredients = [{recipeId: 0, ingredientId: 1, amount: 150, amount_type: 'grams'}];
    const cookbookId = null;
    const categories = [{recipeId: 0, categoryId: 1}];

    /** Execute the function */
    const result = await recipeModel.create(recipe, steps, ingredients, cookbookId, categories);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return an error if categories array is not valid', async () => {

    /** Set the data to pass into the models function */
    const recipe = {
      userId: 1,
      name: 'Vegan Squash',
      servings: 12,
      calories_per_serving: 54,
      prep_time: 1,
      cook_time: 1
    };

    const steps = [{recipeID: 0, stepNo: 1, content: 'Preheat oven to 180 degrees centigrade'}];
    const ingredients = [{recipeId: 0, ingredientId: 1, amount: 150, amount_type: 'grams'}];
    const cookbookId = 12;
    const categories = [];

    /** Execute the function */
    const result = await recipeModel.create(recipe, steps, ingredients, cookbookId, categories);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return a generic error if any libraries have issues for security', async () => {

    /** Mock the DB responses */
    tracker.on.insert('recipes').simulateError('lost connection to the database');

    /** Set the data to pass into the models function */
    const recipe = {
      userId: 1,
      name: 'Decadent Jackfruit and Basil Pizza with Chillis',
      description: 'Simple pizza with a perfect taste combination',
      author: 1,
      servings: 2,
      calories_per_serving: 248,
      prep_time: 5,
      cook_time: 15,
      rating: 1
    };

    const steps = [{recipeID: 0, stepNo: 1, content: 'Preheat oven to 180 degrees centigrade'}];
    const ingredients = [{recipeId: 0, ingredientId: 1, amount: 150, amount_type: 'grams'}];
    const cookbookId = 1;
    const categories = [{recipeId: 0, categoryId: 1}];

    /** Execute the function */
    const result = await recipeModel.create(recipe, steps, ingredients, cookbookId, categories);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was a problem with the resource, please try again later');

    /* We need to ensure that the transaction called the inserts */
    expect(tracker.history.insert).toHaveLength(1);

  });

});

xdescribe('recipeModel.remove', () => {

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

  it('should remove the recipe', async () => {

    /** Mock the DB responses */
    tracker.on.delete('recipe_categories').responseOnce(1);
    tracker.on.delete('cookbook_recipes').responseOnce(1);
    tracker.on.delete('recipe_ingredients').responseOnce(1);
    tracker.on.delete('steps').responseOnce(1);
    tracker.on.delete('recipes').responseOnce(1);

    /** Set the data to pass into the models function */
    const recipeId = 1;

    /** Execute the function */
    const result = await recipeModel.remove(recipeId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toEqual('Recipe successfully removed');
    expect(tracker.history.delete).toHaveLength(5);

  });

  it('should return an error if required values are missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */
    const recipeId = null;

    /** Execute the function */
    const result = await recipeModel.remove(recipeId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return a generic error if any libraries have issues for security', async () => {

    /** Mock the DB responses */
    tracker.on.delete('recipe_categories').simulateError('lost connection to database');

    /** Set the data to pass into the models function */
    const recipeId = 1;

    /** Execute the function */
    const result = await recipeModel.remove(recipeId);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was a problem with the resource, please try again later');

  });

});

xdescribe('recipeModel.update', () => {

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

  it('should update the recipe', async () => {

    /** Mock the DB responses */
    tracker.on.update('recipes').response([{id: 1}]);

    /** Set the data to pass into the models function */
    const updates = {
      id: 1,
      name: 'Vegan mystery chow',
      description: 'Some stuff we found in the garden thrown into a pot',
      userId: 1,
      servings: 12,
      calories_per_serving: 25,
      prep_time: 10,
      cook_time: 1,
      rating: 1
    }

    /** Execute the function */
    const result = await recipeModel.update(updates);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(true);
    expect(result.message).toEqual('Recipe successfully updated');

  });

  it('should return an error if update.id is missing or incorrect', async () => {

    /** Mock the DB responses */
    tracker.on.update('recipes').response([{id: 1}]);

    /** Set the data to pass into the models function */
    const updates = {
      id: null,
      name: 'Vegan mystery chow',
      description: 'Some stuff we found in the garden thrown into a pot',
      userId: 1,
      servings: 12,
      calories_per_serving: 25,
      prep_time: 10,
      cook_time: 1,
      rating: 1
    }

    /** Execute the function */
    const result = await recipeModel.update(updates);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return an error if update.name is missing or incorrect', async () => {

    /** Mock the DB responses */
    tracker.on.update('recipes').response([{id: 1}]);

    /** Set the data to pass into the models function */
    const updates = {
      id: 1,
      name: 12,
      description: 'Some stuff we found in the garden thrown into a pot',
      userId: 1,
      servings: 12,
      calories_per_serving: 25,
      prep_time: 10,
      cook_time: 1,
      rating: 1
    }

    /** Execute the function */
    const result = await recipeModel.update(updates);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return an error if update.userId is missing or incorrect', async () => {

    /** Mock the DB responses */
    tracker.on.update('recipes').response([{id: 1}]);

    /** Set the data to pass into the models function */
    const updates = {
      id: 1,
      name: 'Vegan mystery chow',
      description: 'Some stuff we found in the garden thrown into a pot',
      userId: 'one',
      servings: 12,
      calories_per_serving: 25,
      prep_time: 10,
      cook_time: 1,
      rating: 1
    }

    /** Execute the function */
    const result = await recipeModel.update(updates);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return an error if update.servings is missing or incorrect', async () => {

    /** Mock the DB responses */
    tracker.on.update('recipes').response([{id: 1}]);

    /** Set the data to pass into the models function */
    const updates = {
      id: 1,
      name: 'Vegan mystery chow',
      description: 'Some stuff we found in the garden thrown into a pot',
      userId: 1,
      servings: [12],
      calories_per_serving: 25,
      prep_time: 10,
      cook_time: 1,
      rating: 1
    }

    /** Execute the function */
    const result = await recipeModel.update(updates);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return an error if update.calories_per_serving is missing or incorrect', async () => {

      /** Mock the DB responses */
      tracker.on.update('recipes').response([{id: 1}]);

      /** Set the data to pass into the models function */
      const updates = {
        id: 1,
        name: 'Vegan mystery chow',
        description: 'Some stuff we found in the garden thrown into a pot',
        userId: 1,
        servings: 12,
        calories_per_serving: { amount: 25},
        prep_time: 10,
        cook_time: 1,
        rating: 1
  }

  /** Execute the function */
  const result = await recipeModel.update(updates);

  /** Test the response back from the function */
  expect(typeof result).toBe('object');
  expect(result.success).toBe(false);
  expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return an error if update.prep_time is missing or incorrect', async () => {

      /** Mock the DB responses */
      tracker.on.update('recipes').response([{id: 1}]);

      /** Set the data to pass into the models function */
      const updates = {
        id: 1,
        name: 'Vegan mystery chow',
        description: 'Some stuff we found in the garden thrown into a pot',
        userId: 1,
        servings: 12,
        calories_per_serving: 25,
        prep_time: 'Stephen',
        cook_time: 1,
        rating: 1
  }

  /** Execute the function */
  const result = await recipeModel.update(updates);

  /** Test the response back from the function */
  expect(typeof result).toBe('object');
  expect(result.success).toBe(false);
  expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return an error if update.cook_time is missing or incorrect', async () => {

      /** Mock the DB responses */
      tracker.on.update('recipes').response([{id: 1}]);

      /** Set the data to pass into the models function */
      const updates = {
        id: 1,
        name: 'Vegan mystery chow',
        description: 'Some stuff we found in the garden thrown into a pot',
        userId: 1,
        servings: 12,
        calories_per_serving: 25,
        prep_time: 10,
        cook_time: null,
        rating: 1
  }

  /** Execute the function */
  const result = await recipeModel.update(updates);

  /** Test the response back from the function */
  expect(typeof result).toBe('object');
  expect(result.success).toBe(false);
  expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return an error if update.rating is missing or incorrect', async () => {

      /** Mock the DB responses */
      tracker.on.update('recipes').response([{id: 1}]);

      /** Set the data to pass into the models function */
      const updates = {
        id: 1,
        name: 'Vegan mystery chow',
        description: 'Some stuff we found in the garden thrown into a pot',
        userId: 1,
        servings: 12,
        calories_per_serving: 25,
        prep_time: 10,
        cook_time: 1,
        rating: null
      }

      /** Execute the function */
      const result = await recipeModel.update(updates);

      /** Test the response back from the function */
      expect(typeof result).toBe('object');
      expect(result.success).toBe(false);
      expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return a generic error if any libraries have issues for security', async () => {

    /** Mock the DB responses */
    tracker.on.update('recipes').simulateError('lost connection to db');

    /** Set the data to pass into the models function */
    const updates = {
      id: 1,
      name: 'Vegan mystery chow',
      description: 'Some stuff we found in the garden thrown into a pot',
      userId: 1,
      servings: 12,
      calories_per_serving: 25,
      prep_time: 10,
      cook_time: 1,
      rating: 1
    }

    /** Execute the function */
    const result = await recipeModel.update(updates);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was a problem with the resource, please try again later');

  });

});

xdescribe('recipeModel.find', () => {

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

  it('should find one or more recipes by name', async () => {

    /** Mock the DB responses */
    tracker.on.select('recipes').responseOnce([{
      id: 1,
      userId: 1,
      name: 'Gooey chocolate cake',
      description: 'Sumptious and gooey chocolate cake. Perfect for an after dinner treat',
      servings: 4,
      calories_per_serving: 235,
      prep_time: 60,
      cook_time: 15,
      rating: 1236
    }]);

    tracker.on.select('recipe_ingredients').responseOnce([{
      id: 1,
      name: 'Eggs',
      amount: 6,
      amount_type: 'Large'
    }]);

    tracker.on.select('cookbook_recipes').responseOnce([{
      id: 1,
      name: 'Vegan treats',
      image: null
    }]);

    tracker.on.select('steps').responseOnce([{
      id: 1,
      stepNo: 1,
      content: 'Preheat oven to 200 degrees centigrade'
    }]);

    tracker.on.select('recipe_categories').responseOnce([{
      id: 1,
      name: 'Vegan'
    }]);

    /** Set the data to pass into the models function */
    const searchTerm = 'chocolate';

    /** Execute the function */
    const result = await recipeModel.find(searchTerm);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);

    expect(typeof result[0].id).toBe('number');
    expect(result[0].id).toBe(1);

    expect(typeof result[0].userId).toBe('number');
    expect(result[0].userId).toBe(1);

    expect(typeof result[0].name).toBe('string');
    expect(result[0].name).toEqual('Gooey chocolate cake');

    expect(typeof result[0].description).toBe('string');
    expect(result[0].description).toEqual('Sumptious and gooey chocolate cake. Perfect for an after dinner treat');

    expect(typeof result[0].servings).toBe('number');
    expect(result[0].servings).toBe(4);

    expect(typeof result[0].calories_per_serving).toBe('number');
    expect(result[0].calories_per_serving).toBe(235);

    expect(typeof result[0].prep_time).toBe('number');
    expect(result[0].prep_time).toBe(60);

    expect(typeof result[0].cook_time).toBe('number');
    expect(result[0].cook_time).toBe(15);

    expect(typeof result[0].rating).toBe('number');
    expect(result[0].rating).toBe(1236);

    expect(Array.isArray(result[0].ingredients)).toBe(true);
    expect(result[0].ingredients).toHaveLength(1);

    expect(typeof result[0].ingredients[0].id).toBe('number');
    expect(result[0].ingredients[0].id).toBe(1);

    expect(typeof result[0].ingredients[0].name).toBe('string');
    expect(result[0].ingredients[0].name).toBe('Eggs');

    expect(typeof result[0].ingredients[0].amount).toBe('number');
    expect(result[0].ingredients[0].amount).toBe(6);

    expect(typeof result[0].ingredients[0].amount_type).toBe('string');
    expect(result[0].ingredients[0].amount_type).toBe('Large');

    expect(Array.isArray(result[0].cookbooks)).toBe(true);
    expect(result[0].cookbooks).toHaveLength(1);

    expect(typeof result[0].cookbooks[0].id).toBe('number');
    expect(result[0].cookbooks[0].id).toBe(1);

    expect(typeof result[0].cookbooks[0].name).toBe('string');
    expect(result[0].cookbooks[0].name).toBe('Vegan treats');

    expect(Array.isArray(result[0].steps)).toBe(true);
    expect(result[0].steps).toHaveLength(1);

    expect(typeof result[0].steps[0].id).toBe('number');
    expect(result[0].steps[0].id).toBe(1);

    expect(typeof result[0].steps[0].stepNo).toBe('number');
    expect(result[0].steps[0].stepNo).toBe(1);

    expect(typeof result[0].steps[0].content).toBe('string');
    expect(result[0].steps[0].content).toBe('Preheat oven to 200 degrees centigrade');

    expect(Array.isArray(result[0].categories)).toBe(true);
    expect(result[0].categories).toHaveLength(1);

    expect(typeof result[0].categories[0].id).toBe('number');
    expect(result[0].categories[0].id).toBe(1);

    expect(typeof result[0].categories[0].name).toBe('string');
    expect(result[0].categories[0].name).toBe('Vegan');

    expect(tracker.history.select).toHaveLength(5);

  });

  it('should return an empty array if no recipes found', async () => {

    /** Mock the DB responses */
    tracker.on.select('recipes').responseOnce([]);

    /** Set the data to pass into the models function */
    const searchTerm = 'chocolate';

    /** Execute the function */
    const result = await recipeModel.find(searchTerm);

    /** Test the response back from the function */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);

    expect(tracker.history.select).toHaveLength(1);

  });

  it('should return an error if required values are missing or incorrect', async () => {

    /** Set the data to pass into the models function */
    const searchTerm = 12;

    /** Execute the function */
    const result = await recipeModel.find(searchTerm);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return a generic error if any libraries have issues for security', async () => {

    /** Mock the DB responses */
    tracker.on.select('recipes').simulateError('lost connection to the database');

    /** Set the data to pass into the models function */
    const searchTerm = 'chocolate';

    /** Execute the function */
    const result = await recipeModel.find(searchTerm);

    /** Test the response back from the function */
    expect(typeof result).toBe('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was a problem with the resource, please try again later');

    expect(tracker.history.select).toHaveLength(1);

  });

});

xdescribe('recipeModel.findByIngredients', () => {

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

  it('should find all recipes that have specific ingredients', async () => {

    /** Mock the DB responses */
    tracker.on.select('ingredients').responseOnce([
      { id: 1, name: 'eggs' }
    ]);

    tracker.on.select('recipe_ingredients').responseOnce([
      {
        id: 1,
        recipeId: 1,
        ingredientId: 1,
        amount: 12,
        amount_type: 'large'
      }
    ]);

    tracker.on.select('recipes').responseOnce([
      {
        id: 1,
        userId: 1,
        name: 'Pancakes',
        description: 'Yummy pancakes for all occassions',
        servings: 24,
        calories_per_serving: 95,
        prep_time: 5,
        cook_time: 2,
        rating: 1
      }
    ]);

    tracker.on.select('recipe_ingredients').responseOnce([
      {
        id: 1,
        recipeId: 1,
        ingredientId: 1,
        name: 'eggs',
        amount: 12,
        amount_type: 'large'
      },
      {
        id: 2,
        recipeId: 1,
        ingredientId: 3,
        name: 'flour',
        amount: 250,
        amount_type: 'grams'
      },
      {
        id: 3,
        recipeId: 1,
        ingredientId: 4,
        name: 'sugar',
        amount: 50,
        amount_type: 'grams'
      }
    ]);

    tracker.on.select('steps').responseOnce([
      {
        id: 1,
        recipeId: 1,
        stepNo: 1,
        content: 'Preheat oven to 180 degrees C'
      },
      {
        id: 2,
        recipeId: 1,
        stepNo: 2,
        content: 'Crack 3 eggs into mixing bowl and mix well'
      },
      {
        id: 3,
        recipeId: 1,
        stepNo: 3,
        content: 'Sieve in the flour and mix well'
      },
      {
        id: 4,
        recipeId: 1,
        stepNo: 4,
        content: 'Pour in the sugar'
      },
      {
        id: 5,
        recipeId: 1,
        stepNo: 5,
        content: 'Use a mixer on high speed for two minutes'
      },
      {
        id: 6,
        recipeId: 1,
        stepNo: 6,
        content: 'Pour mixture into two greased tins'
      },
      {
        id: 7,
        recipeId: 1,
        stepNo: 7,
        content: 'Place in Oven on middle shelf for 35 minutes or until golden brown'
      },
      {
        id: 8,
        recipeId: 1,
        stepNo: 8,
        content: 'Leave in tins to cool down for 5 minutes'
      },
      {
        id: 9,
        recipeId: 1,
        stepNo: 9,
        content: 'Remove from tins onto cooling rack and leave to cool'
      },
      {
        id: 10,
        recipeId: 1,
        stepNo: 10,
        content: 'Once cooled, decorate as per your requirements'
      }
    ]);

    // cookbooks
    tracker.on.select('cookbook_recipes').responseOnce([
      {
        id: 1,
        recipeId: 1,
        cookbookId: 1,
        userId: 1,
        name: 'Breakfasts',
        description: null,
        image: null
      },
    ]);

    // categories
    tracker.on.select('recipe_categories').responseOnce([
      { id: 1, recipeId: 1, name: 'Breakfast'},
      { id: 2, recipeId: 1, name: 'Pudding'},
      { id: 3, recipeId: 1, name: 'Treat'}
    ]);

    /** Set the data to pass into the models function */
    const terms = 'egg';

    /** Execute the function */
    const results = await recipeModel.findByIngredients(terms);

    /** Test the response back from the function */
    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(1);

    expect(Array.isArray(results[0].ingredients)).toBe(true);
    expect(results[0].ingredients).toHaveLength(3);

    expect(Array.isArray(results[0].steps)).toBe(true);
    expect(results[0].steps).toHaveLength(10);

    expect(Array.isArray(results[0].cookbooks)).toBe(true);
    expect(results[0].cookbooks).toHaveLength(1);

    expect(Array.isArray(results[0].categories)).toBe(true);
    expect(results[0].categories).toHaveLength(3);

    expect(typeof results[0].ingredients[0].id).toBe('number');
    expect(results[0].ingredients[0].id).toBe(1);
    expect(typeof results[0].ingredients[1].id).toBe('number');
    expect(results[0].ingredients[1].id).toBe(2);
    expect(typeof results[0].ingredients[2].id).toBe('number');
    expect(results[0].ingredients[2].id).toBe(3);

    expect(typeof results[0].ingredients[0].recipeId).toBe('number');
    expect(results[0].ingredients[0].recipeId).toBe(1);
    expect(typeof results[0].ingredients[1].recipeId).toBe('number');
    expect(results[0].ingredients[1].recipeId).toBe(1);
    expect(typeof results[0].ingredients[2].recipeId).toBe('number');
    expect(results[0].ingredients[2].recipeId).toBe(1);

    expect(typeof results[0].ingredients[0].ingredientId).toBe('number');
    expect(results[0].ingredients[0].ingredientId).toBe(1);
    expect(typeof results[0].ingredients[1].ingredientId).toBe('number');
    expect(results[0].ingredients[1].ingredientId).toBe(3);
    expect(typeof results[0].ingredients[2].ingredientId).toBe('number');
    expect(results[0].ingredients[2].ingredientId).toBe(4);

    expect(typeof results[0].ingredients[0].name).toBe('string');
    expect(results[0].ingredients[0].name).toBe('eggs');
    expect(typeof results[0].ingredients[1].name).toBe('string');
    expect(results[0].ingredients[1].name).toBe('flour');
    expect(typeof results[0].ingredients[2].name).toBe('string');
    expect(results[0].ingredients[2].name).toBe('sugar');

    expect(typeof results[0].ingredients[0].amount).toBe('number');
    expect(results[0].ingredients[0].amount).toBe(12);
    expect(typeof results[0].ingredients[1].amount).toBe('number');
    expect(results[0].ingredients[1].amount).toBe(250);
    expect(typeof results[0].ingredients[2].amount).toBe('number');
    expect(results[0].ingredients[2].amount).toBe(50);

    expect(typeof results[0].ingredients[0].amount_type).toBe('string');
    expect(results[0].ingredients[0].amount_type).toBe('large');
    expect(typeof results[0].ingredients[1].amount_type).toBe('string');
    expect(results[0].ingredients[1].amount_type).toBe('grams');
    expect(typeof results[0].ingredients[2].amount_type).toBe('string');
    expect(results[0].ingredients[2].amount_type).toBe('grams');

    expect(typeof results[0].id).toBe('number');
    expect(results[0].id).toBe(1);
    expect(typeof results[0].userId).toBe('number');
    expect(results[0].userId).toBe(1);
    expect(typeof results[0].name).toBe('string');
    expect(results[0].name).toBe('Pancakes');
    expect(typeof results[0].description).toBe('string');
    expect(results[0].description).toBe('Yummy pancakes for all occassions');
    expect(typeof results[0].servings).toBe('number');
    expect(results[0].servings).toBe(24);
    expect(typeof results[0].calories_per_serving).toBe('number');
    expect(results[0].calories_per_serving).toBe(95);
    expect(typeof results[0].prep_time).toBe('number');
    expect(results[0].prep_time).toBe(5);
    expect(typeof results[0].cook_time).toBe('number');
    expect(results[0].cook_time).toBe(2);
    expect(typeof results[0].rating).toBe('number');
    expect(results[0].rating).toBe(1);

    expect(typeof results[0].steps[0].id).toBe('number');
    expect(results[0].steps[0].id).toBe(1);
    expect(typeof results[0].steps[0].recipeId).toBe('number');
    expect(results[0].steps[0].recipeId).toBe(1);
    expect(typeof results[0].steps[0].stepNo).toBe('number');
    expect(results[0].steps[0].stepNo).toBe(1);
    expect(typeof results[0].steps[0].content).toBe('string');
    expect(results[0].steps[0].content).toBe('Preheat oven to 180 degrees C');

    expect(typeof results[0].steps[1].id).toBe('number');
    expect(results[0].steps[1].id).toBe(2);
    expect(typeof results[0].steps[1].recipeId).toBe('number');
    expect(results[0].steps[1].recipeId).toBe(1);
    expect(typeof results[0].steps[1].stepNo).toBe('number');
    expect(results[0].steps[1].stepNo).toBe(2);
    expect(typeof results[0].steps[1].content).toBe('string');
    expect(results[0].steps[1].content).toBe('Crack 3 eggs into mixing bowl and mix well');

    expect(typeof results[0].steps[2].id).toBe('number');
    expect(results[0].steps[2].id).toBe(3);
    expect(typeof results[0].steps[2].recipeId).toBe('number');
    expect(results[0].steps[2].recipeId).toBe(1);
    expect(typeof results[0].steps[2].stepNo).toBe('number');
    expect(results[0].steps[2].stepNo).toBe(3);
    expect(typeof results[0].steps[2].content).toBe('string');
    expect(results[0].steps[2].content).toBe('Sieve in the flour and mix well');

    expect(typeof results[0].steps[3].id).toBe('number');
    expect(results[0].steps[3].id).toBe(4);
    expect(typeof results[0].steps[3].recipeId).toBe('number');
    expect(results[0].steps[3].recipeId).toBe(1);
    expect(typeof results[0].steps[3].stepNo).toBe('number');
    expect(results[0].steps[3].stepNo).toBe(4);
    expect(typeof results[0].steps[3].content).toBe('string');
    expect(results[0].steps[3].content).toBe('Pour in the sugar');

    expect(typeof results[0].steps[4].id).toBe('number');
    expect(results[0].steps[4].id).toBe(5);
    expect(typeof results[0].steps[4].recipeId).toBe('number');
    expect(results[0].steps[4].recipeId).toBe(1);
    expect(typeof results[0].steps[4].stepNo).toBe('number');
    expect(results[0].steps[4].stepNo).toBe(5);
    expect(typeof results[0].steps[4].content).toBe('string');
    expect(results[0].steps[4].content).toBe('Use a mixer on high speed for two minutes');

    expect(typeof results[0].steps[5].id).toBe('number');
    expect(results[0].steps[5].id).toBe(6);
    expect(typeof results[0].steps[5].recipeId).toBe('number');
    expect(results[0].steps[5].recipeId).toBe(1);
    expect(typeof results[0].steps[5].stepNo).toBe('number');
    expect(results[0].steps[5].stepNo).toBe(6);
    expect(typeof results[0].steps[5].content).toBe('string');
    expect(results[0].steps[5].content).toBe('Pour mixture into two greased tins');

    expect(typeof results[0].steps[6].id).toBe('number');
    expect(results[0].steps[6].id).toBe(7);
    expect(typeof results[0].steps[6].recipeId).toBe('number');
    expect(results[0].steps[6].recipeId).toBe(1);
    expect(typeof results[0].steps[6].stepNo).toBe('number');
    expect(results[0].steps[6].stepNo).toBe(7);
    expect(typeof results[0].steps[6].content).toBe('string');
    expect(results[0].steps[6].content).toBe('Place in Oven on middle shelf for 35 minutes or until golden brown');

    expect(typeof results[0].steps[7].id).toBe('number');
    expect(results[0].steps[7].id).toBe(8);
    expect(typeof results[0].steps[7].recipeId).toBe('number');
    expect(results[0].steps[7].recipeId).toBe(1);
    expect(typeof results[0].steps[7].stepNo).toBe('number');
    expect(results[0].steps[7].stepNo).toBe(8);
    expect(typeof results[0].steps[7].content).toBe('string');
    expect(results[0].steps[7].content).toBe('Leave in tins to cool down for 5 minutes');

    expect(typeof results[0].steps[8].id).toBe('number');
    expect(results[0].steps[8].id).toBe(9);
    expect(typeof results[0].steps[8].recipeId).toBe('number');
    expect(results[0].steps[8].recipeId).toBe(1);
    expect(typeof results[0].steps[8].stepNo).toBe('number');
    expect(results[0].steps[8].stepNo).toBe(9);
    expect(typeof results[0].steps[8].content).toBe('string');
    expect(results[0].steps[8].content).toBe('Remove from tins onto cooling rack and leave to cool');

    expect(typeof results[0].steps[9].id).toBe('number');
    expect(results[0].steps[9].id).toBe(10);
    expect(typeof results[0].steps[9].recipeId).toBe('number');
    expect(results[0].steps[9].recipeId).toBe(1);
    expect(typeof results[0].steps[9].stepNo).toBe('number');
    expect(results[0].steps[9].stepNo).toBe(10);
    expect(typeof results[0].steps[8].content).toBe('string');
    expect(results[0].steps[9].content).toBe('Once cooled, decorate as per your requirements');

    expect(typeof results[0].cookbooks[0].id).toBe('number');
    expect(results[0].cookbooks[0].id).toBe(1);
    expect(typeof results[0].cookbooks[0].name).toBe('string');
    expect(results[0].cookbooks[0].name).toBe('Breakfasts');

    expect(typeof results[0].categories[0].id).toBe('number');
    expect(results[0].categories[0].id).toBe(1);
    expect(typeof results[0].categories[0].name).toBe('string');
    expect(results[0].categories[0].name).toBe('Breakfast');

    expect(typeof results[0].categories[1].id).toBe('number');
    expect(results[0].categories[1].id).toBe(2);
    expect(typeof results[0].categories[1].name).toBe('string');
    expect(results[0].categories[1].name).toBe('Pudding');

    expect(typeof results[0].categories[2].id).toBe('number');
    expect(results[0].categories[2].id).toBe(3);
    expect(typeof results[0].categories[2].name).toBe('string');
    expect(results[0].categories[2].name).toBe('Treat');

    expect(tracker.history.select).toHaveLength(7);

  });

  it('should return an empty array if no recipes found', async () => {

    /** Mock the DB responses */
    tracker.on.select('ingredients').responseOnce([]);

    /** Set the data to pass into the models function */
    const terms = 'eggs';

    /** Execute the function */
    const results = await recipeModel.findByIngredients(terms);

    /** Test the response back from the function */
    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(0);

    expect(tracker.history.select).toHaveLength(1);

  });

  it('should return an error if required values are missing or incorrect', async () => {

    /** Set the data to pass into the models function */
    const terms = null;

    /** Execute the function */
    const results = await recipeModel.findByIngredients(terms);

    /** Test the response back from the function */
    expect(typeof results).toBe('object');
    expect(results.success).toBe(false);
    expect(results.message).toEqual('One or more required values are missing or incorrect');

  });

  it('should return a generic error if any libraries have issues for security', async () => {

    /** Mock the DB responses */
    tracker.on.select('ingredients').simulateErrorOnce('lost connection to database');

    /** Set the data to pass into the models function */
    const terms = 'eggs';

    /** Execute the function */
    const results = await recipeModel.findByIngredients(terms);

    /** Test the response back from the function */
    expect(typeof results).toBe('object');
    expect(results.success).toBe(false);
    expect(results.message).toEqual('There was a problem with the resource, please try again later');

    expect(tracker.history.select).toHaveLength(1);

  });

});

xdescribe('recipeModel.findByCategory', () => {

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

  xit('should find all recipes that belong to a certain category', async () => {

    /** Mock the DB responses */
    tracker.on.select('categories').responseOnce([
      {
        id: 1,
      }
    ]);

    tracker.on.select('recipe_categories').responseOnce([
      {
        id: 1,
        recipeId: 1,
        categoryId: 1
      }
    ]);

    tracker.on.select('recipes').responseOnce([
      {
        id: 1,
        userId: 1,
        name: 'Toast',
        description: "Staple for breakfasts for when you're on the go",
        servings: 2,
        calories_per_serving: 109,
        prep_time: 1,
        cook_time: 3,
        rating: 5
      }
    ]);

    tracker.on.select('recipe_ingredients').responceOnce([{
      id: 1,
      recipeId: 1,
      ingredientId: 1,
      name: 'white bread',
      amount: 2,
      amount_type: 'slices'
    }]);

    tracker.on.select('cookbook_recipes').responseOnce([{
      id: 1,
      cookbookId: 1,
      recipeId: 1,
      name: 'Quick and easy Breakfasts'
    }]);

    tracker.on.select('steps').responseOnce([
      {
       id: 1,
       recipeId: 1,
       stepNo: 1,
       content: 'Set toaster heat to desired level'
     },
     {
       id: 2,
       recipeId: 1,
       stepNo: 2,
       content: 'Place bread in toaster slots'
     },
     {
       id: 3,
       recipeId: 1,
       stepNo: 3,
       content: 'Start toasting'
     },
     {
       id: 4,
       recipeId: 1,
       stepNo: 4,
       content: 'Once cooked, spread butter and or your favourite toppings and enjoy'
     }
  ]);

    tracker.on.select('recipe_categories').responseOnce([{
      id: 1,
      recipeId: 1,
      categoryId: 1,
      name: 'Breakfasts'
    }]);


    /** Set the data to pass into the models function */
    const terms = 'Breakfasts';

    /** Execute the function */
    const results = await recipeModel.findByCategory(terms);

    /** Test the response back from the function */
    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(1);

    expect(typeof results[0].id).toBe('number');
    expect(results[0].id).toBe(1);

    expect(typeof results[0].userId).toBe('number');
    expect(results[0].userId).toBe(1);

    expect(typeof results[0].name).toBe('string');
    expect()


    expect(tracker.history.select).toHaveLength(7)

  });

  xit('should return an empty array if no recipes found', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

  });

  xit('should return an error if required values are missing or incorrect', async () => {

    /** Mock the DB responses */

    /** Set the data to pass into the models function */

    /** Execute the function */

    /** Test the response back from the function */

  });

  xit('should return a generic error if any libraries have issues for security', async () => {

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