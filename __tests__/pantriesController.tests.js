/* Modules required for the tests */
const messageHelper = require('../helpers/constants');

const request = require('supertest');
const app = require('../index.js');

const pantriesController = require('../controllers/pantriesController');
const pantryModel = require('../models/pantryModel');
const pantryIngredientsModel = require('../models/pantryIngredientsModel');
const userModel = require('../models/userModel');

describe('pantriesController', () => {

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

  afterEach(() => {
    jest.clearAllMocks();
  })


  describe('listAll', () => {

    /*
    * Steps to run before and after this test suite
    */
    beforeEach(async () => {
  
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    })
  
    it('should return a list of all pantries with status 200', async () => {
  
      // Set Mocked data that models and controllers should return
      const modelReturnData = [
        {
            id: 1,
            userId: 1,
            username: 'admin',
            numIngredients: 0
        },
        {
            id: 2,
            userId: 2,
            username: 'twatford',
            numIngredients: 12
        }
      ];
  
      // Set any variables needed to be passed to controllers and or models
      
      // Mock any needed third party modules
      jest.spyOn(pantryModel, 'listAll').mockImplementation(() => {
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
        .get('/pantries')
        .set('Authorization', `Bearer ${authToken}`);

      /* Test everything works as expected */
      expect(response.status).toBe(returnStatus);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(2);

      expect(typeof response.body[0].id).toBe('number');
      expect(typeof response.body[0].userId).toBe('number');
      expect(typeof response.body[0].username).toBe('string');
      expect(typeof response.body[0].numIngredients).toBe('number');

      expect(typeof response.body[1].id).toBe('number');
      expect(typeof response.body[1].userId).toBe('number');
      expect(typeof response.body[1].username).toBe('string');
      expect(typeof response.body[1].numIngredients).toBe('number');

      expect(response.body[0]).toEqual(modelReturnData[0]);
      expect(response.body[1]).toEqual(modelReturnData[1]);
  
    });

    it('should return status 401 if a non logged in user tries to access this resource', async () => {
  
      // Set Mocked data that models and controllers should return
      const modelreturnData = [];
  
      // Set any variables needed to be passed to controllers and or models
      
      // Mock any needed third party modules
      jest.spyOn(pantryModel, 'listAll').mockImplementation(() => {
        return modelreturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 404;
      const returnSuccess = false;
      const returnMessage = 'There are no pantries to list';
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Perform the test */
      const response = await request(app)
        .get('/pantries')
        .set('Authorization', `Bearer ${authToken}`);

      /* Test everything works as expected */
      expect(response.status).toBe(returnStatus);

      expect(typeof response.body.status).toBe('number');
      expect(typeof response.body.success).toBe('boolean');
      expect(typeof response.body.message).toBe('string');

      expect(response.body.status).toEqual(returnStatus);
      expect(response.body.success).toEqual(returnSuccess);
      expect(response.body.message).toEqual(returnMessage);
    
    });

    it('should return status 403 if a unauthorised users tries to use this resource', async () => {

      // Set Mocked data that models and controllers should return
      const modelreturnData = [];
    
      // Set any variables needed to be passed to controllers and or models
      
      // Mock any needed third party modules
      jest.spyOn(pantryModel, 'listAll').mockImplementation(() => {
        return modelreturnData;
      });
  
      // Set here the expected return values for the test
      const returnStatus = 403;
      const returnSuccess = false;
      const returnMessage = 'You are not authorized to access the specified route';
  
      /* Execute the function */
      const res = await request(app)
        .get('/pantries')
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

    it('should return status 404 if there are no pantries', async () => {
  
      // Set Mocked data that models and controllers should return
      const modelreturnData = [];
  
      // Set any variables needed to be passed to controllers and or models
      
      // Mock any needed third party modules
      jest.spyOn(pantryModel, 'listAll').mockImplementation(() => {
        return modelreturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 404;
      const returnSuccess = false;
      const returnMessage = 'There are no pantries to list';
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Perform the test */
      const response = await request(app)
        .get('/pantries')
        .set('Authorization', `Bearer ${authToken}`);

      /* Test everything works as expected */
      expect(response.status).toBe(returnStatus);

      expect(typeof response.body.status).toBe('number');
      expect(typeof response.body.success).toBe('boolean');
      expect(typeof response.body.message).toBe('string');

      expect(response.body.status).toEqual(returnStatus);
      expect(response.body.success).toEqual(returnSuccess);
      expect(response.body.message).toEqual(returnMessage);
    
    });

    it('should return status 500 for any other problems encountered by the resource', async () => {
  
        // Set Mocked data that models and controllers should return
      const modelreturnData = {
        success: false,
        message: 'There was a problem with the resource, please try again later'
      };
  
      // Set any variables needed to be passed to controllers and or models
      
      // Mock any needed third party modules
      jest.spyOn(pantryModel, 'listAll').mockImplementation(() => {
        return modelreturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 500;
      const returnSuccess = false;
      const returnMessage = 'There was a problem with the resource, please try again later';
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Perform the test */
      const response = await request(app)
        .get('/pantries')
        .set('Authorization', `Bearer ${authToken}`);

      /* Test everything works as expected */
      expect(response.status).toBe(returnStatus);

      expect(typeof response.body.status).toBe('number');
      expect(typeof response.body.success).toBe('boolean');
      expect(typeof response.body.message).toBe('string');

      expect(response.body.status).toEqual(returnStatus);
      expect(response.body.success).toEqual(returnSuccess);
      expect(response.body.message).toEqual(returnMessage);
    
    });
  
  });

  describe('list', () => {

      /*
      * Steps to run before and after this test suite
      */
      beforeEach(async () => {
    
      });
    
      afterEach(() => {
        jest.clearAllMocks();
      });
    
      it('should return status 200 and the required pantry', async () => {
    
        // Set Mocked data that models and controllers should return
        const modelReturnData = [
          {
              id: 2,
              userId: 2,
              username: 'twatford',
              numIngredients: 12
          }
        ];
    
        // Set any variables needed to be passed to controllers and or models
        const pantryId = 2;

        // Mock any needed third party modules
        jest.spyOn(pantryModel, 'list').mockImplementation(() => {
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
          .get('/pantries/:id')
          .set('Authorization', `Bearer ${authToken}`);

        /* Test everything works as expected */
        expect(response.status).toBe(returnStatus);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(1);

        expect(typeof response.body[0].id).toBe('number');
        expect(typeof response.body[0].userId).toBe('number');
        expect(typeof response.body[0].username).toBe('string');
        expect(typeof response.body[0].numIngredients).toBe('number');

        expect(response.body[0].id).toEqual(2);
        expect(response.body[0].userId).toEqual(2);
        expect(response.body[0].username).toEqual('twatford');
        expect(response.body[0].numIngredients).toEqual(12);
    
      });

      it('should return status 401 if a non logged in user tries to access the resource', async () => {
    
        // Set Mocked data that models and controllers should return
        const modelReturnData = [];
    
        // Set any variables needed to be passed to controllers and or models
        const pantryId = 1234;

        // Mock any needed third party modules
        jest.spyOn(pantryModel, 'list').mockImplementation(() => {
            return modelReturnData;
        });
    
        // Set here the expected return values for the test
        const returnStatus = 401;
        const returnSuccess = false;
        const returnMessage = 'No pantry matched the supplied id';
    
        /* Mock Express request and response */
        const mockRequest = { params: { id: pantryId } };
        const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const mockNext = jest.fn();
    
        /* Execute the function */
        //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
        const response = await request(app)
        .get('/pantries/:id');

        /* Test everything works as expected */
        expect(response.status).toBe(returnStatus);
    
      });

      it('should return status 404 if no pantries exist', async () => {
    
          // Set Mocked data that models and controllers should return
          const modelReturnData = [];
      
          // Set any variables needed to be passed to controllers and or models
          const pantryId = 1234;

          // Mock any needed third party modules
          jest.spyOn(pantryModel, 'list').mockImplementation(() => {
              return modelReturnData;
          });
      
          // Set here the expected return values for the test
          const returnStatus = 404;
          const returnSuccess = false;
          const returnMessage = 'No pantry matched the supplied id';
      
          /* Mock Express request and response */
          const mockRequest = { params: { id: pantryId } };
          const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
          const mockNext = jest.fn();
      
          /* Execute the function */
          //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
          const response = await request(app)
          .get('/pantries/:id')
          .set('Authorization', `Bearer ${authToken}`);

          /* Test everything works as expected */
          expect(response.status).toBe(returnStatus);

          expect(typeof response.body.status).toBe('number');
          expect(typeof response.body.success).toBe('boolean');
          expect(typeof response.body.message).toBe('string');

          expect(response.body.status).toEqual(returnStatus);
          expect(response.body.success).toEqual(returnSuccess);
          expect(response.body.message).toEqual(returnMessage);
      
        });

        it('should return status 400 if request pantryId is undefined', async () => {
    
          // Set Mocked data that models and controllers should return
          const modelReturnData = [];
      
          // Set any variables needed to be passed to controllers and or models
          let pantryId;

          // Mock any needed third party modules
          jest.spyOn(pantryModel, 'list').mockImplementation(() => {
              return modelReturnData;
          });
      
          // Set here the expected return values for the test
          const returnStatus = 400;
          const returnSuccess = false;
          const returnMessage = 'Undefined pantryId';
      
          /* Mock Express request and response */
          const mockRequest = { params: {} };
          const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
          const mockNext = jest.fn();
      
          /* Execute the function */
          //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
          const response = await request(app)
            .get(`/pantries/${pantryId}`)
            .set('Authorization', `Bearer ${authToken}`);

          /* Test everything works as expected */
          expect(response.status).toBe(returnStatus);

          expect(typeof response.body.status).toBe('number');
          expect(typeof response.body.success).toBe('boolean');
          expect(typeof response.body.message).toBe('string');

          expect(response.body.status).toEqual(returnStatus);
          expect(response.body.success).toEqual(returnSuccess);
          expect(response.body.message).toEqual(returnMessage);
      
        });

        it('should return status 500 if resource encounters another issue', async () => {
    
          // Set Mocked data that models and controllers should return
          const modelReturnData = {
              success: false,
              message: 'There was a problem with the resource, please try again later'
          };
      
          // Set any variables needed to be passed to controllers and or models
          const pantryId = 1234;

          // Mock any needed third party modules
          jest.spyOn(pantryModel, 'list').mockImplementation(() => {
              return modelReturnData;
          });
      
          // Set here the expected return values for the test
          const returnStatus = 500;
          const returnSuccess = modelReturnData.success;
          const returnMessage = modelReturnData.message;
      
          /* Mock Express request and response */
          const mockRequest = { params: { id: pantryId } };
          const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
          const mockNext = jest.fn();
      
          /* Execute the function */
          //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
          const response = await request(app)
          .get('/pantries/:id')
          .set('Authorization', `Bearer ${authToken}`);

          /* Test everything works as expected */
          expect(response.status).toBe(returnStatus);

          expect(typeof response.body.status).toBe('number');
          expect(typeof response.body.success).toBe('boolean');
          expect(typeof response.body.message).toBe('string');

          expect(response.body.status).toEqual(returnStatus);
          expect(response.body.success).toEqual(returnSuccess);
          expect(response.body.message).toEqual(returnMessage);
      
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

    it('should return status 200 and create a new pantry', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [
        { id: 1, userId: 1}
      ]

      // Set any variables needed to be passed to controllers and or models
      const userId = 1;

      // Mock any needed third party modules
      jest.spyOn(pantryModel,'create').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 200;
      const returnSuccess = true;
      const returnMessage = 'Pantry successfully created';

      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/pantries')
        .send({ userId: userId})
        .set('Authorization', `Bearer ${authToken}`);
      
      /* Test everything works as expected */
      expect(response.status).toEqual(returnStatus);
      expect(typeof response.body).toBe('object');

      expect(typeof response.body.status).toBe('number');
      expect(typeof response.body.success).toBe('boolean');
      expect(typeof response.body.message).toBe('string');

      expect(response.body.status).toEqual(returnStatus);
      expect(response.body.success).toBe(returnSuccess);
      expect(response.body.message).toEqual(returnMessage);

    });

    it('should return status 401 if a non logged in user tries to access the resource', async () => {

      // Set Mocked data that models and controllers should return
      const modelreturnData = [];
    
      // Set Mocked data that models and controllers should return
      const modelReturnData = [
        { id: 1, userId: 1}
      ]
  
      // Set any variables needed to be passed to controllers and or models
      const userId = 1;
      
      // Mock any needed third party modules
      jest.spyOn(pantryModel, 'listAll').mockImplementation(() => {
        return modelreturnData;
      });
  
      // Set here the expected return values for the test
      const returnStatus = 401;
      const returnSuccess = false;
      const returnMessage = '';
  
      /* Execute the function */
      const res = await request(app)
        .post('/pantries')
        .send({ userId: userId});
  
      /* Test everything works as expected */
      expect(res.status).toEqual(returnStatus);

  
    });

    it('should return status 403 if a unauthorised users tries to use this resource', async () => {

      // Set Mocked data that models and controllers should return
      const modelreturnData = [];
    
      // Set Mocked data that models and controllers should return
      const modelReturnData = [
        { id: 1, userId: 1}
      ]
  
      // Set any variables needed to be passed to controllers and or models
      const userId = 1;
      
      // Mock any needed third party modules
      jest.spyOn(pantryModel, 'listAll').mockImplementation(() => {
        return modelreturnData;
      });
  
      // Set here the expected return values for the test
      const returnStatus = 403;
      const returnSuccess = false;
      const returnMessage = 'You are not authorized to access the specified route';
  
      /* Execute the function */
      const res = await request(app)
        .post('/pantries')
        .send({ userId: userId})
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

    it('should return status 400 if request body is undefined', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [];

      // Set any variables needed to be passed to controllers and or models
      const userId = 1;

      // Mock any needed third party modules
      jest.spyOn(pantryModel,'create').mockImplementation(() => {
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
      await pantriesController.create(mockRequest, mockResponse, mockNext);

      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });

    });

    it('should return 400 if request body userId is undefined', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [];

      // Set any variables needed to be passed to controllers and or models
      const userId = 1;

      // Mock any needed third party modules
      jest.spyOn(pantryModel,'create').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined userId';

      /* Mock Express request and response */
      const mockRequest = { body: {} };
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await pantriesController.create(mockRequest, mockResponse, mockNext);

      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });

    });

    it('should return status 400 if the pantry already exists', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: false,
        message: 'The specified user already has a pantry'
      };

      // Set any variables needed to be passed to controllers and or models
      const userId = 1;

      // Mock any needed third party modules
      jest.spyOn(pantryModel,'create').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'The specified user already has a pantry';

      /* Mock Express request and response */
      const mockRequest = { body: { userId: userId }};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await pantriesController.create(mockRequest, mockResponse, mockNext);

      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });

    });

    it('should return status 500 if the resource encountered another problem', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: false,
        message: 'There was a problem with the resource, please try again later'
      }

      // Set any variables needed to be passed to controllers and or models
      const userId = 1;

      // Mock any needed third party modules
      jest.spyOn(pantryModel,'create').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 500;
      const returnSuccess = modelReturnData.success;
      const returnMessage = modelReturnData.message;

      /* Mock Express request and response */
      const mockRequest = { body: { userId: userId } };
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await pantriesController.create(mockRequest, mockResponse, mockNext);

      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });

    });

  });

  describe('add', () => {

    /*
    * Steps to run before and after this test suite
    */
    beforeEach(async () => {

    });

    afterEach(() => {
      jest.clearAllMocks();
    })

    it('should return status 200 and add an ingredient to the pantry', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: true,
        message: 'Record successfully created'
      };

      // Set any variables needed to be passed to controllers and or models
      const pantryId = 1;
      const pantryItem = {
        ingredientId: 1,
        amount: 200,
        amount_type: 'grams'
      };

      // Mock any needed third party modules
      jest.spyOn(pantryIngredientsModel, 'create').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 200;
      const returnSuccess = true;
      const returnMessage = 'Ingredient successfully added to pantry';

      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post(`/pantries/${pantryId}`)
        .send(pantryItem)
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

    it('should return status 401 if a non logged in user tries to access this resource', async () => {
  
      // Set Mocked data that models and controllers should return
      const modelreturnData = [];
  
      // Set any variables needed to be passed to controllers and or models
      const pantryId = 1;
      const pantryItem = {
        ingredientId: 1,
        amount: 200,
        amount_type: 'grams'
      };

      // Mock any needed third party modules
      jest.spyOn(pantryIngredientsModel, 'create').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 401;
      const returnSuccess = false;
      const returnMessage = 'There are no pantries to list';

  
      /* Perform the test */
      const response = await request(app)
        .post(`/pantries/${pantryId}`)
        .send(pantryItem);

      /* Test everything works as expected */
      expect(response.status).toBe(returnStatus);
    
    });

    it('should return status 404 if pantry does not exist', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: false,
        message: 'There was an issue adding the item to the pantry'
      };

      // Set any variables needed to be passed to controllers and or models
      const pantryId = 2;
      const pantryItem = {
        ingredientId: 1,
        amount: 200,
        amount_type: 'grams'
      };

      // Mock any needed third party modules
      jest.spyOn(pantryIngredientsModel, 'create').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 404;
      const returnSuccess = modelReturnData.success;
      const returnMessage = modelReturnData.message;

      /* Mock Express request and response */
      const mockRequest = {
        params: {
          pantryId: pantryId,
        },
        body: {
          ingredientId: pantryItem.ingredientId,
          amount: pantryItem.amount,
          amount_type: pantryItem.amount_type
        }
      };
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await pantriesController.add(mockRequest, mockResponse, mockNext);

      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });

    });

    it('should return status 400 if the request parameter is undefined', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: false,
        message: 'There was an issue adding the item to the pantry'
      };

      // Set any variables needed to be passed to controllers and or models
      const pantryId = 2;
      const pantryItem = {
        ingredientId: 1,
        amount: 200,
        amount_type: 'grams'
      };

      // Mock any needed third party modules
      jest.spyOn(pantryIngredientsModel, 'create').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined request parameters';

      /* Mock Express request and response */
      const mockRequest = {
        body: {
          ingredientId: pantryItem.ingredientId,
          amount: pantryItem.amount,
          amount_type: pantryItem.amount_type
        }
      };
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await pantriesController.add(mockRequest, mockResponse, mockNext);

      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });

    });

    it('should return status 400 if request parameter pantryId is undefined', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: false,
        message: 'There was an issue adding the item to the pantry'
      };

      // Set any variables needed to be passed to controllers and or models
      const pantryId = 2;
      const pantryItem = {
        ingredientId: 1,
        amount: 200,
        amount_type: 'grams'
      };

      // Mock any needed third party modules
      jest.spyOn(pantryIngredientsModel, 'create').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined pantryId';

      /* Mock Express request and response */
      const mockRequest = {
        params: {},
        body: {
          ingredientId: pantryItem.ingredientId,
          amount: pantryItem.amount,
          amount_type: pantryItem.amount_type
        }
      };
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await pantriesController.add(mockRequest, mockResponse, mockNext);

      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });

    });

    it('should return status 400 if the request body is undefined', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: false,
        message: 'There was an issue adding the item to the pantry'
      };

      // Set any variables needed to be passed to controllers and or models
      const pantryId = 2;
      const pantryItem = {
        ingredientId: 1,
        amount: 200,
        amount_type: 'grams'
      };

      // Mock any needed third party modules
      jest.spyOn(pantryIngredientsModel, 'create').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined request body';

      /* Mock Express request and response */
      const mockRequest = {
        params: {
          pantryId: pantryId,
        },
      };
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await pantriesController.add(mockRequest, mockResponse, mockNext);

      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });

    });

    it('should return status 400 if request body is not an object', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: false,
        message: 'There was an issue adding the item to the pantry'
      };

      // Set any variables needed to be passed to controllers and or models
      const pantryId = 2;
      const pantryItem = {
        ingredientId: 1,
        amount: 200,
        amount_type: 'grams'
      };

      // Mock any needed third party modules
      jest.spyOn(pantryIngredientsModel, 'create').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Wrong request body format';

      /* Mock Express request and response */
      const mockRequest = {
        params: {
          pantryId: pantryId,
        },
        body: 'Bacon Bits'
      };
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await pantriesController.add(mockRequest, mockResponse, mockNext);

      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });

    });

    it('should return status 400 if request body amount is undefined', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: false,
        message: 'There was an issue adding the item to the pantry'
      };

      // Set any variables needed to be passed to controllers and or models
      const pantryId = 2;
      const pantryItem = {
        ingredientId: 1,
        amount: 200,
        amount_type: 'grams'
      };

      // Mock any needed third party modules
      jest.spyOn(pantryIngredientsModel, 'create').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined amount';

      /* Mock Express request and response */
      const mockRequest = {
        params: {
          pantryId: pantryId,
        },
        body: {
          ingredientId: pantryItem.ingredientId,
          amount_type: pantryItem.amount_type
        }
      };
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await pantriesController.add(mockRequest, mockResponse, mockNext);

      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });

    });

    it('should return status 400 if request body amount_type is undefined', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: false,
        message: 'There was an issue adding the item to the pantry'
      };

      // Set any variables needed to be passed to controllers and or models
      const pantryId = 2;
      const pantryItem = {
        ingredientId: 1,
        amount: 200,
        amount_type: 'grams'
      };

      // Mock any needed third party modules
      jest.spyOn(pantryIngredientsModel, 'create').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined amount_type';

      /* Mock Express request and response */
      const mockRequest = {
        params: {
          pantryId: pantryId,
        },
        body: {
          ingredientId: pantryItem.ingredientId,
          amount: pantryItem.amount,
        }
      };
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await pantriesController.add(mockRequest, mockResponse, mockNext);

      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });

    });

    it('should return status 400 if request body ingredientId is undefined', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: false,
        message: 'There was an issue adding the item to the pantry'
      };

      // Set any variables needed to be passed to controllers and or models
      const pantryId = 2;
      const pantryItem = {
        ingredientId: 1,
        amount: 200,
        amount_type: 'grams'
      };

      // Mock any needed third party modules
      jest.spyOn(pantryIngredientsModel, 'create').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined ingredientId';

      /* Mock Express request and response */
      const mockRequest = {
        params: {
          pantryId: pantryId,
        },
        body: {
          amount: pantryItem.amount,
          amount_type: pantryItem.amount_type
        }
      };
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await pantriesController.add(mockRequest, mockResponse, mockNext);

      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });

    });

    it('should return status 500 and a generic resource error if other issues are encountered', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: false,
        message: 'There was a problem with the resource, please try again later'
      };

      // Set any variables needed to be passed to controllers and or models
      const pantryId = 2;
      const pantryItem = {
        ingredientId: 1,
        amount: 200,
        amount_type: 'grams'
      };

      // Mock any needed third party modules
      jest.spyOn(pantryIngredientsModel, 'create').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 500;
      const returnSuccess = modelReturnData.success;
      const returnMessage = modelReturnData.message;

      /* Mock Express request and response */
      const mockRequest = {
        params: {
          pantryId: pantryId,
        },
        body: {
          ingredientId: pantryItem.ingredientId,
          amount: pantryItem.amount,
          amount_type: pantryItem.amount_type
        }
      };
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await pantriesController.add(mockRequest, mockResponse, mockNext);

      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });

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

    it('should return status 200 and remove all pantries', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = { count: 6 };

      // Set any variables needed to be passed to controllers and or models

      // Mock any needed third party modules
      jest.spyOn(pantryModel, 'removeAll').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 200;
      const returnSuccess = true;
      const returnMessage = 'All pantries successfully removed';

      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .delete('/pantries')
        .set('Authorization', `Bearer ${authToken}`);

      /* Test everything works as expected */
      expect(response.status).toEqual(200);

      expect(typeof response.body).toBe('object');

      expect(typeof response.body.status).toBe('number');
      expect(typeof response.body.success).toBe('boolean');
      expect(typeof response.body.message).toBe('string');

      expect(response.body.status).toEqual(returnStatus);
      expect(response.body.success).toEqual(returnSuccess);
      expect(response.body.message).toEqual(returnMessage)

    });

    it('should return status 401 if a non logged in user tries to access the resource', async () => {

      // Set Mocked data that models and controllers should return
      const modelreturnData = [];
    
      // Set Mocked data that models and controllers should return
      
      // Mock any needed third party modules
      jest.spyOn(pantryModel, 'removeAll').mockImplementation(() => {
        return modelReturnData;
      });
  
      // Set here the expected return values for the test
      const returnStatus = 401;
      const returnSuccess = false;
      const returnMessage = '';
  
      /* Execute the function */
      const res = await request(app)
        .delete('/pantries');
  
      /* Test everything works as expected */
      expect(res.status).toEqual(returnStatus);
  
    });

    it('should return status 403 if a unauthorised users tries to use this resource', async () => {

      // Set Mocked data that models and controllers should return
      const modelreturnData = [];
    
      // Set Mocked data that models and controllers should return
      
      // Mock any needed third party modules
      jest.spyOn(pantryModel, 'removeAll').mockImplementation(() => {
        return modelReturnData;
      });
  
      // Set here the expected return values for the test
      const returnStatus = 403;
      const returnSuccess = false;
      const returnMessage = 'You are not authorized to access the specified route';
  
      /* Execute the function */
      const res = await request(app)
        .delete('/pantries')
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

    it('should return status 404 if no pantries to remove', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = { count: 0 };

      // Set any variables needed to be passed to controllers and or models

      // Mock any needed third party modules
      jest.spyOn(pantryModel, 'removeAll').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 404;
      const returnSuccess = false;
      const returnMessage = 'No pantries found to remove';

      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await pantriesController.removeAll(mockRequest, mockResponse, mockNext);

      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });

    });

    it('should return status 500 for any other error', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: false,
        message: 'There was a problem with the resource, please try again later'
      };

      // Set any variables needed to be passed to controllers and or models

      // Mock any needed third party modules
      jest.spyOn(pantryModel, 'removeAll').mockImplementation(() => {
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
      await pantriesController.removeAll(mockRequest, mockResponse, mockNext);

      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });

    });

  });

  describe('removeItems', () => {

    /*
    * Steps to run before and after this test suite
    */
    beforeEach(async () => {

    });

    afterEach(() => {
      jest.clearAllMocks();
    })

    it('should return status 200 and remove the selected pantries items', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: true,
        message: 'Record successfully removed'
      };

      // Set any variables needed to be passed to controllers and or models
      const pantryId = 1;

      // Mock any needed third party modules
      jest.spyOn(pantryIngredientsModel, 'removeByPantry').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 200;
      const returnSuccess = true;
      const returnMessage = 'All ingredients removed from the pantry';

      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .delete(`/pantries/${pantryId}`)
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

    it('should return status 401 if a non logged in user tries to access this resource', async () => {
  
      // Set Mocked data that models and controllers should return
      const modelreturnData = [];
  
      // Set any variables needed to be passed to controllers and or models
      const pantryId = 1;

      // Mock any needed third party modules
      jest.spyOn(pantryIngredientsModel, 'removeByPantry').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 401;
      const returnSuccess = false;
      const returnMessage = 'There are no pantries to list';

  
      /* Perform the test */
      const response = await request(app)
        .delete(`/pantries/${pantryId}`);

      /* Test everything works as expected */
      expect(response.status).toBe(returnStatus);
    
    });

    it('should return status 404 if the selected pantry has no entries to remove', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [];

      // Set any variables needed to be passed to controllers and or models
      const pantryId = 2;

      // Mock any needed third party modules
      jest.spyOn(pantryIngredientsModel, 'removeByPantry').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 404;
      const returnSuccess = false;
      const returnMessage = 'There are no ingredients to remove from the pantry';

      /* Mock Express request and response */
      const mockRequest = { params: { pantryId: pantryId }};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await pantriesController.removeItems(mockRequest, mockResponse, mockNext);

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

      // Mock any needed third party modules
      jest.spyOn(pantryIngredientsModel, 'removeByPantry').mockImplementation(() => {
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
      await pantriesController.removeItems(mockRequest, mockResponse, mockNext);

      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });

    });

    it('should return status 400 if request parameter pantryId is undefined', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [];

      // Set any variables needed to be passed to controllers and or models

      // Mock any needed third party modules
      jest.spyOn(pantryIngredientsModel, 'removeByPantry').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined pantryId';

      /* Mock Express request and response */
      const mockRequest = { params: { }};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await pantriesController.removeItems(mockRequest, mockResponse, mockNext);

      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });

    });

    it('should return status 500 if there is another problem with the resource', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: false,
        message: 'There was a problem with the resource, please try again later'
      };

      // Set any variables needed to be passed to controllers and or models
      const pantryId = 1;

      // Mock any needed third party modules
      jest.spyOn(pantryIngredientsModel, 'removeByPantry').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 500;
      const returnSuccess = false;
      const returnMessage = 'There was a problem with the resource, please try again later';

      /* Mock Express request and response */
      const mockRequest = { params: { pantryId: pantryId }};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await pantriesController.removeItems(mockRequest, mockResponse, mockNext);

      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });

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

    it('should return status 200 and successfully update the pantry', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: true,
        message: 'Record successfully updated'
      }

      // Set any variables needed to be passed to controllers and or models
      const id = 1;
      const payload = {
        pantryId: 1,
        ingredientId: 1,
        amount: 200,
        amount_type: 'grams'
      }

      // Mock any needed third party modules
      jest.spyOn(pantryIngredientsModel, 'update').mockImplementation(() => {
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
        .put(`/pantries/${id}`)
        .send(payload)
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

    it('should return status 401 if a non logged in user tries to access this resource', async () => {
  
      // Set Mocked data that models and controllers should return
      const modelreturnData = [];
  
       // Set any variables needed to be passed to controllers and or models
       const id = 1;
       const payload = {
         pantryId: 1,
         ingredientId: 1,
         amount: 200,
         amount_type: 'grams'
       }
 
       // Mock any needed third party modules
       jest.spyOn(pantryIngredientsModel, 'update').mockImplementation(() => {
         return modelReturnData;
       });

      // Set here the expected return values for the test
      const returnStatus = 401;
      const returnSuccess = false;
      const returnMessage = 'There are no pantries to list';

  
      /* Perform the test */
      const response = await request(app)
        .put(`/pantries/${id}`)
        .send(payload);

      /* Test everything works as expected */
      expect(response.status).toBe(returnStatus);
    
    });

    it('should return status 404 if nothing to update', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [];

      // Set any variables needed to be passed to controllers and or models
      const id = 1;
      const payload = {
        pantryId: 1,
        ingredientId: 1,
        amount: 200,
        amount_type: 'grams'
      }

      // Mock any needed third party modules
      jest.spyOn(pantryIngredientsModel, 'update').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 404;
      const returnSuccess = false;
      const returnMessage = 'There was no pantry to update';

      /* Mock Express request and response */
      const mockRequest = {
        params: {
          id: id
        },
        body: {
          pantryId: payload.pantryId,
          ingredientId: payload.ingredientId,
          amount: payload.amount,
          amount_type: payload.amount_type
        }
      };

      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await pantriesController.update(mockRequest, mockResponse, mockNext);

      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });
      
    });

    it('should return status 400 if request params are undefined', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [];

      // Set any variables needed to be passed to controllers and or models
      const id = 1;
      const payload = {
        pantryId: 1,
        ingredientId: 1,
        amount: 200,
        amount_type: 'grams'
      }

      // Mock any needed third party modules
      jest.spyOn(pantryIngredientsModel, 'update').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined request parameters';

      /* Mock Express request and response */
      const mockRequest = {
        body: {
          pantryId: payload.pantryId,
          ingredientId: payload.ingredientId,
          amount: payload.amount,
          amount_type: payload.amount_type
        }
      };

      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await pantriesController.update(mockRequest, mockResponse, mockNext);

      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });

    });

    it('should return status 400 if request id is undefined', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [];

      // Set any variables needed to be passed to controllers and or models
      const id = 1;
      const payload = {
        pantryId: 1,
        ingredientId: 1,
        amount: 200,
        amount_type: 'grams'
      }

      // Mock any needed third party modules
      jest.spyOn(pantryIngredientsModel, 'update').mockImplementation(() => {
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
          pantryId: payload.pantryId,
          ingredientId: payload.ingredientId,
          amount: payload.amount,
          amount_type: payload.amount_type
        }
      };

      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await pantriesController.update(mockRequest, mockResponse, mockNext);

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
      const id = 1;
      const payload = {
        pantryId: 1,
        ingredientId: 1,
        amount: 200,
        amount_type: 'grams'
      }

      // Mock any needed third party modules
      jest.spyOn(pantryIngredientsModel, 'update').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined request body';

      /* Mock Express request and response */
      const mockRequest = {
        params: {
          id: id
        },
      };

      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await pantriesController.update(mockRequest, mockResponse, mockNext);

      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });

    });

    it('should return status 400 if request body pantryId undefined', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [];

      // Set any variables needed to be passed to controllers and or models
      const id = 1;
      const payload = {
        pantryId: 1,
        ingredientId: 1,
        amount: 200,
        amount_type: 'grams'
      }

      // Mock any needed third party modules
      jest.spyOn(pantryIngredientsModel, 'update').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined pantryId';

      /* Mock Express request and response */
      const mockRequest = {
        params: {
          id: id
        },
        body: {
          ingredientId: payload.ingredientId,
          amount: payload.amount,
          amount_type: payload.amount_type
        }
      };

      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await pantriesController.update(mockRequest, mockResponse, mockNext);

      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });

    });

    it('should return status 400 if request body ingredientId is undefined', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [];

      // Set any variables needed to be passed to controllers and or models
      const id = 1;
      const payload = {
        pantryId: 1,
        ingredientId: 1,
        amount: 200,
        amount_type: 'grams'
      }

      // Mock any needed third party modules
      jest.spyOn(pantryIngredientsModel, 'update').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined ingredientId';

      /* Mock Express request and response */
      const mockRequest = {
        params: {
          id: id
        },
        body: {
          pantryId: payload.pantryId,
          amount: payload.amount,
          amount_type: payload.amount_type
        }
      };

      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await pantriesController.update(mockRequest, mockResponse, mockNext);

      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });

    });

    it('should return status 400 if request body amount defined', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [];

      // Set any variables needed to be passed to controllers and or models
      const id = 1;
      const payload = {
        pantryId: 1,
        ingredientId: 1,
        amount: 200,
        amount_type: 'grams'
      }

      // Mock any needed third party modules
      jest.spyOn(pantryIngredientsModel, 'update').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined amount';

      /* Mock Express request and response */
      const mockRequest = {
        params: {
          id: id
        },
        body: {
          pantryId: payload.pantryId,
          ingredientId: payload.ingredientId,
          amount_type: payload.amount_type
        }
      };

      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await pantriesController.update(mockRequest, mockResponse, mockNext);

      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });

    });

    it('should return status 400 if request body amount_type is undefined', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [];

      // Set any variables needed to be passed to controllers and or models
      const id = 1;
      const payload = {
        pantryId: 1,
        ingredientId: 1,
        amount: 200,
        amount_type: 'grams'
      }

      // Mock any needed third party modules
      jest.spyOn(pantryIngredientsModel, 'update').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined amount_type';

      /* Mock Express request and response */
      const mockRequest = {
        params: {
          id: id
        },
        body: {
          pantryId: payload.pantryId,
          ingredientId: payload.ingredientId,
          amount: payload.amount,
        }
      };

      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await pantriesController.update(mockRequest, mockResponse, mockNext);

      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });

    });

    it('should return status 500 if any other problems are encountered', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: false,
        message: 'There was a problem with the resource, please try again later'
      };

      // Set any variables needed to be passed to controllers and or models
      const id = 1;
      const payload = {
        pantryId: 1,
        ingredientId: 1,
        amount: 200,
        amount_type: 'grams'
      }

      // Mock any needed third party modules
      jest.spyOn(pantryIngredientsModel, 'update').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 500;
      const returnSuccess = false;
      const returnMessage = 'There was a problem with the resource, please try again later';

      /* Mock Express request and response */
      const mockRequest = {
        params: {
          id: id
        },
        body: {
          pantryId: payload.pantryId,
          ingredientId: payload.ingredientId,
          amount: payload.amount,
          amount_type: payload.amount_type
        }
      };

      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await pantriesController.update(mockRequest, mockResponse, mockNext);

      /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });

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