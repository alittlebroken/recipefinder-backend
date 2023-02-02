const verify = require('../middlewares/verifyMiddleware');

const userModel = require('../models/userModel');
const passport = require('passport');

describe('verifyMiddleware', () => {
    
  beforeEach(async () => {
    
    /* Mock up an administrator and a normal user for testing */
    adminUser = {
      id: 1,
      email: 'admin@localhost',
      forename: 'Site',
      surname: 'Administrator',
      roles: ['Admin']
    }

    normalUser = {
      id: 2,
      email: 'customer@localhost',
      forename: 'Custo',
      surname: 'Mer',
      roles: ['Customer']
    }
    
    /* Mock Express request, response & nextFunction */
    mockRequest = {};
    mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    mockNext = jest.fn();

  });

  describe('checkRoles', () => {
    
    it('should call next with no arguments if user is authorised for this route', async () => {
  
      // Set any variables needed to be passed to controllers and or models
      routeRoles = ['Admin'];
  
      // Modify any mocks as needed
      mockRequest = {
        user: adminUser
      }
  
      // Set here the expected return values for the test
      
      /* Execute the function */
      const checkRoles = verify.checkRoles(routeRoles);
      await checkRoles(mockRequest, mockResponse, mockNext);
  
      /* Test everything works as expected */
     expect(mockNext).toHaveBeenCalled();
      
    });

    it('should call next with a 401 error if no user is found in the request', async () => {
  
      // Set any variables needed to be passed to controllers and or models
      routeRoles = ['Admin'];
  
      // Modify any mocks as needed
  
      // Set here the expected return values for the test
    const returnStatus = 401;
    const returnSuccess = false;
    const returnMessage = 'Must be logged in to access the specified route';    

      /* Execute the function */
      const checkRoles = verify.checkRoles(routeRoles);
      await checkRoles(mockRequest, mockResponse, mockNext);
  
      /* Test everything works as expected */
     expect(mockNext).toHaveBeenCalledWith({
      status: returnStatus,
      success: returnSuccess,
      message: returnMessage
     });
      
    });

    it('should call next with a 403 error if the user is not authorized to access the route', async () => {
  
      // Set any variables needed to be passed to controllers and or models
      routeRoles = ['Admin'];
  
      // Modify any mocks as needed
      mockRequest = {
        user: normalUser
      }

      // Set here the expected return values for the test
      const returnStatus = 403;
      const returnSuccess = false;
      const returnMessage = 'You are not authorized to access the specified route';    

        /* Execute the function */
        const checkRoles = verify.checkRoles(routeRoles);
        await checkRoles(mockRequest, mockResponse, mockNext);
    
        /* Test everything works as expected */
      expect(mockNext).toHaveBeenCalledWith({
        status: returnStatus,
        success: returnSuccess,
        message: returnMessage
      });
      
    });

  });


  describe('checkToken', () => {

    beforeEach(() => {

      // Create a new set of env vars for the tests
      mockReq = {};
      mockResponse = () => {
        const response = {};
        response.status = jest.fn().mockReturnValue(response);
        response.json = jest.fn().mockReturnValue(response);
        return response;
      }
      mockRes = mockResponse();
      mockNxt = jest.fn();

      mockTokenUser = {
        id: 1,
        roles: 'Customer'
      }

    })

    afterEach(() => {
      jest.clearAllMocks();
    })


    it('should successfully check if a token is valid, add user details to the request object and call the next middleware', async () => {

      // setup
      const passportError = null
      const passportInfo = null
      const passportUser = mockTokenUser

      const authType = 'jwt'
      const options = { session: false }

      const returnUser = [{
          id: 1,
          username: 'tbonaford@utopia.net',
          email: 'tbonaford@utopia.net',
          forename: 'Tony',
          surname: 'Bonaford',
          roles: 'Customer'
      }]

      passport.authenticate = jest.fn((authType, options, callback) => () => {
        callback(passportError, passportUser, passportInfo);
      });

      jest.spyOn(userModel, 'findById').mockImplementation(() => {
        return returnUser
      })

      // execute
      await verify.checkToken(mockReq, mockRes, mockNxt);
      
      // assert
      expect(mockReq.user).toEqual(returnUser[0])
      expect(mockNxt).toHaveBeenCalled()

    })

    it('should return status 401 if the token has expired', async () => {

      // setup
      const passportError = null
      const passportInfo = { message: 'jwt expired' }
      const passportUser = undefined

      const authType = 'jwt'
      const options = { session: false }

      passport.authenticate = jest.fn((authType, options, callback) => () => {
        callback(passportError, passportUser, passportInfo);
      });

      // execute
      await verify.checkToken(mockReq, mockRes, mockNxt);

      // assert
      expect(mockRes.status).toHaveBeenCalledWith(401)
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 401,
        success: false,
        message: 'Your access token has expired, please login'
      })

      expect(mockReq.user).toEqual(passportUser)
      

    })

    it('should return status 401 if no auth token was set', async () => {

      // setup
      const passportError = null
      const passportInfo = { message: 'No auth token' }
      const passportUser = undefined

      const authType = 'jwt'
      const options = { session: false }

      passport.authenticate = jest.fn((authType, options, callback) => () => {
        callback(passportError, passportUser, passportInfo);
      });

      // execute
      await verify.checkToken(mockReq, mockRes, mockNxt);

      // assert
      expect(mockRes.status).toHaveBeenCalledWith(401)
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 401,
        success: false,
        message: 'You are not authorized to access this resource, please login'
    })

      expect(mockReq.user).toEqual(passportUser)
      

    })

    it('should call next with an error for any other message', async () => {

      // setup
      const passportError = null
      const passportInfo = { message: 'jwt token format not readable' }
      const passportUser = undefined

      const authType = 'jwt'
      const options = { session: false }

      passport.authenticate = jest.fn((authType, options, callback) => () => {
        callback(passportError, passportUser, passportInfo);
      });

      // execute
      await verify.checkToken(mockReq, mockRes, mockNxt);

      // assert
      expect(mockNxt).toHaveBeenCalledWith(passportInfo.message)
      expect(mockReq.user).toEqual(undefined)
      
    })

    it('should return status 404 if passed in id does not matched any stored users', async () => {

      // setup
      const passportError = null
      const passportInfo = null
      const passportUser = mockTokenUser

      const authType = 'jwt'
      const options = { session: false }

      const returnUser = []

      passport.authenticate = jest.fn((authType, options, callback) => () => {
        callback(passportError, passportUser, passportInfo);
      });

      jest.spyOn(userModel, 'findById').mockImplementation(() => {
        return returnUser
      })

      // execute
      await verify.checkToken(mockReq, mockRes, mockNxt);
      
      // assert
      expect(mockReq.user).toEqual(undefined)

      expect(mockRes.status).toHaveBeenCalledWith(404)
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 404,
        success: false,
        message: 'No user found matching supplied id, please login'
      })


    })

  })

})