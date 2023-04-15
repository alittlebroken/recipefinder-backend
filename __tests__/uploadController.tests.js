/* Modules required for the tests */
const messageHelper = require('../helpers/constants');

const path = require('path')
const fs = require('fs')
const glob = require('glob')

const request = require('supertest');
const app = require('../index.js');

const uploadController = require('../controllers/uploadController');
const userModel = require('../models/userModel')
const uploadModel = require('../models/uploadModel')


describe('uploadController', () => {

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

    goodRefreshToken = goodToken.refreshToken
    badRefreshToken = badToken.refreshToken

    /* Set the upload folder */
    uploadFolder = path.join(process.cwd(), '/public/media/')
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('upload', () => {

    /*
    * Steps to run before and after this test suite
    */
    beforeEach(async () => {
  
    });
  
    afterEach(async () => {
      jest.clearAllMocks();

      /* Clear out all old files used for the tests */
      const testImages = await glob(`./public/media/tests*.jpg`)

      /* Loop through and remove the files found */
      testImages.map(file => {
        fs.unlink(path.join(process.cwd(), file), err => {
          if(err) console.log('Error removing file')
        })
      })

    })
  
    it('should upload a file and add an entry to the DB', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: true,
        message: 'File data added to DB'
      };
  
      // Set any variables needed to be passed to controllers and or models

      // Mock any needed third party modules
      jest.spyOn(uploadModel, 'upload').mockImplementation(async () => {
        return modelReturnData
      })

      // Set here the expected return values for the test
      const returnStatus = 200
      const returnSuccess = true
      const returnMessage = 'File(s) successfully uploaded'

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/uploads')
        .attach('tests', path.join(__dirname, 'test.jpg'))
        .field('resource', 'recipes')
        .field('resourceid', 1)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Cookie', `jwt=${goodRefreshToken}`)

      /* Test everything works as expected */
      expect(response.body.status).toBe(returnStatus)
      expect(response.body.success).toBe(returnSuccess)
      expect(response.body.message).toEqual(returnMessage)
  
    });

    it('should be able to upload multiple files', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: true,
        message: 'File data added to DB'
      };
  
      // Set any variables needed to be passed to controllers and or models

      // Mock any needed third party modules
      jest.spyOn(uploadModel, 'upload').mockImplementation(async () => {
        return modelReturnData
      })

      // Set here the expected return values for the test
      const returnStatus = 200
      const returnSuccess = true
      const returnMessage = 'File(s) successfully uploaded'

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/uploads')
        .attach('tests', path.join(__dirname, 'test.jpg'))
        .attach('tests', path.join(__dirname, 'test.jpg'))
        .attach('tests', path.join(__dirname, 'test.jpg'))
        .field('resource', 'recipes')
        .field('resourceid', 1)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Cookie', `jwt=${goodRefreshToken}`)

      /* Test everything works as expected */
      expect(response.body.status).toBe(returnStatus)
      expect(response.body.success).toBe(returnSuccess)
      expect(response.body.message).toEqual(returnMessage)

    })

    it('should return status 401 if a non logged in user tries to access this resource', async () => {
      
      // Set Mocked data that models and controllers should return
      const modelReturnData = {};
  
      // Set any variables needed to be passed to controllers and or models

      // Mock any needed third party modules
      jest.spyOn(uploadModel, 'upload').mockImplementation(async () => {
        return modelReturnData
      })

      // Set here the expected return values for the test
      const returnStatus = 401
      const returnSuccess = false
      const returnMessage = 'You are not authorized to access this resource, please login'

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/uploads')
        //.attach('images', path.join(__dirname, 'test.jpg'))
        //.field('resource', 'recipes')
        //.field('resourceid', 1)

      /* Test everything works as expected */
      expect(response.body.status).toBe(returnStatus)
      expect(response.body.success).toBe(returnSuccess)
      expect(response.body.message).toEqual(returnMessage)

    })

    it('should return status 404 if no file sent with the upload', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {};
  
      // Set any variables needed to be passed to controllers and or models

      // Mock any needed third party modules
      jest.spyOn(uploadModel, 'upload').mockImplementation(async () => {
        return modelReturnData
      })

      // Set here the expected return values for the test
      const returnStatus = 404
      const returnSuccess = false
      const returnMessage = 'You must supply one or more images to upload'

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/uploads')
        .field('resource', 'recipes')
        .field('resourceid', 1)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Cookie', `jwt=${goodRefreshToken}`)

      /* Test everything works as expected */
      expect(response.body.status).toBe(returnStatus)
      expect(response.body.success).toBe(returnSuccess)
      expect(response.body.message).toEqual(returnMessage)
  
    });

    it('should return status 404 if resource type is missing', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {};
  
      // Set any variables needed to be passed to controllers and or models

      // Mock any needed third party modules
      jest.spyOn(uploadModel, 'upload').mockImplementation(async () => {
        return modelReturnData
      })

      // Set here the expected return values for the test
      const returnStatus = 404
      const returnSuccess = false
      const returnMessage = 'Resource type is required'

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/uploads')
        .attach('tests', path.join(__dirname, 'test.jpg'))
        .field('resourceid', 1)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Cookie', `jwt=${goodRefreshToken}`)

      /* Test everything works as expected */
      expect(response.body.status).toBe(returnStatus)
      expect(response.body.success).toBe(returnSuccess)
      expect(response.body.message).toEqual(returnMessage)

    })

    it('should return status 404 if resource id is missing', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {};
  
      // Set any variables needed to be passed to controllers and or models

      // Mock any needed third party modules
      jest.spyOn(uploadModel, 'upload').mockImplementation(async () => {
        return modelReturnData
      })

      // Set here the expected return values for the test
      const returnStatus = 404
      const returnSuccess = false
      const returnMessage = 'Resource id is required'

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/uploads')
        .attach('tests', path.join(__dirname, 'test.jpg'))
        .field('resource', 'recipes')
        .set('Authorization', `Bearer ${authToken}`)
        .set('Cookie', `jwt=${goodRefreshToken}`)

      /* Test everything works as expected */
      expect(response.body.status).toBe(returnStatus)
      expect(response.body.success).toBe(returnSuccess)
      expect(response.body.message).toEqual(returnMessage)

    })

    it('should return status 500 if there was any other issue', async () => {

      // Set Mocked data that models and controllers should return
      const modelReturnData = {
        success: false,
        message: 'There was a problem with the resource, please try again later'
      };
  
      // Set any variables needed to be passed to controllers and or models

      // Mock any needed third party modules
      jest.spyOn(uploadModel, 'upload').mockImplementation(async () => {
        return modelReturnData
      })

      // Set here the expected return values for the test
      const returnStatus = 500
      const returnSuccess = false
      const returnMessage = 'There was a problem with the resource, please try again later'

      /* Execute the function */
      //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);
      const response = await request(app)
        .post('/uploads')
        .attach('tests', path.join(__dirname, 'test.jpg'))
        .field('resource', 'recipes')
        .field('resourceid', 1)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Cookie', `jwt=${goodRefreshToken}`)

      /* Test everything works as expected */
      expect(response.body.status).toBe(returnStatus)
      expect(response.body.success).toBe(returnSuccess)
      expect(response.body.message).toEqual(returnMessage)

    })

  });

  describe('list', () => {

    /*
    * Steps to run before and after this test suite
    */
    beforeEach(async () => {
  
    });
  
    afterEach(async () => {
      jest.clearAllMocks();

    })

    it('should return status 200 and all files found split into pages', async () => {

      // Setup

        /* Set the data that the mocked model should return */
        const modelReturnData = {
          success: true,
          results: [
            {id: 1, name: 'test.png', mimetype: 'image/png', resource: 'recipe', resourceid: 1, userid: 15},
            {id: 2, name: 'actual.png', mimetype: 'image/png', resource: 'cookbook', resourceid: 12, userid: 7}
          ],
          message: '',
          pagination: {
            records: 3,
            current: 1,
            total: 2
          }
        }

        /* Mock the return values from the Model used */
        jest.spyOn(uploadModel, 'list').mockImplementation(() => {
          return modelReturnData;
        })

        // Query Parameters
        const queryParams = {
          page: 1,
          limit: 2,
          sort_by: 'id',
          sort_direction: 'desc',
          filter_by: null,
          filter_values: null,
          filter: null
        }

        // Set here the expected return values for the test
        const returnStatus = 200
        const returnSuccess = true
        const returnMessage = ''
        const returnResults = modelReturnData.results
        const returnPagination = modelReturnData.pagination

      // Execute
        const res = await request(app)
          .get('/uploads/')
          .query(queryParams)
          .set('Authorization', `Bearer ${authToken}`)
          .set('Cookie', `jwt=${goodRefreshToken}`)

      // Assert
        expect(res.status).toEqual(returnStatus)
        expect(res.body.success).toEqual(returnSuccess)
        expect(res.body.message).toEqual(returnMessage)

        expect(Array.isArray(res.body.results)).toBe(true)
        expect(res.body.results).toHaveLength(2)
        expect(res.body.results).toEqual(returnResults)        

        expect(res.body.pagination).toEqual(returnPagination)

    })

    it('should return status 200 and all files filtered by the specified criteria', async () => {

      // Setup

        /* Set the data that the mocked model should return */
        const modelReturnData = {
          success: true,
          results: [
            {id: 1, name: 'test.png', mimetype: 'image/png', resource: 'recipe', resourceid: 1, userid: 15},
            ],
          message: '',
          pagination: {
            records: 1,
            current: 1,
            total: 1
          }
        }

        /* Mock the return values from the Model used */
        jest.spyOn(uploadModel, 'list').mockImplementation(() => {
          return modelReturnData;
        })

        // Query Parameters
        const queryParams = {
          page: 1,
          limit: 2,
          sort_by: 'id',
          sort_direction: 'desc',
          filter_by: null,
          filter_values: null,
          filter: JSON.stringify({ name: 'test.png' })
        }

        // Set here the expected return values for the test
        const returnStatus = 200
        const returnSuccess = true
        const returnMessage = ''
        const returnResults = modelReturnData.results
        const returnPagination = modelReturnData.pagination

      // Execute
        const res = await request(app)
          .get('/uploads/')
          .query(queryParams)
          .set('Authorization', `Bearer ${authToken}`)
          .set('Cookie', `jwt=${goodRefreshToken}`)

      // Assert
        expect(res.status).toEqual(returnStatus)
        expect(res.body.success).toEqual(returnSuccess)
        expect(res.body.message).toEqual(returnMessage)

        expect(Array.isArray(res.body.results)).toBe(true)
        expect(res.body.results).toHaveLength(1)
        expect(res.body.results).toEqual(returnResults)        

        expect(res.body.pagination).toEqual(returnPagination)

    })

    it('should return status 401 if an unathorised users tries to access', async () => {

      // Setup

        /* Set the data that the mocked model should return */
        const modelReturnData = {
          success: false,
          results: [],
          message: 'There were no records found',
          pagination: {
            records: 0,
            current: 1,
            total: 1
          }
        }

        /* Mock the return values from the Model used */
        jest.spyOn(uploadModel, 'list').mockImplementation(() => {
          return modelReturnData;
        })

        // Query Parameters
        const queryParams = {
          page: 1,
          limit: 2,
          sort_by: 'id',
          sort_direction: 'desc',
          filter_by: null,
          filter_values: null,
          filter: null
        }

        // Set here the expected return values for the test
        const returnStatus = 401
        const returnSuccess = false
        const returnMessage = 'You are not authorized to access this resource, please login'
        const returnResults = []
        const returnPagination = {
          records: 0,
          current: 1,
          total: 1
        }

      // Execute
        const res = await request(app)
          .get('/uploads/')
          .query(queryParams)

      // Assert
        expect(res.status).toEqual(returnStatus)
        expect(res.body.success).toEqual(returnSuccess)
        expect(res.body.message).toEqual(returnMessage)

    })

    it('should return status 404 an empty array if no results found', async () => {

      // Setup

        /* Set the data that the mocked model should return */
        const modelReturnData = {
          success: false,
          results: [],
          message: 'There were no records found',
          pagination: {
            records: 0,
            current: 1,
            total: 1
          }
        }

        /* Mock the return values from the Model used */
        jest.spyOn(uploadModel, 'list').mockImplementation(() => {
          return modelReturnData;
        })

        // Query Parameters
        const queryParams = {
          page: 1,
          limit: 2,
          sort_by: 'id',
          sort_direction: 'desc',
          filter_by: null,
          filter_values: null,
          filter: null
        }

        // Set here the expected return values for the test
        const returnStatus = 404
        const returnSuccess = false
        const returnMessage = 'There were no records found'
        const returnResults = []
        const returnPagination = {
          records: 0,
          current: 1,
          total: 1
        }

      // Execute
        const res = await request(app)
          .get('/uploads/')
          .query(queryParams)
          .set('Authorization', `Bearer ${authToken}`)
          .set('Cookie', `jwt=${goodRefreshToken}`)

      // Assert
        expect(res.status).toEqual(returnStatus)
        expect(res.body.success).toEqual(returnSuccess)
        expect(res.body.message).toEqual(returnMessage)

        expect(Array.isArray(res.body.results)).toBe(true)
        expect(res.body.results).toHaveLength(0)
        expect(res.body.results).toEqual(returnResults)        

        expect(res.body.pagination).toEqual(returnPagination)

    })

    it('should return status 500 if there were any other errors', async () => {

      // Setup

        /* Set the data that the mocked model should return */
        const modelReturnData = {
          success: false,
          message: 'There was a problem with the reosurce, please try again later',
        }

        /* Mock the return values from the Model used */
        jest.spyOn(uploadModel, 'list').mockImplementation(() => {
          return modelReturnData;
        })

        // Query Parameters
        const queryParams = {
          page: 1,
          limit: 2,
          sort_by: 'id',
          sort_direction: 'desc',
          filter_by: null,
          filter_values: null,
          filter: null
        }

        // Set here the expected return values for the test
        const returnStatus = 500
        const returnSuccess = false
        const returnMessage = 'There was a problem with the resource, please try again later'
        const returnResults = []
        const returnResultsLength = 0
        const returnPagination = {
          records: 0,
          current: 1,
          total: 1
        }

      // Execute
        const res = await request(app)
          .get('/uploads/')
          .query(queryParams)
          .set('Authorization', `Bearer ${authToken}`)
          .set('Cookie', `jwt=${goodRefreshToken}`)

      // Assert
        expect(res.status).toEqual(returnStatus)
        expect(res.body.success).toEqual(returnSuccess)
        expect(res.body.message).toEqual(returnMessage)

        expect(Array.isArray(res.body.results)).toBe(true)
        expect(res.body.results).toHaveLength(returnResultsLength)
        expect(res.body.results).toEqual(returnResults)        

        expect(res.body.pagination).toEqual(returnPagination)

    })

  })

  xdescribe('remove', () => {

    /*
    * Steps to run before and after this test suite
    */
    beforeEach(async () => {
  
    });
  
    afterEach(async () => {
      jest.clearAllMocks();

    })

    it('', async () => {

      // Setup

      // Execute

      // Assert

    })

  })

  xdescribe('update', () => {

    /*
    * Steps to run before and after this test suite
    */
    beforeEach(async () => {
  
    });
  
    afterEach(async () => {
      jest.clearAllMocks();

    })

    it('', async () => {

      // Setup

      // Execute

      // Assert

    })

  })

});
