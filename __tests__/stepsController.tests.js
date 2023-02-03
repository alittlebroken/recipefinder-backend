/* Modules required for the tests */

const request = require('supertest');
const app = require('../index.js');

const stepModel = require('../models/stepModel');
const userModel = require('../models/userModel');

describe('stepsController', () => {

  beforeEach(async () => {
    user = {
      id: 1,
      email: 'admin@localhost',
      forename: 'Site',
      surname: 'Administrator',
      roles: 'Admin'
    }
   
     /* User used to trigger a failed authorised middleware check */
    failUser = {
      id: 2,
      email: 'failed@localhost',
      forename: 'Failed',
      surname: 'User',
      roles: 'Sales'
    }

    const goodToken = await userModel.generateTokens({ user });
    const badToken = await userModel.generateTokens({ user: failUser});

    authToken = goodToken.accessToken;
    failToken = badToken.accessToken;

    goodRefreshToken = goodToken.refreshToken
    badRefreshToken = badToken.refreshToken
  });

  describe('find', () => {

    /*
     * Steps to run before and after this test suite
     */
    beforeEach(async () => {
      
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return status 200 and all available steps', async () => {
  
      // Set Mocked data that models and controllers should return
        const modelReturnData = [
            {
                id: 1,
                recipeId: 12,
                stepNo: 1,
                content: 'Mix dry ingredients together into a bowl'
            }
        ];

      // Set any variables needed to be passed to controllers and or models
  
      // Mock any needed third party modules
      jest.spyOn(stepModel, 'findAll').mockImplementation(() => {
        return modelReturnData;
      });
  
      // Set here the expected return values for the test
      const returnStatus = 200;

  
      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
       .get('/steps/')
       .set('Authorization', `Bearer ${authToken}`);

      /* Test everything works as expected */
      expect(response.status).toBe(returnStatus);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(1);
  
    });

    it('should return status 401 if a non logged in user tries to access this resource', async () => {
  
      // Set Mocked data that models and controllers should return
        const modelReturnData = [
            {
                id: 1,
                recipeId: 12,
                stepNo: 1,
                content: 'Mix dry ingredients together into a bowl'
            }
        ];

      // Set any variables needed to be passed to controllers and or models
  
      // Mock any needed third party modules
      jest.spyOn(stepModel, 'findAll').mockImplementation(() => {
        return modelReturnData;
      });
  
      // Set here the expected return values for the test
      const returnStatus = 401;
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
       .get('/steps/');

      /* Test everything works as expected */
      expect(response.status).toBe(returnStatus);
  
    });

    it('should return status 403 if a unauthorised users tries to use this resource', async () => {

      // Set Mocked data that models and controllers should return
      const modelreturnData = [];
    
      // Set Mocked data that models and controllers should return
      
      // Mock any needed third party modules

      jest.spyOn(userModel, 'findById').mockImplementationOnce(() => {
        return [failUser]
      })

      jest.spyOn(stepModel, 'findAll').mockImplementation(() => {
        return modelReturnData;
      });
  
      // Set here the expected return values for the test
      const returnStatus = 403;
      const returnSuccess = false;
      const returnMessage = 'You are not authorized to access the specified route';
  
      /* Execute the function */
      const res = await request(app)
        .get('/steps/')
        .set('Authorization', `Bearer ${failToken}`)
        .set('Cookie', `jwt=${badRefreshToken}`)
  
      /* Test everything works as expected */
      expect(res.status).toEqual(returnStatus);
  
      expect(typeof res.body).toBe('object');
      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
  
      expect(res.body.status).toEqual(returnStatus);
      expect(res.body.success).toEqual(returnSuccess);
      expect(res.body.message).toEqual(returnMessage);
  
    });

    it('should return status 404 and and empty list if there are no steps', async () => {
    
        // Set Mocked data that models and controllers should return
        const modelReturnData = [];

        // Set any variables needed to be passed to controllers and or models

        // Mock any needed third party modules
        jest.spyOn(stepModel, 'findAll').mockImplementation(() => {
            return modelReturnData;
        });

        // Set here the expected return values for the test
        const returnStatus = 404;
        const returnSuccess = false;
        const returnMessage = 'No steps were found';

        /* Mock Express request and response */
        const mockRequest = {};
        const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const mockNext = jest.fn();

        /* Execute the function */
        const response = await request(app)
          .get('/steps/')
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

    it('should return status 500 if the resource encounters a generic error', async () => {
    
        // Set Mocked data that models and controllers should return
        const modelReturnData = {
            success: false,
            message: 'There was a problem with the resource, please try again later'
        };

        // Set any variables needed to be passed to controllers and or models

        // Mock any needed third party modules
        jest.spyOn(stepModel, 'findAll').mockImplementation(() => {
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
        const response = await request(app)
          .get('/steps/')
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

  describe('findById', () => {

      /*
      * Steps to run before and after this test suite
      */
      beforeEach(async () => {
      
      });
    
      afterEach(() => {
        jest.clearAllMocks();
      });
    
      it('should return status 200 and the matching step', async () => {
    
        // Set Mocked data that models and controllers should return
          const modelReturnData = [
              {
                  id: 1,
                  recipeId: 12,
                  stepNo: 1,
                  content: 'Mix dry ingredients together into a bowl'
              }
          ];

        // Set any variables needed to be passed to controllers and or models
        const stepId = 1;

        // Mock any needed third party modules
        jest.spyOn(stepModel, 'findById').mockImplementation(() => {
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
        .get(`/steps/${stepId}`)
        .set('Authorization', `Bearer ${authToken}`);

        /* Test everything works as expected */
        expect(response.status).toBe(returnStatus);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(1);
    
      });

      it('should return status 401 if a non logged in user tries to access this resource', async () => {
    
        // Set Mocked data that models and controllers should return
          const modelReturnData = [
              {
                  id: 1,
                  recipeId: 12,
                  stepNo: 1,
                  content: 'Mix dry ingredients together into a bowl'
              }
          ];

        // Set any variables needed to be passed to controllers and or models
        const stepId = 1;

        // Mock any needed third party modules
        jest.spyOn(stepModel, 'findById').mockImplementation(() => {
          return modelReturnData;
        });
    
        // Set here the expected return values for the test
        const returnStatus = 401;
    
        /* Mock Express request and response */
        const mockRequest = {};
        const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const mockNext = jest.fn();

        /* Execute the function */
        const response = await request(app)
        .get(`/steps/${stepId}`);

        /* Test everything works as expected */
        expect(response.status).toBe(returnStatus);
    
      });

      it('should return status 404 and and empty list if there are no steps', async () => {
      
          // Set Mocked data that models and controllers should return
          const modelReturnData = [];

          // Set any variables needed to be passed to controllers and or models
          const stepId = 12;

          // Mock any needed third party modules
          jest.spyOn(stepModel, 'findById').mockImplementation(() => {
              return modelReturnData;
          });

          // Set here the expected return values for the test
          const returnStatus = 404;
          const returnSuccess = false;
          const returnMessage = 'No steps were found';

          /* Mock Express request and response */
          const mockRequest = { params: { id: stepId} };
          const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
          const mockNext = jest.fn();

          /* Execute the function */
        const response = await request(app)
        .get(`/steps/${stepId}`)
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

      it('should return status 400 if the request parameter id is undefined', async () => {
      
        // Set Mocked data that models and controllers should return
        const modelReturnData = [];

        // Set any variables needed to be passed to controllers and or models
        let stepId;

        // Mock any needed third party modules
        jest.spyOn(stepModel, 'findById').mockImplementation(() => {
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
        const response = await request(app)
        .get(`/steps/${stepId}`)
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

      it('should return status 500 if the resource encounters a generic error', async () => {
      
          // Set Mocked data that models and controllers should return
          const modelReturnData = {
              success: false,
              message: 'There was a problem with the resource, please try again later'
          };

          // Set any variables needed to be passed to controllers and or models
          const stepId = 1;

          // Mock any needed third party modules
          jest.spyOn(stepModel, 'findById').mockImplementation(() => {
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
        const response = await request(app)
        .get(`/steps/${stepId}`)
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

    it('should return status 200 and the id of the new step', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [
        {
          id: 2
        }
      ];

      // Set any variables needed to be passed to controllers and or models
      const recipeId = 1;
      const stepNo = 1;
      const stepContent = 'Combine dry and wet ingredients together in the bowl';
      
      // Mock any needed third party modules
      jest.spyOn(stepModel, 'create').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 200;
      const returnBody = [{ id: 2}];

      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/steps/')
        .send({
          recipeId: recipeId,
          stepNo: stepNo,
          content: stepContent
        })
        .set('Authorization', `Bearer ${authToken}`)

      /* Test everything works as expected */
      expect(response.status).toEqual(returnStatus);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toEqual(returnBody);

    });

    it('should return status 401 if a non logged in user tries to access this resource', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [
        {
          id: 2
        }
      ];

      // Set any variables needed to be passed to controllers and or models
      const recipeId = 1;
      const stepNo = 1;
      const stepContent = 'Combine dry and wet ingredients together in the bowl';
      
      // Mock any needed third party modules
      jest.spyOn(stepModel, 'create').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 401;
      const returnBody = [{ id: 2}];

      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/steps/')
        .send({
          recipeId: recipeId,
          stepNo: stepNo,
          content: stepContent
        })
        

      /* Test everything works as expected */
      expect(response.status).toEqual(returnStatus);


    });

    it('should return status 400 if request body recipeId is undefined', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [];

      // Set any variables needed to be passed to controllers and or models
      const stepId = 1;
      const stepNo = 1;
      const stepContent = 'Mix the dry ingredients together in a bowl';

      // Mock any needed third party modules
      jest.spyOn(stepModel, 'create').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const mockMessage = {
        status: 400,
        success: false,
        message: 'Undefined recipeId'
      }

      /* Mock Express request and response */
      const mockRequest = { body: { stepNo: stepNo, content: stepContent } };
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/steps/')
        .send({
          
          stepNo: stepNo,
          content: stepContent
        })
        .set('Authorization', `Bearer ${authToken}`)

      /* Test everything works as expected */
      expect(response.status).toEqual(400);

      expect(typeof response.body.status).toBe('number');
      expect(typeof response.body.success).toBe('boolean');
      expect(typeof response.body.message).toBe('string');

      expect(response.body.status).toEqual(mockMessage.status);
      expect(response.body.success).toEqual(mockMessage.success);
      expect(response.body.message).toEqual(mockMessage.message);

    });

    it('should return status 400 if request body stepNo is undefined', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [];

      // Set any variables needed to be passed to controllers and or models
      const recipeId = 1;
      const stepNo = 1;
      const stepContent = 'Cream together the sugar and butter';

      // Mock any needed third party modules
      jest.spyOn(stepModel, 'create').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const nextMessage = {
        status: 400,
        success: false,
        message: 'Undefined stepNo'
      }

      /* Mock Express request and response */
      const mockRequest = { body: { recipeId: recipeId, content: stepContent }};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/steps/')
        .send({
          recipeId: recipeId,
          
          content: stepContent
        })
        .set('Authorization', `Bearer ${authToken}`)

      /* Test everything works as expected */
      expect(response.status).toEqual(400);

      expect(typeof response.body.status).toBe('number');
      expect(typeof response.body.success).toBe('boolean');
      expect(typeof response.body.message).toBe('string');

      expect(response.body.status).toEqual(nextMessage.status);
      expect(response.body.success).toEqual(nextMessage.success);
      expect(response.body.message).toEqual(nextMessage.message);

    });

    it('should return status 400 if request body content is undefined', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [];

      // Set any variables needed to be passed to controllers and or models
      const recipeId = 1;
      const stepNo = 1;
      const stepcontent = 'Seperate the whites from 4 eggs';

      // Mock any needed third party modules
      jest.spyOn(stepModel, 'create').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const nextMessage = {
        status: 400,
        success: false,
        message: 'Undefined content'
      };

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/steps/')
        .send({
          recipeId: recipeId,
          stepNo: stepNo,
        })
        .set('Authorization', `Bearer ${authToken}`)

      /* Test everything works as expected */
      expect(response.status).toEqual(400);

      expect(typeof response.body.status).toBe('number');
      expect(typeof response.body.success).toBe('boolean');
      expect(typeof response.body.message).toBe('string');

      expect(response.body.status).toEqual(nextMessage.status);
      expect(response.body.success).toEqual(nextMessage.success);
      expect(response.body.message).toEqual(nextMessage.message);

    });

    it('should return status 500 if resource encounters an unexpected issue', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: false,
        message: 'There was a problem with the resource, please try again later'
      };

      // Set any variables needed to be passed to controllers and or models
      const recipeId = 1;
      const stepNo = 1;
      const stepContent = 'Crack 4 eggs into a bowl with the dry ingredients';

      // Mock any needed third party modules
      jest.spyOn(stepModel, 'create').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const nextMessage = {
        status: 500,
        success: modelReturnData.success,
        message: modelReturnData.message
      };

      /* Mock Express request and response */
      const mockRequest = { body: { recipeId: recipeId, stepNo: stepNo, content: stepContent } };
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/steps/')
        .send({
          recipeId: recipeId,
          stepNo: stepNo,
          content: stepContent
        })
        .set('Authorization', `Bearer ${authToken}`)

      /* Test everything works as expected */
      expect(response.status).toEqual(500);

      expect(typeof response.body.status).toBe('number');
      expect(typeof response.body.success).toBe('boolean');
      expect(typeof response.body.message).toBe('string');

      expect(response.body.status).toEqual(nextMessage.status);
      expect(response.body.success).toEqual(nextMessage.success);
      expect(response.body.message).toEqual(nextMessage.message);

    });

  });

  describe('removeById', () => {

    /*
    * Steps to run before and after this test suite
    */
    beforeEach(async () => {
      
    });

    afterEach(() => {
      jest.clearAllMocks();
    })

    it('should return status 200 and remove all steps', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = 12;

      // Set any variables needed to be passed to controllers and or models
      const recipeId = 1;

      // Mock any needed third party modules
      jest.spyOn(stepModel, 'removeAllByRecipe').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 200;
      const returnSuccess = true;
      const returnMessage = 'Step(s) successfully removed';

      /* Mock Express request and response */
      const mockRequest = { params: { recipeId: recipeId }};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .delete(`/steps/${recipeId}`)
        .set('Authorization', `Bearer ${authToken}`);

      /* Test everything works as expected */
      expect(response.status).toEqual(returnStatus);
      expect(typeof response.body).toBe('number');
      expect(response.body).toEqual(12);

    });

    it('should return status 401 if a non logged in user tries to access this resource', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = 12;

      // Set any variables needed to be passed to controllers and or models
      const recipeId = 1;

      // Mock any needed third party modules
      jest.spyOn(stepModel, 'removeAllByRecipe').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 401;
      const returnSuccess = true;
      const returnMessage = 'Step(s) successfully removed';

      /* Mock Express request and response */
      const mockRequest = { params: { recipeId: recipeId }};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .delete(`/steps/${recipeId}`)
        ;

      /* Test everything works as expected */
      expect(response.status).toEqual(returnStatus);
      

    });

    it('should return status 404 if no steps to remove', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = { count: 0 };

      // Set any variables needed to be passed to controllers and or models
      const recipeId = 1;

      // Mock any needed third party modules
      jest.spyOn(stepModel, 'removeAllByRecipe').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 404;
      const returnMessage = {
        status: 404,
        success: false,
        message: 'There are no steps to remove'
      }

      /* Mock Express request and response */
      const mockRequest = { params: { id: recipeId } };
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .delete(`/steps/${recipeId}`)
        .set('Authorization', `Bearer ${authToken}`);

      /* Test everything works as expected */
      expect(response.status).toEqual(returnStatus);

      expect(typeof response.body.status).toBe('number');
      expect(typeof response.body.success).toBe('boolean');
      expect(typeof response.body.message).toBe('string');

      expect(response.body.status).toEqual(returnMessage.status);
      expect(response.body.success).toEqual(returnMessage.success);
      expect(response.body.message).toEqual(returnMessage.message);

    });

    it('should return status 400 if request id is undefined', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [];

      // Set any variables needed to be passed to controllers and or models
      let recipeId;

      // Mock any needed third party modules
      jest.spyOn(stepModel, 'removeAllByRecipe').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 400;
      const nextMessage = {
        status: returnStatus,
        success: false,
        message: 'Undefined recipeId'
      }

      /* Mock Express request and response */
      const mockRequest = { params: {} };
      const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .delete(`/steps/${recipeId}`)
        .set('Authorization', `Bearer ${authToken}`);

      /* Test everything works as expected */
      expect(response.status).toEqual(returnStatus);

      expect(typeof response.body.status).toBe('number');
      expect(typeof response.body.success).toBe('boolean');
      expect(typeof response.body.message).toBe('string');

      expect(response.body.status).toEqual(nextMessage.status);
      expect(response.body.success).toEqual(nextMessage.success);
      expect(response.body.message).toEqual(nextMessage.message);

    });

    it('should return status 500 if the resource encountered another error', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: false,
        message: 'There was a problem with the resouce, please try again later'
      };

      // Set any variables needed to be passed to controllers and or models
      const recipeId = 1;

      // Mock any needed third party modules
      jest.spyOn(stepModel, 'removeAllByRecipe').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 500;
      const nextMessage = {
        status: returnStatus,
        success: false,
        message: 'There was a problem with the resource, please try again later'
      }

      /* Mock Express request and response */
      const mockRequest = { params: { id: recipeId }};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .delete(`/steps/${recipeId}`)
        .set('Authorization', `Bearer ${authToken}`);

      /* Test everything works as expected */
      expect(response.status).toEqual(returnStatus);

      expect(typeof response.body.status).toBe('number');
      expect(typeof response.body.success).toBe('boolean');
      expect(typeof response.body.message).toBe('string');

      expect(response.body.status).toEqual(nextMessage.status);
      expect(response.body.success).toEqual(nextMessage.success);
      expect(response.body.message).toEqual(nextMessage.message);

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

    it('should return status 200 and remove all steps from the system', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = { count: 35 };

      // Set any variables needed to be passed to controllers and or models

      // Mock any needed third party modules
      jest.spyOn(stepModel, 'removeAll').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 200;
      const returnMessage = {
        status: returnStatus,
        success: true,
        message: `Successfully removed ${modelReturnData.count} steps`
      }

      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .delete('/steps/')
        .set('Authorization', `Bearer ${authToken}`);

      /* Test everything works as expected */
      expect(response.status).toEqual(returnStatus);

      expect(typeof response.body).toBe('object');
      expect(typeof response.body.status).toBe('number');
      expect(typeof response.body.success).toBe('boolean');
      expect(typeof response.body.message).toBe('string');

      expect(response.body.status).toEqual(returnStatus);
      expect(response.body.success).toEqual(returnMessage.success);
      expect(response.body.message).toEqual(returnMessage.message);

    });

    it('should return status 401 if a non logged in user tries to access this resource', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = { count: 35 };

      // Set any variables needed to be passed to controllers and or models

      // Mock any needed third party modules
      jest.spyOn(stepModel, 'removeAll').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 401;
      const returnMessage = {
        status: returnStatus,
        success: true,
        message: `Successfully removed ${modelReturnData.count} steps`
      }

      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .delete('/steps/');

      /* Test everything works as expected */
      expect(response.status).toEqual(returnStatus);

    });

    it('should return status 403 if a unauthorised users tries to use this resource', async () => {

      // Set Mocked data that models and controllers should return
      const modelreturnData = [];
    
      // Set Mocked data that models and controllers should return
      
      // Mock any needed third party modules
      jest.spyOn(userModel, 'findById').mockImplementationOnce(() => {
        return [failUser]
      })

      jest.spyOn(stepModel, 'removeAll').mockImplementation(() => {
        return modelReturnData;
      });
  
      // Set here the expected return values for the test
      const returnStatus = 403;
      const returnSuccess = false;
      const returnMessage = 'You are not authorized to access the specified route';
  
      /* Execute the function */
      const res = await request(app)
        .delete('/steps/')
        .set('Authorization', `Bearer ${failToken}`)
        .set('Cookie', `jwt=${badRefreshToken}`)
  
      /* Test everything works as expected */
      expect(res.status).toEqual(returnStatus);
  
      expect(typeof res.body).toBe('object');
      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
  
      expect(res.body.status).toEqual(returnStatus);
      expect(res.body.success).toEqual(returnSuccess);
      expect(res.body.message).toEqual(returnMessage);
  
    });

    it('should return status 404 if there were no steps to be found', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        count: 0
      }

      // Set any variables needed to be passed to controllers and or models

      // Mock any needed third party modules
      jest.spyOn(stepModel, 'removeAll').mockImplementation(() => {
        return modelReturnData;
      })

      // Set here the expected return values for the test
      const returnStatus = 404;
      const returnSuccess = false;
      const returnMessage = 'There are no steps to remove';
      
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .delete('/steps/')
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

    it('should return status 500 if the resource encounters a generic error', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: false,
        message: 'There was an issue with the resource, please try again later'
      }

      // Set any variables needed to be passed to controllers and or models

      // Mock any needed third party modules
      jest.spyOn(stepModel, 'removeAll').mockImplementation(() => {
        return modelReturnData;
      })

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
      const response = await request(app)
        .delete('/steps/')
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

  describe('update', () => {

    /*
    * Steps to run before and after this test suite
    */
    beforeEach(async () => {
    
    });

    afterEach(() => {
      jest.clearAllMocks();
    })

    it('should return status 200 after updating the specified step', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: true,
        message: 'Step updated successfully'
      }

      // Set any variables needed to be passed to controllers and or models
      const stepId = 1;
      const recipeId = 1;
      const updatedStepNo = 2;
      const updatedContent = 'Boil 4 eggs';

      // Mock any needed third party modules
      jest.spyOn(stepModel, 'update').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 200;
      const returnMessage = {
        status: returnStatus,
        success: true,
        message: 'Step successfully updated'
      };

      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .put(`/steps/${stepId}`)
        .send({
          recipeId: recipeId,
          stepNo: updatedStepNo,
          content: updatedContent
        })
        .set('Authorization', `Bearer ${authToken}`);

      /* Test everything works as expected */
      expect(response.status).toBe(returnStatus);

      expect(typeof response.body).toBe('object');
      expect(typeof response.body.status).toBe('number');
      expect(typeof response.body.success).toBe('boolean');
      expect(typeof response.body.message).toBe('string');

      expect(response.body.status).toEqual(returnStatus);
      expect(response.body.success).toEqual(returnMessage.success);
      expect(response.body.message).toEqual(returnMessage.message);

    });

    it('should return status 401 if a non logged in user tries to access this resource', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: true,
        message: 'Step updated successfully'
      }

      // Set any variables needed to be passed to controllers and or models
      const stepId = 1;
      const recipeId = 1;
      const updatedStepNo = 2;
      const updatedContent = 'Boil 4 eggs';

      // Mock any needed third party modules
      jest.spyOn(stepModel, 'update').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 401;
      const returnMessage = {
        status: returnStatus,
        success: true,
        message: 'Step successfully updated'
      };

      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .put(`/steps/${stepId}`)
        .send({
          recipeId: recipeId,
          stepNo: updatedStepNo,
          content: updatedContent
        })
        ;

      /* Test everything works as expected */
      expect(response.status).toBe(returnStatus);
      

    });

    it('should return status 404 if there are no records to update', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [];

      // Set any variables needed to be passed to controllers and or models
      const stepId = 2908764;
      const recipeId = 2;
      const updatedStepNo = 2;
      const updatedContent = 'Boil 4 eggs';

      // Mock any needed third party modules
      jest.spyOn(stepModel, 'update').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 404;
      const returnMessage = {
        status: returnStatus,
        success: false,
        message: 'No steps found to update'
      };

      /* Mock Express request and response */
      const mockRequest = {
        params: { id: stepId},
        body: {
          recipeId: recipeId,
          stepNo: updatedStepNo,
          content: updatedContent
        }
      };
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .put(`/steps/${stepId}`)
        .send({
          recipeId: recipeId,
          stepNo: updatedStepNo,
          content: updatedContent
        })
        .set('Authorization', `Bearer ${authToken}`);

      /* Test everything works as expected */
      expect(response.status).toBe(returnStatus);

      expect(typeof response.body).toBe('object');
      expect(typeof response.body.status).toBe('number');
      expect(typeof response.body.success).toBe('boolean');
      expect(typeof response.body.message).toBe('string');
      
      expect(response.body.status).toEqual(returnStatus);
      expect(response.body.success).toEqual(returnMessage.success);
      expect(response.body.message).toEqual(returnMessage.message);

    });

    it('should return status 400 if request param stepId undefined', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [];

      // Set any variables needed to be passed to controllers and or models
      let stepId;
      const recipeId = 1;
      const stepNo = 1;
      const content = 'Sift the gluten free flour into a heavy bowl'

      // Mock any needed third party modules
      jest.spyOn(stepModel, 'update').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined stepId';


      /* Mock Express request and response */
      const mockRequest = {
        params: {
          
        },
        body: {
          recipeId: recipeId,
          stepNo: stepNo,
          content: content
        }
      };
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .put(`/steps/${stepId}`)
        .send({
          recipeId: recipeId,
          stepNo: stepNo,
          content: content
        })
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

    it('should return status 400 if request param recipeId undefined', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [];

      // Set any variables needed to be passed to controllers and or models
      const stepId = 1;
      const recipeId = 1;
      const stepNo = 1;
      const content = 'Sift the gluten free flour into a heavy bowl'

      // Mock any needed third party modules
      jest.spyOn(stepModel, 'update').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined recipeId';


      /* Mock Express request and response */
      const mockRequest = {
        params: {
          id: stepId
        },
        body: {
          stepNo: stepNo,
          content: content
        }
      };
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .put(`/steps/${stepId}`)
        .send({
          stepNo: stepNo,
          content: content
        })
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

    it('should return status 400 if request param stepNo undefined', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [];

      // Set any variables needed to be passed to controllers and or models
      const stepId = 1;
      const recipeId = 1;
      const stepNo = 1;
      const content = 'Sift the gluten free flour into a heavy bowl'

      // Mock any needed third party modules
      jest.spyOn(stepModel, 'update').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined stepNo';


      /* Mock Express request and response */
      const mockRequest = {
        params: {
          id: stepId
        },
        body: {
          recipeId: recipeId,
          content: content
        }
      };
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .put(`/steps/${stepId}`)
        .send({
          recipeId: recipeId,
        
          content: content
        })
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

    it('should return status 400 if request param content undefined', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = [];

      // Set any variables needed to be passed to controllers and or models
      const stepId = 1;
      const recipeId = 1;
      const stepNo = 1;
      const content = 'Sift the gluten free flour into a heavy bowl'

      // Mock any needed third party modules
      jest.spyOn(stepModel, 'update').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined content';


      /* Mock Express request and response */
      const mockRequest = {
        params: {
          id: stepId
        },
        body: {
          recipeId: recipeId,
          stepNo: stepNo,
        }
      };
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .put(`/steps/${stepId}`)
        .send({
          recipeId: recipeId,
          stepNo: stepNo,
          
        })
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

    it('should return status 500 if the resource encounters a generic error', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: false,
        message: 'There was a problem with the resource, please try again later'
      };

      // Set any variables needed to be passed to controllers and or models
      const stepId = 1;
      const recipeId = 1;
      const stepNo = 1;
      const content = 'Sift the gluten free flour into a heavy bowl'

      // Mock any needed third party modules
      jest.spyOn(stepModel, 'update').mockImplementation(() => {
        return modelReturnData;
      });

      // Set here the expected return values for the test
      const returnStatus = 500;
      const returnSuccess = modelReturnData.success;
      const returnMessage = modelReturnData.message;

      /* Mock Express request and response */
      const mockRequest = {
        params: {
          id: stepId
        },
        body: {
          recipeId: recipeId,
          stepNo: stepNo,
          content: content
        }
      };
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .put(`/steps/${stepId}`)
        .send({
          recipeId: recipeId,
          stepNo: stepNo,
          content: content
        })
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

})



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
        roles: 'Admin'
      }
     
       /* User used to trigger a failed authorised middleware check */
      failUser = {
        id: 2,
        email: 'failed@localhost',
        forename: 'Failed',
        surname: 'User',
        roles: 'Sales'
      }
  
      const goodToken = await userModel.generateTokens({ user });
      const badToken = await userModel.generateTokens({ user: failUser});
  
      authToken = goodToken.accessToken;
      failToken = badToken.accessToken;
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