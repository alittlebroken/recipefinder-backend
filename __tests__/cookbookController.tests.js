/* Modules required for the tests */
const messageHelper = require('../helpers/constants');
const cookbookController = require('../controllers/cookbookController');
const cookbookModel = require('../models/cookbookModel');

describe('cookbookController.get', () => {

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

    /* Execute the function */
    await cookbookController.get(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.json).toBeCalledWith(mockCookbooks);

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

    /* Execute the function */
    await cookbookController.get(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('There were no cookbooks to find'));

  });

});

describe('cookbookController.getById', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('returns all cookbooks matching the passed in id', async () => {

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
    const mockRequest = { params: { id: 2 }};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.getById(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.json).toBeCalledWith(mockCookbooks);

  });

  it('returns 400 if no params are sent', async () => {

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
    const mockRequest = { };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.getById(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('Invalid parameter'));

  });

  it('returns 400 if the passed in id is of the wrong format', async () => {

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
    const mockRequest = { params: { id: '2' }};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.getById(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('Invalid id format'));

  });

  it('returns 400 if id is undefined', async () => {

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
    const mockRequest = { params: {} };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.getById(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('Invalid id'));

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

    /* Execute the function */
    await cookbookController.getById(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('No matching cookbook found'));

  });

});

describe('cookbookController.getByName', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('returns all cookbooks matching the passed in name', async () => {

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
    jest.spyOn(cookbookModel, 'findByName').mockImplementation(() => {
      return mockCookbooks;
    });

    /* Mock Express request and response */
    const mockRequest = { params: { name: 'paradise' }};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.getByName(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.json).toBeCalledWith(mockCookbooks);

  });

  it('returns 400 if the passed in name is of the wrong format', async () => {

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
    jest.spyOn(cookbookModel, 'findByName').mockImplementation(() => {
      return mockCookbooks;
    });

    /* Mock Express request and response */
    const mockRequest = { params: { name: 2 }};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.getByName(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('Invalid name format'));

  });

  it('returns 400 if name is undefined', async () => {

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
    jest.spyOn(cookbookModel, 'findByName').mockImplementation(() => {
      return mockCookbooks;
    });

    /* Mock Express request and response */
    const mockRequest = { params: {} };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.getByName(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('Invalid name'));

  });

  it('returns 400 if name is empty string', async () => {

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
    jest.spyOn(cookbookModel, 'findByName').mockImplementation(() => {
      return mockCookbooks;
    });

    /* Mock Express request and response */
    const mockRequest = { params: { name: '' } };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.getByName(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('Invalid name'));

  });

  it('throws a 404 error if no data found', async () => {

    /* Mock any data needed */
    const mockCookbooks = [];

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'findByName').mockImplementation(() => {
      return mockCookbooks;
    });

    /* Mock Express request and response */
    const mockRequest = { params: { name: 'paradise' }};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.getByName(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('No mathing cookbook(s) found'));

  });

  it('returns 400 if the passed in name is of the wrong format', async () => {

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
    jest.spyOn(cookbookModel, 'findByName').mockImplementation(() => {
      return mockCookbooks;
    });

    /* Mock Express request and response */
    const mockRequest = {};
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.getByName(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('Invalid parameters'));

  });

});

