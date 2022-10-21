/* Modules required for the tests */
const messageHelper = require('../helpers/constants');
const ingredientsController = require('../controllers/ingredientsController');
const ingredientModel = require('../models/ingredientModel');
const request = require('supertest');
const app = require('../index.js');

describe('ingredientsController.get', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('returns a list of all ingredients', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [
      {
        id: 1,
        name: 'oat milk'
      },
      {
        id: 2,
        name: 'gluten free flour'
      },
      {
        id: 3,
        name: 'Plant based butter'
      }
    ];

    // Set any variables needed to be passed to controllers and or models

    // Mock any needed third party modules
    jest.spyOn(ingredientModel, 'findAll').mockImplementation(() => {
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
    const response = await request(app).get('/ingredients');

    /* Test everything works as expected */
    expect(response.status).toEqual(returnStatus);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(3);
    expect(response.body).toEqual(modelReturnData);

  });

  it('returns an empty list if no ingredients found with a status of 404', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models

    // Mock any needed third party modules
    jest.spyOn(ingredientModel, 'findAll').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 404;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const response = await request(app).get('/ingredients', ingredientsController.get);
    
    /* Test everything works as expected */
    expect(response.status).toBe(returnStatus);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(0);
    expect(response.body).toEqual(modelReturnData);

  });

  it('returns a generic error if another issue occured', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'There was an issue with the resource, please try again later'
    };

    // Set any variables needed to be passed to controllers and or models

    // Mock any needed third party modules
    jest.spyOn(ingredientModel, 'findAll').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 500;
    const returnSuccess = false;
    const returnMessage = 'There was an issue with the resource, please try again later';

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await ingredientsController.get(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

});

describe('ingredientsController.getById', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and the desired ingredient', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [{
      id: 1,
      name: 'gluten free flour'
    }];

    // Set any variables needed to be passed to controllers and or models
    const ingredientId = 1;

    // Mock any needed third party modules
    jest.spyOn(ingredientModel, 'findById').mockImplementation(() => {
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
    const response = await request(app).get(`/ingredients/${ingredientId}`);

    /* Test everything works as expected */
    expect(response.status).toBe(returnStatus);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(1);
    expect(response.body).toEqual(modelReturnData);

  });

  it('should return status 404 and an empty list if no ingredients found', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const ingredientId = 101;

    // Mock any needed third party modules
    jest.spyOn(ingredientModel, 'findById').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 404;
    const returnBody = [];

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const response = await request(app).get(`/ingredients/${ingredientId}`);

    /* Test everything works as expected */
    expect(response.status).toBe(returnStatus);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(0);
    expect(response.body).toEqual(returnBody);

  });

  it('should return status 400 if request parameter is omitted', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const ingredientId = 1;

    // Mock any needed third party modules
    jest.spyOn(ingredientModel,'findById').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const nextMessage = {
      status: 400,
      success: false,
      message: 'Undefined request parameters'
    }

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await ingredientsController.getById(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(nextMessage);

  });

  it('should return status 400 if required id is missing from request parameters', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const ingredientId = 1;

    // Mock any needed third party modules
    jest.spyOn(ingredientModel,'findById').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const nextMessage = {
      status: 400,
      success: false,
      message: 'Undefined id'
    }

    /* Mock Express request and response */
    const mockRequest = { params: {} };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await ingredientsController.getById(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(nextMessage);

  });

  it('should return status 500 if there was an issue with the resource', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'There was an issue with the resource, please try again later'
    };

    // Set any variables needed to be passed to controllers and or models
    const ingredientId = 1;

    // Mock any needed third party modules
    jest.spyOn(ingredientModel,'findById').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const nextMessage = {
      status: 400,
      success: false,
      message: 'Undefined id'
    }

    /* Mock Express request and response */
    const mockRequest = { params: {} };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await ingredientsController.getById(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(nextMessage);

  });

});

