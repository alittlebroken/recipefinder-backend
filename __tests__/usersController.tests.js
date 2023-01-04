/* Modules required for the tests */
require('dotenv').config();
const messageHelper = require('../helpers/constants');

const request = require('supertest');
const app = require('../index.js');

const userModel = require('../models/userModel');
const recipeModel = require('../models/recipeModel');
const cookbookModel = require('../models/cookbookModel');
const pantryIngredients = require('../models/pantryIngredientsModel');
const userController = require('../controllers/usersController');

const passport = require('passport');

describe('userController.listAll', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and a list of all users', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [
      {id: 1, username: 'tjones@ms.net', email: 'tjones@ms.net', roles: 'Customer', forename: 'Tom', surname: 'jones'},
      {id: 2, username: 'sdavies@yip.com', email: 'sdavies@yip.com', roles: 'Customer', forename: 'Sammi', surname: 'Davies'},
      {id: 3, username: 'pgains@delta.ip', email: 'pgains@delta.ip', roles: 'Admin', forename: 'Phillipa', surname: 'Gains'},
      {id: 4, username: 'jholt@yesmen.net', email: 'jholt@yesmen.net', roles: 'Admin', forename: 'Jessica', surname: 'Holt'}
    ];

    // Set any variables needed to be passed to controllers and or models

    // Mock any needed third party modules
    jest.spyOn(userModel, 'findAll').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = '';
    const returnResults = modelReturnData;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const response = await request(app)
      .get('/users');

    /* Test everything works as expected */
    expect(response.status).toEqual(returnStatus);

    expect(typeof response.body).toBe('object');
    expect(typeof response.body.status).toBe('number');
    expect(typeof response.body.success).toBe('boolean');
    expect(Array.isArray(response.body.results)).toBe(true);

    expect(response.body.status).toEqual(returnStatus);
    expect(response.body.success).toEqual(returnSuccess);
    expect(response.body.results).toEqual(modelReturnData);
    expect(response.body.results).toHaveLength(4);

  });

  it('should return status 204 if no users were found', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models

    // Mock any needed third party modules
    jest.spyOn(userModel, 'findAll').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 404;
    const returnSuccess = false;
    const returnMessage = 'There currently no users in the system';
    const returnResults = modelReturnData;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const response = await request(app)
      .get('/users');

    /* Test everything works as expected */
    expect(response.status).toEqual(returnStatus);

    expect(typeof response.body).toBe('object');
    expect(typeof response.body.status).toBe('number');
    expect(typeof response.body.success).toBe('boolean');
    expect(typeof response.body.message).toBe('string');
    expect(Array.isArray(response.body.results)).toBe(true);

    expect(response.body.status).toEqual(returnStatus);
    expect(response.body.success).toEqual(returnSuccess);
    expect(response.body.message).toEqual(returnMessage);
    expect(response.body.results).toEqual(returnResults);
    expect(response.body.results).toHaveLength(0);

  });

  it('should return status 500 there was a problem with the resource', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'There was a problem with the resource, please try again later'
    };

    // Set any variables needed to be passed to controllers and or models

    // Mock any needed third party modules
    jest.spyOn(userModel, 'findAll').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 500;
    const returnSuccess = false;
    const returnMessage = 'There was a problem with the resource, please try again later';
    const returnResults = modelReturnData;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const response = await request(app)
      .get('/users');

    /* Test everything works as expected */
    expect(response.status).toEqual(returnStatus);

    expect(typeof response.body).toBe('object');
    expect(typeof response.body.status).toBe('number');
    expect(typeof response.body.success).toBe('boolean');
    expect(typeof response.body.message).toBe('string');
    expect(Array.isArray(response.body.results)).toBe(true);

    expect(response.body.status).toEqual(returnStatus);
    expect(response.body.success).toEqual(returnSuccess);
    expect(response.body.message).toEqual(returnMessage);
    expect(response.body.results).toHaveLength(0);

  });

});

