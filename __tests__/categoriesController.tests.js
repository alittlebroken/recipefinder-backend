/* Modules required for the tests */
const messageHelper = require('../helpers/constants');

const request = require('supertest');
const app = require('../index.js');

const categoriesController = require('../controllers/categoriesController');
const categoryModel = require('../models/categoryModel');
const cookbookCategoriesModel = require('../models/cookbookCategoriesModel');
const recipeCategoriesModel = require('../models/recipeCategoriesModel');


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