describe('ingredientsController.create', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should add a new ingredient with status 200', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [{ id: 1}];

    // Set any variables needed to be passed to controllers and or models
    const bodyData = 'Golden Syrup';

    // Mock any needed third party modules
    jest.spyOn(ingredientModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnBody  = 1;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const response = await request(app)
      .post('/ingredients')
      .send({ name: bodyData });

    /* Test everything works as expected */
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(1);
    expect(response.body).toEqual(modelReturnData);

  });

  it('should return status 400 if body is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const bodyData = 'Golden Syrup';

    // Mock any needed third party modules
    jest.spyOn(ingredientModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const nextMessage = {
      status: 400,
      success: false,
      message: 'Undefined body parameter'
    }

    /* Mock Express request and response */
    const mockRequest = { };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await ingredientsController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(nextMessage);

  });

  it('should return status 400 if name is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const bodyData = 'Golden Syrup';

    // Mock any needed third party modules
    jest.spyOn(ingredientModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const nextMessage = {
      status: 400,
      success: false,
      message: 'Undefined name'
    }

    /* Mock Express request and response */
    const mockRequest = { body: {} };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await ingredientsController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(nextMessage);

  });

  it('should return status 400 if name is in the wrong format', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const bodyData = 'Golden Syrup';

    // Mock any needed third party modules
    jest.spyOn(ingredientModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const nextMessage = {
      status: 400,
      success: false,
      message: 'Wrong name format'
    }

    /* Mock Express request and response */
    const mockRequest = { body: { name: 12 } };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await ingredientsController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(nextMessage);

  });

  it('should return status 500 if there is a generic resource problem', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'There was a problem with the resource, please try again later'
    };

    // Set any variables needed to be passed to controllers and or models
    const bodyData = 'Golden Syrup';

    // Mock any needed third party modules
    jest.spyOn(ingredientModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const nextMessage = {
      status: 500,
      success: false,
      message: modelReturnData.message
    }

    /* Mock Express request and response */
    const mockRequest = { body: { name: bodyData } };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await ingredientsController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(nextMessage);

  });

});

describe('ingredientsController.remove', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should remove all ingredients', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = { count: 12 };

    // Set any variables needed to be passed to controllers and or models

    // Mock any needed third party modules
    jest.spyOn(ingredientModel,'removeAll').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = 'All ingredients removed successfully'
    const returnNumDeleted = 12;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const response = await request(app)
     .delete('/ingredients');

    /* Test everything works as expected */
    expect(response.status).toBe(returnStatus);
    expect(response.body.success).toBe(returnSuccess);
    expect(response.body.message).toEqual(returnMessage);
    expect(response.body.count).toEqual(returnNumDeleted);

  });

  it('should return status 404 if not records found to be removed', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = { count: 0 };

    // Set any variables needed to be passed to controllers and or models

    // Mock any needed third party modules
    jest.spyOn(ingredientModel,'removeAll').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 404;
    const returnSuccess = false;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const response = await request(app)
     .delete('/ingredients');

    /* Test everything works as expected */
    expect(response.status).toBe(returnStatus);
    expect(typeof response.body.count).toBe('number');
    expect(response.body.count).toEqual(0);

  });

  it('should return status 500 if the resource encountered any other error', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'There was an issue with the resource, please try again later'
    };

    // Set any variables needed to be passed to controllers and or models

    // Mock any needed third party modules
    jest.spyOn(ingredientModel,'removeAll').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 500;
    const returnSuccess = false;
    const returnMessage = modelReturnData.message;

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await ingredientsController.remove(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

});

describe('ingredientsController.removeById', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should remove an ingredient with status 200', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      count: 1
    }

    // Set any variables needed to be passed to controllers and or models
    const ingredientId = 1;

    // Mock any needed third party modules
    jest.spyOn(ingredientModel, 'remove').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnCount = 1;
    const returnSuccess = true;
    const returnMessage = 'Ingredient successfully removed';

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const response = await request(app)
      .delete(`/ingredients/${ingredientId}`);

    /* Test everything works as expected */
    expect(response.status).toEqual(returnStatus);
    expect(typeof response.body).toBe('object');
    expect(typeof response.body.success).toBe('boolean');
    expect(response.body.success).toBe(true);
    expect(typeof response.body.count).toBe('number');
    expect(response.body.count).toEqual(1);
    expect(typeof response.body.message).toBe('string');
    expect(response.body.message).toEqual(returnMessage);

  });

  it('should return status 404 and a count of zero if no ingredients to remove', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      count: 0
    }

    // Set any variables needed to be passed to controllers and or models
    const ingredientId = 100;

    // Mock any needed third party modules
    jest.spyOn(ingredientModel, 'remove').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 404;
    const returnCount = 0;
    const returnSuccess = false;
    const returnMessage = 'There are no ingredients to remove';

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const response = await request(app)
      .delete(`/ingredients/${ingredientId}`);

    /* Test everything works as expected */
    expect(response.status).toEqual(returnStatus);
    expect(typeof response.body).toBe('object');
    expect(typeof response.body.success).toBe('boolean');
    expect(response.body.success).toBe(false);
    expect(typeof response.body.count).toBe('number');
    expect(response.body.count).toEqual(0);
    expect(typeof response.body.message).toBe('string');
    expect(response.body.message).toEqual(returnMessage);

  });

  it('should return status 400 if request params not set', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      count: 0
    }

    // Set any variables needed to be passed to controllers and or models
    const ingredientId = 100;

    // Mock any needed third party modules
    jest.spyOn(ingredientModel, 'remove').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnCount = 0;
    const returnSuccess = false;
    const returnMessage = 'Undefined request parameters';

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await ingredientsController.removeById(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    })

  });

  it('should return status 400 if request param id not set', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      count: 0
    }

    // Set any variables needed to be passed to controllers and or models
    const ingredientId = 100;

    // Mock any needed third party modules
    jest.spyOn(ingredientModel, 'remove').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnCount = 0;
    const returnSuccess = false;
    const returnMessage = 'Undefined id';

    /* Mock Express request and response */
    const mockRequest = { params: {} };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await ingredientsController.removeById(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    })

  });

  it('should return status 500 for all other errors encountered', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'There was a problem with the resource, please try again later'
    }

    // Set any variables needed to be passed to controllers and or models
    const ingredientId = 100;

    // Mock any needed third party modules
    jest.spyOn(ingredientModel, 'remove').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 500;
    const returnCount = 0;
    const returnSuccess = false;
    const returnMessage = modelReturnData.message;

    /* Mock Express request and response */
    const mockRequest = { params: { id: ingredientId } };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await ingredientsController.removeById(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    })

  });

});

