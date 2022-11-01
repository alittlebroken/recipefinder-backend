/* Modules required for the tests */
const messageHelper = require('../helpers/constants');

const request = require('supertest');
const app = require('../index.js');

const categoriesController = require('../controllers/categoriesController');
const categoryModel = require('../models/categoryModel');
const cookbookCategoriesModel = require('../models/cookbookCategoriesModel');
const recipeCategoriesModel = require('../models/recipeCategoriesModel');
const { exceptions } = require('winston');


describe('categoriesController.list', () => {

    /*
     * Steps to run before and after this test suite
     */
    beforeEach(async () => {
  
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    })
  
    it('should return status 200 and a list of all categories', async () => {
  
      // Set Mocked data that models and controllers should return
      const modelReturnData = [
        { id: 1, name: 'Breakfast'},
        { id: 2, name: 'Dinner'},
        { id: 3, name: 'Lunch'}
      ];
  
      // Set any variables needed to be passed to controllers and or models
  
      // Mock any needed third party modules
      jest.spyOn(categoryModel, 'findAll').mockImplementation(() => {
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
        .get('/categories');
  
      /* Test everything works as expected */
      expect(response.status).toEqual(returnStatus);
      
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(3);

      expect(typeof response.body[0].id).toBe('number');
      expect(typeof response.body[0].name).toBe('string');
      expect(typeof response.body[1].id).toBe('number');
      expect(typeof response.body[1].name).toBe('string');
      expect(typeof response.body[2].id).toBe('number');
      expect(typeof response.body[2].name).toBe('string');

      expect(response.body[0].id).toEqual(1);
      expect(response.body[0].name).toEqual('Breakfast');

      expect(response.body[1].id).toEqual(2);
      expect(response.body[1].name).toEqual('Dinner');

      expect(response.body[2].id).toEqual(3);
      expect(response.body[2].name).toEqual('Lunch');

    });

    it('should return status 404 if no categories to list', async () => {
  
        // Set Mocked data that models and controllers should return
        const modelReturnData = [];
    
        // Set any variables needed to be passed to controllers and or models

        // Mock any needed third party modules
        jest.spyOn(categoryModel, 'findAll').mockImplementation(() => {
          return modelReturnData;
        });
    
        // Set here the expected return values for the test
        const returnStatus = 404;
        const returnSuccess = false;
        const returnMessage = 'There are no categories to return';

        /* Mock Express request and response */
        const mockRequest = {};
        const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const mockNext = jest.fn();
    
        /* Execute the function */
        //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
        await categoriesController.list(mockRequest, mockResponse, mockNext);

        /* Test everything works as expected */
        expect(mockNext).toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith({
          status: returnStatus,
          success: returnSuccess,
          message: returnMessage
        });
    
      });

      it('should return status 500 if resource encounters any other problems', async () => {
  
        // Set Mocked data that models and controllers should return
        const modelReturnData = {
          success: false,
          message: 'There was a problem with the resource, please try again later'
        };
    
        // Set any variables needed to be passed to controllers and or models
    
        // Mock any needed third party modules
        jest.spyOn(categoryModel, 'findAll').mockImplementation(() => {
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
        await categoriesController.list(mockRequest, mockResponse, mockNext);

        /* Test everything works as expected */
        expect(mockNext).toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith({
          status: returnStatus,
          success: returnSuccess,
          message: returnMessage
        });
    
      });
  
});

describe('categoriesController.create', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and create the category', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [{
      id: 12
    }]

    // Set any variables needed to be passed to controllers and or models
    const categoryName = 'Puddings';

    // Mock any needed third party modules
    jest.spyOn(categoryModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = 'Category successfully added';

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const response = await request(app)
      .post('/categories')
      .send({
        name: categoryName
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

  it('should return status 400 if request body is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const categoryName = 'Drinks';

    // Mock any needed third party modules
    jest.spyOn(categoryModel, 'create').mockImplementation(() => {
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
    await categoriesController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if request body value name is undefined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const categoryName = 'Snacks';

    // Mock any needed third party modules
    jest.spyOn(categoryModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Undefined name';

    /* Mock Express request and response */
    const mockRequest = { body: {} };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await categoriesController.create(mockRequest, mockResponse, mockNext);

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
    const categoryName = 'Treats';

    // Mock any needed third party modules
    jest.spyOn(categoryModel, 'create').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 500;
    const returnSuccess = modelReturnData.success;
    const returnMessage = modelReturnData.message;

    /* Mock Express request and response */
    const mockRequest = { body: { name: categoryName }};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await categoriesController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

});

describe('categoriesController.removeAll', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and remove all categories', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = { count: 12 };

    // Set any variables needed to be passed to controllers and or models

    // Mock any needed third party modules
    jest.spyOn(categoryModel, 'removeAll').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = 'All categories removed successfully';


    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const response = await request(app)
      .delete('/categories');

    /* Test everything works as expected */
    expect(response.status).toBe(returnStatus);

    expect(typeof response.body).toBe('object');

    expect(typeof response.body.status).toBe('number');
    expect(typeof response.body.success).toBe('boolean');
    expect(typeof response.body.message).toBe('string');

    expect(response.body.status).toEqual(returnStatus);
    expect(response.body.success).toEqual(returnSuccess);
    expect(response.body.message).toEqual(returnMessage);

  });

  it('should return status 404 if no categories found to remove', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = { count: 0 };

    // Set any variables needed to be passed to controllers and or models

    // Mock any needed third party modules
    jest.spyOn(categoryModel, 'removeAll').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 404;
    const returnSuccess = false;
    const returnMessage = 'No categories found to be removed';

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await categoriesController.removeAll(mockRequest, mockResponse, mockNext);

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

    // Mock any needed third party modules
    jest.spyOn(categoryModel, 'removeAll').mockImplementation(() => {
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
    await categoriesController.removeAll(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

});

describe('categoriesController.remove', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and remove the specified category', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = {
      success: true,
      message: 'Category successfully removed'
    }

    // Set any variables needed to be passed to controllers and or models
    const categoryId = 1;

    // Mock any needed third party modules
    jest.spyOn(categoryModel, 'remove').mockImplementation(() => {
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
      .delete(`/categories/${categoryId}`);

    /* Test everything works as expected */
    expect(response.status).toEqual(returnStatus);

    expect(typeof response.body).toBe('object');

    expect(typeof response.body.success).toBe('boolean');
    expect(typeof response.body.status).toBe('number');
    expect(typeof response.body.message).toBe('string');

    expect(response.body.success).toEqual(returnSuccess);
    expect(response.body.status).toEqual(returnStatus);
    expect(response.body.message).toEqual(returnMessage);

  });

  it('should return status 404 if no categories are found to be removed', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = { count: 0 };

    // Set any variables needed to be passed to controllers and or models
    const categoryId = 1;

    // Mock any needed third party modules
    jest.spyOn(categoryModel, 'remove').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 404;
    const returnSuccess = false;
    const returnMessage = 'No categories found to be removed';

    /* Mock Express request and response */
    const mockRequest = { params: { id: categoryId } };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await categoriesController.remove(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if request parameters are not defined', async () => {

     // Set Mocked data that models and controllers should return
     const modelReturnData = { count: 0 };

     // Set any variables needed to be passed to controllers and or models
     const categoryId = 1;
 
     // Mock any needed third party modules
     jest.spyOn(categoryModel, 'remove').mockImplementation(() => {
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
    await categoriesController.remove(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
    });

  });

  it('should return status 400 if request parameter id is not defined', async () => {

    // Set Mocked data that models and controllers should return
    const modelReturnData = [];

    // Set any variables needed to be passed to controllers and or models
    const categoryId = 1;

    // Mock any needed third party modules
    jest.spyOn(categoryModel, 'remove').mockImplementation(() => {
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
    await categoriesController.remove(mockRequest, mockResponse, mockNext);

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
    }

    // Set any variables needed to be passed to controllers and or models
    const categoryId = 2;

    // Mock any needed third party modules
    jest.spyOn(categoryModel, 'remove').mockImplementation(() => {
      return modelReturnData;
    });

    // Set here the expected return values for the test
    const returnStatus = 500;
    const returnSuccess = modelReturnData.success;
    const returnMessage = modelReturnData.message;

    /* Mock Express request and response */
    const mockRequest = { params: { id: categoryId } };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    await categoriesController.remove(mockRequest, mockResponse, mockNext);

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