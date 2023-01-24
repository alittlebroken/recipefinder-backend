/* Modules required for the tests */
require('dotenv').config();

const request = require('supertest');
const app = require('../index.js');

const authController = require('../controllers/authController');
const userModel = require('../models/userModel');

const passport = require('passport');

describe('authController.loginUser', () => {

    /*
     * Steps to run before and after this test suite
     */
    beforeEach(async () => {
      // Create a new set of env vars for the tests
      req = {};
      mockResponse = () => {
        const response = {};
        response.status = jest.fn().mockReturnValue(response);
        response.json = jest.fn().mockReturnValue(response);
        return response;
      }
      res = mockResponse();
      next = jest.fn();
    })

    afterEach(() => {
      jest.clearAllMocks();
    })
  
    it('should return status 200 and a valid auth token', async () => {
  
      // Set Mocked data that models and controllers should return
      const passportError = null;
      const passportUser = { 
        user_id: 1,
        email: 'twallis@functionalmath.com',
        forename: 'Terry',
        surname: 'Wallis',
        roles: 'Customer'
      };
      const passportInfo = null;
      const passportOptions = { session: false };
      const authType = 'local-login';
      const returnToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEyLCJlbWFpbCI6InRkcmlsbGVyQGZhdXgubmV0IiwiZm9yZW5hbWUiOiJUaG9tYXMiLCJzdXJuYW1lIjoiRHJpbGxlciIsInJvbGVzIjoiQ3VzdG9tZXIifX0.ra6xjIjvPfh407KouCGq33BiN32unO9CF2tu2BXGwI4";
      const secretToken = process.env.JWT_TOKEN_SECRET;

      const returnStatus = 200;
      const returnSuccess = true;
      const returnBody = { token: returnToken };

      // Mock any needed third party modules
      passport.authenticate = jest.fn((authType, callback) => () => {
        callback(passportError, passportUser, passportInfo);
      });

      jest.spyOn(userModel, 'generateToken').mockImplementation(() => {
        return returnToken;
      });
  
      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/login')
        .send({
          username: 'twallis@functionalmath.com',
          password: 'someMothersDoAveEm'
        })
        .set('secret_token', secretToken);

      /* Test everything works as expected */
      expect(response.status).toEqual(returnStatus);
      expect(response.body).toEqual(returnBody);
      
    });

    it('should return status 400 if request body is undefined', async () => {
  
      // Mock the required request functions and properties

      req.get = jest.fn().mockReturnValue(process.env.JWT_TOKEN_SECRET);

      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined request body';

      // Set Mocked data that models and controllers should return
      const passportError = 'Specified user was not found';
      const passportUser = { id: 1, username: 'Terry'};
      const passportInfo = { message: 'user not found'};
      const authType = 'local-login';
  
      const returnToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEyLCJlbWFpbCI6InRkcmlsbGVyQGZhdXgubmV0IiwiZm9yZW5hbWUiOiJUaG9tYXMiLCJzdXJuYW1lIjoiRHJpbGxlciIsInJvbGVzIjoiQ3VzdG9tZXIifX0.ra6xjIjvPfh407KouCGq33BiN32unO9CF2tu2BXGwI4";

      const mockHeader = jest.fn().mockReturnValue('test-secret-token');

      // Mock any needed third party modules
      passport.authenticate = jest.fn((authType, callback) => () => {
        callback(passportError, passportUser, passportInfo);
      });
  
      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      await authController.loginUser(req, res, next);
  
      /* Test everything works as expected */
      expect(next).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });
    
    });

    it('should return status 400 if request body username is undefined', async () => {
  
        // Mock the required request functions and properties
        req.body = {
          password: 'letmein'
        }

        req.get = jest.fn().mockReturnValue(process.env.JWT_TOKEN_SECRET);

        const returnStatus = 400;
        const returnSuccess = false;
        const returnMessage = 'Undefined username';

        // Set Mocked data that models and controllers should return
        const passportError = 'Specified user was not found';
        const passportUser = { id: 1, username: 'Terry'};
        const passportInfo = { message: 'user not found'};
        const authType = 'local-login';
    
        const returnToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEyLCJlbWFpbCI6InRkcmlsbGVyQGZhdXgubmV0IiwiZm9yZW5hbWUiOiJUaG9tYXMiLCJzdXJuYW1lIjoiRHJpbGxlciIsInJvbGVzIjoiQ3VzdG9tZXIifX0.ra6xjIjvPfh407KouCGq33BiN32unO9CF2tu2BXGwI4";

        const mockHeader = jest.fn().mockReturnValue('test-secret-token');

        // Mock any needed third party modules
        passport.authenticate = jest.fn((authType, callback) => () => {
          callback(passportError, passportUser, passportInfo);
        });
    
        /* Execute the function */
        //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
        await authController.loginUser(req, res, next);
    
        /* Test everything works as expected */
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith({
          status: returnStatus,
          success: returnSuccess,
          message: returnMessage
        });
    
    });

    it('should return status 400 if request body username is of the wrong format', async () => {
  
        // Mock the required request functions and properties
        req.body = {
          username: 34527156,
          password: 'letmein'
        }

        req.get = jest.fn().mockReturnValue(process.env.JWT_TOKEN_SECRET);

        const returnStatus = 400;
        const returnSuccess = false;
        const returnMessage = 'Wrong format for username';

        // Set Mocked data that models and controllers should return
        const passportError = 'Specified user was not found';
        const passportUser = { id: 1, username: 'Terry'};
        const passportInfo = { message: 'user not found'};
        const authType = 'local-login';
    
        const returnToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEyLCJlbWFpbCI6InRkcmlsbGVyQGZhdXgubmV0IiwiZm9yZW5hbWUiOiJUaG9tYXMiLCJzdXJuYW1lIjoiRHJpbGxlciIsInJvbGVzIjoiQ3VzdG9tZXIifX0.ra6xjIjvPfh407KouCGq33BiN32unO9CF2tu2BXGwI4";

        const mockHeader = jest.fn().mockReturnValue('test-secret-token');

        // Mock any needed third party modules
        passport.authenticate = jest.fn((authType, callback) => () => {
          callback(passportError, passportUser, passportInfo);
        });
    
        /* Execute the function */
        //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
        await authController.loginUser(req, res, next);
    
        /* Test everything works as expected */
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith({
          status: returnStatus,
          success: returnSuccess,
          message: returnMessage
        });
    
    });

    it('should return status 400 if request body password is undefined', async () => {
  
        // Mock the required request functions and properties
        req.body = {
          username: 'terry',
        }

        req.get = jest.fn().mockReturnValue(process.env.JWT_TOKEN_SECRET);

        const returnStatus = 400;
        const returnSuccess = false;
        const returnMessage = 'Undefined password';

        // Set Mocked data that models and controllers should return
        const passportError = 'Specified user was not found';
        const passportUser = { id: 1, username: 'Terry'};
        const passportInfo = { message: 'user not found'};
        const authType = 'local-login';
    
        const returnToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEyLCJlbWFpbCI6InRkcmlsbGVyQGZhdXgubmV0IiwiZm9yZW5hbWUiOiJUaG9tYXMiLCJzdXJuYW1lIjoiRHJpbGxlciIsInJvbGVzIjoiQ3VzdG9tZXIifX0.ra6xjIjvPfh407KouCGq33BiN32unO9CF2tu2BXGwI4";

        const mockHeader = jest.fn().mockReturnValue('test-secret-token');

        // Mock any needed third party modules
        passport.authenticate = jest.fn((authType, callback) => () => {
          callback(passportError, passportUser, passportInfo);
        });
    
        /* Execute the function */
        //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
        await authController.loginUser(req, res, next);
    
        /* Test everything works as expected */
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith({
          status: returnStatus,
          success: returnSuccess,
          message: returnMessage
        });
    
    });

    it('should return status 400 if request body password is of the wrong format', async () => {
  
        // Mock the required request functions and properties
        req.body = {
          username: 'terry',
          password: 70
        }

        req.get = jest.fn().mockReturnValue(process.env.JWT_TOKEN_SECRET);

        const returnStatus = 400;
        const returnSuccess = false;
        const returnMessage = 'Wrong format for password';

        // Set Mocked data that models and controllers should return
        const passportError = 'Specified user was not found';
        const passportUser = { id: 1, username: 'Terry'};
        const passportInfo = { message: 'user not found'};
        const authType = 'local-login';
    
        const returnToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEyLCJlbWFpbCI6InRkcmlsbGVyQGZhdXgubmV0IiwiZm9yZW5hbWUiOiJUaG9tYXMiLCJzdXJuYW1lIjoiRHJpbGxlciIsInJvbGVzIjoiQ3VzdG9tZXIifX0.ra6xjIjvPfh407KouCGq33BiN32unO9CF2tu2BXGwI4";

        const mockHeader = jest.fn().mockReturnValue('test-secret-token');

        // Mock any needed third party modules
        passport.authenticate = jest.fn((authType, callback) => () => {
          callback(passportError, passportUser, passportInfo);
        });
    
        /* Execute the function */
        //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
        await authController.loginUser(req, res, next);
    
        /* Test everything works as expected */
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith({
          status: returnStatus,
          success: returnSuccess,
          message: returnMessage
        });
    
    });

    it('should return status 401 if secret_token is undefined', async () => {
  
        // Mock the required request functions and properties
        req.body = {
          username: 'terry',
          password: 'password'
        }

        req.get = jest.fn().mockReturnValue(false);

        const returnStatus = 401;
        const returnSuccess = false;
        const returnMessage = 'Undefined secret_token';

        // Set Mocked data that models and controllers should return
        const passportError = 'Specified user was not found';
        const passportUser = { id: 1, username: 'Terry'};
        const passportInfo = { message: 'user not found'};
        const authType = 'local-login';
    
        const returnToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEyLCJlbWFpbCI6InRkcmlsbGVyQGZhdXgubmV0IiwiZm9yZW5hbWUiOiJUaG9tYXMiLCJzdXJuYW1lIjoiRHJpbGxlciIsInJvbGVzIjoiQ3VzdG9tZXIifX0.ra6xjIjvPfh407KouCGq33BiN32unO9CF2tu2BXGwI4";

        const mockHeader = jest.fn().mockReturnValue('test-secret-token');

        // Mock any needed third party modules
        passport.authenticate = jest.fn((authType, callback) => () => {
          callback(passportError, passportUser, passportInfo);
        });
    
        /* Execute the function */
        //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
        await authController.loginUser(req, res, next);
    
        /* Test everything works as expected */
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith({
          status: returnStatus,
          success: returnSuccess,
          message: returnMessage
        });
    
    });

    
    it('should return status 401 if secret_token is incorrect', async () => {
  
        // Mock the required request functions and properties
        req.body = {
          username: 'terry',
          password: 'password'
        }

        req.get = jest.fn().mockReturnValue('secret');

        const returnStatus = 401;
        const returnSuccess = false;
        const returnMessage = 'Incorrect secret_token';

        // Set Mocked data that models and controllers should return
        const passportError = 'Specified user was not found';
        const passportUser = { id: 1, username: 'Terry'};
        const passportInfo = { message: 'user not found'};
        const authType = 'local-login';
    
        const returnToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEyLCJlbWFpbCI6InRkcmlsbGVyQGZhdXgubmV0IiwiZm9yZW5hbWUiOiJUaG9tYXMiLCJzdXJuYW1lIjoiRHJpbGxlciIsInJvbGVzIjoiQ3VzdG9tZXIifX0.ra6xjIjvPfh407KouCGq33BiN32unO9CF2tu2BXGwI4";

        const mockHeader = jest.fn().mockReturnValue('test-secret-token');

        // Mock any needed third party modules
        passport.authenticate = jest.fn((authType, callback) => () => {
          callback(passportError, passportUser, passportInfo);
        });
    
        /* Execute the function */
        //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
        await authController.loginUser(req, res, next);
    
        /* Test everything works as expected */
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith({
          status: returnStatus,
          success: returnSuccess,
          message: returnMessage
        });
    
    });
  

    it('should return status 404 if user does not match records', async () => { 
  
          // Mock the required request functions and properties
          req.body = {
            username: 'terry',
            password: 'password'
          }

          req.get = jest.fn().mockReturnValue(process.env.JWT_TOKEN_SECRET);

          const returnStatus = 404;
          const returnSuccess = false;
          const returnMessage = 'User not found';

          // Set Mocked data that models and controllers should return
          const passportError = 'Specified user was not found';
          const passportUser = { id: 1, username: 'Terry'};
          const passportInfo = { message: 'user not found'};
          const authType = 'local-login';
      
          const returnToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEyLCJlbWFpbCI6InRkcmlsbGVyQGZhdXgubmV0IiwiZm9yZW5hbWUiOiJUaG9tYXMiLCJzdXJuYW1lIjoiRHJpbGxlciIsInJvbGVzIjoiQ3VzdG9tZXIifX0.ra6xjIjvPfh407KouCGq33BiN32unO9CF2tu2BXGwI4";

          const mockHeader = jest.fn().mockReturnValue('test-secret-token');

          // Mock any needed third party modules
          passport.authenticate = jest.fn((authType, callback) => () => {
            callback(passportError, passportUser, passportInfo);
          });
      
          /* Execute the function */
          //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
          await authController.loginUser(req, res, next);
      
          /* Test everything works as expected */
          expect(next).toHaveBeenCalled();
          expect(next).toHaveBeenCalledWith({
            status: returnStatus,
            success: returnSuccess,
            message: returnMessage
          });
    });

    it('should return status 409 if users password is incorrect', async () => {
  
        // Mock the required request functions and properties
        req.body = {
          username: 'terry',
          password: 'password'
        }
        req.get = jest.fn().mockReturnValue(process.env.JWT_TOKEN_SECRET);

        const returnStatus = 409;
        const returnSuccess = false;
        const returnMessage = 'Specified password is incorrect';

        // Set Mocked data that models and controllers should return
        const passportError = 'Specified password is incorrect';
        const passportUser = null;
        const passportInfo = { message: 'Wrong password'};
        const authType = 'local-login';
    
        const returnToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEyLCJlbWFpbCI6InRkcmlsbGVyQGZhdXgubmV0IiwiZm9yZW5hbWUiOiJUaG9tYXMiLCJzdXJuYW1lIjoiRHJpbGxlciIsInJvbGVzIjoiQ3VzdG9tZXIifX0.ra6xjIjvPfh407KouCGq33BiN32unO9CF2tu2BXGwI4";

        const mockHeader = jest.fn().mockReturnValue('secret_token');

        // Mock any needed third party modules
        passport.authenticate = jest.fn((authType, callback) => () => {
          callback(passportError, passportUser, passportInfo);
        });
    
        /* Execute the function */
        //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
        await authController.loginUser(req, res, next);
    
        /* Test everything works as expected */
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith({
          status: returnStatus,
          success: returnSuccess,
          message: returnMessage
        });
    
    });

    it('should return status 500 for any other issue the resource encounters', async () => {

        // Mock the required request functions and properties
        req.body = {
          username: 'terry',
          password: 'password'
        }
        req.get = jest.fn().mockReturnValue(process.env.JWT_TOKEN_SECRET);

        // Mock the arguments for the passport authenticate method
        const passportError = 'There was a problem with the resource, please try again later';
        const passportUser = { id: 1, username: 'Terry'};
        const passportInfo = { message: 'There was a problem with the resource, please try again later'};

        // Mock the passport functionality we are using
        passport.authenticate = jest.fn((authType, callback) => () => {
          callback(passportError, passportUser, passportInfo);
        });

        /* Execute the function */
        //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
        await authController.loginUser(req, res, next);
  
        expect(passport.authenticate).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith({
          status: 500,
          success: false,
          message: 'There was a problem with the resource, please try again later'
        });
    
    });

});


