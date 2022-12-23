/* Modules required for the tests */
require('dotenv').config();
const messageHelper = require('../helpers/constants');

const request = require('supertest');
const app = require('../index.js');

const userModel = require('../models/userModel');
const recipeModel = require('../models/recipeModel');
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

xdescribe('userController.listUserCookbooks', () => {

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

xdescribe('userController.listUserPantry', () => {

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

xdescribe('userController.createUser', () => {

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

xdescribe('userController.createUserRecipe', () => {

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