describe('cookbookController.create', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should create a new cookbook', async () => {

    /* Mock any data needed */
    const mockReturnData = {
      success: true,
      message: 'Cookbook successfully added'
    };

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'create').mockImplementation(() => {
      return mockReturnData;
    });

    /* Mock Express request and response */
    const mockRequest = { body: {
      userId: 1342,
      name: 'Fanatastic meals and where to find them',
      description: 'Meals that are simply magical',
      image: '829347293473.jpg'
    }};

    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.json).toBeCalledWith(mockReturnData);

  });

  it('should throw 400 if body data is undefined', async () => {

    /* Mock any data needed */
    const mockReturnData = {
      success: false,
      message: ''
    };

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'create').mockImplementation(() => {
      return mockCookbooks;
    });

    /* Mock Express request and response */
    const mockRequest = {  };

    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('Request body data undefined'));

  });

  it('should throw 400 if userId is undefined or in the wrong format', async () => {

    /* Mock any data needed */
    const mockReturnData = {
      success: false,
      message: ''
    };

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'create').mockImplementation(() => {
      return mockCookbooks;
    });

    /* Mock Express request and response */
    const mockRequest = { body: {
      name: 'Fanatastic meals and where to find them',
      description: 'Meals that are simply magical',
      image: '829347293473.jpg'
     }};

    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('Undefined userId or incorrect format'));

  });

  it('should throw 400 if name is undefined or in the wrong format', async () => {

    /* Mock any data needed */
    const mockReturnData = {
      success: false,
      message: ''
    };

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'create').mockImplementation(() => {
      return mockCookbooks;
    });

    /* Mock Express request and response */
    const mockRequest = { body: {
      userId: 12,
      description: 'Meals that are simply magical',
      image: '829347293473.jpg'
     }};

    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('Undefined name or incorrect format'));

  });

  it('should throw 400 if description is undefined or in the wrong format', async () => {

    /* Mock any data needed */
    const mockReturnData = {
      success: false,
      message: ''
    };

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'create').mockImplementation(() => {
      return mockCookbooks;
    });

    /* Mock Express request and response */
    const mockRequest = { body: {
      userId: 12,
      name: 'Fanatastic meals and where to find them',
      image: '829347293473.jpg'
     }};

    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('Undefined description or incorrect format'));

  });

  it('should throw 500 if another error is encountered', async () => {

    /* Mock any data needed */
    const mockReturnData = null;

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'create').mockImplementation(() => {
      return mockReturnData;
    });

    /* Mock Express request and response */
    const mockRequest = { body: {
      userId: 12,
      name: 'Fanatastic meals and where to find them',
      description: 'Meals that are simply magical',
      image: '829347293473.jpg'
     }};

    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.create(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('There was a problem with the resource, please try again later'));

  });

});