describe('userController.listUser', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and the specified user', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [
      {id: 1, username: 'tjones@ms.net', email: 'tjones@ms.net', roles: 'Customer', forename: 'Tom', surname: 'jones'}
    ];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(userModel, 'findById').mockImplementation(() => {
      return modelReturnData;
    })

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = '';
    const returnResults = modelReturnData;
    const returnResultsLength = 1;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}`);

    /* Test everything works as expected */
    expect(res.status).toEqual(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 404 if the specified user is not found', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1001;

    // Mock any needed third party modules
    jest.spyOn(userModel, 'findById').mockImplementation(() => {
      return modelReturnData;
    })

    // Set here the expected return values for the test
    const returnStatus = 404;
    const returnSuccess = false;
    const returnMessage = 'No user found matching that id';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}`);

    /* Test everything works as expected */
    expect(res.status).toEqual(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if the userId is missing', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    let userId;

    // Mock any needed third party modules
    jest.spyOn(userModel, 'findById').mockImplementation(() => {
      return modelReturnData;
    })

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined userId';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}`);

    /* Test everything works as expected */
    expect(res.status).toEqual(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 500 if there was a problem with the resource', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'There was a proiblem with the resource, please try again later'
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(userModel, 'findById').mockImplementation(() => {
      return modelReturnData;
    })

    // Set here the expected return values for the test
    const returnStatus = 500;
    const returnSuccess = false;
    const returnMessage = 'There was a problem with the resource, please try again later';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}`);

    /* Test everything works as expected */
    expect(res.status).toEqual(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

});

describe('userController.listUserRecipes', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and a list of the users recipes', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [
      {
        id: 1, 
        userId: 1, 
        name: 'Vegan pancakes',
        description: 'American style pancakes made with all vegan ingredients',
        servings: 4,
        calories_per_serving: 250,
        prep_time: 15,
        cook_time: 5,
        rating: 10002
      }

    ];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'findByUserId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = '';
    const returnResults = modelReturnData;
    const returnResultsLength = 1;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}/recipes`);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 404 and an empty list if the user has no recipes', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'findByUserId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 404;
    const returnSuccess = false;
    const returnMessage = 'The user currently has no recipes';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}/recipes`);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if the userId is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    let userId;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'findByUserId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined userId';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}/recipes`);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 500 if the resource encounters any other problem', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'There was a problem with the resource, please try again later'
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'findByUserId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 500;
    const returnSuccess = false;
    const returnMessage = modelReturnData.message;
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}/recipes`);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status ', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [
      {
        id: 1, 
        userId: 1, 
        name: 'Vegan pancakes',
        description: 'American style pancakes made with all vegan ingredients',
        servings: 4,
        calories_per_serving: 250,
        prep_time: 15,
        cook_time: 5,
        rating: 10002
      }

    ];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'findByUserId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = '';
    const returnResults = modelReturnData;
    const returnResultsLength = 1;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}/recipes`);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

});

describe('userController.listUserCookbooks', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and the users cookbooks', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [
      {
        id: 1, 
        userId: 1, 
        name: 'Vegan pancakes',
        description: 'American style pancakes made with all vegan ingredients',
        servings: 4,
        calories_per_serving: 250,
        prep_time: 15,
        cook_time: 5,
        rating: 10002
      }

    ];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(cookbookModel, 'findByUserId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = '';
    const returnResults = modelReturnData;
    const returnResultsLength = 1;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}/cookbooks`);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 404 and an empty array if no records found', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 13;

    // Mock any needed third party modules
    jest.spyOn(cookbookModel, 'findByUserId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 404;
    const returnSuccess = false;
    const returnMessage = 'The user currently has no cookbooks';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}/cookbooks`);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if the userId is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    let userId;

    // Mock any needed third party modules
    jest.spyOn(cookbookModel, 'findByUserId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined userId';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}/cookbooks`);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 500 if there is any other problem with the resource', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'There was a problem with the resource, please try again later'
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(cookbookModel, 'findByUserId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 500;
    const returnSuccess = false;
    const returnMessage = modelReturnData.message;
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}/cookbooks`);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

});

