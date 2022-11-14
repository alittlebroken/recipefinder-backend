/* Modules required for the tests */
const messageHelper = require('../helpers/constants');

const request = require('supertest');
const app = require('../index.js');

const recipesController = require('../controllers/recipesController');
const recipeCategoriesModel = require('../models/recipeCategoriesModel');
const recipeIngredientsModel = require('../models/recipeIngredientsModel');
const cookbookRecipesModel = require('../models/cookbookRecipesModel');
const recipeModel = require('../models/recipeModel');
const stepModel = require('../models/stepModel');
const { response } = require('../index.js');

describe('recipesController.listAll', () => {

    /*
     * Steps to run before and after this test suite
     */
    beforeEach(async () => {
  
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    })
  
    it('should return status 200 and a list if all recipes', async () => {
  
      // Set Mocked data that models and controllers should return
      const modelReturnData = [
        {
          recipeId: 1,
          name: 'Gluten free flatbread',
          description: 'Easy bake gluten free flatbread',
          servings: 6,
          calories_per_serving: 123,
          prep_time: 15,
          cook_time: 5,
          rating: 25,
          ingredients: [
            { id: 1, name: 'Gluten free flour', amount: 150, amount_type: 'grams' },
            { id: 2, name: 'Salt', amount: 0.25, amount_type: 'teaspoon' },
            { id: 3, name: 'Warm water', amount: 100, amount_type: 'ml' },
            { id: 4, name: 'Olive Oil', amount: 2, amount_type: 'tablespoons' }
          ],
          cookbooks: [
            { id: 1, name: 'Gluten Free recipes' }
          ],
          steps: [
            { id: 1, stepNo: 1, content: 'Put the flour and salt into a bowl and trickle on the water' },
            { id: 2, stepNo: 2, content: 'Mix the flour and water misture together' },
            { id: 3, stepNo: 3, content: 'Add the oil and knead the dough until it is soft' },
            { id: 4, stepNo: 4, content: 'Knead the dough for 5 minutes' },
            { id: 5, stepNo: 5, content: 'Leave the dough to stand for 30 minutes' },
            { id: 6, stepNo: 6, content: 'Divide the dough into four small balls ( or six if your frying pan is smaller)' },
            { id: 7, stepNo: 7, content: 'Roll each dough ball out with a rolling pin' },
            { id: 8, stepNo: 8, content: 'Heat a frying pan and rub a little oil onto the surface of the pan' },
            { id: 9, stepNo: 9, content: 'Cook each flatbread for 2 minutes each side. Keep the flatbreads warm, wrapped in foil or in a clean tea towel whilst you cook the others' },
            { id: 10, stepNo: 10, content: 'For crisper flatbreads, run some oil on them and vut into strips or triangles and fry for a further five to ten minutes' },
          ],
          categories: [
            { id: 1, name: 'Gluten free'},
            { id: 2, name: 'Snacks' },
            { id: 3, name: 'Breads' },
          ]
        }
      ];
  
      // Set any variables needed to be passed to controllers and or models
  
      // Mock any needed third party modules
      jest.spyOn(recipeModel, 'findAll').mockImplementation(() => {
        return modelReturnData;
      });
  
      // Set here the expected return values for the test
      const returnStatus = 200;
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .get('/recipes');
  
      /* Test everything works as expected */
      expect(response.status).toEqual(returnStatus);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(1);

      expect(typeof response.body[0].recipeId).toBe('number');
      expect(typeof response.body[0].name).toBe('string');
      expect(typeof response.body[0].description).toBe('string');
      expect(typeof response.body[0].servings).toBe('number');
      expect(typeof response.body[0].calories_per_serving).toBe('number');
      expect(typeof response.body[0].prep_time).toBe('number');
      expect(typeof response.body[0].cook_time).toBe('number');
      expect(typeof response.body[0].rating).toBe('number');

      expect(Array.isArray(response.body[0].ingredients)).toBe(true);
      expect(Array.isArray(response.body[0].steps)).toBe(true);
      expect(Array.isArray(response.body[0].cookbooks)).toBe(true);
      expect(Array.isArray(response.body[0].categories)).toBe(true);

      expect(response.body[0].recipeId).toEqual(1);
      expect(response.body[0].name).toEqual('Gluten free flatbread');
      expect(response.body[0].description).toEqual('Easy bake gluten free flatbread');
      expect(response.body[0].servings).toEqual(6);
      expect(response.body[0].calories_per_serving).toEqual(123);
      expect(response.body[0].prep_time).toEqual(15);
      expect(response.body[0].cook_time).toEqual(5);
      expect(response.body[0].rating).toEqual(25);

      expect(response.body[0].ingredients[0].id).toEqual(1);
      expect(response.body[0].ingredients[0].name).toEqual('Gluten free flour');
      expect(response.body[0].ingredients[0].amount).toEqual(150);
      expect(response.body[0].ingredients[0].amount_type).toEqual('grams');

      expect(response.body[0].ingredients[1].id).toEqual(2);
      expect(response.body[0].ingredients[1].name).toEqual('Salt');
      expect(response.body[0].ingredients[1].amount).toEqual(0.25);
      expect(response.body[0].ingredients[1].amount_type).toEqual('teaspoon');

      expect(response.body[0].ingredients[2].id).toEqual(3);
      expect(response.body[0].ingredients[2].name).toEqual('Warm water');
      expect(response.body[0].ingredients[2].amount).toEqual(100);
      expect(response.body[0].ingredients[2].amount_type).toEqual('ml');

      expect(response.body[0].ingredients[3].id).toEqual(4);
      expect(response.body[0].ingredients[3].name).toEqual('Olive Oil');
      expect(response.body[0].ingredients[3].amount).toEqual(2);
      expect(response.body[0].ingredients[3].amount_type).toEqual('tablespoons');

      expect(response.body[0].cookbooks[0].id).toEqual(1);
      expect(response.body[0].cookbooks[0].name).toEqual('Gluten Free recipes');
      
      expect(response.body[0].steps[0].id).toEqual(1);
      expect(response.body[0].steps[0].stepNo).toEqual(1);
      expect(response.body[0].steps[0].content).toEqual('Put the flour and salt into a bowl and trickle on the water');

      expect(response.body[0].steps[1].id).toEqual(2);
      expect(response.body[0].steps[1].stepNo).toEqual(2);
      expect(response.body[0].steps[1].content).toEqual('Mix the flour and water misture together');

      expect(response.body[0].steps[2].id).toEqual(3);
      expect(response.body[0].steps[2].stepNo).toEqual(3);
      expect(response.body[0].steps[2].content).toEqual('Add the oil and knead the dough until it is soft');

      expect(response.body[0].steps[3].id).toEqual(4);
      expect(response.body[0].steps[3].stepNo).toEqual(4);
      expect(response.body[0].steps[3].content).toEqual('Knead the dough for 5 minutes');

      expect(response.body[0].steps[4].id).toEqual(5);
      expect(response.body[0].steps[4].stepNo).toEqual(5);
      expect(response.body[0].steps[4].content).toEqual('Leave the dough to stand for 30 minutes');

      expect(response.body[0].steps[5].id).toEqual(6);
      expect(response.body[0].steps[5].stepNo).toEqual(6);
      expect(response.body[0].steps[5].content).toEqual('Divide the dough into four small balls ( or six if your frying pan is smaller)');

      expect(response.body[0].steps[6].id).toEqual(7);
      expect(response.body[0].steps[6].stepNo).toEqual(7);
      expect(response.body[0].steps[6].content).toEqual('Roll each dough ball out with a rolling pin');

      expect(response.body[0].steps[7].id).toEqual(8);
      expect(response.body[0].steps[7].stepNo).toEqual(8);
      expect(response.body[0].steps[7].content).toEqual('Heat a frying pan and rub a little oil onto the surface of the pan');

      expect(response.body[0].steps[8].id).toEqual(9);
      expect(response.body[0].steps[8].stepNo).toEqual(9);
      expect(response.body[0].steps[8].content).toEqual('Cook each flatbread for 2 minutes each side. Keep the flatbreads warm, wrapped in foil or in a clean tea towel whilst you cook the others');

      expect(response.body[0].steps[9].id).toEqual(10);
      expect(response.body[0].steps[9].stepNo).toEqual(10);
      expect(response.body[0].steps[9].content).toEqual('For crisper flatbreads, run some oil on them and vut into strips or triangles and fry for a further five to ten minutes');

      expect(response.body[0].categories[0].id).toEqual(1);
      expect(response.body[0].categories[0].name).toEqual('Gluten free');

      expect(response.body[0].categories[1].id).toEqual(2);
      expect(response.body[0].categories[1].name).toEqual('Snacks');

      expect(response.body[0].categories[2].id).toEqual(3);
      expect(response.body[0].categories[2].name).toEqual('Breads');

    });

    it('should return status 404 if no recipes to list', async () => {
  
        // Set Mocked data that models and controllers should return
        const modelReturnData = [];
    
        // Set any variables needed to be passed to controllers and or models
    
        // Mock any needed third party modules
        jest.spyOn(recipeModel, 'findAll').mockImplementation(() => {
          return modelReturnData;
        });
    
        // Set here the expected return values for the test
        const returnStatus = 404;
        const returnSuccess = false;
        const returnMessage = 'There are currently no recipes';

        /* Mock Express request and response */
        const mockRequest = {};
        const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const mockNext = jest.fn();
    
        /* Execute the function */
        //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
        await recipesController.listAll(mockRequest, mockResponse, mockNext);
    
        /* Test everything works as expected */
        expect(mockNext).toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith({
          status: returnStatus,
          success: returnSuccess,
          message: returnMessage
        });
    
      });

      it('should return status 500 if the resource encounters any other problem', async () => {
  
        // Set Mocked data that models and controllers should return
        const modelReturnData = {
          success: false,
          message: 'There was a problem with the resource, please try again later'
        };
    
        // Set any variables needed to be passed to controllers and or models
    
        // Mock any needed third party modules
        jest.spyOn(recipeModel, 'findAll').mockImplementation(() => {
          return modelReturnData;
        });
    
        // Set here the expected return values for the test
        const returnStatus = 500;
        const returnSuccess = modelReturnData.success;
        const returnMessage = modelReturnData.message;
    
        /* Mock Express request and response */
        const mockRequest = {};
        const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const mockNext = jest.fn();
    
        /* Execute the function */
        //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
        await recipesController.listAll(mockRequest, mockResponse, mockNext);
    
        /* Test everything works as expected */
        expect(mockNext).toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith({
          status: returnStatus,
          success: returnSuccess,
          message: returnMessage
        });
    
      });
  
});

