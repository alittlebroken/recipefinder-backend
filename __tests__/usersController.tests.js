/* Modules required for the tests */
require('dotenv').config();

const request = require('supertest');
const app = require('../index.js');

const userModel = require('../models/userModel');
const recipeModel = require('../models/recipeModel');
const cookbookModel = require('../models/cookbookModel');
const pantryIngredients = require('../models/pantryIngredientsModel');
const pantryModel = require('../models/pantryModel');


describe('userController.listAll', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {
    user = {
      id: 1,
      email: 'admin@localhost',
      forename: 'Site',
      surname: 'Administrator',
      roles: ['Admin']
  }
    authToken = await userModel.generateToken({user});
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
      .get('/users')
      .set('Authorization', `Bearer ${authToken}`)

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

  it('should return status 401 if unathorized users tries to access route', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models

    // Mock any needed third party modules
    jest.spyOn(userModel, 'findAll').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 401;
    const returnSuccess = false;
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
      .get('/users')
      .set('Authorization', `Bearer ${authToken}`);

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
      .get('/users')
      .set('Authorization', `Bearer ${authToken}`);

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
    user = {
      id: 1,
      email: 'admin@localhost',
      forename: 'Site',
      surname: 'Administrator',
      roles: ['Admin']
  }
    authToken = await userModel.generateToken({user});
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
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 401 if user is not logged in whilst trying to access this resource', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1001;

    // Mock any needed third party modules
    jest.spyOn(userModel, 'findById').mockImplementation(() => {
      return modelReturnData;
    })

    // Set here the expected return values for the test
    const returnStatus = 401;
    const returnSuccess = false;
    const returnMessage = '';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}`)
      ;

    /* Test everything works as expected */
    expect(res.status).toEqual(returnStatus);

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
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`);

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
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`);

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
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`);

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
    user = {
      id: 1,
      email: 'admin@localhost',
      forename: 'Site',
      surname: 'Administrator',
      roles: ['Admin']
  }
    authToken = await userModel.generateToken({user});
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
      .get(`/users/${userId}/recipes`)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 401 if a non logged in user tries to access the resource', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'findByUserId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 401;
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
      .get(`/users/${userId}/recipes`)
      .set('Authorization', `Bearer ${authToken}`);

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
      .get(`/users/${userId}/recipes`)
      .set('Authorization', `Bearer ${authToken}`);

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
      .get(`/users/${userId}/recipes`)
      .set('Authorization', `Bearer ${authToken}`);

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
      .get(`/users/${userId}/recipes`)
      .set('Authorization', `Bearer ${authToken}`);

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
    user = {
      id: 1,
      email: 'admin@localhost',
      forename: 'Site',
      surname: 'Administrator',
      roles: ['Admin']
  }
    authToken = await userModel.generateToken({user});
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
      .get(`/users/${userId}/cookbooks`)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 401 if a non logged in user tries to access the resource', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 13;

    // Mock any needed third party modules
    jest.spyOn(cookbookModel, 'findByUserId').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 401;
    const returnSuccess = false;
    const returnMessage = '';
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
      .get(`/users/${userId}/cookbooks`)
      .set('Authorization', `Bearer ${authToken}`);

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
      .get(`/users/${userId}/cookbooks`)
      .set('Authorization', `Bearer ${authToken}`);

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
      .get(`/users/${userId}/cookbooks`)
      .set('Authorization', `Bearer ${authToken}`);

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
    user = {
      id: 1,
      email: 'admin@localhost',
      forename: 'Site',
      surname: 'Administrator',
      roles: ['Admin']
  }
    authToken = await userModel.generateToken({user});
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
      .get(`/users/${userId}/pantry`)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 401 if a non logged in user tries to access the resource', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'findByUser').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 401;
    const returnSuccess = false;
    const returnMessage = '';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .get(`/users/${userId}/pantry`)
      ;

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

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
      .get(`/users/${userId}/pantry`)
      .set('Authorization', `Bearer ${authToken}`);

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
      .get(`/users/${userId}/pantry`)
      .set('Authorization', `Bearer ${authToken}`);

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
      .get(`/users/${userId}/pantry`)
      .set('Authorization', `Bearer ${authToken}`);

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
    user = {
      id: 1,
      email: 'admin@localhost',
      forename: 'Site',
      surname: 'Administrator',
      roles: ['Admin']
    }
    authToken = await userModel.generateToken({user});
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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 401 if user is not authorized to access the route', async () => {

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
    const returnStatus = 401;
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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);;

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
    user = {
      id: 1,
      email: 'admin@localhost',
      forename: 'Site',
      surname: 'Administrator',
      roles: ['Admin']
  }
    authToken = await userModel.generateToken({user});
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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 401 if a non logged in user tries to access the resource', async () => {

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
    const returnStatus = 401;
    const returnSuccess = false;
    const returnMessage = '';
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
      .send(payload)
      ;

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