describe('userController.listUserPantryItems', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and list all ingredients in a users pantry', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [{
      id: 1,
      pantryId: 1,
      ingredientId: 1,
      userId: 1,
      username: 'Newt Scaremonger',
      ingredientName: 'Dragon fruit',
      amount: 6,
      amount_type: 'large'
    }];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'findByUser').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = '';
    const returnResults = modelReturnData;
    const returnResultsLength = 1;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}/pantry`);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 404 and an empty array if no entries in the users pantry', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'findByUser').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 404;
    const returnSuccess = false;
    const returnMessage = 'The user currently has no pantry ingredients';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}/pantry`);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if the userId is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    let userId;

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'findByUser').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined userId';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}/pantry`);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 500 if the resource encounters any other problems', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'There was a problem with the resource, please try again later'
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'findByUser').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 500;
    const returnSuccess = false;
    const returnMessage = modelReturnData.message;
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}/pantry`);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

});

describe('userController.createUser', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and create the user', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [
      {
        id: 12,
        username: 'twatts@acedrinks.com',
        email: 'twatts@acedrinks.com',
        roles: 'Customer'
      }

    ];

    // Set any variables needed to be passed to controllers and or models
    const username = 'twatts@acedrinks.com';
    const email  = 'twatts@acedrinks.com';
    const password = 'terrylovesyoghurt';

    const payload = {
      username,
      email,
      password
    }

    // Mock any needed third party modules
    jest.spyOn(userModel, 'insert').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = '';
    const returnResults = modelReturnData;
    const returnResultsLength = 1;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if username is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const username = 'twatts@acedrinks.com';
    const email  = 'twatts@acedrinks.com';
    const password = 'terrylovesyoghurt';

    const payload = {
      email,
      password
    }

    // Mock any needed third party modules
    jest.spyOn(userModel, 'insert').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined username';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if username is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const username = 24567;
    const email  = 'twatts@acedrinks.com';
    const password = 'terrylovesyoghurt';

    const payload = {
      username,
      email,
      password
    }

    // Mock any needed third party modules
    jest.spyOn(userModel, 'insert').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for username';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if email is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const username = 'twatts@acedrinks.com';
    const email  = 'twatts@acedrinks.com';
    const password = 'terrylovesyoghurt';

    const payload = {
      username,
      password
    }

    // Mock any needed third party modules
    jest.spyOn(userModel, 'insert').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined email';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if email is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const username = 'twatts@acedrinks.com';
    const email  = 3942312;
    const password = 'terrylovesyoghurt';

    const payload = {
      username,
      email,
      password
    }

    // Mock any needed third party modules
    jest.spyOn(userModel, 'insert').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for email';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if password is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const username = 'twatts@acedrinks.com';
    const email  = 'twatts@acedrinks.com';
    const password = 'terrylovesyoghurt';

    const payload = {
      username,
      email,
    }

    // Mock any needed third party modules
    jest.spyOn(userModel, 'insert').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined password';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if password is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const username = 'twatts@acedrinks.com';
    const email  = 'twatts@acedrinks.com';
    const password = 3847293847;

    const payload = {
      username,
      email,
      password
    }

    // Mock any needed third party modules
    jest.spyOn(userModel, 'insert').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for password';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 500 if there was another issue with the resource', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'There was a problem with the resource, please try again later'
    };

    // Set any variables needed to be passed to controllers and or models
    const username = 'twatts@acedrinks.com';
    const email  = 'twatts@acedrinks.com';
    const password = 'terrylovesyoghurt';

    const payload = {
      username,
      email,
      password
    }

    // Mock any needed third party modules
    jest.spyOn(userModel, 'insert').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 500;
    const returnSuccess = false;
    const returnMessage = modelReturnData.message;
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

});

describe('userController.createUserRecipe', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and a message to say the recipe was added', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Recipe successfully added'
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        userId: 1,
        name: 'Beans on toast',
        servings: 1,
        calories_per_serving: 345,
        prep_time: 3,
        cook_time: 10
      },
      steps: [
        { stepNo: 1, content: 'Pour beans into a saucepan and place on a medium heat' },
        { stepNo: 2, content: 'Toast the bread in a toaster or under the grill'},
        { stepNo: 3, content: 'Place toast on a plate and pour over the beans'},
        { stepNo: 4, content: 'Server and enjoy'}
      ],
      ingredients: [
        { ingredientId: 1, amount: 1, amount_type: 'slice' },
        { ingredientId: 2, amount: 250, amount_type: 'grams'}
      ],
      cookbookId: 2,
      categories: [
        { categoryId: 1},
        { categoryId: 2}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = modelReturnData.message;
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/recipes`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if the recipes object is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      steps: [
        { stepNo: 1, content: 'Pour beans into a saucepan and place on a medium heat' },
        { stepNo: 2, content: 'Toast the bread in a toaster or under the grill'},
        { stepNo: 3, content: 'Place toast on a plate and pour over the beans'},
        { stepNo: 4, content: 'Server and enjoy'}
      ],
      ingredients: [
        { ingredientId: 1, amount: 1, amount_type: 'slice' },
        { ingredientId: 2, amount: 250, amount_type: 'grams'}
      ],
      cookbookId: 2,
      categories: [
        { categoryId: 1},
        { categoryId: 2}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined recipe';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/recipes`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if the recipes object is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: 45363,
      steps: [
        { stepNo: 1, content: 'Pour beans into a saucepan and place on a medium heat' },
        { stepNo: 2, content: 'Toast the bread in a toaster or under the grill'},
        { stepNo: 3, content: 'Place toast on a plate and pour over the beans'},
        { stepNo: 4, content: 'Server and enjoy'}
      ],
      ingredients: [
        { ingredientId: 1, amount: 1, amount_type: 'slice' },
        { ingredientId: 2, amount: 250, amount_type: 'grams'}
      ],
      cookbookId: 2,
      categories: [
        { categoryId: 1},
        { categoryId: 2}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for recipe';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/recipes`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if userId is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    let userId;
    const payload = {
      recipe: {
        userId: 1,
        name: 'Beans on toast',
        servings: 1,
        calories_per_serving: 345,
        prep_time: 3,
        cook_time: 10
      },
      steps: [
        { stepNo: 1, content: 'Pour beans into a saucepan and place on a medium heat' },
        { stepNo: 2, content: 'Toast the bread in a toaster or under the grill'},
        { stepNo: 3, content: 'Place toast on a plate and pour over the beans'},
        { stepNo: 4, content: 'Server and enjoy'}
      ],
      ingredients: [
        { ingredientId: 1, amount: 1, amount_type: 'slice' },
        { ingredientId: 2, amount: 250, amount_type: 'grams'}
      ],
      cookbookId: 2,
      categories: [
        { categoryId: 1},
        { categoryId: 2}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined userId';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/recipes`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if recipe userId is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        name: 'Beans on toast',
        servings: 1,
        calories_per_serving: 345,
        prep_time: 3,
        cook_time: 10
      },
      steps: [
        { stepNo: 1, content: 'Pour beans into a saucepan and place on a medium heat' },
        { stepNo: 2, content: 'Toast the bread in a toaster or under the grill'},
        { stepNo: 3, content: 'Place toast on a plate and pour over the beans'},
        { stepNo: 4, content: 'Server and enjoy'}
      ],
      ingredients: [
        { ingredientId: 1, amount: 1, amount_type: 'slice' },
        { ingredientId: 2, amount: 250, amount_type: 'grams'}
      ],
      cookbookId: 2,
      categories: [
        { categoryId: 1},
        { categoryId: 2}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined recipe userId';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/recipes`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if recipe userid is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        userId: '45362',
        name: 'Beans on toast',
        servings: 1,
        calories_per_serving: 345,
        prep_time: 3,
        cook_time: 10
      },
      steps: [
        { stepNo: 1, content: 'Pour beans into a saucepan and place on a medium heat' },
        { stepNo: 2, content: 'Toast the bread in a toaster or under the grill'},
        { stepNo: 3, content: 'Place toast on a plate and pour over the beans'},
        { stepNo: 4, content: 'Server and enjoy'}
      ],
      ingredients: [
        { ingredientId: 1, amount: 1, amount_type: 'slice' },
        { ingredientId: 2, amount: 250, amount_type: 'grams'}
      ],
      cookbookId: 2,
      categories: [
        { categoryId: 1},
        { categoryId: 2}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for recipe userId';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/recipes`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if recipe name is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        userId: userId,
        servings: 1,
        calories_per_serving: 345,
        prep_time: 3,
        cook_time: 10
      },
      steps: [
        { stepNo: 1, content: 'Pour beans into a saucepan and place on a medium heat' },
        { stepNo: 2, content: 'Toast the bread in a toaster or under the grill'},
        { stepNo: 3, content: 'Place toast on a plate and pour over the beans'},
        { stepNo: 4, content: 'Server and enjoy'}
      ],
      ingredients: [
        { ingredientId: 1, amount: 1, amount_type: 'slice' },
        { ingredientId: 2, amount: 250, amount_type: 'grams'}
      ],
      cookbookId: 2,
      categories: [
        { categoryId: 1},
        { categoryId: 2}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined recipe name';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/recipes`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if recipe name is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        userId: userId,
        name: 12,
        servings: 1,
        calories_per_serving: 345,
        prep_time: 3,
        cook_time: 10
      },
      steps: [
        { stepNo: 1, content: 'Pour beans into a saucepan and place on a medium heat' },
        { stepNo: 2, content: 'Toast the bread in a toaster or under the grill'},
        { stepNo: 3, content: 'Place toast on a plate and pour over the beans'},
        { stepNo: 4, content: 'Server and enjoy'}
      ],
      ingredients: [
        { ingredientId: 1, amount: 1, amount_type: 'slice' },
        { ingredientId: 2, amount: 250, amount_type: 'grams'}
      ],
      cookbookId: 2,
      categories: [
        { categoryId: 1},
        { categoryId: 2}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for recipe name';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/recipes`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if recipe servings is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        userId: userId,
        name: 'Beans on toast',
        
        calories_per_serving: 345,
        prep_time: 3,
        cook_time: 10
      },
      steps: [
        { stepNo: 1, content: 'Pour beans into a saucepan and place on a medium heat' },
        { stepNo: 2, content: 'Toast the bread in a toaster or under the grill'},
        { stepNo: 3, content: 'Place toast on a plate and pour over the beans'},
        { stepNo: 4, content: 'Server and enjoy'}
      ],
      ingredients: [
        { ingredientId: 1, amount: 1, amount_type: 'slice' },
        { ingredientId: 2, amount: 250, amount_type: 'grams'}
      ],
      cookbookId: 2,
      categories: [
        { categoryId: 1},
        { categoryId: 2}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined recipe servings';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/recipes`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if recipe servings are of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        userId: userId,
        name: 'Beans on toast',
        servings: '1',
        calories_per_serving: 345,
        prep_time: 3,
        cook_time: 10
      },
      steps: [
        { stepNo: 1, content: 'Pour beans into a saucepan and place on a medium heat' },
        { stepNo: 2, content: 'Toast the bread in a toaster or under the grill'},
        { stepNo: 3, content: 'Place toast on a plate and pour over the beans'},
        { stepNo: 4, content: 'Server and enjoy'}
      ],
      ingredients: [
        { ingredientId: 1, amount: 1, amount_type: 'slice' },
        { ingredientId: 2, amount: 250, amount_type: 'grams'}
      ],
      cookbookId: 2,
      categories: [
        { categoryId: 1},
        { categoryId: 2}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for recipe servings';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/recipes`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if recipe calories_per_serving is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        userId: userId,
        name: 'Beans on toast',
        servings: 1,
        
        prep_time: 3,
        cook_time: 10
      },
      steps: [
        { stepNo: 1, content: 'Pour beans into a saucepan and place on a medium heat' },
        { stepNo: 2, content: 'Toast the bread in a toaster or under the grill'},
        { stepNo: 3, content: 'Place toast on a plate and pour over the beans'},
        { stepNo: 4, content: 'Server and enjoy'}
      ],
      ingredients: [
        { ingredientId: 1, amount: 1, amount_type: 'slice' },
        { ingredientId: 2, amount: 250, amount_type: 'grams'}
      ],
      cookbookId: 2,
      categories: [
        { categoryId: 1},
        { categoryId: 2}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined recipe calories_per_serving';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/recipes`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if recipe calories_per_serving is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        userId: userId,
        name: 'Beans on toast',
        servings: 1,
        calories_per_serving: '345',
        prep_time: 3,
        cook_time: 10
      },
      steps: [
        { stepNo: 1, content: 'Pour beans into a saucepan and place on a medium heat' },
        { stepNo: 2, content: 'Toast the bread in a toaster or under the grill'},
        { stepNo: 3, content: 'Place toast on a plate and pour over the beans'},
        { stepNo: 4, content: 'Server and enjoy'}
      ],
      ingredients: [
        { ingredientId: 1, amount: 1, amount_type: 'slice' },
        { ingredientId: 2, amount: 250, amount_type: 'grams'}
      ],
      cookbookId: 2,
      categories: [
        { categoryId: 1},
        { categoryId: 2}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for recipe calories_per_serving';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/recipes`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if recipe prep_time is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        userId: userId,
        name: 'Beans on toast',
        servings: 1,
        calories_per_serving: 345,
        
        cook_time: 10
      },
      steps: [
        { stepNo: 1, content: 'Pour beans into a saucepan and place on a medium heat' },
        { stepNo: 2, content: 'Toast the bread in a toaster or under the grill'},
        { stepNo: 3, content: 'Place toast on a plate and pour over the beans'},
        { stepNo: 4, content: 'Server and enjoy'}
      ],
      ingredients: [
        { ingredientId: 1, amount: 1, amount_type: 'slice' },
        { ingredientId: 2, amount: 250, amount_type: 'grams'}
      ],
      cookbookId: 2,
      categories: [
        { categoryId: 1},
        { categoryId: 2}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined recipe prep_time';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/recipes`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if recipe prep_time is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        userId: userId,
        name: 'Beans on toast',
        servings: 1,
        calories_per_serving: 345,
        prep_time: '3',
        cook_time: 10
      },
      steps: [
        { stepNo: 1, content: 'Pour beans into a saucepan and place on a medium heat' },
        { stepNo: 2, content: 'Toast the bread in a toaster or under the grill'},
        { stepNo: 3, content: 'Place toast on a plate and pour over the beans'},
        { stepNo: 4, content: 'Server and enjoy'}
      ],
      ingredients: [
        { ingredientId: 1, amount: 1, amount_type: 'slice' },
        { ingredientId: 2, amount: 250, amount_type: 'grams'}
      ],
      cookbookId: 2,
      categories: [
        { categoryId: 1},
        { categoryId: 2}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for recipe prep_time';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/recipes`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if recipe cook_time is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        userId: userId,
        name: 'Beans on toast',
        servings: 1,
        calories_per_serving: 345,
        prep_time: 3,
        
      },
      steps: [
        { stepNo: 1, content: 'Pour beans into a saucepan and place on a medium heat' },
        { stepNo: 2, content: 'Toast the bread in a toaster or under the grill'},
        { stepNo: 3, content: 'Place toast on a plate and pour over the beans'},
        { stepNo: 4, content: 'Server and enjoy'}
      ],
      ingredients: [
        { ingredientId: 1, amount: 1, amount_type: 'slice' },
        { ingredientId: 2, amount: 250, amount_type: 'grams'}
      ],
      cookbookId: 2,
      categories: [
        { categoryId: 1},
        { categoryId: 2}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined recipe cook_time';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/recipes`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if recipe cook_time is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        userId: userId,
        name: 'Beans on toast',
        servings: 1,
        calories_per_serving: 345,
        prep_time: 3,
        cook_time: '10'
      },
      steps: [
        { stepNo: 1, content: 'Pour beans into a saucepan and place on a medium heat' },
        { stepNo: 2, content: 'Toast the bread in a toaster or under the grill'},
        { stepNo: 3, content: 'Place toast on a plate and pour over the beans'},
        { stepNo: 4, content: 'Server and enjoy'}
      ],
      ingredients: [
        { ingredientId: 1, amount: 1, amount_type: 'slice' },
        { ingredientId: 2, amount: 250, amount_type: 'grams'}
      ],
      cookbookId: 2,
      categories: [
        { categoryId: 1},
        { categoryId: 2}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for recipe cook_time';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/recipes`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if steps are undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        userId: userId,
        name: 'Beans on toast',
        servings: 1,
        calories_per_serving: 345,
        prep_time: 3,
        cook_time: 10
      },
      
      ingredients: [
        { ingredientId: 1, amount: 1, amount_type: 'slice' },
        { ingredientId: 2, amount: 250, amount_type: 'grams'}
      ],
      cookbookId: 2,
      categories: [
        { categoryId: 1},
        { categoryId: 2}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined steps';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/recipes`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if steps are of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        userId: userId,
        name: 'Beans on toast',
        servings: 1,
        calories_per_serving: 345,
        prep_time: 3,
        cook_time: 10
      },
      steps: 'stepNo: 1, content: heat beans over a medium heat',
      ingredients: [
        { ingredientId: 1, amount: 1, amount_type: 'slice' },
        { ingredientId: 2, amount: 250, amount_type: 'grams'}
      ],
      cookbookId: 2,
      categories: [
        { categoryId: 1},
        { categoryId: 2}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for steps';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/recipes`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if ingredients are undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        userId: userId,
        name: 'Beans on toast',
        servings: 1,
        calories_per_serving: 345,
        prep_time: 3,
        cook_time: 10
      },
      steps: [
        { stepNo: 1, content: 'Pour beans into a saucepan and place on a medium heat' },
        { stepNo: 2, content: 'Toast the bread in a toaster or under the grill'},
        { stepNo: 3, content: 'Place toast on a plate and pour over the beans'},
        { stepNo: 4, content: 'Server and enjoy'}
      ],
      cookbookId: 2,
      categories: [
        { categoryId: 1},
        { categoryId: 2}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined ingredients';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/recipes`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if ingredients are of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        userId: userId,
        name: 'Beans on toast',
        servings: 1,
        calories_per_serving: 345,
        prep_time: 3,
        cook_time: 10
      },
      steps: [
        { stepNo: 1, content: 'Pour beans into a saucepan and place on a medium heat' },
        { stepNo: 2, content: 'Toast the bread in a toaster or under the grill'},
        { stepNo: 3, content: 'Place toast on a plate and pour over the beans'},
        { stepNo: 4, content: 'Server and enjoy'}
      ],
      ingredients: 'id:1, ingredientId: 1, amount: 12, amount_type: grams',
      cookbookId: 2,
      categories: [
        { categoryId: 1},
        { categoryId: 2}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for ingredients';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/recipes`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if cookbookId is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        userId: userId,
        name: 'Beans on toast',
        servings: 1,
        calories_per_serving: 345,
        prep_time: 3,
        cook_time: 10
      },
      steps: [
        { stepNo: 1, content: 'Pour beans into a saucepan and place on a medium heat' },
        { stepNo: 2, content: 'Toast the bread in a toaster or under the grill'},
        { stepNo: 3, content: 'Place toast on a plate and pour over the beans'},
        { stepNo: 4, content: 'Server and enjoy'}
      ],
      ingredients: [
        { ingredientId: 1, amount: 1, amount_type: 'slice' },
        { ingredientId: 2, amount: 250, amount_type: 'grams'}
      ],
      
      categories: [
        { categoryId: 1},
        { categoryId: 2}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined cookbookId';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/recipes`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if cookbookId is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        userId: userId,
        name: 'Beans on toast',
        servings: 1,
        calories_per_serving: 345,
        prep_time: 3,
        cook_time: 10
      },
      steps: [
        { stepNo: 1, content: 'Pour beans into a saucepan and place on a medium heat' },
        { stepNo: 2, content: 'Toast the bread in a toaster or under the grill'},
        { stepNo: 3, content: 'Place toast on a plate and pour over the beans'},
        { stepNo: 4, content: 'Server and enjoy'}
      ],
      ingredients: [
        { ingredientId: 1, amount: 1, amount_type: 'slice' },
        { ingredientId: 2, amount: 250, amount_type: 'grams'}
      ],
      cookbookId: '2',
      categories: [
        { categoryId: 1},
        { categoryId: 2}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for cookbookId';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/recipes`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if categories are undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        userId: userId,
        name: 'Beans on toast',
        servings: 1,
        calories_per_serving: 345,
        prep_time: 3,
        cook_time: 10
      },
      steps: [
        { stepNo: 1, content: 'Pour beans into a saucepan and place on a medium heat' },
        { stepNo: 2, content: 'Toast the bread in a toaster or under the grill'},
        { stepNo: 3, content: 'Place toast on a plate and pour over the beans'},
        { stepNo: 4, content: 'Server and enjoy'}
      ],
      ingredients: [
        { ingredientId: 1, amount: 1, amount_type: 'slice' },
        { ingredientId: 2, amount: 250, amount_type: 'grams'}
      ],
      cookbookId: 2,
      
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined categories';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/recipes`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 400 if categories are of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        userId: userId,
        name: 'Beans on toast',
        servings: 1,
        calories_per_serving: 345,
        prep_time: 3,
        cook_time: 10
      },
      steps: [
        { stepNo: 1, content: 'Pour beans into a saucepan and place on a medium heat' },
        { stepNo: 2, content: 'Toast the bread in a toaster or under the grill'},
        { stepNo: 3, content: 'Place toast on a plate and pour over the beans'},
        { stepNo: 4, content: 'Server and enjoy'}
      ],
      ingredients: [
        { ingredientId: 1, amount: 1, amount_type: 'slice' },
        { ingredientId: 2, amount: 250, amount_type: 'grams'}
      ],
      cookbookId: 2,
      categories: 'categoryId: 1',
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for categories';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/recipes`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

  it('should return status 500 if the resource encounters any other problems', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'There was a problem with the resource, please try again later'
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        userId: userId,
        name: 'Beans on toast',
        servings: 1,
        calories_per_serving: 345,
        prep_time: 3,
        cook_time: 10
      },
      steps: [
        { stepNo: 1, content: 'Pour beans into a saucepan and place on a medium heat' },
        { stepNo: 2, content: 'Toast the bread in a toaster or under the grill'},
        { stepNo: 3, content: 'Place toast on a plate and pour over the beans'},
        { stepNo: 4, content: 'Server and enjoy'}
      ],
      ingredients: [
        { ingredientId: 1, amount: 1, amount_type: 'slice' },
        { ingredientId: 2, amount: 250, amount_type: 'grams'}
      ],
      cookbookId: 2,
      categories: [
        { categoryId: 1},
        { categoryId: 2}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 500;
    const returnSuccess = false;
    const returnMessage = modelReturnData.message;
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/recipes`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

});

xdescribe('userController.addUserPantry', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  xit('should return status ', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [
      {
        id: 1, 
        userId: 1, 
        name: 'Vegan pancakes',
        description: 'American style pancakes made with all vegan ingredients',
        servings: 4,
        calories_per_serving: 250,
        prep_time: 15,
        cook_time: 5,
        rating: 10002
      }

    ];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'findByUserId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = '';
    const returnResults = modelReturnData;
    const returnResultsLength = 1;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}/recipes`);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });
});