describe('cookbookController.update', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should update an existing cookbook', async () => {

    /* Mock any data needed */
    const mockReturnData = {
      success: true,
      message: 'Cookbook successfully updated'
    };

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
      return mockReturnData;
    });

    /* Mock Express request and response */
    const mockRequest = {
    body: {
      userId: 1,
      name: 'Fanatastic meals and where to find them',
      description: 'Meals that are simply magical',
      image: '829347293473.jpg'
    },
    params: { id: 12 }
  };

    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.update(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.json).toBeCalledWith(mockReturnData);

  });

  it('should throw 400 if params data is undefined', async () => {

    /* Mock any data needed */
    const mockReturnData = {
      success: false,
      message: ''
    };

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
      return mockReturnData;
    });

    /* Mock Express request and response */
    const mockRequest = {
    body: {
      userId: 1,
      name: 'Fanatastic meals and where to find them',
      description: 'Meals that are simply magical',
      image: '829347293473.jpg'
    },
  };

    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.update(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('Undefined request parameters'));

  });

  it('should throw 400 if body data is undefined', async () => {

    /* Mock any data needed */
    const mockReturnData = {
      success: false,
      message: ''
    };

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
      return mockReturnData;
    });

    /* Mock Express request and response */
    const mockRequest = {
    params: { id: 12 }
  };

    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.update(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('Undefined request body'));

  });

  it('should throw 400 if id is undefined', async () => {

    /* Mock any data needed */
    const mockReturnData = {
      success: false,
      message: ''
    };

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
      return mockReturnData;
    });

    /* Mock Express request and response */
    const mockRequest = {
    body: {
      userId: 1,
      name: 'Fanatastic meals and where to find them',
      description: 'Meals that are simply magical',
      image: '829347293473.jpg'
    },
    params: { }
  };

    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.update(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('Undefined id'));

  });

  it('should throw 400 if id is in the wrong format', async () => {

    /* Mock any data needed */
    const mockReturnData = {
      success: false,
      message: ''
    };

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
      return mockReturnData;
    });

    /* Mock Express request and response */
    const mockRequest = {
    body: {
      userId: 1,
      name: 'Fanatastic meals and where to find them',
      description: 'Meals that are simply magical',
      image: '829347293473.jpg'
    },
    params: { id: '12' }
  };

    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.update(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('Wrong id format'));

  });

  it('should throw 400 if userId is undefined', async () => {

    /* Mock any data needed */
    const mockReturnData = {
      success: false,
      message: ''
    };

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
      return mockReturnData;
    });

    /* Mock Express request and response */
    const mockRequest = {
    body: {
      name: 'Fanatastic meals and where to find them',
      description: 'Meals that are simply magical',
      image: '829347293473.jpg'
    },
    params: { id: 12 }
  };

    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.update(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('Undefined userId'));

  });

  it('should throw 400 if userId is in the wrong format', async () => {

    /* Mock any data needed */
    const mockReturnData = {
      success: false,
      message: ''
    };

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
      return mockReturnData;
    });

    /* Mock Express request and response */
    const mockRequest = {
    body: {
      userId: 'twelve',
      name: 'Fanatastic meals and where to find them',
      description: 'Meals that are simply magical',
      image: '829347293473.jpg'
    },
    params: { id: 12 }
  };

    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.update(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('Wrong userId format'));

  });

  it('should throw 400 if name is undefined', async () => {

    /* Mock any data needed */
    const mockReturnData = {
      success: false,
      message: ''
    };

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
      return mockReturnData;
    });

    /* Mock Express request and response */
    const mockRequest = {
    body: {
      userId: 1,
      description: 'Meals that are simply magical',
      image: '829347293473.jpg'
    },
    params: { id: 12 }
  };

    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.update(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('Undefined name'));

  });

  it('should throw 400 if name is in the wrong format', async () => {

    /* Mock any data needed */
    const mockReturnData = {
      success: false,
      message: ''
    };

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
      return mockReturnData;
    });

    /* Mock Express request and response */
    const mockRequest = {
    body: {
      userId: 1,
      name: 345,
      description: 'Meals that are simply magical',
      image: '829347293473.jpg'
    },
    params: { id: 12 }
  };

    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.update(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('Wrong name format'));

  });

  it('should throw 400 if description is invalid', async () => {

    /* Mock any data needed */
    const mockReturnData = {
      success: false,
      message: ''
    };

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
      return mockReturnData;
    });

    /* Mock Express request and response */
    const mockRequest = {
    body: {
      userId: 1,
      name: 'Fanatastic meals and where to find them',
      image: '829347293473.jpg'
    },
    params: { id: 12 }
  };

    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.update(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('Undefined description'));

  });

  it('should throw 400 if description is in the wrong format', async () => {

    /* Mock any data needed */
    const mockReturnData = {
      success: false,
      message: ''
    };

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
      return mockReturnData;
    });

    /* Mock Express request and response */
    const mockRequest = {
    body: {
      userId: 1,
      name: 'Fanatastic meals and where to find them',
      description: 123456789,
      image: '829347293473.jpg'
    },
    params: { id: 12 }
  };

    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.update(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('Wrong description format'));

  });

  it('should throw 500 if there was an issue with the underlying resource', async () => {

    /* Mock any data needed */
    const mockReturnData = {
      success: false,
      message: 'There was a problem with the resource, please try again later'
    };

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'update').mockImplementation(() => {
      return mockReturnData;
    });

    /* Mock Express request and response */
    const mockRequest = {
    body: {
      userId: 1,
      name: 'Fanatastic meals and where to find them',
      description: 'Meals that are simply magical',
      image: '829347293473.jpg'
    },
    params: { id: 12 }
  };

    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.update(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('There was a problem with the resource, please try again later'));

  });

});

