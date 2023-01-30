/* Modules required for the tests */
require('dotenv').config();

const request = require('supertest');
const app = require('../index.js');

const authController = require('../controllers/authController');
const userModel = require('../models/userModel');
const tokenModel = require('../models/tokenModel')

const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')



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
      const authType = 'local';
      const returnToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEyLCJlbWFpbCI6InRkcmlsbGVyQGZhdXgubmV0IiwiZm9yZW5hbWUiOiJUaG9tYXMiLCJzdXJuYW1lIjoiRHJpbGxlciIsInJvbGVzIjoiQ3VzdG9tZXIifX0.ra6xjIjvPfh407KouCGq33BiN32unO9CF2tu2BXGwI4";
      const secretToken = process.env.JWT_TOKEN_SECRET;

      const returnStatus = 200;
      const returnSuccess = true;
      const returnBody = { accessToken: returnToken, refreshToken: returnToken };

      // Mock any needed third party modules
      passport.authenticate = jest.fn((authType, callback) => () => {
        callback(passportError, passportUser, passportInfo);
      });

      jest.spyOn(userModel, 'generateTokens').mockImplementation(() => {
        return {accessToken: returnToken, refreshToken: returnToken};
      });

      jest.spyOn(tokenModel, 'findOne').mockImplementation(() => {
        return []
      })

      jest.spyOn(tokenModel, 'removeOne').mockImplementation(() => {
        return {
          success: true,
          message: 'refreshToken successfully removed'
        }
      })

      jest.spyOn(tokenModel, 'addOne').mockImplementation(() => {
        return {
          success: true,
          message: 'Refresh token successfully added'
      }
      })
  
      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/auth/login')
        .send({
          username: 'twallis@functionalmath.com',
          password: 'someMothersDoAveEm'
        });

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
      const authType = 'local';
  
      const returnToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEyLCJlbWFpbCI6InRkcmlsbGVyQGZhdXgubmV0IiwiZm9yZW5hbWUiOiJUaG9tYXMiLCJzdXJuYW1lIjoiRHJpbGxlciIsInJvbGVzIjoiQ3VzdG9tZXIifX0.ra6xjIjvPfh407KouCGq33BiN32unO9CF2tu2BXGwI4";

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
        const authType = 'local';
    
        const returnToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEyLCJlbWFpbCI6InRkcmlsbGVyQGZhdXgubmV0IiwiZm9yZW5hbWUiOiJUaG9tYXMiLCJzdXJuYW1lIjoiRHJpbGxlciIsInJvbGVzIjoiQ3VzdG9tZXIifX0.ra6xjIjvPfh407KouCGq33BiN32unO9CF2tu2BXGwI4";

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
        const authType = 'local';
    
        const returnToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEyLCJlbWFpbCI6InRkcmlsbGVyQGZhdXgubmV0IiwiZm9yZW5hbWUiOiJUaG9tYXMiLCJzdXJuYW1lIjoiRHJpbGxlciIsInJvbGVzIjoiQ3VzdG9tZXIifX0.ra6xjIjvPfh407KouCGq33BiN32unO9CF2tu2BXGwI4";

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
        const authType = 'local';
    
        const returnToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEyLCJlbWFpbCI6InRkcmlsbGVyQGZhdXgubmV0IiwiZm9yZW5hbWUiOiJUaG9tYXMiLCJzdXJuYW1lIjoiRHJpbGxlciIsInJvbGVzIjoiQ3VzdG9tZXIifX0.ra6xjIjvPfh407KouCGq33BiN32unO9CF2tu2BXGwI4";

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
        const authType = 'local';
    
        const returnToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEyLCJlbWFpbCI6InRkcmlsbGVyQGZhdXgubmV0IiwiZm9yZW5hbWUiOiJUaG9tYXMiLCJzdXJuYW1lIjoiRHJpbGxlciIsInJvbGVzIjoiQ3VzdG9tZXIifX0.ra6xjIjvPfh407KouCGq33BiN32unO9CF2tu2BXGwI4";

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
          const passportInfo = { message: 'email not registered'};
          const authType = 'local';
      
          const returnToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEyLCJlbWFpbCI6InRkcmlsbGVyQGZhdXgubmV0IiwiZm9yZW5hbWUiOiJUaG9tYXMiLCJzdXJuYW1lIjoiRHJpbGxlciIsInJvbGVzIjoiQ3VzdG9tZXIifX0.ra6xjIjvPfh407KouCGq33BiN32unO9CF2tu2BXGwI4";


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
        const passportInfo = { message: 'supplied password does not match'};
        const authType = 'local';
    
        const returnToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEyLCJlbWFpbCI6InRkcmlsbGVyQGZhdXgubmV0IiwiZm9yZW5hbWUiOiJUaG9tYXMiLCJzdXJuYW1lIjoiRHJpbGxlciIsInJvbGVzIjoiQ3VzdG9tZXIifX0.ra6xjIjvPfh407KouCGq33BiN32unO9CF2tu2BXGwI4";

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
        .post('/auth/register')
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
        .post('/auth/register')
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
        .post('/auth/register')
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
        .post('/auth/register')
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
      .post('/auth/register')
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
        .post('/auth/register')
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
        .post('/auth/register')
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
        .post('/auth/register')
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