xdescribe('userController.removeAllUsers', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  xit('should return status ', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [
      {
        id: 1, 
        userId: 1, 
        name: 'Vegan pancakes',
        description: 'American style pancakes made with all vegan ingredients',
        servings: 4,
        calories_per_serving: 250,
        prep_time: 15,
        cook_time: 5,
        rating: 10002
      }

    ];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'findByUserId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = '';
    const returnResults = modelReturnData;
    const returnResultsLength = 1;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}/recipes`);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

});

xdescribe('userController.removeUser', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  xit('should return status ', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [
      {
        id: 1, 
        userId: 1, 
        name: 'Vegan pancakes',
        description: 'American style pancakes made with all vegan ingredients',
        servings: 4,
        calories_per_serving: 250,
        prep_time: 15,
        cook_time: 5,
        rating: 10002
      }

    ];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'findByUserId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = '';
    const returnResults = modelReturnData;
    const returnResultsLength = 1;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}/recipes`);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

});

xdescribe('userController.removeUserRecipes', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  xit('should return status ', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [
      {
        id: 1, 
        userId: 1, 
        name: 'Vegan pancakes',
        description: 'American style pancakes made with all vegan ingredients',
        servings: 4,
        calories_per_serving: 250,
        prep_time: 15,
        cook_time: 5,
        rating: 10002
      }

    ];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'findByUserId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = '';
    const returnResults = modelReturnData;
    const returnResultsLength = 1;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}/recipes`);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

});

xdescribe('userController.removeUserCookbooks', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  xit('should return status ', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [
      {
        id: 1, 
        userId: 1, 
        name: 'Vegan pancakes',
        description: 'American style pancakes made with all vegan ingredients',
        servings: 4,
        calories_per_serving: 250,
        prep_time: 15,
        cook_time: 5,
        rating: 10002
      }

    ];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'findByUserId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = '';
    const returnResults = modelReturnData;
    const returnResultsLength = 1;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}/recipes`);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

});

