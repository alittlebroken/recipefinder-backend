/* Modules required for the tests */
require('dotenv').config();
const messageHelper = require('../helpers/constants');

const request = require('supertest');
const app = require('../index.js');

const recipeModel = require('../models/recipeModel');
const searchController = require('../controllers/searchController');

describe('searchController.search', () => {

    /*
     * Steps to run before and after this test suite
     */
    beforeEach(async () => {
  
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    })
  
      it('returns status 200 and list of recipes found by name', async () => {
    
          // Set Mocked data that models and controllers should return
          const modelResults = [
            {
              recipeId: 1,
              name: 'Beans on toast',
              description: 'A classic british food pairing used for breakfast, lunch or tea',
              servings: 1,
              calories_per_serving: 256,
              prep_time: 2,
              cook_time: 5,
              rating: 6,
              ingredients: [
                { id: 1,
                  name: 'Baked beans',
                  amount: 1,
                  amount_type: 'tin'
                },
                {
                  id: 2,
                  name: 'bread',
                  amount: 2,
                  amount_type: 'slices'
                }
              ],
              cookbooks: [
                {
                  id: 1,
                  name: 'Simple snacks, meals and desserts'
                }
              ],
              steps: [
                {
                  id: 1,
                  stepNo: 1,
                  content: 'Start to toast the slices of bread'
                },
                {
                  id: 2,
                  stepNo: 2,
                  content: 'Empty beans into a saucepan'
                },
                {
                  id: 3,
                  stepNo: 3,
                  content: 'Cook for 5 minutes on a high heat'
                },
                {
                  id: 4,
                  stepNo: 4,
                  content: 'Pour beans over toast and enjoy'
                },
              ],
              categories: [
                { id: 1, name: 'Snacks'},
                { id: 2, name: 'Breakfast'},
                { id: 3, name: 'Vegeterian'},
                { id: 4, name: 'Vegan'},
                { id: 5, name: 'Dairy Free'},
              ]
            }
          ];
      
          // Set any variables needed to be passed to controllers and or models
          const searchTerms = 'toast';
          const searchType = 'recipe';
          const searchCategories = '';

          const payload = {
            terms: searchTerms,
            typeOfSearch: searchType,
            categories: searchCategories
          };

          // Mock any needed third party modules
          jest.spyOn(recipeModel, 'find').mockImplementation(() => {
            return modelResults;
          });

          jest.spyOn(recipeModel, 'findByIngredients').mockImplementation(() => {
            return modelResults;
          });

          jest.spyOn(recipeModel, 'findByCategory').mockImplementation(() => {
            return modelResults;
          });
      
          // Set here the expected return values for the test
          const returnStatus = 200;
          const returnSuccess = true;
          const returnMessage = '';
          const returnResults = modelResults;
      
          /* Mock Express request and response */
          const mockRequest = {};
          const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
          const mockNext = jest.fn();
      
          /* Execute the function */
          //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
          const response = await request(app)
            .post('/search')
            .send(payload);

          /* Test everything works as expected */
          expect(response.status).toEqual(returnStatus);

          expect(typeof response.body).toBe('object');
          expect(typeof response.body.status).toBe('number');
          expect(typeof response.body.success).toBe('boolean');
          expect(Array.isArray(response.body.results)).toBe(true);
          expect(response.body.results.length).toEqual(1);

          expect(response.body.status).toEqual(returnStatus);
          expect(response.body.success).toEqual(returnSuccess);
          expect(response.body.results).toEqual(returnResults);

      });

      it('returns status 200 and list of recipes found by ingredients', async () => {
  
        // Set Mocked data that models and controllers should return
        const modelResults = [
          {
            recipeId: 1,
            name: 'Beans on toast',
            description: 'A classic british food pairing used for breakfast, lunch or tea',
            servings: 1,
            calories_per_serving: 256,
            prep_time: 2,
            cook_time: 5,
            rating: 6,
            ingredients: [
              { id: 1,
                name: 'Baked beans',
                amount: 1,
                amount_type: 'tin'
              },
              {
                id: 2,
                name: 'bread',
                amount: 2,
                amount_type: 'slices'
              }
            ],
            cookbooks: [
              {
                id: 1,
                name: 'Simple snacks, meals and desserts'
              }
            ],
            steps: [
              {
                id: 1,
                stepNo: 1,
                content: 'Start to toast the slices of bread'
              },
              {
                id: 2,
                stepNo: 2,
                content: 'Empty beans into a saucepan'
              },
              {
                id: 3,
                stepNo: 3,
                content: 'Cook for 5 minutes on a high heat'
              },
              {
                id: 4,
                stepNo: 4,
                content: 'Pour beans over toast and enjoy'
              },
            ],
            categories: [
              { id: 1, name: 'Snacks'},
              { id: 2, name: 'Breakfast'},
              { id: 3, name: 'Vegeterian'},
              { id: 4, name: 'Vegan'},
              { id: 5, name: 'Dairy Free'},
            ]
          }
        ];
    
        // Set any variables needed to be passed to controllers and or models
        const searchTerms = 'bread';
        const searchType = 'ingredients';
        const searchCategories = '';

        const payload = {
          terms: searchTerms,
          typeOfSearch: searchType,
          categories: searchCategories
        };

        // Mock any needed third party modules
        jest.spyOn(recipeModel, 'find').mockImplementation(() => {
          return modelResults;
        });

        jest.spyOn(recipeModel, 'findByIngredients').mockImplementation(() => {
          return modelResults;
        });

        jest.spyOn(recipeModel, 'findByCategory').mockImplementation(() => {
          return modelResults;
        });
    
        // Set here the expected return values for the test
        const returnStatus = 200;
        const returnSuccess = true;
        const returnMessage = '';
        const returnResults = modelResults;
    
        /* Mock Express request and response */
        const mockRequest = {};
        const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const mockNext = jest.fn();
    
        /* Execute the function */
        //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
        const response = await request(app)
          .post('/search')
          .send(payload);

        /* Test everything works as expected */
        expect(response.status).toEqual(returnStatus);

        expect(typeof response.body).toBe('object');
        expect(typeof response.body.status).toBe('number');
        expect(typeof response.body.success).toBe('boolean');
        expect(Array.isArray(response.body.results)).toBe(true);
        expect(response.body.results.length).toEqual(1);

        expect(response.body.status).toEqual(returnStatus);
        expect(response.body.success).toEqual(returnSuccess);
        expect(response.body.results).toEqual(returnResults);

      });

      it('returns status 200 and list of recipes found by category', async () => {
  
        // Set Mocked data that models and controllers should return
        const modelResults = [
          {
            recipeId: 1,
            name: 'Beans on toast',
            description: 'A classic british food pairing used for breakfast, lunch or tea',
            servings: 1,
            calories_per_serving: 256,
            prep_time: 2,
            cook_time: 5,
            rating: 6,
            ingredients: [
              { id: 1,
                name: 'Baked beans',
                amount: 1,
                amount_type: 'tin'
              },
              {
                id: 2,
                name: 'bread',
                amount: 2,
                amount_type: 'slices'
              }
            ],
            cookbooks: [
              {
                id: 1,
                name: 'Simple snacks, meals and desserts'
              }
            ],
            steps: [
              {
                id: 1,
                stepNo: 1,
                content: 'Start to toast the slices of bread'
              },
              {
                id: 2,
                stepNo: 2,
                content: 'Empty beans into a saucepan'
              },
              {
                id: 3,
                stepNo: 3,
                content: 'Cook for 5 minutes on a high heat'
              },
              {
                id: 4,
                stepNo: 4,
                content: 'Pour beans over toast and enjoy'
              },
            ],
            categories: [
              { id: 1, name: 'Snacks'},
              { id: 2, name: 'Breakfast'},
              { id: 3, name: 'Vegeterian'},
              { id: 4, name: 'Vegan'},
              { id: 5, name: 'Dairy Free'},
            ]
          }
        ];
    
        // Set any variables needed to be passed to controllers and or models
        const searchTerms = 'beans';
        const searchType = 'recipes';
        const searchCategories = 'breakfast';

        const payload = {
          terms: searchTerms,
          typeOfSearch: searchType,
          categories: searchCategories
        };

        // Mock any needed third party modules
        jest.spyOn(recipeModel, 'find').mockImplementation(() => {
          return modelResults;
        });

        jest.spyOn(recipeModel, 'findByIngredients').mockImplementation(() => {
          return modelResults;
        });

        jest.spyOn(recipeModel, 'findByCategory').mockImplementation(() => {
          return modelResults;
        });
    
        // Set here the expected return values for the test
        const returnStatus = 200;
        const returnSuccess = true;
        const returnMessage = '';
        const returnResults = modelResults;
    
        /* Mock Express request and response */
        const mockRequest = {};
        const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const mockNext = jest.fn();
    
        /* Execute the function */
        //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
        const response = await request(app)
          .post('/search')
          .send(payload);

        /* Test everything works as expected */
        expect(response.status).toEqual(returnStatus);

        expect(typeof response.body).toBe('object');
        expect(typeof response.body.status).toBe('number');
        expect(typeof response.body.success).toBe('boolean');
        expect(Array.isArray(response.body.results)).toBe(true);
        expect(response.body.results.length).toEqual(1);

        expect(response.body.status).toEqual(returnStatus);
        expect(response.body.success).toEqual(returnSuccess);
        expect(response.body.results).toEqual(returnResults);

      });

      it('returns status 404 if no recipes found by name', async () => {
  
        // Set Mocked data that models and controllers should return
        const modelResults = [];
    
        // Set any variables needed to be passed to controllers and or models
        const searchTerms = 'Christmas pudding';
        const searchType = 'recipes';
        const searchCategories = '';

        const payload = {
          terms: searchTerms,
          typeOfSearch: searchType,
          categories: searchCategories
        };

        // Mock any needed third party modules
        jest.spyOn(recipeModel, 'find').mockImplementation(() => {
          return modelResults;
        });

        jest.spyOn(recipeModel, 'findByIngredients').mockImplementation(() => {
          return modelResults;
        });

        jest.spyOn(recipeModel, 'findByCategory').mockImplementation(() => {
          return modelResults;
        });
    
        // Set here the expected return values for the test
        const returnStatus = 404;
        const returnSuccess = false;
        const returnMessage = 'No matching recipes found by name';
        const returnResults = modelResults;
    
        /* Mock Express request and response */
        const mockRequest = {};
        const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const mockNext = jest.fn();
    
        /* Execute the function */
        //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
        const response = await request(app)
          .post('/search')
          .send(payload);

        /* Test everything works as expected */
        expect(response.status).toEqual(returnStatus);

        expect(typeof response.body).toBe('object');
        expect(typeof response.body.status).toBe('number');
        expect(typeof response.body.success).toBe('boolean');
        expect(Array.isArray(response.body.results)).toBe(true);
        expect(response.body.results.length).toEqual(0);

        expect(response.body.status).toEqual(returnStatus);
        expect(response.body.success).toEqual(returnSuccess);
        expect(response.body.results).toEqual(returnResults);

      });

      it('returns status 404 if no recipes found by ingredients', async () => {
  
        // Set Mocked data that models and controllers should return
        const modelResults = [];
    
        // Set any variables needed to be passed to controllers and or models
        const searchTerms = 'egg';
        const searchType = 'ingredients';
        const searchCategories = '';

        const payload = {
          terms: searchTerms,
          typeOfSearch: searchType,
          categories: searchCategories
        };

        // Mock any needed third party modules
        jest.spyOn(recipeModel, 'find').mockImplementation(() => {
          return modelResults;
        });

        jest.spyOn(recipeModel, 'findByIngredients').mockImplementation(() => {
          return modelResults;
        });

        jest.spyOn(recipeModel, 'findByCategory').mockImplementation(() => {
          return modelResults;
        });
    
        // Set here the expected return values for the test
        const returnStatus = 404;
        const returnSuccess = false;
        const returnMessage = 'No recipes found using the supplied ingredients';
        const returnResults = modelResults;
    
        /* Mock Express request and response */
        const mockRequest = {};
        const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const mockNext = jest.fn();
    
        /* Execute the function */
        //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
        const response = await request(app)
          .post('/search')
          .send(payload);

        /* Test everything works as expected */
        expect(response.status).toEqual(returnStatus);

        expect(typeof response.body).toBe('object');
        expect(typeof response.body.status).toBe('number');
        expect(typeof response.body.success).toBe('boolean');
        expect(Array.isArray(response.body.results)).toBe(true);
        expect(response.body.results.length).toEqual(0);

        expect(response.body.status).toEqual(returnStatus);
        expect(response.body.success).toEqual(returnSuccess);
        expect(response.body.results).toEqual(returnResults);

      });

      it('returns status 404 if no recipes found by category', async () => {
  
        // Set Mocked data that models and controllers should return
        const modelResults = [];
    
        // Set any variables needed to be passed to controllers and or models
        const searchTerms = 'toast';
        const searchType = 'recipes';
        const searchCategories = 'breakfast';

        const payload = {
          terms: searchTerms,
          typeOfSearch: searchType,
          categories: searchCategories
        };

        // Mock any needed third party modules
        jest.spyOn(recipeModel, 'find').mockImplementation(() => {
          return modelResults;
        });

        jest.spyOn(recipeModel, 'findByIngredients').mockImplementation(() => {
          return modelResults;
        });

        jest.spyOn(recipeModel, 'findByCategory').mockImplementation(() => {
          return modelResults;
        });
    
        // Set here the expected return values for the test
        const returnStatus = 404;
        const returnSuccess = false;
        const returnMessage = 'No recipes found for the supplied category';
        const returnResults = modelResults;
    
        /* Mock Express request and response */
        const mockRequest = {};
        const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const mockNext = jest.fn();
    
        /* Execute the function */
        //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
        const response = await request(app)
          .post('/search')
          .send(payload);

        /* Test everything works as expected */
        expect(response.status).toEqual(returnStatus);

        expect(typeof response.body).toBe('object');
        expect(typeof response.body.status).toBe('number');
        expect(typeof response.body.success).toBe('boolean');
        expect(Array.isArray(response.body.results)).toBe(true);
        expect(response.body.results.length).toEqual(0);

        expect(response.body.status).toEqual(returnStatus);
        expect(response.body.success).toEqual(returnSuccess);
        expect(response.body.results).toEqual(returnResults);

      });

      it('returns status 400 if search terms are of the wrong format', async () => {
  
        // Set Mocked data that models and controllers should return
        const modelResults = [];
    
        // Set any variables needed to be passed to controllers and or models
        const searchTerms = 12;
        const searchType = null;
        const searchCategories = null;

        const payload = {
          terms: searchTerms,
          typeOfSearch: searchType,
          categories: searchCategories
        };

        // Mock any needed third party modules
        jest.spyOn(recipeModel, 'find').mockImplementation(() => {
          return modelResults;
        });

        jest.spyOn(recipeModel, 'findByIngredients').mockImplementation(() => {
          return modelResults;
        });

        jest.spyOn(recipeModel, 'findByCategory').mockImplementation(() => {
          return modelResults;
        });
    
        // Set here the expected return values for the test
        const returnStatus = 400;
        const returnSuccess = false;
        const returnMessage = 'Wrong format for search terms';
        const returnResults = modelResults;
    
        /* Mock Express request and response */
        const mockRequest = {};
        const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const mockNext = jest.fn();
    
        /* Execute the function */
        //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
        const response = await request(app)
          .post('/search')
          .send(payload);

        /* Test everything works as expected */
        expect(response.status).toEqual(returnStatus);

        expect(typeof response.body).toBe('object');
        expect(typeof response.body.status).toBe('number');
        expect(typeof response.body.message).toBe('string');
        expect(typeof response.body.success).toBe('boolean');
        expect(Array.isArray(response.body.results)).toBe(true);

        expect(response.body.status).toEqual(returnStatus);
        expect(response.body.success).toEqual(returnSuccess);
        expect(response.body.message).toEqual(returnMessage);
        expect(response.body.results).toEqual(returnResults);

      });

      it('returns status 400 if search type is missing', async () => {
  
        // Set Mocked data that models and controllers should return
        const modelResults = [];
    
        // Set any variables needed to be passed to controllers and or models
        const searchTerms = 'toast';
        const searchType = null;
        const searchCategories = null;

        const payload = {
          terms: searchTerms,
          typeOfSearch: searchType,
          categories: searchCategories
        };

        // Mock any needed third party modules
        jest.spyOn(recipeModel, 'find').mockImplementation(() => {
          return modelResults;
        });

        jest.spyOn(recipeModel, 'findByIngredients').mockImplementation(() => {
          return modelResults;
        });

        jest.spyOn(recipeModel, 'findByCategory').mockImplementation(() => {
          return modelResults;
        });
    
        // Set here the expected return values for the test
        const returnStatus = 400;
        const returnSuccess = false;
        const returnMessage = 'Undefined search type';
        const returnResults = modelResults;
    
        /* Mock Express request and response */
        const mockRequest = {};
        const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const mockNext = jest.fn();
    
        /* Execute the function */
        //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
        const response = await request(app)
          .post('/search')
          .send(payload);

        /* Test everything works as expected */
        expect(response.status).toEqual(returnStatus);

        expect(typeof response.body).toBe('object');
        expect(typeof response.body.status).toBe('number');
        expect(typeof response.body.success).toBe('boolean');
        expect(Array.isArray(response.body.results)).toBe(true);
        expect(response.body.results.length).toEqual(0);

        expect(response.body.status).toEqual(returnStatus);
        expect(response.body.success).toEqual(returnSuccess);
        expect(response.body.results).toEqual(returnResults);

      });

      it('returns status 400 if search type is of the wrong format', async () => {
  
        // Set Mocked data that models and controllers should return
        const modelResults = [];
    
        // Set any variables needed to be passed to controllers and or models
        const searchTerms = 'toast';
        const searchType = 2;
        const searchCategories = null;

        const payload = {
          terms: searchTerms,
          typeOfSearch: searchType,
          categories: searchCategories
        };

        // Mock any needed third party modules
        jest.spyOn(recipeModel, 'find').mockImplementation(() => {
          return modelResults;
        });

        jest.spyOn(recipeModel, 'findByIngredients').mockImplementation(() => {
          return modelResults;
        });

        jest.spyOn(recipeModel, 'findByCategory').mockImplementation(() => {
          return modelResults;
        });
    
        // Set here the expected return values for the test
        const returnStatus = 400;
        const returnSuccess = false;
        const returnMessage = 'Wrong format for search type';
        const returnResults = modelResults;
    
        /* Mock Express request and response */
        const mockRequest = {};
        const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const mockNext = jest.fn();
    
        /* Execute the function */
        //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
        const response = await request(app)
          .post('/search')
          .send(payload);

        /* Test everything works as expected */
        expect(response.status).toEqual(returnStatus);

        expect(typeof response.body).toBe('object');
        expect(typeof response.body.status).toBe('number');
        expect(typeof response.body.success).toBe('boolean');
        expect(Array.isArray(response.body.results)).toBe(true);
        expect(response.body.results.length).toEqual(0);

        expect(response.body.status).toEqual(returnStatus);
        expect(response.body.success).toEqual(returnSuccess);
        expect(response.body.results).toEqual(returnResults);

      });

      it('returns status 400 if search categories is of the wrong format', async () => {
  
        // Set Mocked data that models and controllers should return
        const modelResults = [];
    
        // Set any variables needed to be passed to controllers and or models
        const searchTerms = 'toast';
        const searchType = 'categories';
        const searchCategories = 12;

        const payload = {
          terms: searchTerms,
          typeOfSearch: searchType,
          categories: searchCategories
        };

        // Mock any needed third party modules
        jest.spyOn(recipeModel, 'find').mockImplementation(() => {
          return modelResults;
        });

        jest.spyOn(recipeModel, 'findByIngredients').mockImplementation(() => {
          return modelResults;
        });

        jest.spyOn(recipeModel, 'findByCategory').mockImplementation(() => {
          return modelResults;
        });
    
        // Set here the expected return values for the test
        const returnStatus = 400;
        const returnSuccess = false;
        const returnMessage = 'Wrong format for search category';
        const returnResults = modelResults;
    
        /* Mock Express request and response */
        const mockRequest = {};
        const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const mockNext = jest.fn();
    
        /* Execute the function */
        //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
        const response = await request(app)
          .post('/search')
          .send(payload);

        /* Test everything works as expected */
        expect(response.status).toEqual(returnStatus);

        expect(typeof response.body).toBe('object');
        expect(typeof response.body.status).toBe('number');
        expect(typeof response.body.success).toBe('boolean');
        expect(Array.isArray(response.body.results)).toBe(true);
        expect(response.body.results.length).toEqual(0);

        expect(response.body.status).toEqual(returnStatus);
        expect(response.body.success).toEqual(returnSuccess);
        expect(response.body.results).toEqual(returnResults);

      });

      it('returns status 500 if there was another issue with the resource', async () => {
  
        // Set Mocked data that models and controllers should return
        const modelResults = {
          status: 500,
          success: false,
          message: 'There was a problem with the resource please try again later'
        };
    
        // Set any variables needed to be passed to controllers and or models
        const searchTerms = 'Bean';
        const searchType = 'recipes';
        const searchCategories = 'vegan';

        const payload = {
          terms: searchTerms,
          typeOfSearch: searchType,
          categories: searchCategories
        };

        // Mock any needed third party modules
        jest.spyOn(recipeModel, 'find').mockImplementation(() => {
          return modelResults;
        });

        jest.spyOn(recipeModel, 'findByIngredients').mockImplementation(() => {
          return modelResults;
        });

        jest.spyOn(recipeModel, 'findByCategory').mockImplementation(() => {
          return modelResults;
        });
    
        // Set here the expected return values for the test
        const returnStatus = 500;
        const returnSuccess = false;
        const returnMessage = 'There was a problem with the resource please try again later';
        const returnResults = [];
    
        /* Mock Express request and response */
        const mockRequest = {};
        const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const mockNext = jest.fn();
    
        /* Execute the function */
        //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
        const response = await request(app)
          .post('/search')
          .send(payload);

        /* Test everything works as expected */
        expect(response.status).toEqual(returnStatus);

        expect(typeof response.body).toBe('object');
        expect(typeof response.body.status).toBe('number');
        expect(typeof response.body.success).toBe('boolean');
        expect(Array.isArray(response.body.results)).toBe(true);
        expect(response.body.results.length).toEqual(0);

        expect(response.body.status).toEqual(returnStatus);
        expect(response.body.success).toEqual(returnSuccess);
        expect(response.body.results).toEqual(returnResults);

      });

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