describe('recipesController.list', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and the requested recipe', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [
      {
        recipeId: 1,
        name: 'Gluten free flatbread',
        description: 'Easy bake gluten free flatbread',
        servings: 6,
        calories_per_serving: 123,
        prep_time: 15,
        cook_time: 5,
        rating: 25,
        ingredients: [
          { id: 1, name: 'Gluten free flour', amount: 150, amount_type: 'grams' },
          { id: 2, name: 'Salt', amount: 0.25, amount_type: 'teaspoon' },
          { id: 3, name: 'Warm water', amount: 100, amount_type: 'ml' },
          { id: 4, name: 'Olive Oil', amount: 2, amount_type: 'tablespoons' }
        ],
        cookbooks: [
          { id: 1, name: 'Gluten Free recipes' }
        ],
        steps: [
          { id: 1, stepNo: 1, content: 'Put the flour and salt into a bowl and trickle on the water' },
          { id: 2, stepNo: 2, content: 'Mix the flour and water misture together' },
          { id: 3, stepNo: 3, content: 'Add the oil and knead the dough until it is soft' },
          { id: 4, stepNo: 4, content: 'Knead the dough for 5 minutes' },
          { id: 5, stepNo: 5, content: 'Leave the dough to stand for 30 minutes' },
          { id: 6, stepNo: 6, content: 'Divide the dough into four small balls ( or six if your frying pan is smaller)' },
          { id: 7, stepNo: 7, content: 'Roll each dough ball out with a rolling pin' },
          { id: 8, stepNo: 8, content: 'Heat a frying pan and rub a little oil onto the surface of the pan' },
          { id: 9, stepNo: 9, content: 'Cook each flatbread for 2 minutes each side. Keep the flatbreads warm, wrapped in foil or in a clean tea towel whilst you cook the others' },
          { id: 10, stepNo: 10, content: 'For crisper flatbreads, run some oil on them and vut into strips or triangles and fry for a further five to ten minutes' },
        ],
        categories: [
          { id: 1, name: 'Gluten free'},
          { id: 2, name: 'Snacks' },
          { id: 3, name: 'Breads' },
        ]
      }
    ];

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'findByRecipe').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const response = await request(app)
      .get(`/recipes/${recipeId}`);

    /* Test everything works as expected */
    expect(response.status).toEqual(returnStatus);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(1);

    expect(typeof response.body[0].recipeId).toBe('number');
    expect(typeof response.body[0].name).toBe('string');
    expect(typeof response.body[0].description).toBe('string');
    expect(typeof response.body[0].servings).toBe('number');
    expect(typeof response.body[0].calories_per_serving).toBe('number');
    expect(typeof response.body[0].prep_time).toBe('number');
    expect(typeof response.body[0].cook_time).toBe('number');
    expect(typeof response.body[0].rating).toBe('number');

    expect(Array.isArray(response.body[0].ingredients)).toBe(true);
    expect(Array.isArray(response.body[0].steps)).toBe(true);
    expect(Array.isArray(response.body[0].cookbooks)).toBe(true);
    expect(Array.isArray(response.body[0].categories)).toBe(true);

    expect(response.body[0].recipeId).toEqual(1);
    expect(response.body[0].name).toEqual('Gluten free flatbread');
    expect(response.body[0].description).toEqual('Easy bake gluten free flatbread');
    expect(response.body[0].servings).toEqual(6);
    expect(response.body[0].calories_per_serving).toEqual(123);
    expect(response.body[0].prep_time).toEqual(15);
    expect(response.body[0].cook_time).toEqual(5);
    expect(response.body[0].rating).toEqual(25);

    expect(response.body[0].ingredients[0].id).toEqual(1);
    expect(response.body[0].ingredients[0].name).toEqual('Gluten free flour');
    expect(response.body[0].ingredients[0].amount).toEqual(150);
    expect(response.body[0].ingredients[0].amount_type).toEqual('grams');

    expect(response.body[0].ingredients[1].id).toEqual(2);
    expect(response.body[0].ingredients[1].name).toEqual('Salt');
    expect(response.body[0].ingredients[1].amount).toEqual(0.25);
    expect(response.body[0].ingredients[1].amount_type).toEqual('teaspoon');

    expect(response.body[0].ingredients[2].id).toEqual(3);
    expect(response.body[0].ingredients[2].name).toEqual('Warm water');
    expect(response.body[0].ingredients[2].amount).toEqual(100);
    expect(response.body[0].ingredients[2].amount_type).toEqual('ml');

    expect(response.body[0].ingredients[3].id).toEqual(4);
    expect(response.body[0].ingredients[3].name).toEqual('Olive Oil');
    expect(response.body[0].ingredients[3].amount).toEqual(2);
    expect(response.body[0].ingredients[3].amount_type).toEqual('tablespoons');

    expect(response.body[0].cookbooks[0].id).toEqual(1);
    expect(response.body[0].cookbooks[0].name).toEqual('Gluten Free recipes');
    
    expect(response.body[0].steps[0].id).toEqual(1);
    expect(response.body[0].steps[0].stepNo).toEqual(1);
    expect(response.body[0].steps[0].content).toEqual('Put the flour and salt into a bowl and trickle on the water');

    expect(response.body[0].steps[1].id).toEqual(2);
    expect(response.body[0].steps[1].stepNo).toEqual(2);
    expect(response.body[0].steps[1].content).toEqual('Mix the flour and water misture together');

    expect(response.body[0].steps[2].id).toEqual(3);
    expect(response.body[0].steps[2].stepNo).toEqual(3);
    expect(response.body[0].steps[2].content).toEqual('Add the oil and knead the dough until it is soft');

    expect(response.body[0].steps[3].id).toEqual(4);
    expect(response.body[0].steps[3].stepNo).toEqual(4);
    expect(response.body[0].steps[3].content).toEqual('Knead the dough for 5 minutes');

    expect(response.body[0].steps[4].id).toEqual(5);
    expect(response.body[0].steps[4].stepNo).toEqual(5);
    expect(response.body[0].steps[4].content).toEqual('Leave the dough to stand for 30 minutes');

    expect(response.body[0].steps[5].id).toEqual(6);
    expect(response.body[0].steps[5].stepNo).toEqual(6);
    expect(response.body[0].steps[5].content).toEqual('Divide the dough into four small balls ( or six if your frying pan is smaller)');

    expect(response.body[0].steps[6].id).toEqual(7);
    expect(response.body[0].steps[6].stepNo).toEqual(7);
    expect(response.body[0].steps[6].content).toEqual('Roll each dough ball out with a rolling pin');

    expect(response.body[0].steps[7].id).toEqual(8);
    expect(response.body[0].steps[7].stepNo).toEqual(8);
    expect(response.body[0].steps[7].content).toEqual('Heat a frying pan and rub a little oil onto the surface of the pan');

    expect(response.body[0].steps[8].id).toEqual(9);
    expect(response.body[0].steps[8].stepNo).toEqual(9);
    expect(response.body[0].steps[8].content).toEqual('Cook each flatbread for 2 minutes each side. Keep the flatbreads warm, wrapped in foil or in a clean tea towel whilst you cook the others');

    expect(response.body[0].steps[9].id).toEqual(10);
    expect(response.body[0].steps[9].stepNo).toEqual(10);
    expect(response.body[0].steps[9].content).toEqual('For crisper flatbreads, run some oil on them and vut into strips or triangles and fry for a further five to ten minutes');

    expect(response.body[0].categories[0].id).toEqual(1);
    expect(response.body[0].categories[0].name).toEqual('Gluten free');

    expect(response.body[0].categories[1].id).toEqual(2);
    expect(response.body[0].categories[1].name).toEqual('Snacks');

    expect(response.body[0].categories[2].id).toEqual(3);
    expect(response.body[0].categories[2].name).toEqual('Breads');

  });

  it('should return status 400 if request parameters are undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'findByRecipe').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined request parameter';

    /* Mock Express request and response */
    const mockRequest = { };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.list(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if request parameter id is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'findByRecipe').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined id';

    /* Mock Express request and response */
    const mockRequest = { params: { } };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.list(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 404 if no recipes to list', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [];
  
      // Set any variables needed to be passed to controllers and or models
      const recipeId = 20034;

      // Mock any needed third party modules
      jest.spyOn(recipeModel, 'findByRecipe').mockImplementation(() => {
        return modelReturnData;
      });
  
      // Set here the expected return values for the test
      const returnStatus = 404;
      const returnSuccess = false;
      const returnMessage = 'No recipe found matching supplied id';

      /* Mock Express request and response */
      const mockRequest = { params: { id: recipeId } };
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await recipesController.list(mockRequest, mockResponse, mockNext);
  
      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });
  
    });

    it('should return status 500 if the resource encounters any other problem', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: false,
        message: 'There was a problem with the resource, please try again later'
      };
  
      // Set any variables needed to be passed to controllers and or models
      const recipeId = 1;

      // Mock any needed third party modules
      jest.spyOn(recipeModel, 'findByRecipe').mockImplementation(() => {
        return modelReturnData;
      });
  
      // Set here the expected return values for the test
      const returnStatus = 500;
      const returnSuccess = modelReturnData.success;
      const returnMessage = modelReturnData.message;
  
      /* Mock Express request and response */
      const mockRequest = { params: { id: recipeId } };
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await recipesController.list(mockRequest, mockResponse, mockNext);
  
      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });
  
    });

});