xdescribe('userController.removeUserPantry', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  xit('should return status ', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [
      {
        id: 1, 
        userId: 1, 
        name: 'Vegan pancakes',
        description: 'American style pancakes made with all vegan ingredients',
        servings: 4,
        calories_per_serving: 250,
        prep_time: 15,
        cook_time: 5,
        rating: 10002
      }

    ];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'findByUserId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = '';
    const returnResults = modelReturnData;
    const returnResultsLength = 1;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}/recipes`);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

});

xdescribe('userController.updateUser', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  xit('should return status ', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [
      {
        id: 1, 
        userId: 1, 
        name: 'Vegan pancakes',
        description: 'American style pancakes made with all vegan ingredients',
        servings: 4,
        calories_per_serving: 250,
        prep_time: 15,
        cook_time: 5,
        rating: 10002
      }

    ];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'findByUserId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = '';
    const returnResults = modelReturnData;
    const returnResultsLength = 1;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}/recipes`);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

});

xdescribe('userController.updateUserRecipe', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  xit('should return status ', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [
      {
        id: 1, 
        userId: 1, 
        name: 'Vegan pancakes',
        description: 'American style pancakes made with all vegan ingredients',
        servings: 4,
        calories_per_serving: 250,
        prep_time: 15,
        cook_time: 5,
        rating: 10002
      }

    ];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'findByUserId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = '';
    const returnResults = modelReturnData;
    const returnResultsLength = 1;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}/recipes`);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

});

xdescribe('userController.updateUserCookbook', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  xit('should return status ', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [
      {
        id: 1, 
        userId: 1, 
        name: 'Vegan pancakes',
        description: 'American style pancakes made with all vegan ingredients',
        servings: 4,
        calories_per_serving: 250,
        prep_time: 15,
        cook_time: 5,
        rating: 10002
      }

    ];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'findByUserId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = '';
    const returnResults = modelReturnData;
    const returnResultsLength = 1;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}/recipes`);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

  });

});