describe('authController.createUser', () => {

    /*
     * Steps to run before and after this test suite
     */
    beforeEach(async () => {
      mockReq = {};
      mockedResponse = () => {
        const response = {};
        response.status = jest.fn().mockReturnValue(response);
        response.json = jest.fn().mockReturnValue(response);
        return response;
      }
      mockRes = mockedResponse();
      mockNext = jest.fn();
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    })
  
    it('should return status 200 and register the user', async () => {

      // Set Mocked data that models and controllers should return
      const mockUser = {
        id: 12,
          username: 'bob@wallis.co.uk',
          password: 'efjsdfdsjfsoidfjdjfiosdjfs',
          roles: 'Customer'
      }
  
      // Set any variables needed to be passed to controllers and or models
      const postPayload = {
        username: 'bob@wallis.co.uk',
        password: 'djfhSLFHWJHFSDGFJSHDG',
        email: 'bob@wallis.co.uk'
      };

      mockReq.user ={ ...mockUser };

      const passportError = null;
      const passportUser = mockUser;
      const passportInfo = null;

      // Mock any needed third party modules
      jest.spyOn(userModel, 'insert').mockImplementation(() => {
        return mockUser
      })

      passport.authenticate = jest.fn((authType, options, callback) => () => {
        callback(passportError, passportUser, passportInfo);
      });
  
      // Set here the expected return values for the test
      const returnStatus = 200;

      const returnResult = {
        message: 'Signup successful',
        status: 200,
        success: true,
        user: {
          id: mockUser.id,
          password: mockUser.password,
          username: mockUser.username,
          roles: mockUser.roles
        }
      }

      const returnSuccess = true
      const returnMessage = 'Signup successful'

  
      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/register')
        .set('secret_token', process.env.JWT_TOKEN_SECRET)
        .send(postPayload)

      /* Test everything works as expected */
      
      expect(response.status).toEqual(returnStatus)

      expect(typeof response.body).toBe('object')
      expect(typeof response.body.status).toBe('number')
      expect(typeof response.body.success).toBe('boolean')
      expect(typeof response.body.message).toBe('string')

      expect(typeof response.body.user).toBe('object')
      expect(typeof response.body.user.id).toBe('number')
      expect(typeof response.body.user.username).toBe('string')
      expect(typeof response.body.user.password).toBe('string')
      expect(typeof response.body.user.roles).toBe('string')
    
      expect(response.body).toEqual(returnResult)
      expect(response.body.success).toEqual(returnSuccess)
      expect(response.body.status).toEqual(returnStatus)
      expect(response.body.message).toEqual(returnMessage)
      expect(response.body.user).toEqual(mockUser)
      
    });

    it('should return status 400 if username is undefined', async () => {
  
      // Set Mocked data that models and controllers should return
      const mockUser = {
        id: 12,
          username: 'bob@wallis.co.uk',
          password: 'efjsdfdsjfsoidfjdjfiosdjfs',
          roles: 'Customer'
      }
  
      // Set any variables needed to be passed to controllers and or models
      const postPayload = {
        //username: 'bob@wallis.co.uk',
        password: 'djfhSLFHWJHFSDGFJSHDG',
        email: 'bob@wallis.co.uk'
      };

      mockReq.user ={ ...mockUser };

      const passportError = null;
      const passportUser = mockUser;
      const passportInfo = null;

      // Mock any needed third party modules
      jest.spyOn(userModel, 'insert').mockImplementation(() => {
        return mockUser
      })

      passport.authenticate = jest.fn((authType, options, callback) => () => {
        callback(passportError, passportUser, passportInfo);
      });
  
      // Set here the expected return values for the test
      const returnStatus = 400;

      const returnResult = {
        message: 'Signup successful',
        status: 200,
        success: true,
        user: {
          id: mockUser.id,
          password: mockUser.password,
          username: mockUser.username,
          roles: mockUser.roles
        }
      }

      const returnSuccess = false
      const returnMessage = 'Undefined username'

  
      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/register')
        .set('secret_token', 'token-secret')
        .send(postPayload)
        

      /* Test everything works as expected */
      
      expect(response.status).toEqual(returnStatus)

      expect(typeof response.body.status).toBe('number')
      expect(typeof response.body.success).toBe('boolean')
      expect(typeof response.body.message).toBe('string')

      expect(response.body.status).toEqual(returnStatus)
      expect(response.body.success).toEqual(returnSuccess)
      expect(response.body.message).toEqual(returnMessage)

    });
  
      
    it('should return status 400 if username is of the wrong format', async () => {
  
      // Set Mocked data that models and controllers should return
      const mockUser = {
        id: 12,
          username: 'bob@wallis.co.uk',
          password: 'efjsdfdsjfsoidfjdjfiosdjfs',
          roles: 'Customer'
      }
  
      // Set any variables needed to be passed to controllers and or models
      const postPayload = {
        username: 1,
        password: 'djfhSLFHWJHFSDGFJSHDG',
        email: 'bob@wallis.co.uk'
      };

      mockReq.user ={ ...mockUser };

      const passportError = null;
      const passportUser = mockUser;
      const passportInfo = null;

      // Mock any needed third party modules
      jest.spyOn(userModel, 'insert').mockImplementation(() => {
        return mockUser
      })

      passport.authenticate = jest.fn((authType, options, callback) => () => {
        callback(passportError, passportUser, passportInfo);
      });
  
      // Set here the expected return values for the test
      const returnStatus = 400;

      const returnResult = {
        message: 'Signup successful',
        status: 200,
        success: true,
        user: {
          id: mockUser.id,
          password: mockUser.password,
          username: mockUser.username,
          roles: mockUser.roles
        }
      }

      const returnSuccess = false
      const returnMessage = 'Wrong format for username'

  
      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/register')
        .set('secret_token', 'token-secret')
        .send(postPayload)
        

      /* Test everything works as expected */
      
      expect(response.status).toEqual(returnStatus)

      expect(typeof response.body.status).toBe('number')
      expect(typeof response.body.success).toBe('boolean')
      expect(typeof response.body.message).toBe('string')

      expect(response.body.status).toEqual(returnStatus)
      expect(response.body.success).toEqual(returnSuccess)
      expect(response.body.message).toEqual(returnMessage)
  
    });

    it('should return status 400 if password is undefined', async () => {
  
      // Set Mocked data that models and controllers should return
      const mockUser = {
        id: 12,
          username: 'bob@wallis.co.uk',
          password: 'efjsdfdsjfsoidfjdjfiosdjfs',
          roles: 'Customer'
      }
  
      // Set any variables needed to be passed to controllers and or models
      const postPayload = {
        username: 'bob@wallis.co.uk',
        //password: 'djfhSLFHWJHFSDGFJSHDG',
        email: 'bob@wallis.co.uk'
      };

      mockReq.user ={ ...mockUser };

      const passportError = null;
      const passportUser = mockUser;
      const passportInfo = null;

      // Mock any needed third party modules
      jest.spyOn(userModel, 'insert').mockImplementation(() => {
        return mockUser
      })

      passport.authenticate = jest.fn((authType, options, callback) => () => {
        callback(passportError, passportUser, passportInfo);
      });
  
      // Set here the expected return values for the test
      const returnStatus = 400;

      const returnResult = {
        message: 'Signup successful',
        status: 200,
        success: true,
        user: {
          id: mockUser.id,
          password: mockUser.password,
          username: mockUser.username,
          roles: mockUser.roles
        }
      }

      const returnSuccess = false
      const returnMessage = 'Undefined password'

  
      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/register')
        .set('secret_token', 'token-secret')
        .send(postPayload)
        

      /* Test everything works as expected */
      
      expect(response.status).toEqual(returnStatus)

      expect(typeof response.body.status).toBe('number')
      expect(typeof response.body.success).toBe('boolean')
      expect(typeof response.body.message).toBe('string')

      expect(response.body.status).toEqual(returnStatus)
      expect(response.body.success).toEqual(returnSuccess)
      expect(response.body.message).toEqual(returnMessage)
  
    });

    it('should return status 400 if password is of the wrong format', async () => {
  
     // Set Mocked data that models and controllers should return
     const mockUser = {
      id: 12,
        username: 'bob@wallis.co.uk',
        password: 'efjsdfdsjfsoidfjdjfiosdjfs',
        roles: 'Customer'
    }

    // Set any variables needed to be passed to controllers and or models
    const postPayload = {
      username: 'bob@wallis.co.uk',
      password: 12,
      email: 'bob@wallis.co.uk'
    };

    mockReq.user ={ ...mockUser };

    const passportError = null;
    const passportUser = mockUser;
    const passportInfo = null;

    // Mock any needed third party modules
    jest.spyOn(userModel, 'insert').mockImplementation(() => {
      return mockUser
    })

    passport.authenticate = jest.fn((authType, options, callback) => () => {
      callback(passportError, passportUser, passportInfo);
    });

    // Set here the expected return values for the test
    const returnStatus = 400;

    const returnResult = {
      message: 'Signup successful',
      status: 200,
      success: true,
      user: {
        id: mockUser.id,
        password: mockUser.password,
        username: mockUser.username,
        roles: mockUser.roles
      }
    }

    const returnSuccess = false
    const returnMessage = 'Wrong format for password'


    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
    const response = await request(app)
      .post('/register')
      .set('secret_token', 'token-secret')
      .send(postPayload)
      

    /* Test everything works as expected */
    
    expect(response.status).toEqual(returnStatus)

    expect(typeof response.body.status).toBe('number')
    expect(typeof response.body.success).toBe('boolean')
    expect(typeof response.body.message).toBe('string')

    expect(response.body.status).toEqual(returnStatus)
    expect(response.body.success).toEqual(returnSuccess)
    expect(response.body.message).toEqual(returnMessage)
  
    });

    it('should return status 400 if email is undefined', async () => {
  
      // Set Mocked data that models and controllers should return
      const mockUser = {
        id: 12,
          username: 'bob@wallis.co.uk',
          password: 'efjsdfdsjfsoidfjdjfiosdjfs',
          roles: 'Customer'
      }
  
      // Set any variables needed to be passed to controllers and or models
      const postPayload = {
        username: 'bob@wallis.co.uk',
        password: 'djfhSLFHWJHFSDGFJSHDG',
        //email: 'bob@wallis.co.uk'
      };

      mockReq.user ={ ...mockUser };

      const passportError = null;
      const passportUser = mockUser;
      const passportInfo = null;

      // Mock any needed third party modules
      jest.spyOn(userModel, 'insert').mockImplementation(() => {
        return mockUser
      })

      passport.authenticate = jest.fn((authType, options, callback) => () => {
        callback(passportError, passportUser, passportInfo);
      });
  
      // Set here the expected return values for the test
      const returnStatus = 400;

      const returnResult = {
        message: 'Signup successful',
        status: 200,
        success: true,
        user: {
          id: mockUser.id,
          password: mockUser.password,
          username: mockUser.username,
          roles: mockUser.roles
        }
      }

      const returnSuccess = false
      const returnMessage = 'Undefined email'

  
      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/register')
        .set('secret_token', 'token-secret')
        .send(postPayload)
        

      /* Test everything works as expected */
      
      expect(response.status).toEqual(returnStatus)

      expect(typeof response.body.status).toBe('number')
      expect(typeof response.body.success).toBe('boolean')
      expect(typeof response.body.message).toBe('string')

      expect(response.body.status).toEqual(returnStatus)
      expect(response.body.success).toEqual(returnSuccess)
      expect(response.body.message).toEqual(returnMessage)
  
    });

    it('should return status 400 if email is of the wrong format', async () => {
  
      // Set Mocked data that models and controllers should return
      const mockUser = {
        id: 12,
          username: 'bob@wallis.co.uk',
          password: 'efjsdfdsjfsoidfjdjfiosdjfs',
          roles: 'Customer'
      }
  
      // Set any variables needed to be passed to controllers and or models
      const postPayload = {
        username: 'bob@wallis.co.uk',
        password: 'djfhSLFHWJHFSDGFJSHDG',
        email: 12
      };

      mockReq.user ={ ...mockUser };

      const passportError = null;
      const passportUser = mockUser;
      const passportInfo = null;

      // Mock any needed third party modules
      jest.spyOn(userModel, 'insert').mockImplementation(() => {
        return mockUser
      })

      passport.authenticate = jest.fn((authType, options, callback) => () => {
        callback(passportError, passportUser, passportInfo);
      });
  
      // Set here the expected return values for the test
      const returnStatus = 400;

      const returnResult = {
        message: 'Signup successful',
        status: 200,
        success: true,
        user: {
          id: mockUser.id,
          password: mockUser.password,
          username: mockUser.username,
          roles: mockUser.roles
        }
      }

      const returnSuccess = false
      const returnMessage = 'Wrong format for email'

  
      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/register')
        .set('secret_token', 'token-secret')
        .send(postPayload)
        

      /* Test everything works as expected */
      
      expect(response.status).toEqual(returnStatus)

      expect(typeof response.body.status).toBe('number')
      expect(typeof response.body.success).toBe('boolean')
      expect(typeof response.body.message).toBe('string')

      expect(response.body.status).toEqual(returnStatus)
      expect(response.body.success).toEqual(returnSuccess)
      expect(response.body.message).toEqual(returnMessage)
  
    });

    it('should return status 400 if secret_token is missing', async () => {
  
      // Set Mocked data that models and controllers should return
      const mockUser = {
        id: 12,
          username: 'bob@wallis.co.uk',
          password: 'efjsdfdsjfsoidfjdjfiosdjfs',
          roles: 'Customer'
      }
  
      // Set any variables needed to be passed to controllers and or models
      const postPayload = {
        username: 'bob@wallis.co.uk',
        password: 'djfhSLFHWJHFSDGFJSHDG',
        email: 'bob@wallis.co.uk'
      };

      mockReq.user ={ ...mockUser };

      const passportError = null;
      const passportUser = mockUser;
      const passportInfo = null;

      // Mock any needed third party modules
      jest.spyOn(userModel, 'insert').mockImplementation(() => {
        return mockUser
      })

      passport.authenticate = jest.fn((authType, options, callback) => () => {
        callback(passportError, passportUser, passportInfo);
      });
  
      // Set here the expected return values for the test
      const returnStatus = 401;

      const returnResult = {
        message: 'Signup successful',
        status: 200,
        success: true,
        user: {
          id: mockUser.id,
          password: mockUser.password,
          username: mockUser.username,
          roles: mockUser.roles
        }
      }

      const returnSuccess = false
      const returnMessage = 'Undefined secret_token'

  
      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/register')
        //.set('secret_token', 'token-secret')
        .send(postPayload)
        

      /* Test everything works as expected */
      
      expect(response.status).toEqual(returnStatus)

      expect(typeof response.body.status).toBe('number')
      expect(typeof response.body.success).toBe('boolean')
      expect(typeof response.body.message).toBe('string')

      expect(response.body.status).toEqual(returnStatus)
      expect(response.body.success).toEqual(returnSuccess)
      expect(response.body.message).toEqual(returnMessage)
  
    });

    it('should return status 400 if secret_token is incorrect', async () => {
  
      // Set Mocked data that models and controllers should return
      const mockUser = {
        id: 12,
          username: 'bob@wallis.co.uk',
          password: 'efjsdfdsjfsoidfjdjfiosdjfs',
          roles: 'Customer'
      }
  
      // Set any variables needed to be passed to controllers and or models
      const postPayload = {
        username: 'bob@wallis.co.uk',
        password: 'djfhSLFHWJHFSDGFJSHDG',
        email: 'bob@wallis.co.uk'
      };

      mockReq.user ={ ...mockUser };

      const passportError = null;
      const passportUser = mockUser;
      const passportInfo = null;

      // Mock any needed third party modules
      jest.spyOn(userModel, 'insert').mockImplementation(() => {
        return mockUser
      })

      passport.authenticate = jest.fn((authType, options, callback) => () => {
        callback(passportError, passportUser, passportInfo);
      });
  
      // Set here the expected return values for the test
      const returnStatus = 401;

      const returnResult = {
        message: 'Signup successful',
        status: 200,
        success: true,
        user: {
          id: mockUser.id,
          password: mockUser.password,
          username: mockUser.username,
          roles: mockUser.roles
        }
      }

      const returnSuccess = false
      const returnMessage = 'Incorrect secret_token'

  
      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/register')
        .set('secret_token', 'tokensecret')
        .send(postPayload)
        

      /* Test everything works as expected */
      
      expect(response.status).toEqual(returnStatus)

      expect(typeof response.body.status).toBe('number')
      expect(typeof response.body.success).toBe('boolean')
      expect(typeof response.body.message).toBe('string')

      expect(response.body.status).toEqual(returnStatus)
      expect(response.body.success).toEqual(returnSuccess)
      expect(response.body.message).toEqual(returnMessage)
  
    });

    it('should return status 500 for any other problem the resource encounters', async () => {
  
      // Set Mocked data that models and controllers should return
      const mockUser = {
        id: 12,
          username: 'bob@wallis.co.uk',
          password: 'efjsdfdsjfsoidfjdjfiosdjfs',
          roles: 'Customer'
      }
  
      // Set any variables needed to be passed to controllers and or models
      const postPayload = {
        username: 'bob@wallis.co.uk',
        password: 'djfhSLFHWJHFSDGFJSHDG',
        email: 'bob@wallis.co.uk'
      };

      mockReq.user ={ ...mockUser };

      const passportError = null;
      const passportUser = null;
      const passportInfo = null;

      // Mock any needed third party modules
      jest.spyOn(userModel, 'insert').mockImplementation(() => {
        return mockUser;
      })

      passport.authenticate = jest.fn((authType, options, callback) => () => {
        callback(passportError, passportUser, passportInfo);
      });
  
      // Set here the expected return values for the test
      const returnStatus = 500;

      const returnResult = {
        message: 'Signup successful',
        status: 200,
        success: true,
        user: {
          id: mockUser.id,
          password: mockUser.password,
          username: mockUser.username,
          roles: mockUser.roles
        }
      }

      const returnSuccess = false
      const returnMessage = 'There was a problem with the resource, please try again later'

  
      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/register')
        .set('secret_token', process.env.JWT_TOKEN_SECRET)
        .send(postPayload)
        

      /* Test everything works as expected */
      
      expect(response.status).toEqual(returnStatus)

      expect(typeof response.body.status).toBe('number')
      expect(typeof response.body.success).toBe('boolean')
      expect(typeof response.body.message).toBe('string')

      expect(response.body.status).toEqual(returnStatus)
      expect(response.body.success).toEqual(returnSuccess)
      expect(response.body.message).toEqual(returnMessage)
  
    });
  
});