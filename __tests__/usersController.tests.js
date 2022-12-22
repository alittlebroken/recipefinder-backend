/* Modules required for the tests */
require('dotenv').config();
const messageHelper = require('../helpers/constants');

const request = require('supertest');
const app = require('../index.js');

const userModel = require('../models/userModel');
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
    console.log(response.body)
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

xdescribe('userController.listUser', () => {

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

xdescribe('userController.listUserRecipes', () => {

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

xdescribe('userController.listUserCookbooks', () => {

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

xdescribe('userController.listUserPantry', () => {

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

xdescribe('userController.createUser', () => {

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

xdescribe('userController.createUserRecipe', () => {

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

xdescribe('userController.addUserPantry', () => {

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

xdescribe('userController.removeAllUsers', () => {

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

xdescribe('userController.removeUser', () => {

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

xdescribe('userController.removeUserRecipes', () => {

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

xdescribe('userController.removeUserCookbooks', () => {

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

xdescribe('userController.removeUserPantry', () => {

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

xdescribe('userController.updateUser', () => {

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

xdescribe('userController.updateUserRecipe', () => {

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

xdescribe('userController.updateUserCookbook', () => {

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

xdescribe('userController.updateUserPantry', () => {

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