describe('authController.refreshToken', () => {

  beforeEach(() => {

  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return status 200 and a valid access token with a valid refresh token', async () => {

    // Setup
    const mockedVerifiedRefreshPayload = { _id: 1, username: 'twatkins'}
    //const refreshToken = '41234234-2341234234123-2341234234-2342341234'

    const accessToken = '45345345-34534534513-3451334234-1341234234'
    const refreshToken = '451344234-12344562456-25624556456-265245626'

    const foundRefreshTokenData = {
      id: 1,
      userId: 1,
      token: refreshToken,
      created_at: '',
      updated_at: ''
    }

    jest.spyOn(userModel, 'verifyRefreshToken').mockImplementationOnce(() => {
      return mockedVerifiedRefreshPayload;
    })

    jest.spyOn(userModel, 'generateTokens').mockImplementationOnce(() => {
      return { accessToken, refreshToken }
    })

    jest.spyOn(tokenModel, 'findOne').mockImplementationOnce(() => {
      return foundRefreshTokenData;
    })

    const returnStatus = 200;
    const returnSuccess = true;
    const returnMessage = 'New access token created';

    // Execute
    const result = await request(app)
     .post(`/auth/refresh-token`)
     .send({
      refreshToken
     })

    // Assert
    expect(result.status).toBe(returnStatus)

    expect(typeof result.body.message).toBe('string')
    expect(typeof result.body.token).toBe('string')

    expect(result.body.token).toEqual(accessToken)
    expect(result.body.success).toEqual(returnSuccess)
    expect(result.body.message).toEqual(returnMessage)

  })

  it('should return status 400 if supplied refresh token is not in use', async () => {

    // Setup
    const mockedVerifiedRefreshPayload = { _id: 1, username: 'twatkins'}
    const refreshToken = '41234234-2341234234123-2341234234-2342341234'

    const newAccessToken = '45345345-34534534513-3451334234-1341234234'
    const newRefreshToken = '451344234-12344562456-25624556456-265245626'

    const foundRefreshTokenData = false

    jest.spyOn(userModel, 'verifyRefreshToken').mockImplementation(() => {
      return mockedVerifiedRefreshPayload;
    })

    jest.spyOn(userModel, 'generateTokens').mockImplementation(() => {
      return { newAccessToken, newRefreshToken }
    })

    jest.spyOn(tokenModel, 'findOne').mockImplementation(() => {
      return foundRefreshTokenData;
    })

    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Refresh token not in use, please login';

    // Execute
    const result = await request(app)
     .post(`/auth/refresh-token`)
     .send({
      refreshToken
     })

    // Assert
    expect(result.status).toBe(returnStatus)

    expect(typeof result.body.message).toBe('string')
    expect(typeof result.body.token).toBe('string')

    expect(result.body.token).toEqual('')
    expect(result.body.success).toEqual(returnSuccess)
    expect(result.body.message).toEqual(returnMessage)

  })

  it('should return status 400 if supplied refresh token is not valid', async () => {

    // Setup
    const mockedVerifiedRefreshPayload = false
    const refreshToken = '41234234-2341234234123-2341234234-2342341234'

    const newAccessToken = '45345345-34534534513-3451334234-1341234234'
    const newRefreshToken = '451344234-12344562456-25624556456-265245626'

    const foundRefreshTokenData = false

    jest.spyOn(userModel, 'verifyRefreshToken').mockImplementation(() => {
      return mockedVerifiedRefreshPayload;
    })

    jest.spyOn(userModel, 'generateTokens').mockImplementation(() => {
      return { newAccessToken, newRefreshToken }
    })

    jest.spyOn(tokenModel, 'findOne').mockImplementation(() => {
      return foundRefreshTokenData;
    })

    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Not a valid refresh token, please login';

    // Execute
    const result = await request(app)
     .post(`/auth/refresh-token`)
     .send({
      refreshToken
     })

    // Assert
    expect(result.status).toBe(returnStatus)

    expect(typeof result.body.message).toBe('string')
    expect(typeof result.body.token).toBe('string')

    expect(result.body.token).toEqual('')
    expect(result.body.success).toEqual(returnSuccess)
    expect(result.body.message).toEqual(returnMessage)

  })

  it('should return status 400 if supplied refresh token is of the wrong format', async () => {

    // Setup
    const mockedVerifiedRefreshPayload = { _id: 1, username: 'twatkins'}
    const refreshToken = 453456756623554

    const newAccessToken = '45345345-34534534513-3451334234-1341234234'
    const newRefreshToken = '451344234-12344562456-25624556456-265245626'

    const foundRefreshTokenData = false

    jest.spyOn(userModel, 'verifyRefreshToken').mockImplementation(() => {
      return mockedVerifiedRefreshPayload;
    })

    jest.spyOn(userModel, 'generateTokens').mockImplementation(() => {
      return { newAccessToken, newRefreshToken }
    })

    jest.spyOn(tokenModel, 'findOne').mockImplementation(() => {
      return foundRefreshTokenData;
    })

    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for refresh token';

    // Execute
    const result = await request(app)
     .post(`/auth/refresh-token`)
     .send({
      refreshToken
     })

    // Assert
    expect(result.status).toBe(returnStatus)

    expect(typeof result.body.message).toBe('string')
    expect(typeof result.body.token).toBe('string')

    expect(result.body.token).toEqual('')
    expect(result.body.success).toEqual(returnSuccess)
    expect(result.body.message).toEqual(returnMessage)

  })

  it('should return status 404 if the refresh token is undefined', async () => {

    // Setup
    const mockedVerifiedRefreshPayload = {}
    let refreshToken

    let newAccessToken
    let newRefreshToken

    const foundRefreshTokenData = {}

    jest.spyOn(userModel, 'verifyRefreshToken').mockImplementation(() => {
      return mockedVerifiedRefreshPayload;
    })

    jest.spyOn(userModel, 'generateTokens').mockImplementation(() => {
      return { newAccessToken, newRefreshToken }
    })

    jest.spyOn(tokenModel, 'findOne').mockImplementation(() => {
      return foundRefreshTokenData;
    })

    const returnStatus = 404;
    const returnSuccess = false;
    const returnMessage = 'Undefined refresh token';

    // Execute
    const result = await request(app)
     .post(`/auth/refresh-token`)
     .send({
      refreshToken
     })

    // Assert
    expect(result.status).toBe(returnStatus)

    expect(typeof result.body.message).toBe('string')
    expect(typeof result.body.token).toBe('string')

    expect(result.body.token).toEqual('')
    expect(result.body.success).toEqual(returnSuccess)
    expect(result.body.message).toEqual(returnMessage)

  })

  it('should return status 500 if there are other problems that the resource encounters', async () => {

    // Setup
    const mockedVerifiedRefreshPayload = { 
      success: false,
      message: 'There was a problem with the resource, please try again later' 
    }
    const refreshToken = '41234234-2341234234123-2341234234-2342341234'

    const newAccessToken = ''
    const newRefreshToken = ''

    const foundRefreshTokenData = {
      id: 1,
      userId: 1,
      token: refreshToken,
      created_at: '',
      updated_at: ''
    }

    jest.spyOn(userModel, 'verifyRefreshToken').mockImplementation(() => {
      return mockedVerifiedRefreshPayload;
    })

    jest.spyOn(userModel, 'generateTokens').mockImplementation(() => {
      return { newAccessToken, newRefreshToken }
    })

    jest.spyOn(tokenModel, 'findOne').mockImplementation(() => {
      return foundRefreshTokenData;
    })

    const returnStatus = 500;
    const returnSuccess = false;
    const returnMessage = 'There was a problem with the resource, please try again later';

    // Execute
    const result = await request(app)
     .post(`/auth/refresh-token`)
     .send({
      refreshToken
     })

    // Assert
    expect(result.status).toBe(returnStatus)

    expect(typeof result.body.message).toBe('string')
    expect(typeof result.body.token).toBe('string')

    expect(result.body.token).toEqual(newAccessToken)
    expect(result.body.success).toEqual(returnSuccess)
    expect(result.body.message).toEqual(returnMessage)

  })

})