describe('recipesController.listRecipeIngredients', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and the recipes ingredients', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [
      { id: 1, name: 'Gluten free flour', amount: 250, amount_type: 'grams' },
      { id: 2, name: 'eggs', amount: 2, amount_type: 'large'}
    ];

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeIngredientsModel, 'findByRecipeId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnLength = 2;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const response = await request(app)
      .get(`/recipes/${recipeId}/ingredients`);

    /* Test everything works as expected */
    expect(response.status).toEqual(returnStatus);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(returnLength);

    expect(typeof response.body[0].id).toBe('number');
    expect(typeof response.body[0].name).toBe('string');
    expect(typeof response.body[0].amount).toBe('number');
    expect(typeof response.body[0].amount_type).toBe('string');

    expect(response.body[0].id).toEqual(1);
    expect(response.body[0].name).toEqual('Gluten free flour');
    expect(response.body[0].amount).toEqual(250);
    expect(response.body[0].amount_type).toEqual('grams');

    expect(typeof response.body[1].id).toBe('number');
    expect(typeof response.body[1].name).toBe('string');
    expect(typeof response.body[1].amount).toBe('number');
    expect(typeof response.body[1].amount_type).toBe('string');

    expect(response.body[1].id).toEqual(2);
    expect(response.body[1].name).toEqual('eggs');
    expect(response.body[1].amount).toEqual(2);
    expect(response.body[1].amount_type).toEqual('large');

  });

  it('should return status 404 if no ingredients found for the recipe', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 12345;

    // Mock any needed third party modules
    jest.spyOn(recipeIngredientsModel, 'findByRecipeId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 404;
    const returnSuccess = false;
    const returnMessage = 'Recipe currently has no ingredients';

    /* Mock Express request and response */
    const mockRequest = { params: { id: recipeId } };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.listRecipeIngredients(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if request parameters are undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeIngredientsModel,'findByRecipeId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined request parameters';

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.listRecipeIngredients(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if request parameter id is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeIngredientsModel, 'findByRecipeId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined id';

    /* Mock Express request and response */
    const mockRequest = { params: {} };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.listRecipeIngredients(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 500 if the resource encounters another problem', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'There was a problem with the resource, please try again later'
    };

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 12;

    // Mock any needed third party modules
    jest.spyOn(recipeIngredientsModel, 'findByRecipeId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 500;
    const returnSuccess = modelReturnData.success;
    const returnMessage = modelReturnData.message;

    /* Mock Express request and response */
    const mockRequest = { params: { id: recipeId } };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.listRecipeIngredients(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

});

describe('recipesController.listRecipeSteps', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and return all steps for a recipe', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [
      { id: 1, recipeId: 1, stepNo: 1, content: 'Place flour and salt into a bowl' },
      { id: 2, recipeId: 1, stepNo: 2, content: 'Slowly pour the warm water into the bowl'},
    ];

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;

    // Mock any needed third party modules
    jest.spyOn(stepModel, 'findByRecipeId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const response = await request(app)
      .get(`/recipes/${recipeId}/steps`);

    /* Test everything works as expected */
    expect(response.status).toEqual(200);
    
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(2);

    expect(typeof response.body[0].recipeId).toBe('number');
    expect(typeof response.body[0].id).toBe('number');
    expect(typeof response.body[0].stepNo).toBe('number');
    expect(typeof response.body[0].content).toBe('string');

    expect(typeof response.body[1].recipeId).toBe('number');
    expect(typeof response.body[1].id).toBe('number');
    expect(typeof response.body[1].stepNo).toBe('number');
    expect(typeof response.body[1].content).toBe('string');

    expect(response.body[0].id).toEqual(1);
    expect(response.body[0].recipeId).toEqual(1);
    expect(response.body[0].stepNo).toEqual(1);
    expect(response.body[0].content).toEqual('Place flour and salt into a bowl');

    expect(response.body[1].id).toEqual(2);
    expect(response.body[1].recipeId).toEqual(1);
    expect(response.body[1].stepNo).toEqual(2);
    expect(response.body[1].content).toEqual('Slowly pour the warm water into the bowl');


  });

  it('should return status 404 if no steps found for a recipe', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;

    // Mock any needed third party modules
    jest.spyOn(stepModel, 'findByRecipeId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 404;
    const returnSuccess = false;
    const returnMessage = 'This recipe currently has no steps';

    /* Mock Express request and response */
    const mockRequest = { params: { id: recipeId }};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.listRecipeSteps(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if request parameters are undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    let recipeId = 1;

    // Mock any needed third party modules
    jest.spyOn(stepModel, 'findByRecipeId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined request parameters';

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.listRecipeSteps(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if request parameter id is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;

    // Mock any needed third party modules
    jest.spyOn(stepModel, 'findByRecipeId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined id';

    /* Mock Express request and response */
    const mockRequest = { params: {} };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.listRecipeSteps(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 500 if the resource encounters another problem', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'There was a problem with the resource, please try again later'
    };

    // Set any variables needed to be passed to controllers and or models
    let recipeId = 1;

    // Mock any needed third party modules
    jest.spyOn(stepModel, 'findByRecipeId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 500;
    const returnSuccess = modelReturnData.success;
    const returnMessage = modelReturnData.message;

    /* Mock Express request and response */
    const mockRequest = { params: { id: recipeId } };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.listRecipeSteps(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

});

describe('recipesController.listRecipeCategories', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and the recipes categories', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [
      {id: 1, recipeId: 1, categoryId: 1, categoryName: 'Breakfasts'}
    ];

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeCategoriesModel, 'findByRecipe').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const response = await request(app)
      .get(`/recipes/${recipeId}/categories`);

    /* Test everything works as expected */
    expect(response.status).toEqual(returnStatus);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(1);

    expect(typeof response.body[0].id).toBe('number');
    expect(typeof response.body[0].recipeId).toBe('number');
    expect(typeof response.body[0].categoryId).toBe('number');
    expect(typeof response.body[0].categoryName).toBe('string');

    expect(response.body[0].id).toEqual(1);
    expect(response.body[0].recipeId).toEqual(1);
    expect(response.body[0].categoryId).toEqual(1);
    expect(response.body[0].categoryName).toEqual('Breakfasts');

  });

  it('should return status 404 if the recipe has no categories', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeCategoriesModel, 'findByRecipe').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 404;
    const returnSuccess = false;
    const returnMessage = 'This recipe currently has no categories';

    /* Mock Express request and response */
    const mockRequest = { params: { id: recipeId }};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.listRecipeCategories(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if the request parameters are undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeCategoriesModel, 'findByRecipe').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined request parameters';

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.listRecipeCategories(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage,
    });

  });

  it('should return status 400 if the request paremeter id is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeCategoriesModel, 'findByRecipe').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined id';

    /* Mock Express request and response */
    const mockRequest = { params: {}};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.listRecipeCategories(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      success: returnSuccess,
      status: returnStatus,
      message: returnMessage
    });

  });

  it('should return status 500 if the resource encounters any other problems', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'There was a problem with the resource, please try again later'
    };

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeCategoriesModel, 'findByRecipe').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 500;
    const returnSuccess = modelReturnData.success;
    const returnMessage = modelReturnData.message;

    /* Mock Express request and response */
    const mockRequest = { params: { id: recipeId }};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.listRecipeCategories(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

});