xdescribe('userController.updateUserPantry', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  xit('should return status ', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [
      {
        id: 1, 
        userId: 1, 
        name: 'Vegan pancakes',
        description: 'American style pancakes made with all vegan ingredients',
        servings: 4,
        calories_per_serving: 250,
        prep_time: 15,
        cook_time: 5,
        rating: 10002
      }

    ];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'findByUserId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = '';
    const returnResults = modelReturnData;
    const returnResultsLength = 1;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}/recipes`);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

    expect(typeof res.body.status).toBe('number');
    expect(typeof res.body.success).toBe('boolean');
    expect(typeof res.body.message).toBe('string');
    expect(Array.isArray(res.body.results)).toBe(true);

    expect(res.body.status).toEqual(returnStatus);
    expect(res.body.success).toEqual(returnSuccess);
    expect(res.body.message).toEqual(returnMessage);
    expect(res.body.results).toEqual(returnResults);
    expect(res.body.results).toHaveLength(returnResultsLength);

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
  
    xit('should return status ', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [
        {
          id: 1, 
          userId: 1, 
          name: 'Vegan pancakes',
          description: 'American style pancakes made with all vegan ingredients',
          servings: 4,
          calories_per_serving: 250,
          prep_time: 15,
          cook_time: 5,
          rating: 10002
        }
  
      ];
  
      // Set any variables needed to be passed to controllers and or models
      const userId = 1;
  
      // Mock any needed third party modules
      jest.spyOn(recipeModel, 'findByUserId').mockImplementation(() => {
        return modelReturnData;
      });
  
      // Set here the expected return values for the test
      const returnStatus = 200;
      const returnSuccess = true;
      const returnMessage = '';
      const returnResults = modelReturnData;
      const returnResultsLength = 1;
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const res = await request(app)
        .get(`/users/${userId}/recipes`);
  
      /* Test everything works as expected */
      expect(res.status).toBe(returnStatus);
  
      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');
      expect(Array.isArray(res.body.results)).toBe(true);
  
      expect(res.body.status).toEqual(returnStatus);
      expect(res.body.success).toEqual(returnSuccess);
      expect(res.body.message).toEqual(returnMessage);
      expect(res.body.results).toEqual(returnResults);
      expect(res.body.results).toHaveLength(returnResultsLength);
  
    });
  
});