describe('ingredientsController.update', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should update the required ingredient with status 200', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Ingredient successfully updated'
    };

    // Set any variables needed to be passed to controllers and or models
    const ingredientId = 1;
    const ingredientName = 'Tomato';

    // Mock any needed third party modules
    jest.spyOn(ingredientModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = 'Ingredient successfully updated';

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const response = await request(app)
      .put(`/ingredients/${ingredientId}`)
      .send({ name: ingredientName });

    /* Test everything works as expected */
    expect(typeof response.status).toBe('number');
    expect(response.status).toEqual(returnStatus);

    expect(typeof response.body).toBe('object');

    expect(typeof response.body.success).toBe('boolean');
    expect(response.body.success).toBe(returnSuccess);

    expect(typeof response.body.message).toBe('string');
    expect(response.body.message).toEqual(returnMessage);

  });

  xit('should return status 400 if request parameters are undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Ingredient successfully updated'
    };

    // Set any variables needed to be passed to controllers and or models
    const ingredientId = 1;
    const ingredientName = 'Tomato';

    // Mock any needed third party modules
    jest.spyOn(ingredientModel, 'update').mockImplementation(() => {
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
    await ingredientsController.update(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    })

  });

  xit('should return status 400 if request parameter id is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Ingredient successfully updated'
    };

    // Set any variables needed to be passed to controllers and or models
    const ingredientId = 1;
    const ingredientName = 'Tomato';

    // Mock any needed third party modules
    jest.spyOn(ingredientModel, 'update').mockImplementation(() => {
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
    await ingredientsController.update(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    })

  });

  xit('should return status 400 if request body is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Ingredient successfully updated'
    };

    // Set any variables needed to be passed to controllers and or models
    const ingredientId = 1;
    const ingredientName = 'Tomato';

    // Mock any needed third party modules
    jest.spyOn(ingredientModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined request body';

    /* Mock Express request and response */
    const mockRequest = { params: { id: ingredientId } };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await ingredientsController.update(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    })

  });

  xit('should return status 400 if request body name is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Ingredient successfully updated'
    };

    // Set any variables needed to be passed to controllers and or models
    const ingredientId = 1;
    const ingredientName = 'Tomato';

    // Mock any needed third party modules
    jest.spyOn(ingredientModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined name';

    /* Mock Express request and response */
    const mockRequest = { params: { id: ingredientId}, body: {}  };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await ingredientsController.update(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    })

  });

  xit('should return status 500 if there is a problem with the resource', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: false,
      message: 'There was a problem with the resource, please try again later'
    };

    // Set any variables needed to be passed to controllers and or models
    const ingredientId = 1;
    const ingredientName = 'Tomato';

    // Mock any needed third party modules
    jest.spyOn(ingredientModel, 'update').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 500;
    const returnSuccess = modelReturnData.success;
    const returnMessage = modelReturnData.message;

    /* Mock Express request and response */
    const mockRequest = { params: { id: ingredientId, }, body: { name: ingredientName } };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await ingredientsController.update(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    })

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