describe('cookbookController.remove', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should remove a cookbook', async () => {

    /* Mock any data needed */
    const mockReturnData = {
      success: true,
      message: 'Cookbook successfully removed'
    };

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'remove').mockImplementation(() => {
      return mockReturnData;
    });

    /* Mock Express request and response */
    const mockRequest = { params: {
      id: 1,
    }};

    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.remove(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.json).toBeCalledWith(mockReturnData);

  });

  it('should throw 400 if request param data is undefined', async () => {

    /* Mock any data needed */
    const mockReturnData = {
      success: false,
      message: ''
    };

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'remove').mockImplementation(() => {
      return mockReturnData;
    });

    /* Mock Express request and response */
    const mockRequest = { };

    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.remove(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('Request parameters undefined'));

  });

  it('should throw 400 if id is undefined', async () => {

    /* Mock any data needed */
    const mockReturnData = {
      success: false,
      message: ''
    };

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'remove').mockImplementation(() => {
      return mockReturnData;
    });

    /* Mock Express request and response */
    const mockRequest = { params: {}};

    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.remove(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('Undefined id'));

  });

  it('should throw 400 if id is in the wrong format', async () => {

    /* Mock any data needed */
    const mockReturnData = {
      success: false,
      message: ''
    };

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'remove').mockImplementation(() => {
      return mockReturnData;
    });

    /* Mock Express request and response */
    const mockRequest = { params: {
      id: 'one',
    }};

    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.remove(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('Wrong id format'));

  });

  it('should throw 500 if another error is encountered', async () => {

    /* Mock any data needed */
    const mockReturnData = null;

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'remove').mockImplementation(() => {
      return mockReturnData;
    });

    /* Mock Express request and response */
    const mockRequest = { params: {
      id: 1,
    }};

    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.remove(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('There was a problem with the resource, please try again later'));

  });

});

describe('cookbookController.recipes', () => {

  /*
   * Steps to run before and after this test suite
   */
  beforeEach(async () => {

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return all recipes assigned to a cookbook', async () => {

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

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'recipes').mockImplementation(() => {
      return mockReturnData;
    });

    /* Mock Express request and response */
    const mockRequest = { params: { id: 1 } };
    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.recipes(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.json).toBeCalledWith(mockReturnData);

  });

  it('should throw 400 if body data is undefined', async () => {

    /* Mock any data needed */
    const mockReturnData = {
      success: false,
      message: ''
    };

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'recipes').mockImplementation(() => {
      return mockReturnData;
    });

    /* Mock Express request and response */
    const mockRequest = { };

    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.recipes(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('Undefined request parameters'));

  });

  it('should throw 400 if id is undefined', async () => {

    /* Mock any data needed */
    const mockReturnData = {
      success: false,
      message: ''
    };

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'recipes').mockImplementation(() => {
      return mockReturnData;
    });

    /* Mock Express request and response */
    const mockRequest = { params: { } };

    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.recipes(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('Undefined id'));

  });

  it('should throw 400 if id is in the wrong format', async () => {

    /* Mock any data needed */
    const mockReturnData = {
      success: false,
      message: ''
    };

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'recipes').mockImplementation(() => {
      return mockReturnData;
    });

    /* Mock Express request and response */
    const mockRequest = { params: { id: 'one' } };

    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.recipes(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('Wrong id format'));

  });

  it('should throw 500 if another error is encountered', async () => {

    /* Mock any data needed */
    const mockReturnData = {
      success: false,
      message: 'There was a problem with the resource, please try again later'
    };

    /* Mock any supporting modules that the controller
       uses
    */
    jest.spyOn(cookbookModel, 'recipes').mockImplementation(() => {
      return mockReturnData;
    });

    /* Mock Express request and response */
    const mockRequest = { params: { id: 1 } };

    const mockResponse = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();

    /* Execute the function */
    await cookbookController.recipes(mockRequest, mockResponse, mockNext);

    /* Test everything works as expected */
    expect(mockNext).toBeCalledWith(new Error('There was a problem with the resource, please try again later'));

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
