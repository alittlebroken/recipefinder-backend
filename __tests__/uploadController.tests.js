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

/* Used in tests to create files */
const testFiles = [
  'test001.jpg',
  'test002.jpg',
  'test003.jpg',
  'test004.jpg',
  'test005.jpg',
]

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
  
    it('should return status 200 and upload a file and add an entry to the DB', async () => {

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
        .field('title', 'Image Test 001')
        .set('Authorization', `Bearer ${authToken}`)
        .set('Cookie', `jwt=${goodRefreshToken}`)

      /* Test everything works as expected */
      expect(response.body.status).toBe(returnStatus)
      expect(response.body.success).toBe(returnSuccess)
      expect(response.body.message).toEqual(returnMessage)
  
    });

    it('should return status 200 and be able to upload multiple files', async () => {

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
        .field('title', 'Image Tests')
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
        .field('title', 'Image Test 001')
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
        .field('title', 'Image Test 001')
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
        .field('title', 'Image Test 001')
        .set('Authorization', `Bearer ${authToken}`)
        .set('Cookie', `jwt=${goodRefreshToken}`)

      /* Test everything works as expected */
      expect(response.body.status).toBe(returnStatus)
      expect(response.body.success).toBe(returnSuccess)
      expect(response.body.message).toEqual(returnMessage)

    })

    it('should return status 404 if the title is missing', async () => {

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
      const returnStatus = 404
      const returnSuccess = false
      const returnMessage = 'Image title is required'

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
        .field('title', 'Image Test 001')
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
            {id: 1, src: 'test.png', title: 'Image Test 001', mimetype: 'image/png', resource: 'recipe', resourceid: 1, userid: 15},
            {id: 2, src: 'actual.png', title: 'Image Test 002', mimetype: 'image/png', resource: 'cookbook', resourceid: 12, userid: 7}
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
            {id: 1, src: 'test.png', title: 'Image Test 001', mimetype: 'image/png', resource: 'recipe', resourceid: 1, userid: 15},
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

  describe('remove', () => {

    /*
    * Steps to run before and after this test suite
    */
    beforeEach(async () => {
      
      /* Create 5 files for each test */
      const srcFile = '__tests__/test.jpg'
      testFiles.map(file => {
        fs.copyFile(srcFile, path.join('./public/media', file), err => {
          if(err) console.log(`Unable to copy test file to ${file}`)
        })
      })

    });
  
    afterEach(async () => {
      
      /* Remove the files */
      testFiles.map(file => {
        fs.unlink(path.join('./public/media', file), err => {
          if(err) console.log(`Unable to remove file ${file}`)
        })
      })

      jest.clearAllMocks();
    })

    it('should return status 200 and remove all uploads', async () => {

      // Setup

        /* Set the data that the mocked model should return */
        const modelReturnData = {
          success: true,
          message: 'Records deleted successfully',
          results: 5,
          pagination: {}
        }

        /* Mock the return values from the Model used */
        jest.spyOn(uploadModel, 'remove').mockImplementation(() => {
          return modelReturnData;
        })

        jest.spyOn(uploadModel, 'list').mockImplementation(() => {
          return {
            success: false,
            results: [],
            message: 'There are currently no files',
            pagination: {
              current: 1,
              total: 1,
              records: 0
            }
          }
        })

        // Query Parameters
        const queryParams = {
          page: 1,
          limit: 10,
          sort_by: 'id',
          sort_direction: 'desc',
          filter_by: null,
          filter_values: null,
          filter: null
        }

        // Set here the expected return values for the test
        const returnStatus = 200
        const returnSuccess = true
        const returnMessage = 'Records deleted successfully'
        const returnResults = 5
        const returnPagination = {}

      // Execute
      const res = await request(app)
        .delete('/uploads/')
        .query(queryParams)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Cookie', `jwt=${goodRefreshToken}`)

      // Excute to check how many images we have left
      const resLeft = await request(app)
        .get('/uploads/')
        .query(queryParams)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Cookie', `jwt=${goodRefreshToken}`)
      
      // Assert
      expect(res.status).toEqual(returnStatus)
      expect(res.body.success).toEqual(returnSuccess)
      expect(res.body.message).toEqual(returnMessage)
      expect(res.body.results).toEqual(returnResults)
      expect(res.body.pagination).toEqual(returnPagination)

      
      expect(resLeft.status).toEqual(404)
      expect(resLeft.body.success).toEqual(false)
      expect(resLeft.body.message).toEqual('There were no records found')
      expect(resLeft.body.results).toEqual([])
      expect(resLeft.body.pagination).toEqual({
        current: 1,
        total: 1,
        records: 0
      })
      

    })

    it('should return status 200 and remove the filtered records', async () => {

      // Setup

        /* Set the data that the mocked model should return */
        const modelReturnData = {
          success: true,
          message: 'Records deleted successfully',
          results: 1,
          pagination: {}
        }

        /* Mock the return values from the Model used */
        jest.spyOn(uploadModel, 'remove').mockImplementation(() => {
          return modelReturnData;
        })

        jest.spyOn(uploadModel, 'list').mockImplementation(() => {
          return {
            success: false,
            results: [],
            message: 'There are currently no files',
            pagination: {
              current: 1,
              total: 1,
              records: 0
            }
          }
        })

        // Query Parameters
        const queryParams = {
          page: 1,
          limit: 10,
          sort_by: 'id',
          sort_direction: 'desc',
          filter_by: null,
          filter_values: null,
          filter: JSON.stringify({id: 1})
        }

        // Set here the expected return values for the test
        const returnStatus = 200
        const returnSuccess = true
        const returnMessage = 'Records deleted successfully'
        const returnResults = 1
        const returnPagination = {}

      // Execute
      const res = await request(app)
        .delete('/uploads/')
        .query(queryParams)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Cookie', `jwt=${goodRefreshToken}`)

      // Excute to check how many images we have left
      const resLeft = await request(app)
        .get('/uploads/')
        .query(queryParams)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Cookie', `jwt=${goodRefreshToken}`)

      // Assert
      expect(res.status).toEqual(returnStatus)
      expect(res.body.success).toEqual(returnSuccess)
      expect(res.body.message).toEqual(returnMessage)
      expect(res.body.results).toEqual(returnResults)
      expect(res.body.pagination).toEqual(returnPagination)

      expect(resLeft.status).toEqual(404)
      expect(resLeft.body.success).toEqual(false)
      expect(resLeft.body.message).toEqual('There were no records found')
      expect(resLeft.body.results).toEqual([])
      expect(resLeft.body.pagination).toEqual({
        current: 1,
        total: 1,
        records: 0
      })

    })

    it('should return status 401 if an unathorised user tries to access', async () => {

      // Setup

        /* Set the data that the mocked model should return */
        const modelReturnData = {
          success: false,
          message: '',
          results: 0,
          pagination: {}
        }

        /* Mock the return values from the Model used */
        jest.spyOn(uploadModel, 'remove').mockImplementation(() => {
          return modelReturnData;
        })

        // Query Parameters
        const queryParams = {
          page: 1,
          limit: 10,
          sort_by: 'id',
          sort_direction: 'desc',
          filter_by: null,
          filter_values: null,
          filter: JSON.stringify({id: 1})
        }

        // Set here the expected return values for the test
        const returnStatus = 401
        const returnSuccess = false
        const returnMessage = 'You are not authorized to access this resource, please login'
        const returnResults = 0
        const returnPagination = {}

      // Execute
      const res = await request(app)
        .delete('/uploads/')
        .query(queryParams)

      // Assert
      expect(res.status).toEqual(returnStatus)
      expect(res.body.success).toEqual(returnSuccess)
      expect(res.body.message).toEqual(returnMessage)

    })

    it('should return status 403 if a user with the wrong role tries to access the resource', async () => {

      // Setup

        /* Set the data that the mocked model should return */
        const modelReturnData = {
          success: false,
          message: '',
          results: 0,
          pagination: {}
        }

        /* Mock the return values from the Model used */
        jest.spyOn(uploadModel, 'remove').mockImplementation(() => {
          return modelReturnData;
        })

        // Query Parameters
        const queryParams = {
          page: 1,
          limit: 10,
          sort_by: 'id',
          sort_direction: 'desc',
          filter_by: null,
          filter_values: null,
          filter: JSON.stringify({id: 1})
        }

        // Set here the expected return values for the test
        const returnStatus = 403
        const returnSuccess = false
        const returnMessage = 'You are not authorized to access the specified route'
        const returnResults = 0
        const returnPagination = {}

      // Execute
      const res = await request(app)
        .delete('/uploads/')
        .query(queryParams)
        .set('Authorization', `Bearer ${failToken}`)
        .set('Cookie', `jwt=${badRefreshToken}`)

      // Assert
      expect(res.status).toEqual(returnStatus)
      expect(res.body.success).toEqual(returnSuccess)
      expect(res.body.message).toEqual(returnMessage)

    })

    it('should return status 404 if there are no records to remove', async () => {

      // Setup

        /* Set the data that the mocked model should return */
        const modelReturnData = {
          success: false,
          message: 'No records to delete',
          results: 0,
          pagination: {}
        }

        /* Mock the return values from the Model used */
        jest.spyOn(uploadModel, 'remove').mockImplementation(() => {
          return modelReturnData;
        })

        // Query Parameters
        const queryParams = {
          page: 1,
          limit: 10,
          sort_by: 'id',
          sort_direction: 'desc',
          filter_by: null,
          filter_values: null,
          filter: JSON.stringify({id: 1})
        }

        // Set here the expected return values for the test
        const returnStatus = 404
        const returnSuccess = false
        const returnMessage = 'No records to delete'
        const returnResults = 0
        const returnPagination = {
          total: 1,
          current: 1,
          records: 0
        }

      // Execute
      const res = await request(app)
        .delete('/uploads/')
        .query(queryParams)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Cookie', `jwt=${goodRefreshToken}`)

      // Assert
      expect(res.status).toEqual(returnStatus)
      expect(res.body.success).toEqual(returnSuccess)
      expect(res.body.message).toEqual(returnMessage)
      expect(res.body.results).toEqual(returnResults)
      expect(res.body.pagination).toEqual(returnPagination)

    })

    it('should return status 500 if there was any other errors', async () => {

      // Setup

        /* Set the data that the mocked model should return */
        const modelReturnData = {
          success: false,
          message: 'There was a problem with the resource, please try again later',
        }

        /* Mock the return values from the Model used */
        jest.spyOn(uploadModel, 'remove').mockImplementation(() => {
          return modelReturnData;
        })

        // Query Parameters
        const queryParams = {
          page: 1,
          limit: 10,
          sort_by: 'id',
          sort_direction: 'desc',
          filter_by: null,
          filter_values: null,
          filter: JSON.stringify({id: 1})
        }

        // Set here the expected return values for the test
        const returnStatus = 500
        const returnSuccess = false
        const returnMessage = 'There was a problem with the resource, please try again later'
        const returnResults = 0
        const returnPagination = {
          total: 1,
          current: 1,
          records: 0
        }

      // Execute
      const res = await request(app)
        .delete('/uploads/')
        .query(queryParams)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Cookie', `jwt=${goodRefreshToken}`)

      // Assert
      expect(res.status).toEqual(returnStatus)
      expect(res.body.success).toEqual(returnSuccess)
      expect(res.body.message).toEqual(returnMessage)
      expect(res.body.results).toEqual(returnResults)
      expect(res.body.pagination).toEqual(returnPagination)

    })

  })

  describe('update', () => {

    /*
    * Steps to run before and after this test suite
    */
    beforeEach(async () => {
  
      /* Create 5 files for each test */
      const srcFile = '__tests__/test.jpg'
      testFiles.map(file => {
        fs.copyFile(srcFile, path.join('./public/media', file), err => {
          if(err) console.log(`Unable to copy test file to ${file}`)
        })
      })

    });
  
    afterEach(async () => {

     /* Remove the files */
     testFiles.map(file => {
      fs.unlink(path.join('./public/media', file), err => {
        if(err) console.error(err)
      })
    })

    jest.clearAllMocks();

    })

    xit('should return status 200 and updated the desired record and or image', async () => {

      // Setup

      // Set the return data from the model
      const modelReturnData = {
        success: true,
        message: 'Record successfully updated',
        results: [{id: 1}],
        pagination: {}
      }

      // Mock the return value of the model used
      jest.spyOn(uploadModel, 'update').mockImplementation(async () => {
        return modelReturnData
      })

      jest.spyOn(uploadModel, 'list').mockImplementation(async () => {
        return [{
          status: 200,
          success: true,
          message: '',
          results: [{
            id:  1,
            src: 'test001.jpg',
            title: 'Test Image 001',
            mimetype: 'image/jpeg',
            resource: 'recipe',
            resourceid: 11,
            userid: 1
          }],
          pagination: {}
        }]
      })

      // Set any form field values we need to send are
      const resource = 'cookbook'
      const resourceId = 12
      const recordid = 15
      const title = 'Test Image 001'

      // Name of the file to upload
      const fileName = 'test.jpg'

      // Set what we expect the return values to be
      const returnStatus = 201
      const returnSuccess = true
      const returnMessage = 'Record successfully updated'
      const returnResults = [{ id: 1 }]
      const returnPagination = {}

      // Execute
      const res = await request(app)
        .put(`/uploads/${1}`)
        .attach('tests', path.join(__dirname, fileName)) 
        .field('id', recordid)
        .field('resource', resource)
        .field('resourceid', resourceId)
        .field('title', title)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Cookie', `jwt=${goodRefreshToken}`)

      // Assert
      expect(res.status).toBe(returnStatus)
      expect(res.body.success).toEqual(returnSuccess)
      expect(res.body.message).toEqual(returnMessage)
      expect(res.body.results).toEqual(returnResults)
      expect(res.body.pagination).toEqual(returnPagination)

    })

    xit('should return status 401 if an unauthenticated user tries to access', async () => {

      // Setup

      // Set the return data from the model
      const modelReturnData = {}

      // Mock the return value of the model used
      jest.spyOn(uploadModel, 'update').mockImplementation(async () => {
        return modelReturnData
      })

      jest.spyOn(uploadModel, 'list').mockImplementation(async () => {
        return {
          status: 200,
          success: true,
          message: '',
          results: [{
            id:  1,
            src: 'test001.jpg',
            title: 'Test Image 001',
            mimetype: 'image/jpeg',
            resource: 'recipe',
            resourceid: 11,
            userid: 1
          }],
          pagination: {}
        }
      })

      // Set any form field values we need to send are
      const resource = 'cookbook'
      const resourceId = 12
      const recordid = 15
      const title = 'Image Test 001'

      // Name of the file to upload
      const fileName = 'test.jpg'

      // Set what we expect the return values to be
      const returnStatus = 401
      const returnSuccess = false
      const returnMessage = 'You are not authorized to access this resource, please login'

      // Execute
      const res = await request(app)
        .put(`/uploads/${1}`)
        .attach('tests', path.join(__dirname, fileName))
        .field('id', recordid)
        .field('resource', resource)
        .field('resourceid', resourceId)
        .field('title', title)
        .set('Connection', 'keep-alive')

      // Assert
      expect(res.status).toBe(returnStatus)
      expect(res.body.success).toEqual(returnSuccess)
      expect(res.body.message).toEqual(returnMessage)

    })

    xit('should return status 404 if no record was found to update', async () => {

      // Setup

      // Set the return data from the model
      const modelReturnData = {
        success: false,
        message: 'No records found to update',
        results: [],
        pagination: {}
      }

      // Mock the return value of the model used
      jest.spyOn(uploadModel, 'update').mockImplementation(async () => {
        return modelReturnData
      })

      jest.spyOn(uploadModel, 'list').mockImplementation(async () => {
        return {
          status: 200,
          success: true,
          message: '',
          results: [{
            id:  1,
            src: 'test001.jpg',
            mimetype: 'image/jpeg',
            title: 'Test Image 001',
            resource: 'recipe',
            resourceid: 11,
            userid: 1
          }],
          pagination: {}
        }
      })

      // Set any form field values we need to send are
      const resource = 'cookbook'
      const resourceId = 12
      const recordid = 15
      const title = 'Test Image 001'

      // Name of the file to upload
      const fileName = 'test.jpg'

      // Set what we expect the return values to be
      const returnStatus = 404
      const returnSuccess = false
      const returnMessage = 'No existing record found'
      const returnResults = []
      const returnPagination = {}

      // Execute
      const res = await request(app)
        .put(`/uploads/${1}`)
        .attach('tests', path.join(__dirname, fileName))
        .field('id', recordid)
        .field('resource', resource)
        .field('resourceid', resourceId)
        .field('title', title)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Cookie', `jwt=${goodRefreshToken}`)

      // Assert
      expect(res.status).toBe(returnStatus)
      expect(res.body.success).toEqual(returnSuccess)
      expect(res.body.message).toEqual(returnMessage)
      expect(res.body.results).toEqual(returnResults)
      expect(res.body.pagination).toEqual(returnPagination)

    })

    it('should return status 404 if the record id is missing', async () => {

      // Setup

      // Set the return data from the model
      const modelReturnData = {}

      // Mock the return value of the model used
      jest.spyOn(uploadModel, 'update').mockImplementation(async () => {
        return modelReturnData
      })

      jest.spyOn(uploadModel, 'list').mockImplementation(async () => {
        return {}
      })

      // Set any form field values we need to send are
      const resource = 'cookbook'
      const resourceId = 12
      const recordid = 15
      const title = 'Test Image 001'
      let id

      // Name of the file to upload
      const fileName = 'test.jpg'

      // Set what we expect the return values to be
      const returnStatus = 404
      const returnSuccess = false
      const returnMessage = 'Record id is required'
      const returnResults = []
      const returnPagination = {}

      // Execute
      const res = await request(app)
        .put(`/uploads/${id}`)
        .attach('tests', path.join(__dirname, fileName)) 
        .field('resource', resource)
        .field('resourceid', resourceId)
        .field('title', title)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Cookie', `jwt=${goodRefreshToken}`)

      // Assert
      expect(res.status).toBe(returnStatus)
      expect(res.body.success).toEqual(returnSuccess)
      expect(res.body.message).toEqual(returnMessage)
      expect(res.body.results).toEqual(returnResults)
      expect(res.body.pagination).toEqual(returnPagination)

    })

    xit('should return status 400 if the record id is of the wrong type', async () => {

      // Setup

      // Set the return data from the model
      const modelReturnData = {}

      // Mock the return value of the model used
      jest.spyOn(uploadModel, 'update').mockImplementation(async () => {
        return modelReturnData
      })

      jest.spyOn(uploadModel, 'list').mockImplementation(async () => {})

      // Set any form field values we need to send are
      const resource = 'cookbook'
      const resourceId = 12
      const recordid = 'steven'
      const title = 'Test Image 001'

      // Name of the file to upload
      const fileName = 'test.jpg'

      // Set what we expect the return values to be
      const returnStatus = 400
      const returnSuccess = false
      const returnMessage = 'Record id must be a number'
      const returnResults = []
      const returnPagination = {}

      // Execute
      const res = await request(app)
        .put(`/uploads/${'stevem'}`)
        .attach('tests', path.join(__dirname, fileName))
        .field('id', recordid)
        .field('resource', resource)
        .field('resourceid', resourceId)
        .field('title', title)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Cookie', `jwt=${goodRefreshToken}`)

      // Assert
      expect(res.status).toBe(returnStatus)
      expect(res.body.success).toEqual(returnSuccess)
      expect(res.body.message).toEqual(returnMessage)
      expect(res.body.results).toEqual(returnResults)
      expect(res.body.pagination).toEqual(returnPagination)

    })

    xit('should return status 404 if resource name is missing', async () => {

      // Setup

      // Set the return data from the model
      const modelReturnData = {}

      // Mock the return value of the model used
      jest.spyOn(uploadModel, 'update').mockImplementation(async () => {
        return modelReturnData
      })

      jest.spyOn(uploadModel, 'list').mockImplementation(async () => {
        return {
          status: 200,
          success: true,
          message: '',
          results: [{
            id:  1,
            src: 'test001.jpg',
            title: 'Test Imwge 001',
            mimetype: 'image/jpeg',
            resource: 'recipe',
            resourceid: 11,
            userid: 1
          }],
          pagination: {}
        }
      })

      // Set any form field values we need to send are
      const resource = 'cookbook'
      const resourceId = 12
      const recordid = 15
      const title = 'Test image 002'

      // Name of the file to upload
      const fileName = 'test.jpg'

      // Set what we expect the return values to be
      const returnStatus = 404
      const returnSuccess = false
      const returnMessage = 'Resource name is required'
      const returnResults = []
      const returnPagination = {}

      // Execute
      const res = await request(app)
        .put(`/uploads/${1}`)
        .attach('tests', path.join(__dirname, fileName))
        .field('id', recordid)
        .field('resourceid', resourceId)
        .field('title', title)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Cookie', `jwt=${goodRefreshToken}`)

      // Assert
      expect(res.status).toBe(returnStatus)
      expect(res.body.success).toEqual(returnSuccess)
      expect(res.body.message).toEqual(returnMessage)
      expect(res.body.results).toEqual(returnResults)
      expect(res.body.pagination).toEqual(returnPagination)

    })

    xit('should return status 400 if resource name is of the wrong type', async () => {

      // Setup

      // Set the return data from the model
      const modelReturnData = {}

      // Mock the return value of the model used
      jest.spyOn(uploadModel, 'update').mockImplementation(async () => {
        return modelReturnData
      })

      jest.spyOn(uploadModel, 'list').mockImplementation(async () => {
        return {}
      })

      // Set any form field values we need to send are
      const resource = 6758
      const resourceId = 12
      const recordid = 15
      const title = 'Test Image 001'

      // Name of the file to upload
      const fileName = 'test.jpg'

      // Set what we expect the return values to be
      const returnStatus = 400
      const returnSuccess = false
      const returnMessage = 'Resource name must be a string'
      const returnResults = []
      const returnPagination = {}

      // Execute
      const res = await request(app)
        .put(`/uploads/${1}`)
        .attach('tests', path.join(__dirname, fileName))
        .field('id', recordid)
        .field('resource', resource)
        .field('resourceid', resourceId)
        .field('title', title)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Cookie', `jwt=${goodRefreshToken}`)

      // Assert
      expect(res.status).toBe(returnStatus)
      expect(res.body.success).toEqual(returnSuccess)
      expect(res.body.message).toEqual(returnMessage)
      expect(res.body.results).toEqual(returnResults)
      expect(res.body.pagination).toEqual(returnPagination)

    })

    xit('should return status 404 if the image title is missing', async () => {

      // Setup

      // Set the return data from the model
      const modelReturnData = {}

      // Mock the return value of the model used
      jest.spyOn(uploadModel, 'update').mockImplementation(async () => {
        return modelReturnData
      })

      jest.spyOn(uploadModel, 'list').mockImplementation(async () => {
        return []
      })

      // Set any form field values we need to send are
      const resource = 'cookbook'
      const resourceId = 12
      const recordid = 15
      const title = 'Test Image 001'

      // Name of the file to upload
      const fileName = 'test.jpg'

      // Set what we expect the return values to be
      const returnStatus = 404
      const returnSuccess = false
      const returnMessage = 'Image title is required'
      const returnResults = []
      const returnPagination = {}

      // Execute
      const res = await request(app)
        .put(`/uploads/${1}`)
        .attach('tests', path.join(__dirname, fileName)) 
        .field('id', recordid)
        .field('resource', resource)
        .field('resourceid', resourceId)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Cookie', `jwt=${goodRefreshToken}`)

      // Assert
      expect(res.status).toBe(returnStatus)
      expect(res.body.success).toEqual(returnSuccess)
      expect(res.body.message).toEqual(returnMessage)
      expect(res.body.results).toEqual(returnResults)
      expect(res.body.pagination).toEqual(returnPagination)

    })

    xit('should return status 400 if image title is of the wrong format', async () => {

      // Setup

      // Set the return data from the model
      const modelReturnData = {}

      // Mock the return value of the model used
      jest.spyOn(uploadModel, 'update').mockImplementation(async () => {
        return modelReturnData
      })

      jest.spyOn(uploadModel, 'list').mockImplementation(async () => {
        return []
      })

      // Set any form field values we need to send are
      const resource = 'cookbook'
      const resourceId = 12
      const recordid = 15
      const title = [ 4556327 ]

      // Name of the file to upload
      const fileName = 'test.jpg'

      // Set what we expect the return values to be
      const returnStatus = 400
      const returnSuccess = false
      const returnMessage = 'Image title must be a string'
      const returnResults = []
      const returnPagination = {}

      // Execute
      const res = await request(app)
        .put(`/uploads/${1}`)
        .attach('tests', path.join(__dirname, fileName)) 
        .field('id', recordid)
        .field('resource', resource)
        .field('resourceid', resourceId)
        .field('title', title)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Cookie', `jwt=${goodRefreshToken}`)

      // Assert
      expect(res.status).toBe(returnStatus)
      expect(res.body.success).toEqual(returnSuccess)
      expect(res.body.message).toEqual(returnMessage)
      expect(res.body.results).toEqual(returnResults)
      expect(res.body.pagination).toEqual(returnPagination)

    })

    xit('should return status 404 if resource id is missing', async () => {

      // Setup

      // Set the return data from the model
      const modelReturnData = {}

      // Mock the return value of the model used
      jest.spyOn(uploadModel, 'update').mockImplementation(async () => {
        return modelReturnData
      })

      jest.spyOn(uploadModel, 'list').mockImplementation(async () => {
        return {
          status: 200,
          success: true,
          message: '',
          results: [{
            id:  1,
            src: 'test001.jpg',
            title: 'Test Image 001',
            mimetype: 'image/jpeg',
            resource: 'recipe',
            resourceid: 11,
            userid: 1
          }],
          pagination: {}
        }
      })

      // Set any form field values we need to send are
      const resource = 'cookbook'
      const resourceId = 12
      const recordid = 15
      const title = 'Test Image 001'

      // Name of the file to upload
      const fileName = 'test.jpg'

      // Set what we expect the return values to be
      const returnStatus = 404
      const returnSuccess = false
      const returnMessage = 'Resource id is required'
      const returnResults = []
      const returnPagination = {}

      // Execute
      const res = await request(app)
        .put(`/uploads/${1}`)
        .attach('tests', path.join(__dirname, fileName)) 
        .field('id', recordid)
        .field('resource', resource)
        .field('title', title)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Cookie', `jwt=${goodRefreshToken}`)

      // Assert
      expect(res.status).toBe(returnStatus)
      expect(res.body.success).toEqual(returnSuccess)
      expect(res.body.message).toEqual(returnMessage)
      expect(res.body.results).toEqual(returnResults)
      expect(res.body.pagination).toEqual(returnPagination)

    })

    xit('should return status 400 if resource id is of the wrong type', async () => {

      // Setup

      // Set the return data from the model
      const modelReturnData = {}

      // Mock the return value of the model used
      jest.spyOn(uploadModel, 'update').mockImplementation(async () => {
        return modelReturnData
      })

      jest.spyOn(uploadModel, 'list').mockImplementation(async () => {
        return {
          status: 200,
          success: true,
          message: '',
          results: [{
            id:  1,
            src: 'test001.jpg',
            title: 'Test Image 001',
            mimetype: 'image/jpeg',
            resource: 'recipe',
            resourceid: 11,
            userid: 1
          }],
          pagination: {}
        }
      })

      // Set any form field values we need to send are
      const resource = 'cookbook'
      const resourceId = 'Seargant'
      const recordid = 15
      const title = 'Test Image 001'

      // Name of the file to upload
      const fileName = 'test.jpg'

      // Set what we expect the return values to be
      const returnStatus = 400
      const returnSuccess = false
      const returnMessage = 'Resource id must be a number'
      const returnResults = []
      const returnPagination = {}

      // Execute
      const res = await request(app)
        .put(`/uploads/${1}`)
        .attach('tests', path.join(__dirname, fileName))
        .field('id', recordid) 
        .field('resource', resource)
        .field('resourceid', resourceId)
        .field('title', title)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Cookie', `jwt=${goodRefreshToken}`)

      // Assert
      expect(res.status).toBe(returnStatus)
      expect(res.body.success).toEqual(returnSuccess)
      expect(res.body.message).toEqual(returnMessage)
      expect(res.body.results).toEqual(returnResults)
      expect(res.body.pagination).toEqual(returnPagination)

    })

    xit('should return status 500 for any other error', async () => {

      // Setup

      // Set the return data from the model
      const modelReturnData = {
        success: false,
        message: 'There was a problem with the resource, please try again later'
      }

      // Mock the return value of the model used
      jest.spyOn(uploadModel, 'update').mockImplementation(async () => {
        return modelReturnData
      })

      jest.spyOn(uploadModel, 'list').mockImplementation(async () => {
        return modelReturnData
      })

      // Set any form field values we need to send are
      const resource = 'cookbook'
      const resourceId = 12
      const recordid = 15
      const title = 'Test Image 001'

      // Name of the file to upload
      const fileName = 'test.jpg'

      // Set what we expect the return values to be
      const returnStatus = 500
      const returnSuccess = false
      const returnMessage = 'There was a problem with the resource, please try again later'
      const returnResults = []
      const returnPagination = {}

      // Execute
      const res = await request(app)
        .put(`/uploads/${1}`)
        .attach('tests', path.join(__dirname, fileName)) 
        .field('id', recordid)
        .field('resource', resource)
        .field('resourceid', resourceId)
        .field('title', title)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Cookie', `jwt=${goodRefreshToken}`)

      // Assert
      expect(res.status).toBe(returnStatus)
      expect(res.body.success).toEqual(returnSuccess)
      expect(res.body.message).toEqual(returnMessage)
      expect(res.body.results).toEqual(returnResults)
      expect(res.body.pagination).toEqual(returnPagination)

    })

  })

});
