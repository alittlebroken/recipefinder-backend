/* Modules required for the tests */
const messageHelper = require('../helpers/constants');
const cookbookCategoriesModel = require('../models/cookbookCategoriesModel');
const cookbookRecipesModel = require('../models/cookbookRecipesModel');
//const cookbookModel = require('../models/cookbookModel');
const userModel = require('../models/userModel');
const request = require('supertest');
const app = require('../index.js');

describe('cookbookController', () => {

  beforeEach(async () => {

    cookbookModel = require('../models/cookbookModel');

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

  describe('list', () => {

    /*
     * Steps to run before and after this test suite
     */
    beforeEach(async () => {
  
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    })
  
    it('returns all cookbooks', async () => {
  
      /* Mock any data needed */
      const mockCookbooks = [
        {
          id: 2,
          userId: 2,
          name: 'Choclovers paradise',
          description: 'A small collection of chocholate dishes for everyones taste',
          image: './images/3897234273/32487234.jpg'
        }
      ];
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'findAll').mockImplementation(() => {
        return mockCookbooks;
      });
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Set the expect return values */
      const returnStatus = 200;
      const returnSuccess = true;
      const message = '';

  /* Execute the test */
      const res = await request(app)
        .get(`/cookbooks/`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(1);

      expect(res.body[0].id).toEqual(2);
      expect(res.body[0].userId).toEqual(2);
      expect(res.body[0].name).toEqual('Choclovers paradise');
      expect(res.body[0].description).toEqual('A small collection of chocholate dishes for everyones taste');
      expect(res.body[0].image).toEqual('./images/3897234273/32487234.jpg');
  
    });
  
    it('should return 401 if a non logged in user tries to access the resource', async () => {
  
      /* Mock any data needed */
      const mockCookbooks = [];
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'findAll').mockImplementation(() => {
        return mockCookbooks;
      });
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Set the expect return values */
      const returnStatus = 401;
      const returnSuccess = false;
      const returnMessage = '';

      /* Execute the test */
      const res = await request(app)
        .get(`/cookbooks/`);

      expect(res.status).toEqual(returnStatus);
  
    });

    it('should return status 403 if a unauthorised users tries to use this resource', async () => {

      // Set Mocked data that models and controllers should return
      const modelreturnData = [];
    
      // Set Mocked data that models and controllers should return
      
      // Mock any needed third party modules
      jest.spyOn(userModel, 'findById').mockImplementationOnce(() => {
        return [failUser]
      })

      jest.spyOn(cookbookModel, 'findAll').mockImplementation(() => {
        return mockCookbooks;
      });
  
      // Set here the expected return values for the test
      const returnStatus = 403;
      const returnSuccess = false;
      const returnMessage = 'You are not authorized to access the specified route';
  
      /* Execute the function */
      const res = await request(app)
        .get(`/cookbooks/`)
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

    it('throws a 404 error if no data found', async () => {
  
      /* Mock any data needed */
      const mockCookbooks = [];
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'findAll').mockImplementation(() => {
        return mockCookbooks;
      });
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Set the expect return values */
      const returnStatus = 404;
      const returnSuccess = false;
      const returnMessage = 'There were no cookbooks to find';

      /* Execute the test */
      const res = await request(app)
        .get(`/cookbooks/`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 500 if the resource encounters any other problem', async () => {
  
      /* Mock any data needed */
      const mockCookbooks = {
        success: false,
        message: 'There was an issue with the resource, please try again late'
      };
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'findAll').mockImplementation(() => {
        return mockCookbooks;
      });
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Set the expect return values */
      const returnStatus = 500;
      const returnSuccess = false;
      const returnMessage = 'There was a problem with the resource, please try again later';

      /* Execute the test */
      const res = await request(app)
        .get(`/cookbooks/`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });
  
  });
  
  describe('getById', () => {
  
    /*
     * Steps to run before and after this test suite
     */
    beforeEach(async () => {
  
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    })
  
    it('should return status 200 and the specified record', async () => {
  
      /* Mock any data needed */
      const mockCookbooks = [
        {
          id: 2,
          userId: 2,
          name: 'Choclovers paradise',
          description: 'A small collection of chocholate dishes for everyones taste',
          image: './images/3897234273/32487234.jpg'
        }
      ];
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'findById').mockImplementation(() => {
        return mockCookbooks;
      });
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {};
      const mockNext = jest.fn();
  
      /* Set the expect return values */
      const returnStatus = 200;
      const returnSuccess = true;
      const returnMessage = '';

      /* Set any needed values to send to the route */
      const cookbookId = 2;

      /* Execute the test */
      const res = await request(app)
        .get(`/cookbooks/${cookbookId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(1);

      expect(res.body[0].id).toEqual(2);
      expect(res.body[0].userId).toEqual(2);
      expect(res.body[0].name).toEqual('Choclovers paradise');
      expect(res.body[0].description).toEqual('A small collection of chocholate dishes for everyones taste');
      expect(res.body[0].image).toEqual('./images/3897234273/32487234.jpg');

    });
  
    it('should return status 401 if a non logged in user tries to access this resource', async () => {
  
      /* Mock any data needed */
      const mockCookbooks = [];
  
      /* set any values that need to be passed to the route */
      let cookbookId = 1;

      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'findById').mockImplementation(() => {
        return mockCookbooks;
      });
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {};
      const mockNext = jest.fn();
  
      /* Set the expect return values */
      const returnStatus = 401;
      const returnSuccess = false;
      const returnMessage = '';

      /* Set any needed values to send to the route */
      cookbookId;

      /* Execute the test */
      const res = await request(app)
        .get(`/cookbooks/${cookbookId}`);

      expect(res.status).toEqual(returnStatus);
  
    });

    it('should return status 400 if cookbook id is undefined', async () => {
  
      /* Mock any data needed */
      const mockCookbooks = [];
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'findById').mockImplementation(() => {
        return mockCookbooks;
      });
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {};
      const mockNext = jest.fn();
  
      /* Set the expect return values */
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined id';

      /* Set any needed values to send to the route */
      let cookbookId;

      /* Execute the test */
      const res = await request(app)
        .get(`/cookbooks/${cookbookId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });
  
    it('throws a 404 error if no data found', async () => {
  
      /* Mock any data needed */
      const mockCookbooks = [];
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'findById').mockImplementation(() => {
        return mockCookbooks;
      });
  
      /* Mock Express request and response */
      const mockRequest = {  params: { id: 43 } };
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Set any values needed for request params or body */
      const cookbookId = 25;

      /* Set the expect return values */
      const returnStatus = 404;
      const returnSuccess = false;
      const returnMessage = 'No matching cookbook found';

      /* Execute the test */
      const res = await request(app)
      .get(`/cookbooks/${cookbookId}`)
      .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 500 if the resource encounters any other problems', async () => {
  
      /* Mock any data needed */
      const mockCookbooks = {
        success: false,
        message: 'There was an issue with the resource, please try again later'
      };
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'findById').mockImplementation(() => {
        return mockCookbooks;
      });
  
      /* Mock Express request and response */
      const mockRequest = { };
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Set any values needed for request params or body */
      const cookbookId = 25;

      /* Set the expect return values */
      const returnStatus = 500;
      const returnSuccess = false;
      const returnMessage = 'There was a problem with the resource, please try again later';

      /* Execute the test */
      const res = await request(app)
      .get(`/cookbooks/${cookbookId}`)
      .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
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
  
    it('should return status 200 and create a new cookbook', async () => {
  
      /* Mock any data needed */
      const mockReturnData = {
        success: true,
        message: 'Cookbook successfully added'
      };

      const payload = {
        userId: 1,
        name: 'Vegan Choocy Woccy Bites',
        description: 'To die for, melt in your mouth, treats',
        image: 'chocolate.jpg'
      }
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'create').mockImplementation(() => {
        return mockReturnData;
      });
  
        /* Set the expect return values */
        const returnStatus = 200;
        const returnSuccess = true;
        const returnMessage = 'Cookbook successfully added';

        /* Execute the test */
        const res = await request(app)
          .post(`/cookbooks/`)
          .send(payload)
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).toEqual(returnStatus);

        expect(typeof res.body.success).toBe('boolean');
        expect(typeof res.body.message).toBe('string');

        expect(res.body.success).toBe(returnSuccess);
        expect(res.body.message).toBe(returnMessage);
  
    });
  
    it('should return status 401 if a non logged in user tries to access this resource', async () => {
  
      /* Mock any data needed */
      const mockReturnData = {};

      const payload = {
        name: 'Vegan Choocy Woccy Bites',
        description: 'To die for, melt in your mouth, treats',
        image: 'chocolate.jpg'
      }
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'create').mockImplementation(() => {
        return mockReturnData;
      });
  
        /* Set the expect return values */
        const returnStatus = 401;
        const returnSuccess = false;
        const returnMessage = '';

        /* Execute the test */
        const res = await request(app)
          .post(`/cookbooks/`)
          .send(payload);

        expect(res.status).toEqual(returnStatus);
  
    });

    it('should return status 400 if userId is undefined', async () => {
  
      /* Mock any data needed */
      const mockReturnData = {};

      const payload = {
        name: 'Vegan Choocy Woccy Bites',
        description: 'To die for, melt in your mouth, treats',
        image: 'chocolate.jpg'
      }
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'create').mockImplementation(() => {
        return mockReturnData;
      });
  
        /* Set the expect return values */
        const returnStatus = 400;
        const returnSuccess = false;
        const returnMessage = 'Undefined userId';

        /* Execute the test */
        const res = await request(app)
          .post(`/cookbooks/`)
          .send(payload)
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).toEqual(returnStatus);

        expect(typeof res.body.success).toBe('boolean');
        expect(typeof res.body.message).toBe('string');

        expect(res.body.success).toBe(returnSuccess);
        expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 400 if userId is of the wrong format', async () => {
  
      /* Mock any data needed */
      const mockReturnData = {};

      const payload = {
        userId: 'eleventy',
        name: 'Vegan Choocy Woccy Bites',
        description: 'To die for, melt in your mouth, treats',
        image: 'chocolate.jpg'
      }
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'create').mockImplementation(() => {
        return mockReturnData;
      });
  
        /* Set the expect return values */
        const returnStatus = 400;
        const returnSuccess = false;
        const returnMessage = 'Wrong format for userId';

        /* Execute the test */
        const res = await request(app)
          .post(`/cookbooks/`)
          .send(payload)
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).toEqual(returnStatus);

        expect(typeof res.body.success).toBe('boolean');
        expect(typeof res.body.message).toBe('string');

        expect(res.body.success).toBe(returnSuccess);
        expect(res.body.message).toBe(returnMessage);
  
    });
  
    it('should return status 400 if name is undefined', async () => {
  
      /* Mock any data needed */
      const mockReturnData = [];

      const payload = {
        userId: 1,
        description: 'To die for, melt in your mouth, treats',
        image: 'chocolate.jpg'
      }
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'create').mockImplementation(() => {
        return mockReturnData;
      });
  
        /* Set the expect return values */
        const returnStatus = 400;
        const returnSuccess = false;
        const returnMessage = 'Undefined name';

        /* Execute the test */
        const res = await request(app)
          .post(`/cookbooks/`)
          .send(payload)
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).toEqual(returnStatus);

        expect(typeof res.body.success).toBe('boolean');
        expect(typeof res.body.message).toBe('string');

        expect(res.body.success).toBe(returnSuccess);
        expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 400 if name is of the wrong format', async () => {
  
      /* Mock any data needed */
      const mockReturnData = [];

      const payload = {
        userId: 1,
        name: 2,
        description: 'To die for, melt in your mouth, treats',
        image: 'chocolate.jpg'
      }
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'create').mockImplementation(() => {
        return mockReturnData;
      });
  
        /* Set the expect return values */
        const returnStatus = 400;
        const returnSuccess = false;
        const returnMessage = 'Wrong format for name';

        /* Execute the test */
        const res = await request(app)
          .post(`/cookbooks/`)
          .send(payload)
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).toEqual(returnStatus);

        expect(typeof res.body.success).toBe('boolean');
        expect(typeof res.body.message).toBe('string');

        expect(res.body.success).toBe(returnSuccess);
        expect(res.body.message).toBe(returnMessage);
  
    });
  
    it('should return status 400 if descirption is undefined', async () => {
  
      /* Mock any data needed */
      const mockReturnData = [];

      const payload = {
        userId: 1,
        name: 'Vegan Choocy Woccy Bites',
        image: 'chocolate.jpg'
      }
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'create').mockImplementation(() => {
        return mockReturnData;
      });
  
        /* Set the expect return values */
        const returnStatus = 400;
        const returnSuccess = false;
        const returnMessage = 'Undefined description';

        /* Execute the test */
        const res = await request(app)
          .post(`/cookbooks/`)
          .send(payload)
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).toEqual(returnStatus);

        expect(typeof res.body.success).toBe('boolean');
        expect(typeof res.body.message).toBe('string');

        expect(res.body.success).toBe(returnSuccess);
        expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 400 if description is of the wrong format', async () => {
  
      /* Mock any data needed */
      const mockReturnData = [];

      const payload = {
        userId: 1,
        name: 'Vegan Choocy Woccy Bites',
        description: 9,
        image: 'chocolate.jpg'
      }
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'create').mockImplementation(() => {
        return mockReturnData;
      });
  
        /* Set the expect return values */
        const returnStatus = 400;
        const returnSuccess = false;
        const returnMessage = 'Wrong format for description';

        /* Execute the test */
        const res = await request(app)
          .post(`/cookbooks/`)
          .send(payload)
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).toEqual(returnStatus);

        expect(typeof res.body.success).toBe('boolean');
        expect(typeof res.body.message).toBe('string');

        expect(res.body.success).toBe(returnSuccess);
        expect(res.body.message).toBe(returnMessage);
  
    });
  
    it('should return status 500 if the resource encounters any other problem', async () => {
  
      /* Mock any data needed */
      const mockReturnData = {
        success: false,
        message: 'There was an issue with the resource, please try again later'
      };

      const payload = {
        userId: 1,
        name: 'Vegan Choocy Woccy Bites',
        description: 'To die for, melt in your mouth, treats',
        image: 'chocolate.jpg'
      }
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'create').mockImplementation(() => {
        return mockReturnData;
      });
  
        /* Set the expect return values */
        const returnStatus = 500;
        const returnSuccess = false;
        const returnMessage = 'There was a problem with the resource, please try again later';

        /* Execute the test */
        const res = await request(app)
          .post(`/cookbooks/`)
          .send(payload)
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).toEqual(returnStatus);

        expect(typeof res.body.success).toBe('boolean');
        expect(typeof res.body.message).toBe('string');

        expect(res.body.success).toBe(returnSuccess);
        expect(res.body.message).toBe(returnMessage);
  
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
  
    it('should return status 200 and updated the specified cookbook', async () => {
  
      /* Mock any data needed */
      const mockReturnData = {
        success: true,
        message: 'Cookbook successfully updated'
      };

      const payload = {
        userId: 1,
        name: 'Fanatastic meals and where to find them',
        description: 'Meals that are simply magical',
        image: '829347293473.jpg'
      }

      const cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
        return mockReturnData;
      });
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Set the expect return values */
      const returnStatus = 200;
      const returnSuccess = true;
      const returnMessage = 'Cookbook successfully updated';

      /* Execute the test */
      const res = await request(app)
        .put(`/cookbooks/${cookbookId}`)
        .send(payload)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });
  
    it('should return status 401 if a non logged in user tries to access the resource', async () => {
  
      /* Mock any data needed */
      const mockReturnData = [];

      const payload = {
        userId: 1,
        name: 'Fanatastic meals and where to find them',
        description: 'Meals that are simply magical',
        image: '829347293473.jpg'
      }

      const cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
        return mockReturnData;
      });
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Set the expect return values */
      const returnStatus = 401;
      const returnSuccess = false;
      const returnMessage = '';

      /* Execute the test */
      const res = await request(app)
        .put(`/cookbooks/${cookbookId}`)
        .send(payload);

      expect(res.status).toEqual(returnStatus);
  
    });
  
    it('should return status 400 if cookbook is is undefined', async () => {
  
      /* Mock any data needed */
      const mockReturnData = [];

      const payload = {
        userId: 1,
        name: 'Fanatastic meals and where to find them',
        description: 'Meals that are simply magical',
        image: '829347293473.jpg'
      }

      let cookbookId;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
        return mockReturnData;
      });
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Set the expect return values */
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined id';

      /* Execute the test */
      const res = await request(app)
        .put(`/cookbooks/${cookbookId}`)
        .send(payload)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 400 if userId is undefined', async () => {
  
      /* Mock any data needed */
      const mockReturnData = {
        success: true,
        message: 'Cookbook successfully updated'
      };

      const payload = {
        
        name: 'Fanatastic meals and where to find them',
        description: 'Meals that are simply magical',
        image: '829347293473.jpg'
      }

      const cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
        return mockReturnData;
      });
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Set the expect return values */
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined userId';

      /* Execute the test */
      const res = await request(app)
        .put(`/cookbooks/${cookbookId}`)
        .send(payload)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 400 if userId is of the wrong format', async () => {
  
      /* Mock any data needed */
      const mockReturnData = [];

      const payload = {
        userId: 'eleventy',
        name: 'Fanatastic meals and where to find them',
        description: 'Meals that are simply magical',
        image: '829347293473.jpg'
      }

      const cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
        return mockReturnData;
      });
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Set the expect return values */
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Wrong userId format';

      /* Execute the test */
      const res = await request(app)
        .put(`/cookbooks/${cookbookId}`)
        .send(payload)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 400 if name is undefined', async () => {
  
      /* Mock any data needed */
      const mockReturnData = [];

      const payload = {
        userId: 1,
        
        description: 'Meals that are simply magical',
        image: '829347293473.jpg'
      }

      const cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
        return mockReturnData;
      });
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Set the expect return values */
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined name';

      /* Execute the test */
      const res = await request(app)
        .put(`/cookbooks/${cookbookId}`)
        .send(payload)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 400 if name is of the wrong format', async () => {
  
      /* Mock any data needed */
      const mockReturnData = [];

      const payload = {
        userId: 1,
        name: 12,
        description: 'Meals that are simply magical',
        image: '829347293473.jpg'
      }

      const cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
        return mockReturnData;
      });
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Set the expect return values */
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Wrong name format';

      /* Execute the test */
      const res = await request(app)
        .put(`/cookbooks/${cookbookId}`)
        .send(payload)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 400 if description is undefined', async () => {
  
      /* Mock any data needed */
      const mockReturnData = [];

      const payload = {
        userId: 1,
        name: 'Fanatastic meals and where to find them',
        image: '829347293473.jpg'
      }

      const cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
        return mockReturnData;
      });
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Set the expect return values */
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined description';

      /* Execute the test */
      const res = await request(app)
        .put(`/cookbooks/${cookbookId}`)
        .send(payload)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 400 if description is of the wrong format', async () => {
  
      /* Mock any data needed */
      const mockReturnData = [];

      const payload = {
        userId: 1,
        name: 'Fanatastic meals and where to find them',
        description: 12,
        image: '829347293473.jpg'
      }

      const cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
        return mockReturnData;
      });
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Set the expect return values */
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Wrong description format';

      /* Execute the test */
      const res = await request(app)
        .put(`/cookbooks/${cookbookId}`)
        .send(payload)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 500 if the resource encounters any other problems', async () => {
  
      /* Mock any data needed */
      const mockReturnData = {
        success: false,
        message: 'There was an issue with the resource, please try again later'
      };

      const payload = {
        userId: 1,
        name: 'Fanatastic meals and where to find them',
        description: 'Meals that are simply magical',
        image: '829347293473.jpg'
      }

      const cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
        return mockReturnData;
      });
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Set the expect return values */
      const returnStatus = 500;
      const returnSuccess = false;
      const returnMessage = 'There was a problem with the resource, please try again later';

      /* Execute the test */
      const res = await request(app)
        .put(`/cookbooks/${cookbookId}`)
        .send(payload)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });
  
  });
  
  describe('remove', () => {
  
    /*
     * Steps to run before and after this test suite
     */
    beforeEach(async () => {
  
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    })
  
    it('should return status 200 and removed the specified cookbook', async () => {
  
      /* Mock any data needed */
      const mockReturnData = {
        success: true,
        message: 'Cookbook successfully removed'
      };
  
      const cookbookId = 1;

      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'remove').mockImplementation(() => {
        return mockReturnData;
      });
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Set the expect return values */
      const returnStatus = 200;
      const returnSuccess = true;
      const returnMessage = 'Cookbook successfully removed';

      /* Execute the test */
      const res = await request(app)
        .delete(`/cookbooks/${cookbookId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });
  
    it('should return status 401 if a non logged in user ties to access this resource', async () => {
  
      /* Mock any data needed */
      const mockReturnData = [];
  
      const cookbookId = 1;

      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'remove').mockImplementation(() => {
        return mockReturnData;
      });
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Set the expect return values */
      const returnStatus = 401;
      const returnSuccess = false;
      const returnMessage = '';

      /* Execute the test */
      const res = await request(app)
        .delete(`/cookbooks/${cookbookId}`);

      expect(res.status).toEqual(returnStatus);
  
    });

    it('should return status 400 if cookbook id is undefined', async () => {
  
      /* Mock any data needed */
      const mockReturnData = [];
  
      let cookbookId;

      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'remove').mockImplementation(() => {
        return mockReturnData;
      });
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Set the expect return values */
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined id';

      /* Execute the test */
      const res = await request(app)
        .delete(`/cookbooks/${cookbookId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 500 if the resource encounters any other problem', async () => {
  
      /* Mock any data needed */
      const mockReturnData = {
        success: false,
        message: 'There was an issue with the resource, please try again later'
      };
  
      const cookbookId = 1;

      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'remove').mockImplementation(() => {
        return mockReturnData;
      });
  
      /* Mock Express request and response */
      const mockRequest = {};
      const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      const mockNext = jest.fn();
  
      /* Set the expect return values */
      const returnStatus = 500;
      const returnSuccess = false;
      const returnMessage = 'There was a problem with the resource, please try again later';

      /* Execute the test */
      const res = await request(app)
        .delete(`/cookbooks/${cookbookId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });
  
  });
  
  describe('recipes', () => {
  
    /*
     * Steps to run before and after this test suite
     */
    beforeEach(async () => {
  
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    })
  
    it('should return status 200 and all recipes associated with a specific cookbook', async () => {
  
      /* Mock any data needed */
      const mockReturnData = [{
        id: 1,
        name: 'Vegan chocolate waffles',
        rating: 5,
        categories: [
          {
            id: 1,
            name: 'chocolate'
          }
        ]
      }];

      /* Set any values we need to pass to the route */
      let cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'recipes').mockImplementation(() => {
        return mockReturnData;
      });
  
      /* Set the expect return values */
      const returnStatus = 200;
      const returnSuccess = true;
      const returnMessage = '';

      /* Execute the test */
      const res = await request(app)
        .get(`/cookbooks/${cookbookId}/recipes`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(1);

      expect(res.body[0].id).toEqual(1);
      expect(res.body[0].name).toEqual('Vegan chocolate waffles');
      expect(res.body[0].rating).toEqual(5);

      expect(Array.isArray(res.body[0].categories)).toBe(true);
      expect(res.body[0].categories).toHaveLength(1);
      expect(res.body[0].categories[0].id).toEqual(1);
      expect(res.body[0].categories[0].name).toEqual('chocolate');
  
    });
  
    it('should return status 401 if a non logged in user tries to access the resource', async () => {
  
      /* Mock any data needed */
      const mockReturnData = [];

      /* Set any values we need to pass to the route */
      let cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'recipes').mockImplementation(() => {
        return mockReturnData;
      });
  
      /* Set the expect return values */
      const returnStatus = 401;
      const returnSuccess = false;
      const returnMessage = '';

      /* Execute the test */
      const res = await request(app)
        .get(`/cookbooks/${cookbookId}/recipes`);

      expect(res.status).toEqual(returnStatus);
  
    });

    it('should return status 404 if the cookbook has no recipes as of yet', async () => {
  
      /* Mock any data needed */
      const mockReturnData = [];

      /* Set any values we need to pass to the route */
      let cookbookId = 2;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'recipes').mockImplementation(() => {
        return mockReturnData;
      });
  
      /* Set the expect return values */
      const returnStatus = 404;
      const returnSuccess = false;
      const returnMessage = 'The cookbook currently has no recipes';

      /* Execute the test */
      const res = await request(app)
        .get(`/cookbooks/${cookbookId}/recipes`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 400 if cookbook id is undefined', async () => {
  
      /* Mock any data needed */
      const mockReturnData = [];

      /* Set any values we need to pass to the route */
      let cookbookId;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'recipes').mockImplementation(() => {
        return mockReturnData;
      });
  
      /* Set the expect return values */
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined id';

      /* Execute the test */
      const res = await request(app)
        .get(`/cookbooks/${cookbookId}/recipes`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 500 if the resource encounters any other problem', async () => {
  
      /* Mock any data needed */
      const mockReturnData = {
        success: false,
        message: 'There was an issue with the resource, please try again later'
      };

      /* Set any values we need to pass to the route */
      let cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'recipes').mockImplementation(() => {
        return mockReturnData;
      });
  
      /* Set the expect return values */
      const returnStatus = 500;
      const returnSuccess = false;
      const returnMessage = 'There was a problem with the resource, please try again later';

      /* Execute the test */
      const res = await request(app)
        .get(`/cookbooks/${cookbookId}/recipes`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });
  
  });
  
  describe('getCategories', () => {
  
    /*
     * Steps to run before and after this test suite
     */
    beforeEach(async () => {
  
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    })
  
    it('should return status 200 and all categories for specified cookbook', async () => {
  
      /* Mock any data needed */
      const mockCookbookCategories = [
        {
          id: 1,
          cookbookId: 1,
          categoryName: 'Gluten free',
          categoryId: 1,
        },
        {
          id: 2,
          cookbookId: 1,
          categoryName: 'Dairy free',
          categoryId: 2
        }
      ];

      const cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookCategoriesModel, 'findByCookbook').mockImplementation(() => {
        return mockCookbookCategories;
      });
  
      /* Set the expect return values */
      const returnStatus = 200;
      const returnSuccess = true;
      const returnMessage = '';

      /* Execute the test */
      const res = await request(app)
        .get(`/cookbooks/${cookbookId}/category`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(2);

      expect(res.body[0].id).toEqual(1);
      expect(res.body[0].cookbookId).toEqual(1);
      expect(res.body[0].categoryName).toEqual('Gluten free');
      expect(res.body[0].categoryId).toEqual(1);

      expect(res.body[1].id).toEqual(2);
      expect(res.body[1].cookbookId).toEqual(1);
      expect(res.body[1].categoryName).toEqual('Dairy free');
      expect(res.body[1].categoryId).toEqual(2);
  
    });
  
    it('should return status 401 if a non logged in user tries to access this resource', async () => {
  
      /* Mock any data needed */
      const mockCookbookCategories = [];

      const cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookCategoriesModel, 'findByCookbook').mockImplementation(() => {
        return mockCookbookCategories;
      });
  
      /* Set the expect return values */
      const returnStatus = 401;
      const returnSuccess = true;
      const returnMessage = '';

      /* Execute the test */
      const res = await request(app)
        .get(`/cookbooks/${cookbookId}/category`);

      expect(res.status).toEqual(returnStatus);
  
    });

    it('should return status 400 if cookbook id is undefined', async () => {
  
      /* Mock any data needed */
      const mockCookbookCategories = [];

      let cookbookId;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookCategoriesModel, 'findByCookbook').mockImplementation(() => {
        return mockCookbookCategories;
      });
  
      /* Set the expect return values */
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined id';

      /* Execute the test */
      const res = await request(app)
        .get(`/cookbooks/${cookbookId}/category`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 404 if there are no categories for the cookbook currently', async () => {
  
      /* Mock any data needed */
      const mockCookbookCategories = [];

      let cookbookId = 456;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookCategoriesModel, 'findByCookbook').mockImplementation(() => {
        return mockCookbookCategories;
      });
  
      /* Set the expect return values */
      const returnStatus = 404;
      const returnSuccess = false;
      const returnMessage = 'The cookbook currently has no categories';

      /* Execute the test */
      const res = await request(app)
        .get(`/cookbooks/${cookbookId}/category`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 500 if the resource encounters any other problem', async () => {
  
      /* Mock any data needed */
      const mockCookbookCategories = {
        success: false,
        message: 'There was an issue with the resource, please try again later'
      };

      const cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookCategoriesModel, 'findByCookbook').mockImplementation(() => {
        return mockCookbookCategories;
      });
  
      /* Set the expect return values */
      const returnStatus = 500;
      const returnSuccess = false;
      const returnMessage = 'There was a problem with the resource, please try again later';

      /* Execute the test */
      const res = await request(app)
        .get(`/cookbooks/${cookbookId}/category`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });
  
  
  });
  
  describe('addRecipe', () => {
  
    /*
     * Steps to run before and after this test suite
     */
    beforeEach(async () => {
  
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    })
  
    it('should return status 200 and add the recipe to the specified cookbook', async () => {
  
      /* Mock any data needed */
      const mockCookbookRecipe = [{ id: 1}];

      /* Set any values to be passed to the route */
      const payload = {
        recipeId: 1
      }

      const cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookRecipesModel, 'create').mockImplementation(() => {
        return mockCookbookRecipe;
      });
  
       /* Set the expect return values */
      const returnStatus = 200;
      const returnSuccess = true;
      const returnMessage = 'Recipe added to cookbook successfully';

      /* Execute the test */
      const res = await request(app)
        .post(`/cookbooks/${cookbookId}/recipe`)
        .send(payload)
        .set('Authorization', `Bearer ${authToken}`);

      /* Test everything works as expected */
      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });
  
    it('should return status 401 if a non logged in user tries to access the resource', async () => {
  
      /* Mock any data needed */
      const mockCookbookRecipe = [];

      /* Set any values to be passed to the route */
      const payload = {
        recipeId: 1
      }

      const cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookRecipesModel, 'create').mockImplementation(() => {
        return mockCookbookRecipe;
      });
  
       /* Set the expect return values */
      const returnStatus = 401;
      const returnSuccess = true;
      const returnMessage = '';

      /* Execute the test */
      const res = await request(app)
        .post(`/cookbooks/${cookbookId}/recipe`)
        .send(payload);

      expect(res.status).toEqual(returnStatus);
  
    });

    it('should return status 400 if cookbook id is undefined', async () => {
  
      /* Mock any data needed */
      const mockCookbookRecipe = [];

      /* Set any values to be passed to the route */
      const payload = {
        recipeId: 1
      }

      let cookbookId;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookRecipesModel, 'create').mockImplementation(() => {
        return mockCookbookRecipe;
      });
  
       /* Set the expect return values */
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined id';

      /* Execute the test */
      const res = await request(app)
        .post(`/cookbooks/${cookbookId}/recipe`)
        .send(payload)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 400 if recipeId is undefined', async () => {
  
      /* Mock any data needed */
      const mockCookbookRecipe = [];

      /* Set any values to be passed to the route */
      const payload = {
        
      }

      const cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookRecipesModel, 'create').mockImplementation(() => {
        return mockCookbookRecipe;
      });
  
       /* Set the expect return values */
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined recipeId';

      /* Execute the test */
      const res = await request(app)
        .post(`/cookbooks/${cookbookId}/recipe`)
        .send(payload)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 400 if recipeId is of the wrong format', async () => {
  
      /* Mock any data needed */
      const mockCookbookRecipe = [{ id: 1}];

      /* Set any values to be passed to the route */
      const payload = {
        recipeId: '1'
      }

      const cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookRecipesModel, 'create').mockImplementation(() => {
        return mockCookbookRecipe;
      });
  
       /* Set the expect return values */
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Wrong format for recipeId';

      /* Execute the test */
      const res = await request(app)
        .post(`/cookbooks/${cookbookId}/recipe`)
        .send(payload)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 500 if the resource encoutered any other problems', async () => {
  
      /* Mock any data needed */
      const mockCookbookRecipe = {
        success: false,
        message: 'There was an issue with the resource, please try again later'
      };

      /* Set any values to be passed to the route */
      const payload = {
        recipeId: 1
      }

      const cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookRecipesModel, 'create').mockImplementation(() => {
        return mockCookbookRecipe;
      });
  
       /* Set the expect return values */
      const returnStatus = 500;
      const returnSuccess = false;
      const returnMessage = 'There was a problem with the resource, please try again later';

      /* Execute the test */
      const res = await request(app)
        .post(`/cookbooks/${cookbookId}/recipe`)
        .send(payload)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });
  
  
  });
  
  describe('addCategory', () => {
  
    /*
     * Steps to run before and after this test suite
     */
    beforeEach(async () => {
  
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    })
  
    it('should return status 200 and return a new category to the cookbook', async () => {
  
      /* Mock any data needed */
      const mockReturnData =[{ id: 1}];

      /* generate data to be sent to the route */
      const cookbookId = 1;
      const payload = {
        categoryId: 1
      }
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookCategoriesModel, 'create').mockImplementation(() => {
        return mockReturnData;
      });
  
      /* Set the expect return values */
        const returnStatus = 200;
        const returnSuccess = true;
        const returnMessage = '';

        /* Execute the test */
        const res = await request(app)
          .post(`/cookbooks/${cookbookId}/category`)
          .send(payload)
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).toEqual(returnStatus);

        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body).toHaveLength(1);

        expect(res.body[0].id).toEqual(1);
  
    });
  
    it('should return status 401 if a non logged in user tries to access this resource', async () => {
  
      /* Mock any data needed */
      const mockReturnData =[];

      /* generate data to be sent to the route */
      const cookbookId = 1;
      const payload = {
        categoryId: 1
      }
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookCategoriesModel, 'create').mockImplementation(() => {
        return mockReturnData;
      });
  
      /* Set the expect return values */
        const returnStatus = 401;
        const returnSuccess = false;
        const returnMessage = '';

        /* Execute the test */
        const res = await request(app)
          .post(`/cookbooks/${cookbookId}/category`)
          .send(payload);

        expect(res.status).toEqual(returnStatus);

    });

    it('should return status 400 if cookbook id is undefined', async () => {
  
      /* Mock any data needed */
      const mockReturnData =[];

      /* generate data to be sent to the route */
      let cookbookId;
      const payload = {
        categoryId: 1
      }
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookCategoriesModel, 'create').mockImplementation(() => {
        return mockReturnData;
      });
  
      /* Set the expect return values */
        const returnStatus = 400;
        const returnSuccess = false;
        const returnMessage = 'Undefined id';

        /* Execute the test */
        const res = await request(app)
          .post(`/cookbooks/${cookbookId}/category`)
          .send(payload)
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).toEqual(returnStatus);

        expect(typeof res.body.status).toBe('number');
        expect(typeof res.body.success).toBe('boolean');
        expect(typeof res.body.message).toBe('string');

        expect(res.body.status).toBe(returnStatus);
        expect(res.body.success).toBe(returnSuccess);
        expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 400 if category id is undefined', async () => {
  
      /* Mock any data needed */
      const mockReturnData =[];

      /* generate data to be sent to the route */
      let cookbookId = 1;
      const payload = {
        
      }
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookCategoriesModel, 'create').mockImplementation(() => {
        return mockReturnData;
      });
  
      /* Set the expect return values */
        const returnStatus = 400;
        const returnSuccess = false;
        const returnMessage = 'Undefined categoryId';

        /* Execute the test */
        const res = await request(app)
          .post(`/cookbooks/${cookbookId}/category`)
          .send(payload)
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).toEqual(returnStatus);

        expect(typeof res.body.status).toBe('number');
        expect(typeof res.body.success).toBe('boolean');
        expect(typeof res.body.message).toBe('string');

        expect(res.body.status).toBe(returnStatus);
        expect(res.body.success).toBe(returnSuccess);
        expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 400 if category id is of the wrong format', async () => {
  
      /* Mock any data needed */
      const mockReturnData =[];

      /* generate data to be sent to the route */
      let cookbookId = 1;
      const payload = {
        categoryId: [2]
      }
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookCategoriesModel, 'create').mockImplementation(() => {
        return mockReturnData;
      });
  
      /* Set the expect return values */
        const returnStatus = 400;
        const returnSuccess = false;
        const returnMessage = 'Wrong format for categoryId';

        /* Execute the test */
        const res = await request(app)
          .post(`/cookbooks/${cookbookId}/category`)
          .send(payload)
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).toEqual(returnStatus);

        expect(typeof res.body.status).toBe('number');
        expect(typeof res.body.success).toBe('boolean');
        expect(typeof res.body.message).toBe('string');

        expect(res.body.status).toBe(returnStatus);
        expect(res.body.success).toBe(returnSuccess);
        expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 404 if there were no records found matching the supplied data', async () => {
  
      /* Mock any data needed */
      const mockReturnData =[];

      /* generate data to be sent to the route */
      let cookbookId = 1;
      const payload = {
        categoryId: 1
      }
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookCategoriesModel, 'create').mockImplementation(() => {
        return mockReturnData;
      });
  
      /* Set the expect return values */
        const returnStatus = 404;
        const returnSuccess = false;
        const returnMessage = 'No data found matching supplied values';

        /* Execute the test */
        const res = await request(app)
          .post(`/cookbooks/${cookbookId}/category`)
          .send(payload)
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).toEqual(returnStatus);

        expect(typeof res.body.status).toBe('number');
        expect(typeof res.body.success).toBe('boolean');
        expect(typeof res.body.message).toBe('string');

        expect(res.body.status).toBe(returnStatus);
        expect(res.body.success).toBe(returnSuccess);
        expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 500 if the resource encounters any other problems', async () => {
  
      /* Mock any data needed */
      const mockReturnData = {
        success: false,
        message: 'There was an issue with the resource, please try again later'
      };

      /* generate data to be sent to the route */
      let cookbookId = 1;
      const payload = {
        categoryId: 1
      }
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookCategoriesModel, 'create').mockImplementation(() => {
        return mockReturnData;
      });
  
      /* Set the expect return values */
        const returnStatus = 500;
        const returnSuccess = false;
        const returnMessage = 'There was a problem with the resource, please try again later';

        /* Execute the test */
        const res = await request(app)
          .post(`/cookbooks/${cookbookId}/category`)
          .send(payload)
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).toEqual(returnStatus);

        expect(typeof res.body.status).toBe('number');
        expect(typeof res.body.success).toBe('boolean');
        expect(typeof res.body.message).toBe('string');

        expect(res.body.status).toBe(returnStatus);
        expect(res.body.success).toBe(returnSuccess);
        expect(res.body.message).toBe(returnMessage);
  
    });
  
  
  });
  
  describe('removeRecipes', () => {
  
    /*
     * Steps to run before and after this test suite
     */
    beforeEach(async () => {
  
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    })
  
    it('should return status 200 and remove all recipes from a cookbook', async () => {
  
      /* Mock any data needed */
      const mockModelReturnData = {
        success: true,
        message: 'Cookbook recipes removed successfully'
      };

      /* Values for passing to the routes */
      const cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookRecipesModel, 'removeByCookbook').mockImplementation(() => {
        return mockModelReturnData;
      });
  
      /* Set the expect return values */
      const returnStatus = 200;
      const returnSuccess = true;
      const returnMessage = 'Cookbook recipes removed successfully';

      /* Execute the test */
      const res = await request(app)
        .delete(`/cookbooks/${cookbookId}/recipes`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });
  
    it('should return status 401 if a non logged in user tries to access this resource', async () => {
  
      /* Mock any data needed */
      const mockModelReturnData = [];

      /* Values for passing to the routes */
      const cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookRecipesModel, 'removeByCookbook').mockImplementation(() => {
        return mockModelReturnData;
      });
  
      /* Set the expect return values */
      const returnStatus = 401;
      const returnSuccess = false;
      const returnMessage = '';

      /* Execute the test */
      const res = await request(app)
        .delete(`/cookbooks/${cookbookId}/recipes`);

      expect(res.status).toEqual(returnStatus);
  
    });

    it('should return status 400 if cookbook id is undefined', async () => {
  
      /* Mock any data needed */
      const mockModelReturnData = [];

      /* Values for passing to the routes */
      let cookbookId;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookRecipesModel, 'removeByCookbook').mockImplementation(() => {
        return mockModelReturnData;
      });
  
      /* Set the expect return values */
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined id';

      /* Execute the test */
      const res = await request(app)
        .delete(`/cookbooks/${cookbookId}/recipes`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 404 if no records matched the passed in id', async () => {
  
      /* Mock any data needed */
      const mockModelReturnData = [];

      /* Values for passing to the routes */
      const cookbookId = 12;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookRecipesModel, 'removeByCookbook').mockImplementation(() => {
        return mockModelReturnData;
      });
  
      /* Set the expect return values */
      const returnStatus = 404;
      const returnSuccess = false;
      const returnMessage = 'No matching records found';

      /* Execute the test */
      const res = await request(app)
        .delete(`/cookbooks/${cookbookId}/recipes`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 500 if the resource encountered any other problems', async () => {
  
      /* Mock any data needed */
      const mockModelReturnData = {
        success: false,
        message: 'There was an issue with the resource, please try again later'
      };

      /* Values for passing to the routes */
      const cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookRecipesModel, 'removeByCookbook').mockImplementation(() => {
        return mockModelReturnData;
      });
  
      /* Set the expect return values */
      const returnStatus = 500;
      const returnSuccess = false;
      const returnMessage = 'There was a problem with the resource, please try again later';

      /* Execute the test */
      const res = await request(app)
        .delete(`/cookbooks/${cookbookId}/recipes`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });
  
  });
  
  describe('removeCategories', () => {
  
    /*
     * Steps to run before and after this test suite
     */
    beforeEach(async () => {
  
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    })
  
    it('should return status 200 and remove all categories from the cookbook', async () => {
  
      /* Mock any data needed */
      const mockModelReturnData = {
        success: true,
        message: 'All categories for specified cookbook removed successfully'
      };

      /* Set the values to be passed to the route */
      const cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookCategoriesModel, 'removeByCookbook').mockImplementation(() => {
        return mockModelReturnData;
      });
  
      /* Set the expect return values */
      const returnStatus = 200;
      const returnSuccess = true;
      const returnMessage = 'All categories for specified cookbook removed successfully';

  /* Execute the test */
      const res = await request(app)
        .delete(`/cookbooks/${cookbookId}/categories`)
        .set('Authorization', `Bearer ${authToken}`);
  
      /* Test everything works as expected */
      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });
  
    it('should return status 401 if a non logged in user tries to access the resource', async () => {
  
      /* Mock any data needed */
      const mockModelReturnData = [];

      /* Set the values to be passed to the route */
      const cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookCategoriesModel, 'removeByCookbook').mockImplementation(() => {
        return mockModelReturnData;
      });
  
      /* Set the expect return values */
      const returnStatus = 401;
      const returnSuccess = false;
      const returnMessage = '';

  /* Execute the test */
      const res = await request(app)
        .delete(`/cookbooks/${cookbookId}/categories`);
  
      /* Test everything works as expected */
      expect(res.status).toEqual(returnStatus);
  
    });

    it('should return status 400 if cookbook id is undefined', async () => {
  
      /* Mock any data needed */
      const mockModelReturnData = [];

      /* Set the values to be passed to the route */
      let cookbookId;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookCategoriesModel, 'removeByCookbook').mockImplementation(() => {
        return mockModelReturnData;
      });
  
      /* Set the expect return values */
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined id';

  /* Execute the test */
      const res = await request(app)
        .delete(`/cookbooks/${cookbookId}/categories`)
        .set('Authorization', `Bearer ${authToken}`);
  
      /* Test everything works as expected */
      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 404 if no records found for removal', async () => {
  
      /* Mock any data needed */
      const mockModelReturnData = [];

      /* Set the values to be passed to the route */
      const cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookCategoriesModel, 'removeByCookbook').mockImplementation(() => {
        return mockModelReturnData;
      });
  
      /* Set the expect return values */
      const returnStatus = 404;
      const returnSuccess = false;
      const returnMessage = 'No categories found to be removed';

  /* Execute the test */
      const res = await request(app)
        .delete(`/cookbooks/${cookbookId}/categories`)
        .set('Authorization', `Bearer ${authToken}`);
  
      /* Test everything works as expected */
      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 500 if the resource encunters any other problem', async () => {
  
      /* Mock any data needed */
      const mockModelReturnData = {
        success: false,
        message: 'There was an issue with the resource, please try again later'
      };

      /* Set the values to be passed to the route */
      const cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookCategoriesModel, 'removeByCookbook').mockImplementation(() => {
        return mockModelReturnData;
      });
  
      /* Set the expect return values */
      const returnStatus = 500;
      const returnSuccess = false;
      const returnMessage = 'There was a problem with the resource, please try again later';

  /* Execute the test */
      const res = await request(app)
        .delete(`/cookbooks/${cookbookId}/categories`)
        .set('Authorization', `Bearer ${authToken}`);
  
      /* Test everything works as expected */
      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
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
  
    it('should return status 200 and remove all cookbooks', async () => {
  
      /* Mock any data needed */
      const mockModelReturnData = {
        success: true,
        message: 'All cookbooks removed successfully'
      };

      /* Mock any supporting modules that the controller
         uses
      */
         jest.spyOn(cookbookModel, 'removeAll').mockImplementation(() => {
          return mockModelReturnData;
        });
  
       /* Set the expect return values */
      const returnStatus = 200;
      const returnSuccess = true;
      const returnMessage = mockModelReturnData.message;

      /* Execute the test */
      const res = await request(app)
        .delete(`/cookbooks`)
        .set('Authorization', `Bearer ${authToken}`);

      /* Test everything works as expected */
      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });
  
    it('should return status 401 if a non logged in user tries to access this resource', async () => {
  
       /* Mock any data needed */
       const mockModelReturnData = {
        success: true,
        message: 'All cookbooks removed successfully'
      };

      /* Mock any supporting modules that the controller
         uses
      */
         jest.spyOn(cookbookModel, 'removeAll').mockImplementation(() => {
          return mockModelReturnData;
        });
  
       /* Set the expect return values */
      const returnStatus = 401;
      const returnSuccess = false;
      const returnMessage = '';

      /* Execute the test */
      const res = await request(app)
        .delete(`/cookbooks`);

      /* Test everything works as expected */
      expect(res.status).toEqual(returnStatus);

    });

    it('should return status 403 if a unauthorised users tries to use this resource', async () => {

      // Set Mocked data that models and controllers should return
      const mockModelReturnData = [];
    
      // Set Mocked data that models and controllers should return
      
      // Mock any needed third party modules
      jest.spyOn(userModel, 'findById').mockImplementationOnce(() => {
        return [failUser]
      })

      jest.spyOn(cookbookModel, 'removeAll').mockImplementation(() => {
        return mockModelReturnData;
      });
  
      // Set here the expected return values for the test
      const returnStatus = 403;
      const returnSuccess = false;
      const returnMessage = 'You are not authorized to access the specified route';
  
      /* Execute the function */
      const res = await request(app)
        .delete(`/cookbooks`)
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

    it('should return status 500 if the resource enciunters any other problem', async () => {
  
      /* Mock any data needed */
      const mockModelReturnData = {
        success: false,
        message: 'There was an issue with the resource, please try again later'
      };

      /* Mock any supporting modules that the controller
         uses
      */
         jest.spyOn(cookbookModel, 'removeAll').mockImplementation(() => {
          return mockModelReturnData;
        });
  
       /* Set the expect return values */
      const returnStatus = 500;
      const returnSuccess = false;
      const returnMessage = 'There was a problem with the resource, please try again later';

      /* Execute the test */
      const res = await request(app)
        .delete(`/cookbooks`)
        .set('Authorization', `Bearer ${authToken}`);

      /* Test everything works as expected */
      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
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
  
    it('should return status 200 and remove the specified cookbook', async () => {
  
      /* Mock any data needed */
      const mockModelReturnData = {
        success: true,
        message: 'Cookbook successfully removed'
      };

      /* Set any values to be passed along to the route */ 
      const cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'remove').mockImplementation(() => {
        return mockModelReturnData;
      });
  
      /* Set the expect return values */
      const returnStatus = 200;
      const returnSuccess = true;
      const returnMessage = 'Cookbook successfully removed';

      /* Execute the function */
      const res = await request(app)
        .delete(`/cookbooks/${cookbookId}`)
        .set('Authorization', `Bearer ${authToken}`);
  
      /* Test everything works as expected */
      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });
  
    it('should return status 401 if a non logged in user tries to access this resource', async () => {
  
      /* Mock any data needed */
      const mockModelReturnData = [];

      /* Set any values to be passed along to the route */ 
      const cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'remove').mockImplementation(() => {
        return mockModelReturnData;
      });
  
      /* Set the expect return values */
      const returnStatus = 401;
      const returnSuccess = false;
      const returnMessage = '';

      /* Execute the function */
      const res = await request(app)
        .delete(`/cookbooks/${cookbookId}`);
  
      /* Test everything works as expected */
      expect(res.status).toEqual(returnStatus);

    });

    it('should return status 400 if the cookbook id is undefined', async () => {
  
      /* Mock any data needed */
      const mockModelReturnData = [];

      /* Set any values to be passed along to the route */ 
      let cookbookId;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'remove').mockImplementation(() => {
        return mockModelReturnData;
      });
  
      /* Set the expect return values */
      const returnStatus = 400;
      const returnSuccess = false;
      const returnMessage = 'Undefined id';

      /* Execute the function */
      const res = await request(app)
        .delete(`/cookbooks/${cookbookId}`)
        .set('Authorization', `Bearer ${authToken}`);
  
      /* Test everything works as expected */
      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
    });

    it('should return status 500 if the resource encounters any other problem', async () => {
  
      /* Mock any data needed */
      const mockModelReturnData = {
        success: false,
        message: 'There was an issue with the resource, please try again later'
      };

      /* Set any values to be passed along to the route */ 
      const cookbookId = 1;
  
      /* Mock any supporting modules that the controller
         uses
      */
      jest.spyOn(cookbookModel, 'remove').mockImplementation(() => {
        return mockModelReturnData;
      });
  
      /* Set the expect return values */
      const returnStatus = 500;
      const returnSuccess = false;
      const returnMessage = 'There was a problem with the resource, please try again later';

      /* Execute the function */
      const res = await request(app)
        .delete(`/cookbooks/${cookbookId}`)
        .set('Authorization', `Bearer ${authToken}`);

      /* Test everything works as expected */
      expect(res.status).toEqual(returnStatus);

      expect(typeof res.body.status).toBe('number');
      expect(typeof res.body.success).toBe('boolean');
      expect(typeof res.body.message).toBe('string');

      expect(res.body.status).toBe(returnStatus);
      expect(res.body.success).toBe(returnSuccess);
      expect(res.body.message).toBe(returnMessage);
  
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

    /* Mock any supporting modules that the controller
       uses
       jest.spyOn(<resource>Model, '<method>').mockImplementation(() => {
         return <data>;
       });
    */

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    //await <resource>Controller.<method>(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */

  });

});
