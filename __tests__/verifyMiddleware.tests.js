const verify = require('../middlewares/verifyMiddleware');

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

})