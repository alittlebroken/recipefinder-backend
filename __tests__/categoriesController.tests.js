/* Modules required for the tests */
const request = require('supertest');
const app = require('../index.js');

const categoryModel = require('../models/categoryModel');
const userModel = require('../models/userModel');

describe('categoriesController', () => {

  beforeEach(async () => {
    user = {
      id: 1,
      email: 'admin@localhost',
      forename: 'Site',
      surname: 'Administrator',
      roles: ['Admin']
  }
    authToken = await userModel.generateToken({user});

     /* User used to trigger a failed authorised middleware check */
     failUser = {
      id: 2,
      email: 'failed@localhost',
      forename: 'Failed',
      surname: 'User',
      roles: ['Sales']
    }
    failToken = await userModel.generateToken({ user: failUser});
  });

  describe('list', () => {

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
  
      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .get('/categories')
        .set('Authorization', `Bearer ${authToken}`);
  
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

    it('should return status 401 if a non logged in user tries to access this route', async () => {
  
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
      const returnStatus = 401;
      const returnSuccess = false;
      const returnMessage = '';
  
      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .get('/categories');
  
      /* Test everything works as expected */
      expect(response.status).toEqual(returnStatus);

    });

    it('should return status 404 if there are no categories to return', async () => {
  
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
  
      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const res = await request(app)
        .get('/categories')
        .set('Authorization', `Bearer ${authToken}`);
  
      /* Test everything works as expected */
      expect(res.status).toEqual(returnStatus);
      
      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);

    });

    it('should return status 500 if the resource encounters any other problems', async () => {
  
      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: false,
        status: 'There was an issue with the resource, please try again later'
      };
  
      // Set any variables needed to be passed to controllers and or models
  
      // Mock any needed third party modules
      jest.spyOn(categoryModel, 'findAll').mockImplementation(() => {
        return modelReturnData;
      });
  
      // Set here the expected return values for the test
      const returnStatus = 500;
      const returnSuccess = false;
      const returnMessage = 'There was a problem with the resource, please try again later';
  
      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const res = await request(app)
        .get('/categories')
        .set('Authorization', `Bearer ${authToken}`);
  
      /* Test everything works as expected */
      expect(res.status).toEqual(returnStatus);
      
      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);

    });

  });

  describe('create', () => {

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

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/categories')
        .send({
          name: categoryName
        })
        .set('Authorization', `Bearer ${authToken}`);

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

    it('should return status 401 if a non logged in user tries to access this route', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = []

      // Set any variables needed to be passed to controllers and or models
      const categoryName = 'Puddings';

      // Mock any needed third party modules
      jest.spyOn(categoryModel, 'create').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 401;
      const returnSuccess = false;
      const returnMessage = '';

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/categories')
        .send({
          name: categoryName
        });

      /* Test everything works as expected */
      expect(response.status).toEqual(returnStatus);

    });

    it('should return status 400 if category name is undefined', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = []

      // Set any variables needed to be passed to controllers and or models
      let categoryName;

      // Mock any needed third party modules
      jest.spyOn(categoryModel, 'create').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined category name';

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/categories')
        .send({
          name: categoryName
        })
        .set('Authorization', `Bearer ${authToken}`);

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

    it('should return status 400 if category name is of the wrong format', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = []

      // Set any variables needed to be passed to controllers and or models
      let categoryName = 12;

      // Mock any needed third party modules
      jest.spyOn(categoryModel, 'create').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Wrong format for category name';

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/categories')
        .send({
          name: categoryName
        })
        .set('Authorization', `Bearer ${authToken}`);

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

    it('should return status 500 if the resource encounters any other problem', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: false,
        message: 'There was an issue with the resource, please try again later'
      }

      // Set any variables needed to be passed to controllers and or models
      const categoryName = 'Puddings';

      // Mock any needed third party modules
      jest.spyOn(categoryModel, 'create').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 500;
      const returnSuccess = false;
      const returnMessage = 'There was a problem with the resource, please try again later';

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/categories')
        .send({
          name: categoryName
        })
        .set('Authorization', `Bearer ${authToken}`);

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

  });

  describe('removeAll', () => {

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

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .delete('/categories')
        .set('Authorization', `Bearer ${authToken}`);

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

    it('should return status 401 if a non logged in user tries to access this route', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [];

      // Set any variables needed to be passed to controllers and or models

      // Mock any needed third party modules
      jest.spyOn(categoryModel, 'removeAll').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 401;
      const returnSuccess = false;
      const returnMessage = '';

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .delete('/categories');

      /* Test everything works as expected */
      expect(response.status).toBe(returnStatus);

    });

    it('should return status 403 if a unauthorised users tries to use this resource', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [];
    
      // Set Mocked data that models and controllers should return
      
      // Mock any needed third party modules
      jest.spyOn(categoryModel, 'removeAll').mockImplementation(() => {
        return modelReturnData;
      });
  
      // Set here the expected return values for the test
      const returnStatus = 403;
      const returnSuccess = false;
      const returnMessage = 'You are not authorized to access the specified route';
  
      /* Execute the function */
      const res = await request(app)
        .delete('/categories')
        .set('Authorization', `Bearer ${failToken}`);
  
      /* Test everything works as expected */
      expect(res.status).toEqual(returnStatus);
  
      expect(typeof res.body).toBe('object');
      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
  
      expect(res.body.status).toEqual(returnStatus);
      expect(res.body.success).toEqual(returnSuccess);
      expect(res.body.message).toEqual(returnMessage);
  
    });

    it('should return status 404 if there are no categories to remove', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [];

      // Set any variables needed to be passed to controllers and or models

      // Mock any needed third party modules
      jest.spyOn(categoryModel, 'removeAll').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 404;
      const returnSuccess = false;
      const returnMessage = 'There are no categories to remove';

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .delete('/categories')
        .set('Authorization', `Bearer ${authToken}`);

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

    it('should return status 500 if the resource encounters any other problem', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: false,
        message: 'There was an issue with the resource, please try again later'
      };

      // Set any variables needed to be passed to controllers and or models

      // Mock any needed third party modules
      jest.spyOn(categoryModel, 'removeAll').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 500;
      const returnSuccess = false;
      const returnMessage = 'There was a problem with the resource, please try again later';

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .delete('/categories')
        .set('Authorization', `Bearer ${authToken}`);

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

  });

  describe('remove', () => {

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

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .delete(`/categories/${categoryId}`)
        .set('Authorization', `Bearer ${authToken}`);

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

    it('should return status 401 if a non logged in user tries to access this route', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = []

      // Set any variables needed to be passed to controllers and or models
      const categoryId = 1;

      // Mock any needed third party modules
      jest.spyOn(categoryModel, 'remove').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 401;
      const returnSuccess = false;
      const returnMessage = '';

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .delete(`/categories/${categoryId}`);

      /* Test everything works as expected */
      expect(response.status).toEqual(returnStatus);

    });

    it('should return status 404 if there is no matching category to be removed', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = []

      // Set any variables needed to be passed to controllers and or models
      const categoryId = 1;

      // Mock any needed third party modules
      jest.spyOn(categoryModel, 'remove').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 404;
      const returnSuccess = false;
      const returnMessage = 'No matching category found to be removed';

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .delete(`/categories/${categoryId}`)
        .set('Authorization', `Bearer ${authToken}`);

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

    it('should return status 400 if the category id is undefined', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = []

      // Set any variables needed to be passed to controllers and or models
      let categoryId;

      // Mock any needed third party modules
      jest.spyOn(categoryModel, 'remove').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined category id';

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .delete(`/categories/${categoryId}`)
        .set('Authorization', `Bearer ${authToken}`);

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

    it('should return status 500 if the resource encounters any other problem', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: false,
        message: 'There was an issue with the resource, please try again later'
      }

      // Set any variables needed to be passed to controllers and or models
      const categoryId = 1;

      // Mock any needed third party modules
      jest.spyOn(categoryModel, 'remove').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 500;
      const returnSuccess = false;
      const returnMessage = 'There was a problem with the resource, please try again later';

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .delete(`/categories/${categoryId}`)
        .set('Authorization', `Bearer ${authToken}`);

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

  });

  describe('update', () => {

    /*
    * Steps to run before and after this test suite
    */
    beforeEach(async () => {

    });

    afterEach(() => {
      jest.clearAllMocks();
    })

    it('should return status 200 and update the specific category', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: true,
        message: 'Category successfully updated'
      }

      // Set any variables needed to be passed to controllers and or models
      const categoryId = 1;
      const categoryName = 'Vegan';

      // Mock any needed third party modules
      jest.spyOn(categoryModel, 'update').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 200;
      const returnSuccess = modelReturnData.success;
      const returnMessage = modelReturnData.message;

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .put(`/categories/${categoryId}`)
        .send({
          name: categoryName
        })
        .set('Authorization', `Bearer ${authToken}`);

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

    it('should return status 401 if a non logged in users tries to access this resource', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = []

      // Set any variables needed to be passed to controllers and or models
      const categoryId = 1;
      const categoryName = 'Vegan';

      // Mock any needed third party modules
      jest.spyOn(categoryModel, 'update').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 401;
      const returnSuccess = false;
      const returnMessage = '';

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .put(`/categories/${categoryId}`)
        .send({
          name: categoryName
        });

      /* Test everything works as expected */
      expect(response.status).toEqual(returnStatus);


    });

    it('should return status 404 if no there are no records found to update', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = []

      // Set any variables needed to be passed to controllers and or models
      const categoryId = 1;
      const categoryName = 'Vegan';

      // Mock any needed third party modules
      jest.spyOn(categoryModel, 'update').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 404;
      const returnSuccess = false;
      const returnMessage = 'There are no records to update matching the supplied id';

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .put(`/categories/${categoryId}`)
        .send({
          name: categoryName
        })
        .set('Authorization', `Bearer ${authToken}`);

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

    it('should return status 400 if the category id is undefined', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = []

      // Set any variables needed to be passed to controllers and or models
      let categoryId;
      const categoryName = 'Vegan';

      // Mock any needed third party modules
      jest.spyOn(categoryModel, 'update').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined category id';

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .put(`/categories/${categoryId}`)
        .send({
          name: categoryName
        })
        .set('Authorization', `Bearer ${authToken}`);

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

    it('should return status 400 if the categiry name is undefined', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = []

      // Set any variables needed to be passed to controllers and or models
      const categoryId = 1;
      let categoryName;

      // Mock any needed third party modules
      jest.spyOn(categoryModel, 'update').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined category name';

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .put(`/categories/${categoryId}`)
        .send({
          name: categoryName
        })
        .set('Authorization', `Bearer ${authToken}`);

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

    it('should return status 400 if category name is in the wrong format', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = []

      // Set any variables needed to be passed to controllers and or models
      const categoryId = 1;
      const categoryName = 12;

      // Mock any needed third party modules
      jest.spyOn(categoryModel, 'update').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Wrong format for category name';

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .put(`/categories/${categoryId}`)
        .send({
          name: categoryName
        })
        .set('Authorization', `Bearer ${authToken}`);

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

    it('should return status 500 if the resource enciunters any other problem', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: false,
        message: 'There was an issue with the resource, please try again later'
      }

      // Set any variables needed to be passed to controllers and or models
      const categoryId = 1;
      const categoryName = 'Vegan';

      // Mock any needed third party modules
      jest.spyOn(categoryModel, 'update').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 500;
      const returnSuccess = false;
      const returnMessage = 'There was a problem with the resource, please try again later';

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .put(`/categories/${categoryId}`)
        .send({
          name: categoryName
        })
        .set('Authorization', `Bearer ${authToken}`);

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