describe('userController.addUserPantry', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {
    user = {
      id: 1,
      email: 'admin@localhost',
      forename: 'Site',
      surname: 'Administrator',
      roles: ['Admin']
  }
    authToken = await userModel.generateToken({user});
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and add the ingredient to the users pantry', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Record successfully created'
    };

    pantryIngredientsReturnData = {
      id: 1,
      pantryId: 1,
      ingredientId: 2,
      userId: 1,
      username: 'twattson',
      ingredientName: 'Bread',
      amount: 1,
      amount_type: 'slice'
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    const payload = {
      ingredientId: 1,
      amount: 200,
      amount_type: 'grams'
    };

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'findByUser').mockImplementation(() => {
      return pantryIngredientsReturnData;
    });

    jest.spyOn(pantryIngredients, 'create').mockImplementation(() => {
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
      .post(`/users/${userId}/pantry`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 401 if a non logged in user tries to access this resource', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    pantryIngredientsReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    const payload = {
      ingredientId: 1,
      amount: 200,
      amount_type: 'grams'
    };

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'findByUser').mockImplementation(() => {
      return pantryIngredientsReturnData;
    });

    jest.spyOn(pantryIngredients, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 401;
    const returnSuccess = false;
    const returnMessage = 'Unable to find pantry for user';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/pantry`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);


  });

  it('should return status 404 if the user has no pantry', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    pantryIngredientsReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    const payload = {
      ingredientId: 1,
      amount: 200,
      amount_type: 'grams'
    };

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'findByUser').mockImplementation(() => {
      return pantryIngredientsReturnData;
    });

    jest.spyOn(pantryIngredients, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 404;
    const returnSuccess = false;
    const returnMessage = 'Unable to find pantry for user';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/pantry`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

    pantryIngredientsReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    let userId;

    const payload = {
      ingredientId: 1,
      amount: 200,
      amount_type: 'grams'
    };

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'findByUser').mockImplementation(() => {
      return pantryIngredientsReturnData;
    });

    jest.spyOn(pantryIngredients, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined userId';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/pantry`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if the ingredientId is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    pantryIngredientsReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    const payload = {
      amount: 200,
      amount_type: 'grams'
    };

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'findByUser').mockImplementation(() => {
      return pantryIngredientsReturnData;
    });

    jest.spyOn(pantryIngredients, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined ingredientId';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/pantry`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if the ingredientId is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    pantryIngredientsReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    const payload = {
      ingredientId: '1',
      amount: 200,
      amount_type: 'grams'
    };

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'findByUser').mockImplementation(() => {
      return pantryIngredientsReturnData;
    });

    jest.spyOn(pantryIngredients, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for ingredientId';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/pantry`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if amount is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    pantryIngredientsReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    const payload = {
      ingredientId: 1,
      amount_type: 'grams'
    };

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'findByUser').mockImplementation(() => {
      return pantryIngredientsReturnData;
    });

    jest.spyOn(pantryIngredients, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined amount';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/pantry`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if amount is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    pantryIngredientsReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    const payload = {
      ingredientId: 1,
      amount: '200',
      amount_type: 'grams'
    };

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'findByUser').mockImplementation(() => {
      return pantryIngredientsReturnData;
    });

    jest.spyOn(pantryIngredients, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for amount';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/pantry`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if amount_type is not defined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    pantryIngredientsReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    const payload = {
      ingredientId: 1,
      amount: 200,
    };

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'findByUser').mockImplementation(() => {
      return pantryIngredientsReturnData;
    });

    jest.spyOn(pantryIngredients, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined amount_type';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/pantry`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if amount_type is of the wrong type', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    pantryIngredientsReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    const payload = {
      ingredientId: 1,
      amount: 200,
      amount_type: 12
    };

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'findByUser').mockImplementation(() => {
      return pantryIngredientsReturnData;
    });

    jest.spyOn(pantryIngredients, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for amount_type';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .post(`/users/${userId}/pantry`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

    pantryIngredientsReturnData = [
      { pantryId: 1}
    ];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    const payload = {
      ingredientId: 1,
      amount: 200,
      amount_type: 'grams'
    };

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'findByUser').mockImplementation(() => {
      return pantryIngredientsReturnData;
    });

    jest.spyOn(pantryIngredients, 'create').mockImplementation(() => {
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
      .post(`/users/${userId}/pantry`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

describe('userController.removeAllUsers', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {
    user = {
      id: 1,
      email: 'admin@localhost',
      forename: 'Site',
      surname: 'Administrator',
      roles: ['Admin']
  }
    authToken = await userModel.generateToken({user});
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and remove all users', async () => {

    // Set Mocked data that models and controllers should return
    const modelFindAllReturnData = {
      success: true,
      message: 'All customer accounts successfully removed'
    };

    const modelFailedFindAllReturnData = {
      success: false,
      message: 'No customer accounts have been removed'
    };

    // Set any variables needed to be passed to controllers and or models

    // Mock any needed third party modules
    jest.spyOn(userModel, 'removeAll').mockImplementation(() => {
      return modelFindAllReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = modelFindAllReturnData.message;
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .delete(`/users`)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 401 if the user is not logged in whilst accessing this route', async () => {

    // Set Mocked data that models and controllers should return
    const modelFindAllReturnData = [];

    const modelFailedFindAllReturnData = {
      success: false,
      message: 'No customer accounts have been removed'
    };

    // Set any variables needed to be passed to controllers and or models

    // Mock any needed third party modules
    jest.spyOn(userModel, 'removeAll').mockImplementation(() => {
      return modelFailedFindAllReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 401;
    const returnSuccess = false;
    const returnMessage = modelFailedFindAllReturnData.message;
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .delete(`/users`);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

  });

  it('should return status 400 if uanble to remove any users', async () => {

    // Set Mocked data that models and controllers should return
    const modelFindAllReturnData = {
      success: true,
      message: 'All customer accounts successfully removed'
    };

    const modelFailedFindAllReturnData = {
      success: false,
      message: 'No customer accounts have been removed'
    };

    // Set any variables needed to be passed to controllers and or models

    // Mock any needed third party modules
    jest.spyOn(userModel, 'removeAll').mockImplementation(() => {
      return modelFailedFindAllReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = modelFailedFindAllReturnData.message;
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .delete(`/users`)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 500 if there was another problem with the resource', async () => {

    // Set Mocked data that models and controllers should return
    const modelFindAllReturnData = {
      success: true,
      message: 'All customer accounts successfully removed'
    };

    const modelFailedFindAllReturnData = {
      success: false,
      message: 'There was an issue with the resource, please try again later'
    };

    // Set any variables needed to be passed to controllers and or models

    // Mock any needed third party modules
    jest.spyOn(userModel, 'removeAll').mockImplementation(() => {
      return modelFailedFindAllReturnData;
    });

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
      .delete(`/users`)
      .set('Authorization', `Bearer ${authToken}`);

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

describe('userController.removeUser', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {
    user = {
      id: 1,
      email: 'admin@localhost',
      forename: 'Site',
      surname: 'Administrator',
      roles: ['Admin']
  }
    authToken = await userModel.generateToken({user});
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and removed the specified user', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'The record was deleted successfully'
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(userModel, 'remove').mockImplementation(() => {
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
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 401 a non logged in user tries to access this resource', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    let userId;

    // Mock any needed third party modules
    jest.spyOn(userModel, 'remove').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 401;
    const returnSuccess = false;
    const returnMessage = 'Undefined userId';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .delete(`/users/${userId}`);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

  });

  it('should return status 400 if userId is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    let userId;

    // Mock any needed third party modules
    jest.spyOn(userModel, 'remove').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined userId';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 500 if there is another problem with the resource', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'There was an issue with the resource, please try again later'
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(userModel, 'remove').mockImplementation(() => {
      return modelReturnData;
    });

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
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`);

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

describe('userController.removeUserRecipes', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {
    user = {
      id: 1,
      email: 'admin@localhost',
      forename: 'Site',
      surname: 'Administrator',
      roles: ['Admin']
  }
    authToken = await userModel.generateToken({user});
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and remove all the users recipes', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'All recipes successfully removed'
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'removeAllByUser').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = 'All recipes successfully removed for specified user';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .delete(`/users/${userId}/recipes`)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 401 if a non logged in user tries to access the resource', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'The user has no recipes to remove'
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'removeAllByUser').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 401;
    const returnSuccess = false;
    const returnMessage = 'The user has no recipes to remove';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .delete(`/users/${userId}/recipes`);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);


  });

  it('should return status 404 if the user has no recipes to remove', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'The user has no recipes to remove'
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'removeAllByUser').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 404;
    const returnSuccess = false;
    const returnMessage = 'The user has no recipes to remove';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .delete(`/users/${userId}/recipes`)
      .set('Authorization', `Bearer ${authToken}`);

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
    jest.spyOn(recipeModel, 'removeAllByUser').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined userId';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .delete(`/users/${userId}/recipes`)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 500 if the resource encounters any other error', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'There was a problem with the resource, please try again later'
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'removeAllByUser').mockImplementation(() => {
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
      .delete(`/users/${userId}/recipes`)
      .set('Authorization', `Bearer ${authToken}`);

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

describe('userController.removeUserCookbooks', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {
    user = {
      id: 1,
      email: 'admin@localhost',
      forename: 'Site',
      surname: 'Administrator',
      roles: ['Admin']
  }
    authToken = await userModel.generateToken({user});
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and remove all of a users cookbooks', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'All cookbooks removed successfully'
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(cookbookModel, 'removeAllByUser').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = 'All cookbooks successfully removed for the specifed user';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .delete(`/users/${userId}/cookbooks`)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 401 if a non logged in user tries to access the resource', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    let userId;

    // Mock any needed third party modules
    jest.spyOn(cookbookModel, 'removeAllByUser').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 401;
    const returnSuccess = false;
    const returnMessage = 'Undefined userId';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .delete(`/users/${userId}/cookbooks`);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

  });

  it('should return status 400 if the userId is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    let userId;

    // Mock any needed third party modules
    jest.spyOn(cookbookModel, 'removeAllByUser').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined userId';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .delete(`/users/${userId}/cookbooks`)
      .set('Authorization', `Bearer ${authToken}`);

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
      message: 'There was an issue with the resource, please try again later'
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(cookbookModel, 'removeAllByUser').mockImplementation(() => {
      return modelReturnData;
    });

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
      .delete(`/users/${userId}/cookbooks`)
      .set('Authorization', `Bearer ${authToken}`);

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

describe('userController.removeUserPantry', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {
    user = {
      id: 1,
      email: 'admin@localhost',
      forename: 'Site',
      surname: 'Administrator',
      roles: ['Admin']
  }
    authToken = await userModel.generateToken({user});
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and remove the pantries associated with the specified user', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      count: 1
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(pantryModel, 'removeAllByUser').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = 'The users pantries have been removed successfully';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .delete(`/users/${userId}/pantry`)
      .set('Authorization', `Bearer ${authToken}`);


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

  it('should return status 401 if a non logged in user tries to access the resource', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    let userId;

    // Mock any needed third party modules
    jest.spyOn(pantryModel, 'removeAllByUser').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 401;
    const returnSuccess = false;
    const returnMessage = 'Undefined userId';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .delete(`/users/${userId}/pantry`);


    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

  });

  it('should return status 400 if userId is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    let userId;

    // Mock any needed third party modules
    jest.spyOn(pantryModel, 'removeAllByUser').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined userId';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .delete(`/users/${userId}/pantry`)
      .set('Authorization', `Bearer ${authToken}`);


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

  it('should return status 500 if the resorce encounters any other problems', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'There was an issue with the resource, please try again later'
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    // Mock any needed third party modules
    jest.spyOn(pantryModel, 'removeAllByUser').mockImplementation(() => {
      return modelReturnData;
    });

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
      .delete(`/users/${userId}/pantry`)
      .set('Authorization', `Bearer ${authToken}`);

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

describe('userController.updateUser', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {
    user = {
      id: 1,
      email: 'admin@localhost',
      forename: 'Site',
      surname: 'Administrator',
      roles: ['Admin']
  }
    authToken = await userModel.generateToken({user});
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and update the user', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [{
      id: 1,
      username: 'twatkins',
      email: 'twatkins@devloper.net',
      roles: ['Customer'],
      forename: 'Theresa',
      surname: 'Watkins'
    }];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const username = 'twatkins';
    const email = 'twatkins@dev.com';
    const roles = ['Customer'];
    const forename = 'Theresa';
    const surname = 'Watkins';

    // Mock any needed third party modules
    jest.spyOn(userModel, 'update').mockImplementation(() => {
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
      .put(`/users/${userId}`)
      .send({
        username,
        email,
        roles,
        forename,
        surname
      })
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 401 if a non logged in user tries to access this resource', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [{
      id: 1,
      username: 'twatkins',
      email: 'twatkins@devloper.net',
      roles: ['Customer'],
      forename: 'Theresa',
      surname: 'Watkins'
    }];

    // Set any variables needed to be passed to controllers and or models
    let userId;
    const username = 'twatkins';
    const email = 'twatkins@dev.com';
    const roles = ['Customer'];
    const forename = 'Theresa';
    const surname = 'Watkins';

    // Mock any needed third party modules
    jest.spyOn(userModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 401;
    const returnSuccess = false;
    const returnMessage = 'Undefined userId';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}`)
      .send({
        username,
        email,
        roles,
        forename,
        surname
      })
      ;

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

  });

  it('should return status 400 if userId is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [{
      id: 1,
      username: 'twatkins',
      email: 'twatkins@devloper.net',
      roles: ['Customer'],
      forename: 'Theresa',
      surname: 'Watkins'
    }];

    // Set any variables needed to be passed to controllers and or models
    let userId;
    const username = 'twatkins';
    const email = 'twatkins@dev.com';
    const roles = ['Customer'];
    const forename = 'Theresa';
    const surname = 'Watkins';

    // Mock any needed third party modules
    jest.spyOn(userModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined userId';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}`)
      .send({
        username,
        email,
        roles,
        forename,
        surname
      })
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 404 if the user could not be found', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false, 
      message: 'No records matched supplied data'
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1984357;
    const username = 'twatkins';
    const email = 'twatkins@dev.com';
    const roles = ['Customer'];
    const forename = 'Theresa';
    const surname = 'Watkins';

    // Mock any needed third party modules
    jest.spyOn(userModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 404;
    const returnSuccess = false;
    const returnMessage = 'No user found matching the specified id';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}`)
      .send({
        username,
        email,
        roles,
        forename,
        surname
      })
      .set('Authorization', `Bearer ${authToken}`);

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
    const userId = 1;
    const username = 'twatkins';
    const email = 'twatkins@dev.com';
    const roles = ['Customer'];
    const forename = 'Theresa';
    const surname = 'Watkins';

    // Mock any needed third party modules
    jest.spyOn(userModel, 'update').mockImplementation(() => {
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
      .put(`/users/${userId}`)
      .send({
        email,
        roles,
        forename,
        surname
      })
      .set('Authorization', `Bearer ${authToken}`);

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
    const userId = 1;
    const username = { name: 'twatkins'};
    const email = 'twatkins@dev.com';
    const roles = ['Customer'];
    const forename = 'Theresa';
    const surname = 'Watkins';

    // Mock any needed third party modules
    jest.spyOn(userModel, 'update').mockImplementation(() => {
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
      .put(`/users/${userId}`)
      .send({
        username,
        email,
        roles,
        forename,
        surname
      })
      .set('Authorization', `Bearer ${authToken}`);

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
    const userId = 1;
    const username = 'twatkins';
    const email = 'twatkins@dev.com';
    const roles = ['Customer'];
    const forename = 'Theresa';
    const surname = 'Watkins';

    // Mock any needed third party modules
    jest.spyOn(userModel, 'update').mockImplementation(() => {
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
      .put(`/users/${userId}`)
      .send({
        username,
        roles,
        forename,
        surname
      })
      .set('Authorization', `Bearer ${authToken}`);

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
    const userId = 1;
    const username = 'twatkins';
    const email = 200;
    const roles = ['Customer'];
    const forename = 'Theresa';
    const surname = 'Watkins';

    // Mock any needed third party modules
    jest.spyOn(userModel, 'update').mockImplementation(() => {
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
      .put(`/users/${userId}`)
      .send({
        username,
        email,
        roles,
        forename,
        surname
      })
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if roles are not defined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const username = 'twatkins';
    const email = 'twatkins@dev.com';
    const roles = ['Customer'];
    const forename = 'Theresa';
    const surname = 'Watkins';

    // Mock any needed third party modules
    jest.spyOn(userModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined roles';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}`)
      .send({
        username,
        email,
        forename,
        surname
      })
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if roles are of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const username = 'twatkins';
    const email = 'twatkins@dev.com';
    const roles = 'Customer';
    const forename = 'Theresa';
    const surname = 'Watkins';

    // Mock any needed third party modules
    jest.spyOn(userModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for roles';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}`)
      .send({
        username,
        email,
        roles,
        forename,
        surname
      })
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if forename is not defined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const username = 'twatkins';
    const email = 'twatkins@dev.com';
    const roles = ['Customer'];
    const forename = 'Theresa';
    const surname = 'Watkins';

    // Mock any needed third party modules
    jest.spyOn(userModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined forename';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}`)
      .send({
        username,
        email,
        roles,
        surname
      })
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if forename is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const username = 'twatkins';
    const email = 'twatkins@dev.com';
    const roles = ['Customer'];
    const forename = { name: 'Theresa'};
    const surname = 'Watkins';

    // Mock any needed third party modules
    jest.spyOn(userModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for forename';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}`)
      .send({
        username,
        email,
        roles,
        forename,
        surname
      })
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if surname is not defined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const username = 'twatkins';
    const email = 'twatkins@dev.com';
    const roles = ['Customer'];
    const forename = 'Theresa';
    const surname = 'Watkins';

    // Mock any needed third party modules
    jest.spyOn(userModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined surname';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}`)
      .send({
        username,
        email,
        roles,
        forename,
      })
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if surname is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const username = 'twatkins';
    const email = 'twatkins@dev.com';
    const roles = ['Customer'];
    const forename = 'Theresa';
    const surname = 758473648;

    // Mock any needed third party modules
    jest.spyOn(userModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for surname';
    const returnResults = modelReturnData;
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}`)
      .send({
        username,
        email,
        roles,
        forename,
        surname
      })
      .set('Authorization', `Bearer ${authToken}`);

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
      message: 'There was an issue with the resource, please try again later'
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const username = 'twatkins';
    const email = 'twatkins@dev.com';
    const roles = ['Customer'];
    const forename = 'Theresa';
    const surname = 'Watkins';

    // Mock any needed third party modules
    jest.spyOn(userModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

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
      .put(`/users/${userId}`)
      .send({
        username,
        email,
        roles,
        forename,
        surname
      })
      .set('Authorization', `Bearer ${authToken}`);

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

describe('userController.updateUserRecipe', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {
    user = {
      id: 1,
      email: 'admin@localhost',
      forename: 'Site',
      surname: 'Administrator',
      roles: ['Admin']
  }
    authToken = await userModel.generateToken({user});
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and update the users recipe', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'recipe succesfully updated'
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        recipeId: 12,
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
      cookbooks: [
        { id: 1, cookbookId: 1, recipeId: 1}
      ],
      categories: [
        { id: 1, recipeId: 1, categoryId: 1}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = 'Recipe successfully updated';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/recipes`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 401 if a non logged in user tries to access this resource', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    let userId;
    const payload = {
      recipe: {
        recipeId: 12,
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
      cookbooks: [
        { id: 1, cookbookId: 1, recipeId: 1}
      ],
      categories: [
        { id: 1, recipeId: 1, categoryId: 1}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 401;
    const returnSuccess = false;
    const returnMessage = 'Undefined userId';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/recipes`)
      .send(payload);

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

  });

  it('should return status 400 if the userId is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    let userId;
    const payload = {
      recipe: {
        recipeId: 12,
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
      cookbooks: [
        { id: 1, cookbookId: 1, recipeId: 1}
      ],
      categories: [
        { id: 1, recipeId: 1, categoryId: 1}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined userId';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/recipes`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
  
  it('should return status 400 if recipeId is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

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
      cookbooks: [
        { id: 1, cookbookId: 1, recipeId: 1}
      ],
      categories: [
        { id: 1, recipeId: 1, categoryId: 1}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined recipeId';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/recipes`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if recipeId is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        recipeId: 'Seventy',
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
      cookbooks: [
        { id: 1, cookbookId: 1, recipeId: 1}
      ],
      categories: [
        { id: 1, recipeId: 1, categoryId: 1}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for recipeId';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/recipes`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
        recipeId: 12,
        
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
      cookbooks: [
        { id: 1, cookbookId: 1, recipeId: 1}
      ],
      categories: [
        { id: 1, recipeId: 1, categoryId: 1}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined recipe userId';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/recipes`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if recipe userId is of the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        recipeId: 12,
        userId: 'Twelve',
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
      cookbooks: [
        { id: 1, cookbookId: 1, recipeId: 1}
      ],
      categories: [
        { id: 1, recipeId: 1, categoryId: 1}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for recipe userId';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/recipes`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
        recipeId: 12,
        userId: 1,
        
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
      cookbooks: [
        { id: 1, cookbookId: 1, recipeId: 1}
      ],
      categories: [
        { id: 1, recipeId: 1, categoryId: 1}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined recipe name';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/recipes`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
        recipeId: 12,
        userId: 1,
        name: 78,
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
      cookbooks: [
        { id: 1, cookbookId: 1, recipeId: 1}
      ],
      categories: [
        { id: 1, recipeId: 1, categoryId: 1}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for recipe name';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/recipes`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
        recipeId: 12,
        userId: 1,
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
      cookbooks: [
        { id: 1, cookbookId: 1, recipeId: 1}
      ],
      categories: [
        { id: 1, recipeId: 1, categoryId: 1}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined recipe servings';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/recipes`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if recipe servings is in the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        recipeId: 12,
        userId: 1,
        name: 'Beans on toast',
        servings: 'eleven',
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
      cookbooks: [
        { id: 1, cookbookId: 1, recipeId: 1}
      ],
      categories: [
        { id: 1, recipeId: 1, categoryId: 1}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for recipe servings';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/recipes`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
        recipeId: 12,
        userId: 1,
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
      cookbooks: [
        { id: 1, cookbookId: 1, recipeId: 1}
      ],
      categories: [
        { id: 1, recipeId: 1, categoryId: 1}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined recipe calories_per_serving';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/recipes`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if recipe calories_per_serving is in the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        recipeId: 12,
        userId: 1,
        name: 'Beans on toast',
        servings: 1,
        calories_per_serving: '65748',
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
      cookbooks: [
        { id: 1, cookbookId: 1, recipeId: 1}
      ],
      categories: [
        { id: 1, recipeId: 1, categoryId: 1}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for recipe calories_per_serving';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/recipes`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
        recipeId: 12,
        userId: 1,
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
      cookbooks: [
        { id: 1, cookbookId: 1, recipeId: 1}
      ],
      categories: [
        { id: 1, recipeId: 1, categoryId: 1}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined recipe prep_time';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/recipes`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if recipe prep_time is in the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        recipeId: 12,
        userId: 1,
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
      cookbooks: [
        { id: 1, cookbookId: 1, recipeId: 1}
      ],
      categories: [
        { id: 1, recipeId: 1, categoryId: 1}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for recipe prep_time';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/recipes`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
        recipeId: 12,
        userId: 1,
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
      cookbooks: [
        { id: 1, cookbookId: 1, recipeId: 1}
      ],
      categories: [
        { id: 1, recipeId: 1, categoryId: 1}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined recipe cook_time';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/recipes`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if recipe cook_time is in the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        recipeId: 12,
        userId: 1,
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
      cookbooks: [
        { id: 1, cookbookId: 1, recipeId: 1}
      ],
      categories: [
        { id: 1, recipeId: 1, categoryId: 1}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for recipe cook_time';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/recipes`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 200 and update even if steps are undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'recipe succesfully updated'
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        recipeId: 12,
        userId: 1,
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
      cookbooks: [
        { id: 1, cookbookId: 1, recipeId: 1}
      ],
      categories: [
        { id: 1, recipeId: 1, categoryId: 1}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = 'Recipe successfully updated';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/recipes`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if steps are in the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        recipeId: 12,
        userId: 1,
        name: 'Beans on toast',
        servings: 1,
        calories_per_serving: 345,
        prep_time: 3,
        cook_time: 10
      },
      steps: 'All steps should be here',
      ingredients: [
        { ingredientId: 1, amount: 1, amount_type: 'slice' },
        { ingredientId: 2, amount: 250, amount_type: 'grams'}
      ],
      cookbooks: [
        { id: 1, cookbookId: 1, recipeId: 1}
      ],
      categories: [
        { id: 1, recipeId: 1, categoryId: 1}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for steps';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/recipes`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 200 and update even if ingredients are undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'recipe succesfully updated'
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        recipeId: 12,
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
      
      cookbooks: [
        { id: 1, cookbookId: 1, recipeId: 1}
      ],
      categories: [
        { id: 1, recipeId: 1, categoryId: 1}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = 'Recipe successfully updated';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/recipes`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if ingredients are in the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        recipeId: 12,
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
      ingredients: 12,
      cookbooks: [
        { id: 1, cookbookId: 1, recipeId: 1}
      ],
      categories: [
        { id: 1, recipeId: 1, categoryId: 1}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for ingredients';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/recipes`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 200 and update even if cookbooks is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'recipe succesfully updated'
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        recipeId: 12,
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
      categories: [
        { id: 1, recipeId: 1, categoryId: 1}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = 'Recipe successfully updated';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/recipes`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if cookbooks are in the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        recipeId: 12,
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
      cookbooks: 'Top 100 meals of 2024',
      categories: [
        { id: 1, recipeId: 1, categoryId: 1}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for cookbooks';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/recipes`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 200 and update even if categories is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'recipe succesfully updated'
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        recipeId: 12,
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
      cookbooks: [
        { id: 1, cookbookId: 1, recipeId: 1}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = 'Recipe successfully updated';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/recipes`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if categories is in the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        recipeId: 12,
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
      cookbooks: [
        { id: 1, cookbookId: 1, recipeId: 1}
      ],
      categories: 'Bready Puddings'
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for categories';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/recipes`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      message: 'There was an issue with the resource, please try again later'
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      recipe: {
        recipeId: 12,
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
      cookbooks: [
        { id: 1, cookbookId: 1, recipeId: 1}
      ],
      categories: [
        { id: 1, recipeId: 1, categoryId: 1}
      ],
    }

    // Mock any needed third party modules
    jest.spyOn(recipeModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

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
      .put(`/users/${userId}/recipes`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

describe('userController.updateUserCookbook', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {
    user = {
      id: 1,
      email: 'admin@localhost',
      forename: 'Site',
      surname: 'Administrator',
      roles: ['Admin']
  }
    authToken = await userModel.generateToken({user});
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and update the users cookbook', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Cookbook successfully updated'
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    const cookbookId = 1;
    const name = 'Vegan puddings';
    const description = 'A selection of delightful and easy to make vegan puds';
    const image = 'vegan_puds.png'

    // Mock any needed third party modules
    jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = 'Cookbook successfully updated';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/cookbooks`)
      .send({
        cookbookId,
        userId,
        name,
        description,
        image
      })
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 401 if a non logged in user tries to access the resource', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = []

    // Set any variables needed to be passed to controllers and or models
    let userId;

    const cookbookId = 1;
    const name = 'Vegan puddings';
    const description = 'A selection of delightful and easy to make vegan puds';
    const image = 'vegan_puds.png'

    // Mock any needed third party modules
    jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 401;
    const returnSuccess = false;
    const returnMessage = 'Undefined userId';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/cookbooks`)
      .send({
        cookbookId,
        userId,
        name,
        description,
        image
      });

    /* Test everything works as expected */
    expect(res.status).toBe(returnStatus);

  });

  it('should return status 400 if userId is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = []

    // Set any variables needed to be passed to controllers and or models
    let userId;

    const cookbookId = 1;
    const name = 'Vegan puddings';
    const description = 'A selection of delightful and easy to make vegan puds';
    const image = 'vegan_puds.png'

    // Mock any needed third party modules
    jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined userId';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/cookbooks`)
      .send({
        cookbookId,
        userId,
        name,
        description,
        image
      })
      .set('Authorization', `Bearer ${authToken}`);

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
    const modelReturnData = []

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    const name = 'Vegan puddings';
    const description = 'A selection of delightful and easy to make vegan puds';
    const image = 'vegan_puds.png'

    // Mock any needed third party modules
    jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined cookbook id';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/cookbooks`)
      .send({
        userId,
        name,
        description,
        image
      })
      .set('Authorization', `Bearer ${authToken}`);

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
    const modelReturnData = []

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    const cookbookId = 'Eggos';
    const name = 'Vegan puddings';
    const description = 'A selection of delightful and easy to make vegan puds';
    const image = 'vegan_puds.png'

    // Mock any needed third party modules
    jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for cookbook id';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/cookbooks`)
      .send({
        cookbookId,
        userId,
        name,
        description,
        image
      })
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if name is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = []

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    const cookbookId = 1;
    const description = 'A selection of delightful and easy to make vegan puds';
    const image = 'vegan_puds.png'

    // Mock any needed third party modules
    jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined name';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/cookbooks`)
      .send({
        cookbookId,
        userId,
        
        description,
        image
      })
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if name is in the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = []

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    const cookbookId = 1;
    const name = 3129387;
    const description = 'A selection of delightful and easy to make vegan puds';
    const image = 'vegan_puds.png'

    // Mock any needed third party modules
    jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for name';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/cookbooks`)
      .send({
        cookbookId,
        userId,
        name,
        description,
        image
      })
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if description is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = []

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    const cookbookId = 1;
    const name = 'Vegan puddings';
    const image = 'vegan_puds.png'

    // Mock any needed third party modules
    jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined description';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/cookbooks`)
      .send({
        cookbookId,
        userId,
        name,
        
        image
      })
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if description is in the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = []

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    const cookbookId = 1;
    const name = 'Vegan puddings';
    const description = 85729384723;
    const image = 'vegan_puds.png'

    // Mock any needed third party modules
    jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for description';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/cookbooks`).send({
        cookbookId,
        userId,
        name,
        description,
        image
      })
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if image is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = []

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    const cookbookId = 1;
    const name = 'Vegan puddings';
    const description = 'A selection of delightful and easy to make vegan puds';

    // Mock any needed third party modules
    jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined image';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/cookbooks`)
      .send({
        cookbookId,
        userId,
        name,
        description,
        
      })
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if image is in the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = []

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    const cookbookId = 1;
    const name = 'Vegan puddings';
    const description = 'A selection of delightful and easy to make vegan puds';
    const image = 1234;

    // Mock any needed third party modules
    jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for image';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/cookbooks`)
      .send({
        cookbookId,
        userId,
        name,
        description,
        image
      })
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 500 if there was another problem with the resource', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'There was an issue with the resource, pleaee try again later'
    }

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;

    const cookbookId = 1;
    const name = 'Vegan puddings';
    const description = 'A selection of delightful and easy to make vegan puds';
    const image = 'image.png';

    // Mock any needed third party modules
    jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

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
      .put(`/users/${userId}/cookbooks`)
      .send({
        cookbookId,
        userId,
        name,
        description,
        image
      })
      .set('Authorization', `Bearer ${authToken}`);

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

describe('userController.updateUserPantry', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {
    user = {
      id: 1,
      email: 'admin@localhost',
      forename: 'Site',
      surname: 'Administrator',
      roles: ['Admin']
  }
    authToken = await userModel.generateToken({user});
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and updated the ingredient in the users pantry', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Record successfully created'
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      id: 1,
      pantryId: 1,
      ingredientId: 1,
      amount: 250,
      amount_type: 'grams'
    }

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = 'Pantry item successfully updated';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/pantry`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      id: 1,
      pantryId: 1,
      ingredientId: 1,
      amount: 250,
      amount_type: 'grams'
    }

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined userId';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/pantry`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if record id is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      
      pantryId: 1,
      ingredientId: 1,
      amount: 250,
      amount_type: 'grams'
    }

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined record id';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/pantry`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if record id is in the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      id: { id: 1 },
      pantryId: 1,
      ingredientId: 1,
      amount: 250,
      amount_type: 'grams'
    }

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for record id';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/pantry`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if pantryId is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      id: 1,
      ingredientId: 1,
      amount: 250,
      amount_type: 'grams'
    }

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined pantryId';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/pantry`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if pantryId is in the wrong fomrat', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      id: 1,
      pantryId: 'Twelve',
      ingredientId: 1,
      amount: 250,
      amount_type: 'grams'
    }

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for pantryId';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/pantry`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if ingredientId is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      id: 1,
      pantryId: 1,
      amount: 250,
      amount_type: 'grams'
    }

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined ingredientId';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/pantry`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if ingredientId is in the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      id: 1,
      pantryId: 1,
      ingredientId: [1,2,3,4],
      amount: 250,
      amount_type: 'grams'
    }

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for ingredientId';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/pantry`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if amount is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      id: 1,
      pantryId: 1,
      ingredientId: 1,
      amount_type: 'grams'
    }

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined amount';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/pantry`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if amount is in the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      id: 1,
      pantryId: 1,
      ingredientId: 1,
      amount: '250',
      amount_type: 'grams'
    }

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for amount';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/pantry`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if amount_type is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      id: 1,
      pantryId: 1,
      ingredientId: 1,
      amount: 250,
    }

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined amount_type';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/pantry`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 400 if amount_type is in the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      id: 1,
      pantryId: 1,
      ingredientId: 1,
      amount: 250,
      amount_type: 12
    }

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for amount_type';
    const returnResults = [];
    const returnResultsLength = 0;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const res = await request(app)
      .put(`/users/${userId}/pantry`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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

  it('should return status 500 if the resource encountered any other problem', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'There was an issue with the resource, please try again later'
    };

    // Set any variables needed to be passed to controllers and or models
    const userId = 1;
    const payload = {
      id: 1,
      pantryId: 1,
      ingredientId: 1,
      amount: 250,
      amount_type: 'grams'
    }

    // Mock any needed third party modules
    jest.spyOn(pantryIngredients, 'update').mockImplementation(() => {
      return modelReturnData;
    });

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
      .put(`/users/${userId}/pantry`)
      .send(payload)
      .set('Authorization', `Bearer ${authToken}`);

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
      user = {
        id: 1,
        email: 'admin@localhost',
        forename: 'Site',
        surname: 'Administrator',
        roles: ['Admin']
    }
      authToken = await userModel.generateToken({user});
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
        .get(`/users/${userId}/recipes`)
        .set('Authorization', `Bearer ${authToken}`);
  
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