describe('authController.removeToken', () => {

  beforeEach(() => {

  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return status 201 and remove the refresh token from the assigned list', async () => {

    // Setup
    const refreshToken = '41234234-2341234234123-2341234234-2342341234'

    const foundRefreshTokenData = {
      id: 1,
      userId: 1,
      token: refreshToken,
      created_at: '',
      updated_at: ''
    }

    const removeTokenData = {
      success: true,
      message: 'refreshToken successfully removed'
    }

    jest.spyOn(tokenModel, 'findOne').mockImplementation(() => {
      return foundRefreshTokenData;
    })

    jest.spyOn(tokenModel, 'removeOne').mockImplementation(() => {
      return removeTokenData;
    })

    const returnStatus = 201;
    const returnSuccess = true;
    const returnMessage = 'Successfully logged out';
    const returnToken = '';

    // Execute
    const result = await request(app)
     .delete(`/auth/refresh-token`)
     .send({
      refreshToken
     })

    // Assert
    expect(result.status).toBe(returnStatus)

    expect(typeof result.body.message).toBe('string')
    expect(typeof result.body.token).toBe('string')

    expect(result.body.token).toEqual(returnToken)
    expect(result.body.success).toEqual(returnSuccess)
    expect(result.body.message).toEqual(returnMessage)

  })

  it('should return status 404 if no refresh token supplied', async () => {

    // Setup
    let refreshToken

    const foundRefreshTokenData = {}

    const removeTokenData = {}

    jest.spyOn(tokenModel, 'findOne').mockImplementation(() => {
      return foundRefreshTokenData;
    })

    jest.spyOn(tokenModel, 'removeOne').mockImplementation(() => {
      return removeTokenData;
    })

    const returnStatus = 404;
    const returnSuccess = false;
    const returnMessage = 'Undefined refresh token';
    const returnToken = '';

    // Execute
    const result = await request(app)
     .delete(`/auth/refresh-token`)
     .send({
      refreshToken
     })

    // Assert
    expect(result.status).toBe(returnStatus)

    expect(typeof result.body.message).toBe('string')
    expect(typeof result.body.success).toBe('boolean')
    expect(typeof result.body.status).toBe('number')

    expect(result.body.status).toEqual(returnStatus)
    expect(result.body.success).toEqual(returnSuccess)
    expect(result.body.message).toEqual(returnMessage)

  })

  it('should return status 404 if refresh token is not assigned', async () => {

    // Setup
    let refreshToken = '344234234234-4656855234-3452634-453453'

    const foundRefreshTokenData = false

    const removeTokenData = {}

    jest.spyOn(tokenModel, 'findOne').mockImplementation(() => {
      return foundRefreshTokenData;
    })

    jest.spyOn(tokenModel, 'removeOne').mockImplementation(() => {
      return removeTokenData;
    })

    const returnStatus = 404;
    const returnSuccess = false;
    const returnMessage = 'Refresh token not assigned';
    const returnToken = '';

    // Execute
    const result = await request(app)
     .delete(`/auth/refresh-token`)
     .send({
      refreshToken
     })

    // Assert
    expect(result.status).toBe(returnStatus)

    expect(typeof result.body.message).toBe('string')
    expect(typeof result.body.success).toBe('boolean')
    expect(typeof result.body.status).toBe('number')

    expect(result.body.status).toEqual(returnStatus)
    expect(result.body.success).toEqual(returnSuccess)
    expect(result.body.message).toEqual(returnMessage)

  })

  it('should return status 400 if the refresh token is in the wrong format', async () => {

    // Setup
    const refreshToken = 3453456467

    const foundRefreshTokenData = {}

    const removeTokenData = {}

    jest.spyOn(tokenModel, 'findOne').mockImplementation(() => {
      return foundRefreshTokenData;
    })

    jest.spyOn(tokenModel, 'removeOne').mockImplementation(() => {
      return removeTokenData;
    })

    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'Wrong format for refresh token';
    const returnToken = '';

    // Execute
    const result = await request(app)
     .delete(`/auth/refresh-token`)
     .send({
      refreshToken
     })

    // Assert
    expect(result.status).toBe(returnStatus)

    expect(typeof result.body.message).toBe('string')
    expect(typeof result.body.success).toBe('boolean')
    expect(typeof result.body.status).toBe('number')

    expect(result.body.status).toEqual(returnStatus)
    expect(result.body.success).toEqual(returnSuccess)
    expect(result.body.message).toEqual(returnMessage)

  })

  it('should return status 400 if there was a problem removing the refresh token', async () => {

    // Setup
    const refreshToken = '3453456467-4545645635-53541345-453451345'

    const foundRefreshTokenData = {
      id: 1,
      userId: 1,
      token: refreshToken,
      created_at: '',
      updated_at: ''
    }

    const removeTokenData = {
      success: false,
      message: 'No refresh tokens were found matching supplied data'
  }

    jest.spyOn(tokenModel, 'findOne').mockImplementation(() => {
      return foundRefreshTokenData;
    })

    jest.spyOn(tokenModel, 'removeOne').mockImplementation(() => {
      return removeTokenData;
    })

    const returnStatus = 400;
    const returnSuccess = false;
    const returnMessage = 'No refresh tokens were found matching supplied data';
    const returnToken = '';

    // Execute
    const result = await request(app)
     .delete(`/auth/refresh-token`)
     .send({
      refreshToken
     })

    // Assert
    expect(result.status).toBe(returnStatus)

    expect(typeof result.body.message).toBe('string')
    expect(typeof result.body.success).toBe('boolean')
    expect(typeof result.body.status).toBe('number')

    expect(result.body.status).toEqual(returnStatus)
    expect(result.body.success).toEqual(returnSuccess)
    expect(result.body.message).toEqual(returnMessage)

  })

  it('should return status 500 if the resource encounters any other problems', async () => {

    // Setup
    const refreshToken = '41234234-2341234234123-2341234234-2342341234'

    const foundRefreshTokenData = {
      success: false,
      message: 'There was a problem with the resource, please try again later'
    }

    const removeTokenData = {}

    jest.spyOn(tokenModel, 'findOne').mockImplementation(() => {
      return foundRefreshTokenData;
    })

    jest.spyOn(tokenModel, 'removeOne').mockImplementation(() => {
      return removeTokenData;
    })

    const returnStatus = 500;
    const returnSuccess = false;
    const returnMessage = 'There was a problem with the resource, please try again later';
    const returnToken = '';

    // Execute
    const result = await request(app)
     .delete(`/auth/refresh-token`)
     .send({
      refreshToken
     })

    // Assert
    expect(result.status).toBe(returnStatus)

    expect(typeof result.body.message).toBe('string')
    expect(typeof result.body.success).toBe('boolean')
    expect(typeof result.body.status).toBe('number')

    expect(result.body.status).toEqual(returnStatus)
    expect(result.body.success).toEqual(returnSuccess)
    expect(result.body.message).toEqual(returnMessage)

  })

})