describe('recipesController.create', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 after creating the new record', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Recipe successfully added'
    }

    // Set any variables needed to be passed to controllers and or models
    const recipe = {
      userId: 12,
      name: 'Halloween spooky eye balls',
      servings: 12,
      calories_per_serving: 145,
      prep_time: 30,
      cook_time: 15
    };

    const steps = [
      { recipeId: 1, stepNo: 1, content: 'Boil twelve eggs' }
    ];

    const ingredients = [
      { recipeId: 1, ingredientId: 1, amount: 12, amount_type: 'large'}
    ];

    const cookbookId = 1;

    const categories = [
      { recipeId: 1, categoryId: 1 }
    ];

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = 'Recipe successfully added';

    /* Mock Express request and response */
    const mockRequest = {
      body: {
        recipe: recipe,
        steps: steps,
        ingredients: ingredients,
        cookbookId: cookbookId,
        categories: categories
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const response = await request(app)
      .post(`/recipes`)
      .send({
        recipe: recipe,
        steps: steps,
        ingredients: ingredients,
        cookbookId: cookbookId,
        categories: categories
      });

    /* Test everything works as expected */
    expect(response.status).toEqual(returnStatus);

    expect(typeof response.body).toBe('object');
    expect(typeof response.body.success).toBe('boolean');
    expect(typeof response.body.message).toBe('string');

    expect(response.body.success).toEqual(returnSuccess);
    expect(response.body.message).toEqual(returnMessage);

  });

  it('should return status 400 if the request body is undefined', async () => {

     // Set Mocked data that models and controllers should return
     const modelReturnData = {
      success: true,
      message: 'Recipe successfully added'
    }

    // Set any variables needed to be passed to controllers and or models
    const recipe = {
      userId: 12,
      name: 'Halloween spooky eye balls',
      servings: 12,
      calories_per_serving: 145,
      prep_time: 30,
      cook_time: 15
    };

    const steps = [
      { recipeId: 1, stepNo: 1, content: 'Boil twelve eggs' }
    ];

    const ingredients = [
      { recipeId: 1, ingredientId: 1, amount: 12, amount_type: 'large'}
    ];

    const cookbookId = 1;

    const categories = [
      { recipeId: 1, categoryId: 1 }
    ];

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined request body';

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if the request body value recipe is undefined', async () => {

     // Set Mocked data that models and controllers should return
     const modelReturnData = {
      success: true,
      message: 'Recipe successfully added'
    }

    // Set any variables needed to be passed to controllers and or models
    const recipe = {
      userId: 12,
      name: 'Halloween spooky eye balls',
      servings: 12,
      calories_per_serving: 145,
      prep_time: 30,
      cook_time: 15
    };

    const steps = [
      { recipeId: 1, stepNo: 1, content: 'Boil twelve eggs' }
    ];

    const ingredients = [
      { recipeId: 1, ingredientId: 1, amount: 12, amount_type: 'large'}
    ];

    const cookbookId = 1;

    const categories = [
      { recipeId: 1, categoryId: 1 }
    ];

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined recipe';

    /* Mock Express request and response */
    const mockRequest = {
      body: {
        steps: steps,
        ingredients: ingredients,
        cookbookId: cookbookId,
        categories: categories
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if the request body value recipe is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
     success: true,
     message: 'Recipe successfully added'
   }

   // Set any variables needed to be passed to controllers and or models
   const recipe = 'Butter Beer';

   const steps = [
     { recipeId: 1, stepNo: 1, content: 'Boil twelve eggs' }
   ];

   const ingredients = [
     { recipeId: 1, ingredientId: 1, amount: 12, amount_type: 'large'}
   ];

   const cookbookId = 1;

   const categories = [
     { recipeId: 1, categoryId: 1 }
   ];

   // Mock any needed third party modules
   jest.spyOn(recipeModel, 'create').mockImplementation(() => {
     return modelReturnData;
   });

   // Set here the expected return values for the test
   const returnStatus = 400;
   const returnSuccess = false;
   const returnMessage = 'Wrong format for recipe';

   /* Mock Express request and response */
   const mockRequest = {
     body: {
       recipe: recipe,
       steps: steps,
       ingredients: ingredients,
       cookbookId: cookbookId,
       categories: categories
     }
   };
   const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
   const mockNext = jest.fn();

   /* Execute the function */
   //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
   await recipesController.create(mockRequest, mockResponse, mockNext);

   /* Test everything works as expected */
   expect(mockNext).toHaveBeenCalled();
   expect(mockNext).toHaveBeenCalledWith({
     status: returnStatus,
     success: returnSuccess,
     message: returnMessage
   });

 });

  it('should return status 400 if request body recipe userId is invalid', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Recipe successfully added'
    }

    // Set any variables needed to be passed to controllers and or models
    const recipe = {
      name: 'Halloween spooky eye balls',
      servings: 12,
      calories_per_serving: 145,
      prep_time: 30,
      cook_time: 15
    };

    const steps = [
      { recipeId: 1, stepNo: 1, content: 'Boil twelve eggs' }
    ];

    const ingredients = [
      { recipeId: 1, ingredientId: 1, amount: 12, amount_type: 'large'}
    ];

    const cookbookId = 1;

    const categories = [
      { recipeId: 1, categoryId: 1 }
    ];

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined userId';

    /* Mock Express request and response */
    const mockRequest = {
      body: {
        recipe: recipe,
        steps: steps,
        ingredients: ingredients,
        cookbookId: cookbookId,
        categories: categories
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if request body recipe userId is in the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Recipe successfully added'
    }

    // Set any variables needed to be passed to controllers and or models
    const recipe = {
      userId: '12',
      name: 'Halloween spooky eye balls',
      servings: 12,
      calories_per_serving: 145,
      prep_time: 30,
      cook_time: 15
    };

    const steps = [
      { recipeId: 1, stepNo: 1, content: 'Boil twelve eggs' }
    ];

    const ingredients = [
      { recipeId: 1, ingredientId: 1, amount: 12, amount_type: 'large'}
    ];

    const cookbookId = 1;

    const categories = [
      { recipeId: 1, categoryId: 1 }
    ];

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for userId';

    /* Mock Express request and response */
    const mockRequest = {
      body: {
        recipe: recipe,
        steps: steps,
        ingredients: ingredients,
        cookbookId: cookbookId,
        categories: categories
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if the request body recipe name is invalid', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Recipe successfully added'
    }

    // Set any variables needed to be passed to controllers and or models
    const recipe = {
      userId: 12,
      servings: 12,
      calories_per_serving: 145,
      prep_time: 30,
      cook_time: 15
    };

    const steps = [
      { recipeId: 1, stepNo: 1, content: 'Boil twelve eggs' }
    ];

    const ingredients = [
      { recipeId: 1, ingredientId: 1, amount: 12, amount_type: 'large'}
    ];

    const cookbookId = 1;

    const categories = [
      { recipeId: 1, categoryId: 1 }
    ];

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined name'

    /* Mock Express request and response */
    const mockRequest = {
      body: {
        recipe: recipe,
        steps: steps,
        ingredients: ingredients,
        cookbookId: cookbookId,
        categories: categories
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if the request body recipe name is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Recipe successfully added'
    }

    // Set any variables needed to be passed to controllers and or models
    const recipe = {
      userId: 12,
      name: 6,
      servings: 12,
      calories_per_serving: 145,
      prep_time: 30,
      cook_time: 15
    };

    const steps = [
      { recipeId: 1, stepNo: 1, content: 'Boil twelve eggs' }
    ];

    const ingredients = [
      { recipeId: 1, ingredientId: 1, amount: 12, amount_type: 'large'}
    ];

    const cookbookId = 1;

    const categories = [
      { recipeId: 1, categoryId: 1 }
    ];

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for name'

    /* Mock Express request and response */
    const mockRequest = {
      body: {
        recipe: recipe,
        steps: steps,
        ingredients: ingredients,
        cookbookId: cookbookId,
        categories: categories
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if the request body recipe servings is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Recipe successfully added'
    }

    // Set any variables needed to be passed to controllers and or models
    const recipe = {
      userId: 12,
      name: 'Halloween spooky eye balls',
      calories_per_serving: 145,
      prep_time: 30,
      cook_time: 15
    };

    const steps = [
      { recipeId: 1, stepNo: 1, content: 'Boil twelve eggs' }
    ];

    const ingredients = [
      { recipeId: 1, ingredientId: 1, amount: 12, amount_type: 'large'}
    ];

    const cookbookId = 1;

    const categories = [
      { recipeId: 1, categoryId: 1 }
    ];

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined servings'

    /* Mock Express request and response */
    const mockRequest = {
      body: {
        recipe: recipe,
        steps: steps,
        ingredients: ingredients,
        cookbookId: cookbookId,
        categories: categories
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if the request body recipe servings is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Recipe successfully added'
    }

    // Set any variables needed to be passed to controllers and or models
    const recipe = {
      userId: 12,
      name: 'Halloween spooky eye balls',
      servings: 'seven',
      calories_per_serving: 145,
      prep_time: 30,
      cook_time: 15
    };

    const steps = [
      { recipeId: 1, stepNo: 1, content: 'Boil twelve eggs' }
    ];

    const ingredients = [
      { recipeId: 1, ingredientId: 1, amount: 12, amount_type: 'large'}
    ];

    const cookbookId = 1;

    const categories = [
      { recipeId: 1, categoryId: 1 }
    ];

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for servings'

    /* Mock Express request and response */
    const mockRequest = {
      body: {
        recipe: recipe,
        steps: steps,
        ingredients: ingredients,
        cookbookId: cookbookId,
        categories: categories
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if the request body recipe calories_per_serving is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Recipe successfully added'
    }

    // Set any variables needed to be passed to controllers and or models
    const recipe = {
      userId: 12,
      name: 'Halloween spooky eye balls',
      servings: 12,
      prep_time: 30,
      cook_time: 15
    };

    const steps = [
      { recipeId: 1, stepNo: 1, content: 'Boil twelve eggs' }
    ];

    const ingredients = [
      { recipeId: 1, ingredientId: 1, amount: 12, amount_type: 'large'}
    ];

    const cookbookId = 1;

    const categories = [
      { recipeId: 1, categoryId: 1 }
    ];

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined calories_per_serving'

    /* Mock Express request and response */
    const mockRequest = {
      body: {
        recipe: recipe,
        steps: steps,
        ingredients: ingredients,
        cookbookId: cookbookId,
        categories: categories
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if the request body recipe calories_per_serving is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Recipe successfully added'
    }

    // Set any variables needed to be passed to controllers and or models
    const recipe = {
      userId: 12,
      name: 'Halloween spooky eye balls',
      servings: 12,
      calories_per_serving: 'five',
      prep_time: 30,
      cook_time: 15
    };

    const steps = [
      { recipeId: 1, stepNo: 1, content: 'Boil twelve eggs' }
    ];

    const ingredients = [
      { recipeId: 1, ingredientId: 1, amount: 12, amount_type: 'large'}
    ];

    const cookbookId = 1;

    const categories = [
      { recipeId: 1, categoryId: 1 }
    ];

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for calories_per_serving'

    /* Mock Express request and response */
    const mockRequest = {
      body: {
        recipe: recipe,
        steps: steps,
        ingredients: ingredients,
        cookbookId: cookbookId,
        categories: categories
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if the request body recipe prep_time is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Recipe successfully added'
    }

    // Set any variables needed to be passed to controllers and or models
    const recipe = {
      userId: 12,
      name: 'Halloween spooky eye balls',
      servings: 12,
      calories_per_serving: 145,
      cook_time: 15
    };

    const steps = [
      { recipeId: 1, stepNo: 1, content: 'Boil twelve eggs' }
    ];

    const ingredients = [
      { recipeId: 1, ingredientId: 1, amount: 12, amount_type: 'large'}
    ];

    const cookbookId = 1;

    const categories = [
      { recipeId: 1, categoryId: 1 }
    ];

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined prep_time'

    /* Mock Express request and response */
    const mockRequest = {
      body: {
        recipe: recipe,
        steps: steps,
        ingredients: ingredients,
        cookbookId: cookbookId,
        categories: categories
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if the request body recipe prep_time is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Recipe successfully added'
    }

    // Set any variables needed to be passed to controllers and or models
    const recipe = {
      userId: 12,
      name: 'Halloween spooky eye balls',
      servings: 12,
      calories_per_serving: 145,
      prep_time: '12',
      cook_time: 15
    };

    const steps = [
      { recipeId: 1, stepNo: 1, content: 'Boil twelve eggs' }
    ];

    const ingredients = [
      { recipeId: 1, ingredientId: 1, amount: 12, amount_type: 'large'}
    ];

    const cookbookId = 1;

    const categories = [
      { recipeId: 1, categoryId: 1 }
    ];

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for prep_time'

    /* Mock Express request and response */
    const mockRequest = {
      body: {
        recipe: recipe,
        steps: steps,
        ingredients: ingredients,
        cookbookId: cookbookId,
        categories: categories
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if request body recipe cook_time is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Recipe successfully added'
    }

    // Set any variables needed to be passed to controllers and or models
    const recipe = {
      userId: 12,
      name: 'Halloween spooky eye balls',
      servings: 12,
      calories_per_serving: 145,
      prep_time: 30,
    };

    const steps = [
      { recipeId: 1, stepNo: 1, content: 'Boil twelve eggs' }
    ];

    const ingredients = [
      { recipeId: 1, ingredientId: 1, amount: 12, amount_type: 'large'}
    ];

    const cookbookId = 1;

    const categories = [
      { recipeId: 1, categoryId: 1 }
    ];

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined cook_time'

    /* Mock Express request and response */
    const mockRequest = {
      body: {
        recipe: recipe,
        steps: steps,
        ingredients: ingredients,
        cookbookId: cookbookId,
        categories: categories
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if request body recipe cook_time is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Recipe successfully added'
    }

    // Set any variables needed to be passed to controllers and or models
    const recipe = {
      userId: 12,
      name: 'Halloween spooky eye balls',
      servings: 12,
      calories_per_serving: 145,
      prep_time: 30,
      cook_time: '12',
    };

    const steps = [
      { recipeId: 1, stepNo: 1, content: 'Boil twelve eggs' }
    ];

    const ingredients = [
      { recipeId: 1, ingredientId: 1, amount: 12, amount_type: 'large'}
    ];

    const cookbookId = 1;

    const categories = [
      { recipeId: 1, categoryId: 1 }
    ];

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for cook_time'

    /* Mock Express request and response */
    const mockRequest = {
      body: {
        recipe: recipe,
        steps: steps,
        ingredients: ingredients,
        cookbookId: cookbookId,
        categories: categories
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if request body steps is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Recipe successfully added'
    }

    // Set any variables needed to be passed to controllers and or models
    const recipe = {
      userId: 12,
      name: 'Halloween spooky eye balls',
      servings: 12,
      calories_per_serving: 145,
      prep_time: 30,
      cook_time: 15
    };

    const steps = [
      { recipeId: 1, stepNo: 1, content: 'Boil twelve eggs' }
    ];

    const ingredients = [
      { recipeId: 1, ingredientId: 1, amount: 12, amount_type: 'large'}
    ];

    const cookbookId = 1;

    const categories = [
      { recipeId: 1, categoryId: 1 }
    ];

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined steps'

    /* Mock Express request and response */
    const mockRequest = {
      body: {
        recipe: recipe,
        ingredients: ingredients,
        cookbookId: cookbookId,
        categories: categories
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if request body steps is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Recipe successfully added'
    }

    // Set any variables needed to be passed to controllers and or models
    const recipe = {
      userId: 12,
      name: 'Halloween spooky eye balls',
      servings: 12,
      calories_per_serving: 145,
      prep_time: 30,
      cook_time: 15
    };

    const steps = 'steps';

    const ingredients = [
      { recipeId: 1, ingredientId: 1, amount: 12, amount_type: 'large'}
    ];

    const cookbookId = 1;

    const categories = [
      { recipeId: 1, categoryId: 1 }
    ];

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for steps'

    /* Mock Express request and response */
    const mockRequest = {
      body: {
        recipe: recipe,
        steps: steps,
        ingredients: ingredients,
        cookbookId: cookbookId,
        categories: categories
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if request body ingredients is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Recipe successfully added'
    }

    // Set any variables needed to be passed to controllers and or models
    const recipe = {
      userId: 12,
      name: 'Halloween spooky eye balls',
      servings: 12,
      calories_per_serving: 145,
      prep_time: 30,
      cook_time: 15
    };

    const steps = [
      { recipeId: 1, stepNo: 1, content: 'Boil twelve eggs' }
    ];

    const ingredients = [
      { recipeId: 1, ingredientId: 1, amount: 12, amount_type: 'large'}
    ];

    const cookbookId = 1;

    const categories = [
      { recipeId: 1, categoryId: 1 }
    ];

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined ingredients'

    /* Mock Express request and response */
    const mockRequest = {
      body: {
        recipe: recipe,
        steps: steps,
        cookbookId: cookbookId,
        categories: categories
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if request body ingredients is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Recipe successfully added'
    }

    // Set any variables needed to be passed to controllers and or models
    const recipe = {
      userId: 12,
      name: 'Halloween spooky eye balls',
      servings: 12,
      calories_per_serving: 145,
      prep_time: 30,
      cook_time: 15
    };

    const steps = [
      { recipeId: 1, stepNo: 1, content: 'Boil twelve eggs' }
    ];

    const ingredients = 'ingredients';

    const cookbookId = 1;

    const categories = [
      { recipeId: 1, categoryId: 1 }
    ];

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for ingredients'

    /* Mock Express request and response */
    const mockRequest = {
      body: {
        recipe: recipe,
        steps: steps,
        ingredients: ingredients,
        cookbookId: cookbookId,
        categories: categories
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if request body cookbookId is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Recipe successfully added'
    }

    // Set any variables needed to be passed to controllers and or models
    const recipe = {
      userId: 12,
      name: 'Halloween spooky eye balls',
      servings: 12,
      calories_per_serving: 145,
      prep_time: 30,
      cook_time: 15
    };

    const steps = [
      { recipeId: 1, stepNo: 1, content: 'Boil twelve eggs' }
    ];

    const ingredients = [
      { recipeId: 1, ingredientId: 1, amount: 12, amount_type: 'large'}
    ];

    const cookbookId = 1;

    const categories = [
      { recipeId: 1, categoryId: 1 }
    ];

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined cookbookId'

    /* Mock Express request and response */
    const mockRequest = {
      body: {
        recipe: recipe,
        steps: steps,
        ingredients: ingredients,
        categories: categories
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });
  });

  it('should return status 400 if request body cookbookId is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Recipe successfully added'
    }

    // Set any variables needed to be passed to controllers and or models
    const recipe = {
      userId: 12,
      name: 'Halloween spooky eye balls',
      servings: 12,
      calories_per_serving: 145,
      prep_time: 30,
      cook_time: 15
    };

    const steps = [
      { recipeId: 1, stepNo: 1, content: 'Boil twelve eggs' }
    ];

    const ingredients = [
      { recipeId: 1, ingredientId: 1, amount: 12, amount_type: 'large'}
    ];

    const cookbookId = 'twelve';

    const categories = [
      { recipeId: 1, categoryId: 1 }
    ];

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for cookbookId'

    /* Mock Express request and response */
    const mockRequest = {
      body: {
        recipe: recipe,
        steps: steps,
        ingredients: ingredients,
        cookbookId: cookbookId,
        categories: categories
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });
  });

  it('should return status 400 if request body categories is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Recipe successfully added'
    }

    // Set any variables needed to be passed to controllers and or models
    const recipe = {
      userId: 12,
      name: 'Halloween spooky eye balls',
      servings: 12,
      calories_per_serving: 145,
      prep_time: 30,
      cook_time: 15
    };

    const steps = [
      { recipeId: 1, stepNo: 1, content: 'Boil twelve eggs' }
    ];

    const ingredients = [
      { recipeId: 1, ingredientId: 1, amount: 12, amount_type: 'large'}
    ];

    const cookbookId = 1;

    const categories = [
      { recipeId: 1, categoryId: 1 }
    ];

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined categories'

    /* Mock Express request and response */
    const mockRequest = {
      body: {
        recipe: recipe,
        steps: steps,
        ingredients: ingredients,
        cookbookId: cookbookId,
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if request body categories is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Recipe successfully added'
    }

    // Set any variables needed to be passed to controllers and or models
    const recipe = {
      userId: 12,
      name: 'Halloween spooky eye balls',
      servings: 12,
      calories_per_serving: 145,
      prep_time: 30,
      cook_time: 15
    };

    const steps = [
      { recipeId: 1, stepNo: 1, content: 'Boil twelve eggs' }
    ];

    const ingredients = [
      { recipeId: 1, ingredientId: 1, amount: 12, amount_type: 'large'}
    ];

    const cookbookId = 1;

    const categories = null;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for categories'

    /* Mock Express request and response */
    const mockRequest = {
      body: {
        recipe: recipe,
        steps: steps,
        ingredients: ingredients,
        cookbookId: cookbookId,
        categories: 'categories'
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 500 if the resource encounters any other problems', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'There was a problem with the resource, please try again later'
    }

    // Set any variables needed to be passed to controllers and or models
    const recipe = {
      userId: 12,
      name: 'Halloween spooky eye balls',
      servings: 12,
      calories_per_serving: 145,
      prep_time: 30,
      cook_time: 15
    };

    const steps = [
      { recipeId: 1, stepNo: 1, content: 'Boil twelve eggs' }
    ];

    const ingredients = [
      { recipeId: 1, ingredientId: 1, amount: 12, amount_type: 'large'}
    ];

    const cookbookId = 1;

    const categories = [
      { recipeId: 1, categoryId: 1 }
    ];

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 500;
    const returnSuccess = false;
    const returnMessage = 'There was a problem with the resource, please try again later'

    /* Mock Express request and response */
    const mockRequest = {
      body: {
        recipe: recipe,
        steps: steps,
        ingredients: ingredients,
        cookbookId: cookbookId,
        categories: categories
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

});

describe('recipesController.addRecipeIngredients', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and add the ingredient to the recipe', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Ingredient successfully added to recipe'
    }

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;
    const ingredientId = 1;
    const amount = 200;
    const amount_type = 'grams';

    // Mock any needed third party modules
    jest.spyOn(recipeIngredientsModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = 'Ingredient successfully added to recipe';

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const response = await request(app)
      .post(`/recipes/${recipeId}/ingredients`)
      .send({
        ingredientId: ingredientId,
        amount: amount,
        amount_type: amount_type
      });

    /* Test everything works as expected */
    expect(response.status).toEqual(returnStatus);

    expect(typeof response.body).toBe('object');
    expect(typeof response.body.status).toBe('number');
    expect(typeof response.body.success).toBe('boolean');
    expect(typeof response.body.message).toBe('string');

    expect(response.body.status).toEqual(returnStatus);
    expect(response.body.success).toEqual(returnSuccess);
    expect(response.body.message).toEqual(returnMessage);

  });

  it('should return status 400 if the request body is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;
    const ingredientId = 1;
    const amount = 200;
    const amount_type = 'grams';

    // Mock any needed third party modules
    jest.spyOn(recipeIngredientsModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined request body';

    /* Mock Express request and response */
    const mockRequest = {
      params: {
        id: recipeId
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.addRecipeIngredients(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if the request parameters is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;
    const ingredientId = 1;
    const amount = 200;
    const amount_type = 'grams';

    // Mock any needed third party modules
    jest.spyOn(recipeIngredientsModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined request parameters';

    /* Mock Express request and response */
    const mockRequest = {
       body: {
         ingredientId: ingredientId,
         amount: amount,
         amount_type: amount_type
       }
     };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.addRecipeIngredients(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if the request parameter value recipeId is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;
    const ingredientId = 1;
    const amount = 200;
    const amount_type = 'grams';

    // Mock any needed third party modules
    jest.spyOn(recipeIngredientsModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined id';

    /* Mock Express request and response */
    const mockRequest = {
      params: {
       },
      body: {
        ingredientId: ingredientId,
        amount: amount,
        amount_type: amount_type
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.addRecipeIngredients(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if the request body ingredientId is undefined', async () => {

     // Set Mocked data that models and controllers should return
     const modelReturnData = [];

     // Set any variables needed to be passed to controllers and or models
     const recipeId = 1;
     const ingredientId = 1;
     const amount = 200;
     const amount_type = 'grams';
 
     // Mock any needed third party modules
     jest.spyOn(recipeIngredientsModel, 'create').mockImplementation(() => {
       return modelReturnData;
     });
 
     // Set here the expected return values for the test
     const returnStatus = 400;
     const returnSuccess = false;
     const returnMessage = 'Undefined ingredientId';
 
     /* Mock Express request and response */
     const mockRequest = {
      params: {
        id: recipeId
       },
       body: {
         amount: amount,
         amount_type: amount_type
       }
     };
     const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
     const mockNext = jest.fn();
 
     /* Execute the function */
     //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
     await recipesController.addRecipeIngredients(mockRequest, mockResponse, mockNext);
 
     /* Test everything works as expected */
     expect(mockNext).toHaveBeenCalled();
     expect(mockNext).toHaveBeenCalledWith({
       status: returnStatus,
       success: returnSuccess,
       message: returnMessage
     });

  });

  it('should return status 400 if the request body value ingredientId is of the wrong format', async () => {

     // Set Mocked data that models and controllers should return
     const modelReturnData = [];

     // Set any variables needed to be passed to controllers and or models
     const recipeId = 1;
     const ingredientId = 1;
     const amount = 200;
     const amount_type = 'grams';
 
     // Mock any needed third party modules
     jest.spyOn(recipeIngredientsModel, 'create').mockImplementation(() => {
       return modelReturnData;
     });
 
     // Set here the expected return values for the test
     const returnStatus = 400;
     const returnSuccess = false;
     const returnMessage = 'Wrong format for ingredientId';
 
     /* Mock Express request and response */
     const mockRequest = {
      params: {
        id: recipeId
       },
       body: {
         ingredientId: 'one',
         amount: amount,
         amount_type: amount_type
       }
     };
     const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
     const mockNext = jest.fn();
 
     /* Execute the function */
     //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
     await recipesController.addRecipeIngredients(mockRequest, mockResponse, mockNext);
 
     /* Test everything works as expected */
     expect(mockNext).toHaveBeenCalled();
     expect(mockNext).toHaveBeenCalledWith({
       status: returnStatus,
       success: returnSuccess,
       message: returnMessage
     });

  });

  it('should return status 400 if the request body value amount is undefined', async () => {

     // Set Mocked data that models and controllers should return
     const modelReturnData = [];

     // Set any variables needed to be passed to controllers and or models
     const recipeId = 1;
     const ingredientId = 1;
     const amount = 200;
     const amount_type = 'grams';
 
     // Mock any needed third party modules
     jest.spyOn(recipeIngredientsModel, 'create').mockImplementation(() => {
       return modelReturnData;
     });
 
     // Set here the expected return values for the test
     const returnStatus = 400;
     const returnSuccess = false;
     const returnMessage = 'Undefined amount';
 
     /* Mock Express request and response */
     const mockRequest = {
      params: {
        id: recipeId
       },
       body: {
         ingredientId: ingredientId,
         amount_type: amount_type
       }
     };
     const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
     const mockNext = jest.fn();
 
     /* Execute the function */
     //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
     await recipesController.addRecipeIngredients(mockRequest, mockResponse, mockNext);
 
     /* Test everything works as expected */
     expect(mockNext).toHaveBeenCalled();
     expect(mockNext).toHaveBeenCalledWith({
       status: returnStatus,
       success: returnSuccess,
       message: returnMessage
     });

  });

  it('should return status 400 if the request body value amount is of the wrong format', async () => {

     // Set Mocked data that models and controllers should return
     const modelReturnData = [];

     // Set any variables needed to be passed to controllers and or models
     const recipeId = 1;
     const ingredientId = 1;
     const amount = 200;
     const amount_type = 'grams';
 
     // Mock any needed third party modules
     jest.spyOn(recipeIngredientsModel, 'create').mockImplementation(() => {
       return modelReturnData;
     });
 
     // Set here the expected return values for the test
     const returnStatus = 400;
     const returnSuccess = false;
     const returnMessage = 'Wrong format for amount';
 
     /* Mock Express request and response */
     const mockRequest = {
      params: {
        id: recipeId
       },
       body: {
         ingredientId: ingredientId,
         amount: 'two hundred',
         amount_type: amount_type
       }
     };
     const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
     const mockNext = jest.fn();
 
     /* Execute the function */
     //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
     await recipesController.addRecipeIngredients(mockRequest, mockResponse, mockNext);
 
     /* Test everything works as expected */
     expect(mockNext).toHaveBeenCalled();
     expect(mockNext).toHaveBeenCalledWith({
       status: returnStatus,
       success: returnSuccess,
       message: returnMessage
     });

  });

  it('should return status 400 if the request body value amount_type is undefined', async () => {

     // Set Mocked data that models and controllers should return
     const modelReturnData = [];

     // Set any variables needed to be passed to controllers and or models
     const recipeId = 1;
     const ingredientId = 1;
     const amount = 200;
     const amount_type = 'grams';
 
     // Mock any needed third party modules
     jest.spyOn(recipeIngredientsModel, 'create').mockImplementation(() => {
       return modelReturnData;
     });
 
     // Set here the expected return values for the test
     const returnStatus = 400;
     const returnSuccess = false;
     const returnMessage = 'Undefined amount_type';
 
     /* Mock Express request and response */
     const mockRequest = {
      params: {
        id: recipeId
       },
       body: {
         ingredientId: ingredientId,
         amount: amount
       }
     };
     const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
     const mockNext = jest.fn();
 
     /* Execute the function */
     //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
     await recipesController.addRecipeIngredients(mockRequest, mockResponse, mockNext);
 
     /* Test everything works as expected */
     expect(mockNext).toHaveBeenCalled();
     expect(mockNext).toHaveBeenCalledWith({
       status: returnStatus,
       success: returnSuccess,
       message: returnMessage
     });

  });

  it('should return status 400 if the request body value amount_type is of the wrong format', async () => {

     // Set Mocked data that models and controllers should return
     const modelReturnData = [];

     // Set any variables needed to be passed to controllers and or models
     const recipeId = 1;
     const ingredientId = 1;
     const amount = 200;
     const amount_type = 'grams';
 
     // Mock any needed third party modules
     jest.spyOn(recipeIngredientsModel, 'create').mockImplementation(() => {
       return modelReturnData;
     });
 
     // Set here the expected return values for the test
     const returnStatus = 400;
     const returnSuccess = false;
     const returnMessage = 'Wrong format for amount_type';
 
     /* Mock Express request and response */
     const mockRequest = {
      params: {
        id: recipeId
       },
       body: {
         ingredientId: ingredientId,
         amount: amount,
         amount_type: 2345
       }
     };
     const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
     const mockNext = jest.fn();
 
     /* Execute the function */
     //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
     await recipesController.addRecipeIngredients(mockRequest, mockResponse, mockNext);
 
     /* Test everything works as expected */
     expect(mockNext).toHaveBeenCalled();
     expect(mockNext).toHaveBeenCalledWith({
       status: returnStatus,
       success: returnSuccess,
       message: returnMessage
     });

  });

  it('should return status 500 if the resource encounters any other problems', async () => {

     // Set Mocked data that models and controllers should return
     const modelReturnData = {
      success: false,
      message: 'There was a problem with the resource, please try again later'
     };

     // Set any variables needed to be passed to controllers and or models
     const recipeId = 1;
     const ingredientId = 1;
     const amount = 200;
     const amount_type = 'grams';
 
     // Mock any needed third party modules
     jest.spyOn(recipeIngredientsModel, 'create').mockImplementation(() => {
       return modelReturnData;
     });
 
     // Set here the expected return values for the test
     const returnStatus = 500;
     const returnSuccess = modelReturnData.success;
     const returnMessage = modelReturnData.message;
 
     /* Mock Express request and response */
     const mockRequest = {
       params: {
        id: recipeId
       },
       body: {
         ingredientId: ingredientId,
         amount: amount,
         amount_type: amount_type
       }
     };
     const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
     const mockNext = jest.fn();
 
     /* Execute the function */
     //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
     await recipesController.addRecipeIngredients(mockRequest, mockResponse, mockNext);
 
     /* Test everything works as expected */
     expect(mockNext).toHaveBeenCalled();
     expect(mockNext).toHaveBeenCalledWith({
       status: returnStatus,
       success: returnSuccess,
       message: returnMessage
     });

  });

});

describe('recipesController.addRecipeSteps', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and add the steps to the required recipe', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Step successfully created'
    };

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;
    const stepNo = 1;
    const stepContent = 'Crack 4 eggs into a bowl';

    // Mock any needed third party modules
    jest.spyOn(stepModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = 'Step has been successfully added to the recipe';

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const response = await request(app)
      .post(`/recipes/${recipeId}/steps`)
      .send({
        stepNo: stepNo,
        stepContent: stepContent
      });

    /* Test everything works as expected */
    expect(response.status).toEqual(returnStatus);

    expect(typeof response.body).toBe('object');
    expect(typeof response.body.success).toBe('boolean');
    expect(typeof response.body.message).toBe('string');

    expect(response.body.success).toEqual(returnSuccess);
    expect(response.body.message).toEqual(returnMessage);

  });

  it('should return status 400 if the request params are undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    const recipeId = 1;
    const stepNo = 1;
    const stepContent = 'Crack 4 eggs into a bowl';

    // Mock any needed third party modules
    jest.spyOn(stepModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined request parameters';

    /* Mock Express request and response */
    const mockRequest = {
      body: {
        stepNo: stepNo,
        stepContent: stepContent
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.addRecipeSteps(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if request parameter id is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    const recipeId = 1;
    const stepNo = 1;
    const stepContent = 'Crack 4 eggs into a bowl';

    // Mock any needed third party modules
    jest.spyOn(stepModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined id';

    /* Mock Express request and response */
    const mockRequest = {
      params: {
        
      },
      body: {
        stepNo: stepNo,
        stepContent: stepContent
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.addRecipeSteps(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if request body is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    const recipeId = 1;
    const stepNo = 1;
    const stepContent = 'Crack 4 eggs into a bowl';

    // Mock any needed third party modules
    jest.spyOn(stepModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined request body';

    /* Mock Express request and response */
    const mockRequest = {
      params: {
        id: recipeId
      },
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.addRecipeSteps(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  
  it('should return status 400 if the request body value stepNo is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    const recipeId = 1;
    const stepNo = 1;
    const stepContent = 'Crack 4 eggs into a bowl';

    // Mock any needed third party modules
    jest.spyOn(stepModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined stepNo';

    /* Mock Express request and response */
    const mockRequest = {
      params: {
        id: recipeId
      },
      body: {
        stepContent: stepContent
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.addRecipeSteps(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if request body value stepNo is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    const recipeId = 1;
    const stepNo = 1;
    const stepContent = 'Crack 4 eggs into a bowl';

    // Mock any needed third party modules
    jest.spyOn(stepModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for stepNo';

    /* Mock Express request and response */
    const mockRequest = {
      params: {
        id: recipeId
      },
      body: {
        stepNo: 'Twenty',
        stepContent: stepContent
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.addRecipeSteps(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if request body value stepContent is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    const recipeId = 1;
    const stepNo = 1;
    const stepContent = 'Crack 4 eggs into a bowl';

    // Mock any needed third party modules
    jest.spyOn(stepModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined stepContent';

    /* Mock Express request and response */
    const mockRequest = {
      params: {
        id: recipeId
      },
      body: {
        stepNo: stepNo,
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.addRecipeSteps(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if request body value stepContent is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    const recipeId = 1;
    const stepNo = 1;
    const stepContent = 'Crack 4 eggs into a bowl';

    // Mock any needed third party modules
    jest.spyOn(stepModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for stepContent';

    /* Mock Express request and response */
    const mockRequest = {
      params: {
        id: recipeId
      },
      body: {
        stepNo: stepNo,
        stepContent: 3456
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.addRecipeSteps(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 500 if the resource encountered any other problem', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'There was a problem with the resource, please try again later'
    };

    const recipeId = 1;
    const stepNo = 1;
    const stepContent = 'Crack 4 eggs into a bowl';

    // Mock any needed third party modules
    jest.spyOn(stepModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 500;
    const returnSuccess = modelReturnData.success;
    const returnMessage = modelReturnData.message;

    /* Mock Express request and response */
    const mockRequest = {
      params: {
        id: recipeId
      },
      body: {
        stepNo: stepNo,
        stepContent: stepContent
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.addRecipeSteps(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

});

describe('recipesController.addRecipeCategories', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and a message saying the category was added', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Category successfully added to Recipe'
    };

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;
    const categoryId = 1;
    
    // Mock any needed third party modules
    jest.spyOn(recipeCategoriesModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = modelReturnData.success;
    const returnMessage = modelReturnData.message;

    /* Mock Express request and response */
    const mockRequest = {
      params: {
        id: recipeId
      },
      body: {
        categoryId: categoryId
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const response = await request(app)
      .post(`/recipes/${recipeId}/categories`)
      .send({ categoryId: categoryId });

    /* Test everything works as expected */
    expect(response.status).toEqual(returnStatus);

    expect(typeof response.body).toBe('object');
    expect(typeof response.body.success).toBe('boolean');
    expect(typeof response.body.message).toBe('string');

    expect(response.body.success).toEqual(returnSuccess);
    expect(response.body.message).toEqual(returnMessage);

  });

  it('should return status 400 if request paramaters are undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;
    const categoryId = 1;
    
    // Mock any needed third party modules
    jest.spyOn(recipeCategoriesModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined request parameters';

    /* Mock Express request and response */
    const mockRequest = {
      
      body: {
        categoryId: categoryId
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.addRecipeCategories(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if request paramater id is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;
    const categoryId = 1;
    
    // Mock any needed third party modules
    jest.spyOn(recipeCategoriesModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined id';

    /* Mock Express request and response */
    const mockRequest = {
      params: {},
      body: {
        categoryId: categoryId
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.addRecipeCategories(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if request body is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;
    const categoryId = 1;
    
    // Mock any needed third party modules
    jest.spyOn(recipeCategoriesModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined request body';

    /* Mock Express request and response */
    const mockRequest = {
      params: {
        id: recipeId
      },
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.addRecipeCategories(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if request body value categoryId is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;
    const categoryId = 1;
    
    // Mock any needed third party modules
    jest.spyOn(recipeCategoriesModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined categoryId';

    /* Mock Express request and response */
    const mockRequest = {
      params: {
        id: recipeId
      },
      body: {
        
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.addRecipeCategories(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 500 if resource encounters any other problem', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'There was a problem with the resource, please try again later'
    };

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;
    const categoryId = 1;
    
    // Mock any needed third party modules
    jest.spyOn(recipeCategoriesModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 500;
    const returnSuccess = modelReturnData.success;
    const returnMessage = modelReturnData.message;

    /* Mock Express request and response */
    const mockRequest = {
      params: {
        id: recipeId
      },
      body: {
        categoryId: categoryId
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.addRecipeCategories(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

});

describe('recipesController.removeAll', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 after removing all the recipes', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'All recipes successfully deleted'
    };

    // Set any variables needed to be passed to controllers and or models


    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'removeAll').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = 'All recipes removed successfully';

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const response = await request(app)
      .delete(`/recipes`);

    /* Test everything works as expected */
    expect(response.status).toEqual(returnStatus);

    expect(typeof response.body).toBe('object');
    expect(typeof response.body.success).toBe('boolean');
    expect(typeof response.body.message).toBe('string');

    expect(response.body.success).toEqual(returnSuccess);
    expect(response.body.message).toEqual(returnMessage);

  });

  it('should return status 404 if no data to remove', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'removeAll').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 404;
    const returnSuccess = false;
    const returnMessage = 'No recipes found to be removed';

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const response = await request(app)
      .delete(`/recipes`);

    /* Test everything works as expected */
    expect(response.status).toEqual(returnStatus);

    expect(typeof response.body).toBe('object');
    expect(typeof response.body.success).toBe('boolean');
    expect(typeof response.body.message).toBe('string');

    expect(response.body.success).toEqual(returnSuccess);
    expect(response.body.message).toEqual(returnMessage);

  });

  it('should return status 500 if the resource encounters any other issues', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'There was a problem with the resource, please try again later'
    };

    // Set any variables needed to be passed to controllers and or models

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'removeAll').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 500;
    const returnSuccess = modelReturnData.success;
    const returnMessage = modelReturnData.message;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.removeAll(mockRequest, mockResponse, mockNext);
 
    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

});

describe('recipesController.remove', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  xit('should return status 200 and remove the specified recipe', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Recipe successfully removed'
    };

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'remove').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = modelReturnData.success;
    const returnMessage = modelReturnData.message;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const response = await request(app)
      .delete(`/recipes/${recipeId}`);

    /* Test everything works as expected */
    expect(response.status).toEqual(returnStatus);

    expect(typeof response.body).toBe('object');
    expect(typeof response.body.success).toBe('boolean');
    expect(typeof response.body.message).toBe('string');

    expect(response.body.success).toEqual(returnSuccess);
    expect(response.body.message).toEqual(returnMessage);

  });

  it('should return status 404 if no recipes found to be removed', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 12;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'remove').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 404;
    const returnSuccess = false;
    const returnMessage = 'No recipe found to be removed';

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const response = await request(app).delete(`/recipes/${recipeId}`);

    /* Test everything works as expected */
    expect(response.status).toBe(returnStatus);

    expect(typeof response.body).toBe('object');
    expect(typeof response.body.success).toBe('boolean');
    expect(typeof response.body.message).toBe('string');

    expect(response.body.success).toEqual(returnSuccess);
    expect(response.body.message).toEqual(returnMessage);
  });

  xit('should return status 400 if request params are undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'remove').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined request parameters';

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.remove(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  xit('should return status 400 if request parameter id is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'remove').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined id';

    /* Mock Express request and response */
    const mockRequest = {
      params: {}
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.remove(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  xit('should return status 500 if the resource encunters any other problems', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'There was a problem with the resource, please try again later'
    };

    // Set any variables needed to be passed to controllers and or models
    const recipeId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'remove').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 500;
    const returnSuccess = modelReturnData.success;
    const returnMessage = modelReturnData.message;

    /* Mock Express request and response */
    const mockRequest = {
      params: {
        id: recipeId
      }
    };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await recipesController.remove(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

});

xdescribe('<model>Controller.<method>', () => {

    /*
     * Steps to run before and after this test suite
     */
    beforeEach(async () => {
  
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    })
  
    xit('returns ...', async () => {
  
      // Set Mocked data that models and controllers should return
  
      // Set any variables needed to be passed to controllers and or models
  
      // Mock any needed third party modules
  
      // Set here the expected return values for the test
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
  
      /* Test everything works as expected */
  
    });
  
});