describe('logoutUser', () => {

  beforeEach(async () => {

    accessToken = '245742534-45734565345-2454345345345'
    refreshToken = '34535434-34513413453-23452345345-34534-897'

  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return status 200 and log out a user and remove the associated refresh token assigned', async () => {

    // Setup
    jest.spyOn(tokenModel, 'findOne').mockImplementation(() => {
      return { 
        id: 1, 
        token: 'wWQEQQEGYTG345456234',
        created_at: '',
        updated_at: ''      
      }
    })

    jest.spyOn(tokenModel, 'removeOne').mockImplementation(() => {
      return {
        success: true,
        message: 'refreshToken successfully removed'
      }
    })

    jest.spyOn(userModel, 'verifyRefreshToken').mockImplementation(() => {
      return {
        id: 1,
        username: 'sbilly@sport.net',
        forename: 'Sport',
        surname: 'Billy',
        roles: 'Customer'
      }
    })

    const returnStatus = 200
    const returnSuccess = true
    const returnMessage = 'Successfully logged out'

    // Execute
    const res = await request(app)
      .post(`/auth/logout`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        refreshToken
      })

    // Assert
    expect(res.status).toBe(returnStatus)

    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.success).toBe('boolean')
    expect(typeof res.body.message).toBe('string')

    expect(res.body.status).toEqual(returnStatus)
    expect(res.body.success).toEqual(returnSuccess)
    expect(res.body.message).toEqual(returnMessage)
    
  })

  it('should return status 200 and send a logout message if no refreshToken is found assigned to a user', async () => {

    // Setup
    jest.spyOn(tokenModel, 'findOne').mockImplementation(() => {
      return false
    })

    jest.spyOn(tokenModel, 'removeOne').mockImplementation(() => {
      return {
        success: false,
        message: 'No refresh tokens were found matching supplied data'
      }
    })

    jest.spyOn(userModel, 'verifyRefreshToken').mockImplementation(() => {
      return {
        id: 1,
        username: 'sbilly@sport.net',
        forename: 'Sport',
        surname: 'Billy',
        roles: 'Customer'
      }
    })

    const returnStatus = 200
    const returnSuccess = true
    const returnMessage = 'Successfully logged out'

    // Execute
    const res = await request(app)
      .post(`/auth/logout`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        refreshToken
      })

    // Assert
    expect(res.status).toBe(returnStatus)

    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.success).toBe('boolean')
    expect(typeof res.body.message).toBe('string')

    expect(res.body.status).toEqual(returnStatus)
    expect(res.body.success).toEqual(returnSuccess)
    expect(res.body.message).toEqual(returnMessage)
    
  })

  it('should return status 404 if no refresh token is sent', async () => {

    // Setup
    let missingToken

    jest.spyOn(tokenModel, 'findOne').mockImplementation(() => {
      return { 
        id: 1, 
        token: 'wWQEQQEGYTG345456234',
        created_at: '',
        updated_at: ''      
      }
    })

    jest.spyOn(tokenModel, 'removeOne').mockImplementation(() => {
      return {
        success: true,
        message: 'refreshToken successfully removed'
      }
    })

    jest.spyOn(userModel, 'verifyRefreshToken').mockImplementation(() => {
      return {
        id: 1,
        username: 'sbilly@sport.net',
        forename: 'Sport',
        surname: 'Billy',
        roles: 'Customer'
      }
    })

    const returnStatus = 404
    const returnSuccess = false
    const returnMessage = 'Missing refresh token'

    // Execute
    const res = await request(app)
      .post(`/auth/logout`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        refreshToken: missingToken
      })

    // Assert
    expect(res.status).toBe(returnStatus)

    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.success).toBe('boolean')
    expect(typeof res.body.message).toBe('string')

    expect(res.body.status).toEqual(returnStatus)
    expect(res.body.success).toEqual(returnSuccess)
    expect(res.body.message).toEqual(returnMessage)
    
  })

  it('should return status 400 if refresh token is in the wrong format', async () => {

    // Setup
    jest.spyOn(tokenModel, 'findOne').mockImplementation(() => {
      return { 
        id: 1, 
        token: 'wWQEQQEGYTG345456234',
        created_at: '',
        updated_at: ''      
      }
    })

    jest.spyOn(tokenModel, 'removeOne').mockImplementation(() => {
      return {
        success: true,
        message: 'refreshToken successfully removed'
      }
    })

    jest.spyOn(userModel, 'verifyRefreshToken').mockImplementation(() => {
      return {
        id: 1,
        username: 'sbilly@sport.net',
        forename: 'Sport',
        surname: 'Billy',
        roles: 'Customer'
      }
    })

    const returnStatus = 400
    const returnSuccess = false
    const returnMessage = 'Refresh token is not in the correct format'

    // Execute
    const res = await request(app)
      .post(`/auth/logout`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        refreshToken: 5643933874934
      })

    // Assert
    expect(res.status).toBe(returnStatus)

    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.success).toBe('boolean')
    expect(typeof res.body.message).toBe('string')

    expect(res.body.status).toEqual(returnStatus)
    expect(res.body.success).toEqual(returnSuccess)
    expect(res.body.message).toEqual(returnMessage)
    
  })

  it('should return status 500 if the resource encounters any other issues', async () => {

    // Setup
    jest.spyOn(tokenModel, 'findOne').mockImplementation(() => {
      return { 
        id: 1, 
        token: 'wWQEQQEGYTG345456234',
        created_at: '',
        updated_at: ''      
      }
    })

    jest.spyOn(tokenModel, 'removeOne').mockImplementation(() => {
      return {
        success: true,
        message: 'refreshToken successfully removed'
      }
    })

    jest.spyOn(userModel, 'verifyRefreshToken').mockImplementation(() => {
      return {
        success: false,
        message: 'There is a problem with the resource, please try again later'
      }
  })

    const returnStatus = 500
    const returnSuccess = false
    const returnMessage = 'There is a problem with the resource, please try again later'

    // Execute
    const res = await request(app)
      .post(`/auth/logout`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        refreshToken
      })

    // Assert
    expect(res.status).toBe(returnStatus)

    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.success).toBe('boolean')
    expect(typeof res.body.message).toBe('string')

    expect(res.body.status).toEqual(returnStatus)
    expect(res.body.success).toEqual(returnSuccess)
    expect(res.body.message).toEqual(returnMessage)
    
  })

})
