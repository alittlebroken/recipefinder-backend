/*
 * Packages needed for scripts
 */
const knex = require('knex');
const db = require('../database');
const { getTracker, Tracker } = require('knex-mock-client');

const fs = require('fs')
const path = require('path')

const uploadModel = require('../models/uploadModel')

/* Mock the DB library */
jest.mock('../database', () => {
    const knex = require('knex');
    const { MockClient } = require('knex-mock-client');
    return knex({ client: MockClient })
  });

/* Tracker for the SQL commands */
let tracker;

describe('uploadModel.upload', () => {

    /*
     * Steps to run before and after this test suite
     */
    beforeEach(async () => {
      /* Initialize the tracker of the various commands */
      tracker = getTracker();
    });
  
    afterEach(() => {
      /* Reset the tracker */
      tracker.reset();

      /* Remove any files created for the test */
      let filePath = path.join(process.cwd(), '/public/media')
      fs.unlink(path.join(filePath, 'test-1680211818271-248980925.jpg'), () => {})
      fs.unlink(path.join(filePath, 'test-1680239642218-12949440.jpg'), () => {})
      fs.unlink(path.join(filePath, 'test-1680239644962-43989377.jpg'), () => {})

    })
  
    it('should add details on one or more uploaded files to the DB', async () => {
  
      /** Mock the DB responses */
      tracker.on.insert('files').responseOnce([1, 2, 3])
  
      /* Set the file payload */
      const payload = [
        {
            name: 'test-1680211818271-248980925.jpg',
            mimetype: 'image/jpeg',
            resource: 'recipe',
            resourceid: 1,
            userid: 1
        },
        {
            name: 'test-1680239642218-12949440.jpg',
            mimetype: 'image/jpeg',
            resource: 'cookbook',
            resourceid: 2,
            userid: 1
        },
        {
            name: 'test-1680239644962-43989377.jpg',
            mimetype: 'image/jpeg',
            resource: 'recipe',
            resourceid: 3,
            userid: 2
        },

      ]

      /* What do we expect the results to be of running the method */
      const returnStatus = 200
      const returnSuccess = true
      const returnMessage = 'File(s) successfully uploaded'

      /** Execute the function */
      const result = await uploadModel.upload(payload);

      /** Test the response back from the function */
      expect(result.success).toBe(returnSuccess);
      expect(result.message).toEqual(returnMessage);
      
    });
  
    it('should return an error if the payload is missing', async () => {
  
      /** Mock the DB responses */
      tracker.on.insert('files').response([])

      /* Set the file payload */
      const payload = []

      /* What do we expect the results to be of running the method */
      const returnSuccess = false
      const returnMessage = 'You must supply details of files uploaded'

      /** Execute the function */
      const result = await uploadModel.upload(payload);

      /* Test the result returned form the module */
      expect(result.success).toBe(returnSuccess)
      expect(result.message).toEqual(returnMessage)
  
    });

    it('should return an error if the image name is missing', async () => {
  
      /** Mock the DB responses */
      tracker.on.insert('files').response([])

      /* Set the file payload */
      const payload = [
        {
            mimetype: 'image/jpeg',
            resource: 'recipe',
            resourceid: 1,
            userid: 1
        },
        {
            name: 'images-1680239642218-12949440.jpg',
            mimetype: 'image/jpeg',
            resource: 'cookbook',
            resourceid: 2,
            userid: 1
        },
        {
            mimetype: 'image/jpeg',
            resource: 'recipe',
            resourceid: 3,
            userid: 2
        },

      ]

      /* What do we expect the results to be of running the method */
      const returnSuccess = false
      const returnMessage = 'Image name is required'

      /** Execute the function */
      const result = await uploadModel.upload(payload);

      /* Test the result returned form the module */
      expect(result.success).toBe(returnSuccess)
      expect(result.message).toEqual(returnMessage)
  
    });

    it('should return an error if the image name is of the wrong format', async () => {
  
      /** Mock the DB responses */
      tracker.on.insert('files').response([])

      /* Set the file payload */
      const payload = [
        {
            name: 12,
            mimetype: 'image/jpeg',
            resource: 'recipe',
            resourceid: 1,
            userid: 1
        },
        {
            name: 1,
            mimetype: 'image/jpeg',
            resource: 'cookbook',
            resourceid: 2,
            userid: 1
        },
        {
            name: 'test-1680239644962-43989377.jpg',
            mimetype: 'image/jpeg',
            resource: 'recipe',
            resourceid: 3,
            userid: 2
        },

      ]

      /* What do we expect the results to be of running the method */
      const returnSuccess = false
      const returnMessage = 'Image name must be a string'

      /** Execute the function */
      const result = await uploadModel.upload(payload);

      /* Test the result returned form the module */
      expect(result.success).toBe(returnSuccess)
      expect(result.message).toEqual(returnMessage)
  
    });

    it('should return an error if the mime type is missing', async () => {
  
      /** Mock the DB responses */
      tracker.on.insert('files').response([])

      /* Set the file payload */
      const payload = [
        {
            name: 'test-1680211818271-248980925.jpg',
            mimetype: 'image/jpeg',
            resource: 'recipe',
            resourceid: 1,
            userid: 1
        },
        {
            name: 'test-1680239642218-12949440.jpg',
            resource: 'cookbook',
            resourceid: 2,
            userid: 1
        },
        {
            name: 'test-1680239644962-43989377.jpg',
            mimetype: 'image/jpeg',
            resource: 'recipe',
            resourceid: 3,
            userid: 2
        },

      ]

      /* What do we expect the results to be of running the method */
      const returnSuccess = false
      const returnMessage = 'Mime type is required'

      /** Execute the function */
      const result = await uploadModel.upload(payload);

      /* Test the result returned form the module */
      expect(result.success).toBe(returnSuccess)
      expect(result.message).toEqual(returnMessage)
  
    });

    it('should return an error if the mimetype is of the wrong format', async () => {
  
      /** Mock the DB responses */
      tracker.on.insert('files').response([])

      /* Set the file payload */
      const payload = [
        {
            name: 'test-1680211818271-248980925.jpg',
            mimetype: 'image/jpeg',
            resource: 'recipe',
            resourceid: 1,
            userid: 1
        },
        {
            name: 'test-1680239642218-12949440.jpg',
            mimetype: 3,
            resource: 'cookbook',
            resourceid: 2,
            userid: 1
        },
        {
            name: 'test-1680239644962-43989377.jpg',
            mimetype: 'image/jpeg',
            resource: 'recipe',
            resourceid: 3,
            userid: 2
        },

      ]

      /* What do we expect the results to be of running the method */
      const returnSuccess = false
      const returnMessage = 'Mime type must be a string'

      /** Execute the function */
      const result = await uploadModel.upload(payload);

      /* Test the result returned form the module */
      expect(result.success).toBe(returnSuccess)
      expect(result.message).toEqual(returnMessage)
  
    });

    it('should return an error if the resource name is missing', async () => {
  
      /** Mock the DB responses */
      tracker.on.insert('files').response([])

      /* Set the file payload */
      const payload = [
        {
            name: 'test-1680211818271-248980925.jpg',
            mimetype: 'image/jpeg',
            resource: 'recipe',
            resourceid: 1,
            userid: 1
        },
        {
            name: 'test-1680239642218-12949440.jpg',
            mimetype: 'image/jpeg',
            resource: 'cookbook',
            resourceid: 2,
            userid: 1
        },
        {
            name: 'test-1680239644962-43989377.jpg',
            mimetype: 'image/jpeg',
            resourceid: 3,
            userid: 2
        },

      ]

      /* What do we expect the results to be of running the method */
      const returnSuccess = false
      const returnMessage = 'Resource name is required'

      /** Execute the function */
      const result = await uploadModel.upload(payload);

      /* Test the result returned form the module */
      expect(result.success).toBe(returnSuccess)
      expect(result.message).toEqual(returnMessage)
  
    });

    it('should return an error if the resource name is of the wrong type', async () => {
  
      /** Mock the DB responses */
      tracker.on.insert('files').response([])

      /* Set the file payload */
      const payload = [
        {
            name: 'test-1680211818271-248980925.jpg',
            mimetype: 'image/jpeg',
            resource: 764657,
            resourceid: 1,
            userid: 1
        },
        {
            name: 'test-1680239642218-12949440.jpg',
            mimetype: 'image/jpeg',
            resource: 'cookbook',
            resourceid: 2,
            userid: 1
        },
        {
            name: 'test-1680239644962-43989377.jpg',
            mimetype: 'image/jpeg',
            resource: 'recipe',
            resourceid: 3,
            userid: 2
        },

      ]

      /* What do we expect the results to be of running the method */
      const returnSuccess = false
      const returnMessage = 'Resource name must be a string'

      /** Execute the function */
      const result = await uploadModel.upload(payload);

      /* Test the result returned form the module */
      expect(result.success).toBe(returnSuccess)
      expect(result.message).toEqual(returnMessage)
  
    });

    it('should return an error if the resource id is missing', async () => {
  
      /** Mock the DB responses */
      tracker.on.insert('files').response([])

      /* Set the file payload */
      const payload = [
        {
            name: 'test-1680211818271-248980925.jpg',
            mimetype: 'image/jpeg',
            resource: 'recipe',
            resourceid: 1,
            userid: 1
        },
        {
            name: 'test-1680239642218-12949440.jpg',
            mimetype: 'image/jpeg',
            resource: 'cookbook',
            resourceid: 2,
            userid: 1
        },
        {
            name: 'test-1680239644962-43989377.jpg',
            mimetype: 'image/jpeg',
            resource: 'recipe',
            userid: 2
        },

      ]

      /* What do we expect the results to be of running the method */
      const returnSuccess = false
      const returnMessage = 'Resource ID is required'

      /** Execute the function */
      const result = await uploadModel.upload(payload);

      /* Test the result returned form the module */
      expect(result.success).toBe(returnSuccess)
      expect(result.message).toEqual(returnMessage)
  
    });

    it('should return an error if the resource id is of the wrong type', async () => {
  
        /** Mock the DB responses */
      tracker.on.insert('files').response([])

      /* Set the file payload */
      const payload = [
        {
            name: 'test-1680211818271-248980925.jpg',
            mimetype: 'image/jpeg',
            resource: 'recipe',
            resourceid: 1,
            userid: 2
        },
        {
            name: 'test-1680239642218-12949440.jpg',
            mimetype: 'image/jpeg',
            resource: 'cookbook',
            resourceid: 'Steve',
            userid: 1
        },
        {
            name: 'test-1680239644962-43989377.jpg',
            mimetype: 'image/jpeg',
            resource: 'recipe',
            resourceid: 3,
            userid: 2
        },

      ]

      /* What do we expect the results to be of running the method */
      const returnSuccess = false
      const returnMessage = 'Resource id must be a number'

      /** Execute the function */
      const result = await uploadModel.upload(payload);

      /* Test the result returned form the module */
      expect(result.success).toBe(returnSuccess)
      expect(result.message).toEqual(returnMessage)
  
    });

    it('should return an error if the user id is missing', async () => {
  
      /** Mock the DB responses */
      tracker.on.insert('files').response([])

      /* Set the file payload */
      const payload = [
        {
            name: 'test-1680211818271-248980925.jpg',
            mimetype: 'image/jpeg',
            resource: 'recipe',
            resourceid: 1,
        },
        {
            name: 'test-1680239642218-12949440.jpg',
            mimetype: 'image/jpeg',
            resource: 'cookbook',
            resourceid: 2,
            userid: 1
        },
        {
            name: 'test-1680239644962-43989377.jpg',
            mimetype: 'image/jpeg',
            resource: 'recipe',
            resourceid: 3,
            userid: 2
        },

      ]

      /* What do we expect the results to be of running the method */
      const returnSuccess = false
      const returnMessage = 'User id is required'

      /** Execute the function */
      const result = await uploadModel.upload(payload);

      /* Test the result returned form the module */
      expect(result.success).toBe(returnSuccess)
      expect(result.message).toEqual(returnMessage)
  
    });

    it('should return an error if the user id is of the wrong type', async () => {
  
        /** Mock the DB responses */
        tracker.on.insert('files').response([])

        /* Set the file payload */
      const payload = [
        {
            name: 'test-1680211818271-248980925.jpg',
            mimetype: 'image/jpeg',
            resource: 'recipe',
            resourceid: 1,
            userid: 1
        },
        {
            name: 'test-1680239642218-12949440.jpg',
            mimetype: 'image/jpeg',
            resource: 'cookbook',
            resourceid: 2,
            userid: 'Stephanie'
        },
        {
            name: 'test-1680239644962-43989377.jpg',
            mimetype: 'image/jpeg',
            resource: 'recipe',
            resourceid: 3,
            userid: 2
        },

      ]

      /* What do we expect the results to be of running the method */
      const returnSuccess = false
      const returnMessage = 'User id must be a number'

      /** Execute the function */
      const result = await uploadModel.upload(payload);

      /* Test the result returned form the module */
      expect(result.success).toBe(returnSuccess)
      expect(result.message).toEqual(returnMessage)

    });
  
    it('should return a generic error to hide library errors', async () => {
  
      /** Mock the DB responses */
      tracker.on.insert('files').simulateError('Lost connection to the database')

      /* Set the file payload */
      const payload = [
        {
            name: 'test-1680211818271-248980925.jpg',
            mimetype: 'image/jpeg',
            resource: 'recipe',
            resourceid: 1,
            userid: 1
        },
        {
            name: 'test-1680239642218-12949440.jpg',
            mimetype: 'image/jpeg',
            resource: 'cookbook',
            resourceid: 2,
            userid: 1
        },
        {
            name: 'test-images-1680239644962-43989377.jpg',
            mimetype: 'image/jpeg',
            resource: 'recipe',
            resourceid: 3,
            userid: 2
        },

      ]

      /* What do we expect the results to be of running the method */
      const returnSuccess = false
      const returnMessage = 'There was a problem with the resource, please try again later'

      /** Execute the function */
      const result = await uploadModel.upload(payload);

      /* Test the result returned form the module */
      expect(result.success).toBe(returnSuccess)
      expect(result.message).toEqual(returnMessage)
  
    });
  
  });

describe('uploadModel.list', () => {

  /*
     * Steps to run before and after this test suite
     */
  beforeEach(async () => {
    /* Initialize the tracker of the various commands */
    tracker = getTracker();
  });

  afterEach(() => {
    /* Reset the tracker */
    tracker.reset();

  })

  it('should return a list of files', async () => {

    // Setup
    const modelReturnData = [
      { id: 1, userid: 1, name: 'images-001.png', mimetype: 'image/png', resource: 'recipe', resourceid: 2 },
      { id: 2, userid: 2, name: 'images-002.png', mimetype: 'image/png', resource: 'recipe', resourceid: 2 },
      { id: 3, userid: 1, name: 'images-003.png', mimetype: 'image/png', resource: 'cookbook', resourceid: 1 },
    ]

    tracker.on.select('files').responseOnce([{ id: 1}, { id: 2}, { id: 3}])
    tracker.on.select('files').responseOnce(modelReturnData)

    let options = {
      page: 1,
      size: 10,
      offset: 0,
      filter: null,
      sortBy: 'id',
      sortOrder: 'desc'
    }

    const returnSuccess = true
    const returnPagination = {
      current: 1,
      total: 1,
      records: 3
    }

    // Run
    const result = await uploadModel.list(options)

    // Assert
    expect(result.success).toBe(returnSuccess)

    expect(Array.isArray(result.results)).toBe(true)
    expect(result.results).toHaveLength(3)
    expect(result.results).toEqual(modelReturnData)

    expect(result.pagination).toEqual(returnPagination)

  })

  it('should return an empty list if no records found', async () => {

    // Setup
    const modelReturnData = []

    tracker.on.select('files').responseOnce([])
    tracker.on.select('files').responseOnce(modelReturnData)

    let options = {
      page: 1,
      size: 10,
      offset: 0,
      filter: null,
      sortBy: 'id',
      sortOrder: 'desc'
    }

    const returnStatus = 200
    const returnSuccess = false
    const returnMessage = 'There are currently no files'
    const returnPagination = {
      current: 1,
      total: 1,
      records: 0
    }

    // Run
    const result = await uploadModel.list(options)

    // Assert
    expect(result.success).toBe(returnSuccess)
    expect(result.message).toEqual(returnMessage)
    expect(result.results).toEqual(modelReturnData)
    expect(result.pagination).toEqual(returnPagination)

  })

  it('should return a partial list based on the filter applied', async () => {

    // Setup
    const modelReturnData = [
      { id: 1, userid: 1, name: 'images-001.png', mimetype: 'image/png', resource: 'recipe', resourceid: 2 },
      { id: 3, userid: 1, name: 'images-003.png', mimetype: 'image/png', resource: 'cookbook', resourceid: 1 },
    ]

    tracker.on.select('files').responseOnce([{ id: 1}, {id: 3}])
    tracker.on.select('files').responseOnce(modelReturnData)

    let options = {
      page: 1,
      size: 10,
      offset: 0,
      filter: JSON.stringify({ ids: [1,3]}),
      sortBy: 'id',
      sortOrder: 'desc'
    }

    const returnStatus = 200
    const returnSuccess = true
    const returnMessage = ''
    const returnPagination = {
      current: 1,
      total: 1,
      records: 2
    }

    // Run
    const result = await uploadModel.list(options)

    // Assert
    expect(result.success).toBe(returnSuccess)
    expect(Array.isArray(result.results)).toBe(true)
    expect(result.results).toHaveLength(2)
    expect(result.pagination).toEqual(returnPagination)

    expect(typeof result.results[0].id).toEqual('number')
    expect(result.results[0].id).toEqual(1)

    expect(typeof result.results[0].userid).toEqual('number')
    expect(result.results[0].userid).toEqual(1)

    expect(typeof result.results[0].name).toEqual('string')
    expect(result.results[0].name).toEqual('images-001.png')

    expect(typeof result.results[0].mimetype).toEqual('string')
    expect(result.results[0].mimetype).toEqual('image/png')

    expect(typeof result.results[0].resource).toEqual('string')
    expect(result.results[0].resource).toEqual('recipe')

    expect(typeof result.results[0].resourceid).toEqual('number')
    expect(result.results[0].resourceid).toEqual(2)

    expect(typeof result.results[1].id).toEqual('number')
    expect(result.results[1].id).toEqual(3)

    expect(typeof result.results[1].userid).toEqual('number')
    expect(result.results[1].userid).toEqual(1)

    expect(typeof result.results[1].name).toEqual('string')
    expect(result.results[1].name).toEqual('images-003.png')

    expect(typeof result.results[1].mimetype).toEqual('string')
    expect(result.results[1].mimetype).toEqual('image/png')

    expect(typeof result.results[1].resource).toEqual('string')
    expect(result.results[1].resource).toEqual('cookbook')

    expect(typeof result.results[1].resourceid).toEqual('number')
    expect(result.results[1].resourceid).toEqual(1)


  })

  it('should return a paged partial list based on the paging options', async () => {

    // Setup
    const modelReturnData = [
      { id: 1, userid: 1, name: 'images-001.png', mimetype: 'image/png', resource: 'recipe', resourceid: 2 },
    ]

    tracker.on.select('files').responseOnce([{ id: 1}, {id: 2}, {id: 3}])
    tracker.on.select('files').responseOnce(modelReturnData)

    let options = {
      page: 2,
      size: 1,
      offset: 1,
      filter: JSON.stringify({ id: [1]}),
      sortBy: 'id',
      sortOrder: 'desc'
    }

    const returnStatus = 200
    const returnSuccess = true
    const returnMessage = ''
    const returnPagination = {
      current: 2,
      total: 3,
      records: 3
    }

    // Run
    const result = await uploadModel.list(options)

    // Assert
    expect(result.success).toBe(returnSuccess)
    expect(Array.isArray(result.results)).toBe(true)
    expect(result.results).toHaveLength(1)
    expect(result.pagination).toEqual(returnPagination)

    expect(typeof result.results[0].id).toEqual('number')
    expect(result.results[0].id).toEqual(1)

    expect(typeof result.results[0].userid).toEqual('number')
    expect(result.results[0].userid).toEqual(1)

    expect(typeof result.results[0].name).toEqual('string')
    expect(result.results[0].name).toEqual('images-001.png')

    expect(typeof result.results[0].mimetype).toEqual('string')
    expect(result.results[0].mimetype).toEqual('image/png')

    expect(typeof result.results[0].resource).toEqual('string')
    expect(result.results[0].resource).toEqual('recipe')

    expect(typeof result.results[0].resourceid).toEqual('number')
    expect(result.results[0].resourceid).toEqual(2)

  })

  it('should return a generic error if the model encountered any issues', async () => {

    // Setup
    const modelReturnData = []

    tracker.on.select('files').simulateError('Lost connection to the database')

    let options = {
      page: 1,
      size: 10,
      offset: 0,
      filter: null,
      sortBy: 'id',
      sortOrder: 'desc'
    }

    const returnStatus = 500
    const returnSuccess = false
    const returnMessage = 'There was a problem with the resource, please try again later'
    const returnPagination = {
      current: 1,
      total: 1,
      records: 0
    }

    // Run
    const result = await uploadModel.list(options)

    // Assert
    expect(result.success).toBe(returnSuccess)
    expect(result.message).toEqual(returnMessage)

  })

})

describe('uploadModel.remove', () => {

  /*
     * Steps to run before and after this test suite
     */
  beforeEach(async () => {
    /* Initialize the tracker of the various commands */
    tracker = getTracker();
  });

  afterEach(() => {
    /* Reset the tracker */
    tracker.reset();

  })

  it('it should remove all uploaded files if no filters set', async () => {

    // Setup
    const modelReturnData = 4

    const returnSuccess = true
    const returnMessage = 'Records deleted successfully'
    const returnResult = 4

    let options = {
      page: 1,
      size: 10,
      offset: 0,
      filter: null,
      sortBy: 'id',
      sortOrder: 'desc'
    }

    tracker.on.delete('files').responseOnce(modelReturnData)

    // Execute
    const result = await uploadModel.remove(options)

    // Assert
    expect(result.success).toBe(returnSuccess)
    expect(result.message).toEqual(returnMessage)
    expect(result.results).toEqual(returnResult)

  })

  it('it should remove the specified records set by the filter', async () => {

    // Setup
    const modelReturnData = 2

    const returnSuccess = true
    const returnMessage = 'Records deleted successfully'
    const returnResult = 2

    let options = {
      page: 1,
      size: 10,
      offset: 0,
      filter: JSON.stringify({ ids: [1,2] }),
      sortBy: 'id',
      sortOrder: 'desc'
    }

    tracker.on.delete('files').responseOnce(modelReturnData)

    // Execute
    const result = await uploadModel.remove(options)

    // Assert
    expect(result.success).toBe(returnSuccess)
    expect(result.message).toEqual(returnMessage)
    expect(result.results).toEqual(returnResult)

  })

  it('it should return 0 if no records found to remove', async () => {

    // Setup
    const modelReturnData = 0

    const returnSuccess = false
    const returnMessage = 'No records to delete'
    const returnResult = 0

    let options = {
      page: 1,
      size: 10,
      offset: 0,
      filter: null,
      sortBy: 'id',
      sortOrder: 'desc'
    }

    tracker.on.delete('files').responseOnce(modelReturnData)

    // Execute
    const result = await uploadModel.remove(options)

    // Assert
    expect(result.success).toBe(returnSuccess)
    expect(result.message).toEqual(returnMessage)
    expect(result.results).toEqual(returnResult)

  })

  it('it should return a generic error if any other issue occurs', async () => {

    // Setup
    const modelReturnData = 0

    const returnSuccess = false
    const returnMessage = 'There was a problem with the resource, please try again later'
    const returnResult = 0

    let options = {
      page: 1,
      size: 10,
      offset: 0,
      filter: null,
      sortBy: 'id',
      sortOrder: 'desc'
    }

    tracker.on.delete('files').simulateError('Problem connecting to the database')

    // Execute
    const result = await uploadModel.remove(options)

    // Assert
    expect(result.success).toBe(returnSuccess)
    expect(result.message).toEqual(returnMessage)

  })

})

describe('uploadModel.update', () => {

  /*
     * Steps to run before and after this test suite
     */
  beforeEach(async () => {
    /* Initialize the tracker of the various commands */
    tracker = getTracker();
  });

  afterEach(() => {
    /* Reset the tracker */
    tracker.reset();

  })

  it('should update the correct record', async () => {

    // Setup
    const modelReturnData = [1]

    tracker.on.update('files').responseOnce([1])

    const payload = {
      id: 1,
      name: 'test-1680211818271-248980925.jpg',
      mimetype: 'image/jpeg',
      resource: 'recipe',
      resourceid: 1,
      userid: 1
    }

    const returnSuccess = true
    const returnMessage = 'Record successfully updated'
    const returnResults = [1]

    // Execute
    const result = await uploadModel.update(payload)

    // Assert
    expect(result.success).toBe(returnSuccess)
    expect(result.message).toEqual(returnMessage)
    expect(result.results).toEqual(returnResults)

  })

  it('should return nothing of no record to update', async () => {

    // Setup
    tracker.on.update('files').responseOnce([])

    const payload = {
      id: 1,
      name: 'test-1680211818271-248980925.jpg',
      mimetype: 'image/jpeg',
      resource: 'recipe',
      resourceid: 1,
      userid: 1
    }

    const returnSuccess = false
    const returnMessage = 'No records found to update'
    const returnResults = 0

    // Execute
    const result = await uploadModel.update(payload)

    // Assert
    expect(result.success).toBe(returnSuccess)
    expect(result.message).toEqual(returnMessage)
    expect(result.results).toEqual(returnResults)

  })

  it('should return an error if id is missing', async () => {

    // Setup
    const modelReturnData = []

    tracker.on.update('files').responseOnce([])

    const payload = {
      name: 'test-1680211818271-248980925.jpg',
      mimetype: 'image/jpeg',
      resource: 'recipe',
      resourceid: 1,
      userid: 1
    }

    const returnSuccess = false
    const returnMessage = 'Record id is required'
    const returnResults = []

    // Execute
    const result = await uploadModel.update(payload)

    // Assert
    expect(result.success).toBe(returnSuccess)
    expect(result.message).toEqual(returnMessage)
    expect(result.results).toEqual(returnResults)

  })

  it('should return an error if id not of the correct type', async () => {

    // Setup
    const modelReturnData = []

    tracker.on.update('files').responseOnce([])

    const payload = {
      id: ['1'],
      name: 'test-1680211818271-248980925.jpg',
      mimetype: 'image/jpeg',
      resource: 'recipe',
      resourceid: 1,
      userid: 1
    }

    const returnSuccess = false
    const returnMessage = 'Record id must be a number'
    const returnResults = []

    // Execute
    const result = await uploadModel.update(payload)

    // Assert
    expect(result.success).toBe(returnSuccess)
    expect(result.message).toEqual(returnMessage)
    expect(result.results).toEqual(returnResults)

  })

  it('should return an error if name is missing', async () => {

    // Setup
    const modelReturnData = []

    tracker.on.update('files').responseOnce(modelReturnData)

    const payload = {
      id: 1,
      mimetype: 'image/jpeg',
      resource: 'recipe',
      resourceid: 1,
      userid: 1
    }

    const returnSuccess = false
    const returnMessage = 'Name is required'
    const returnResults = modelReturnData

    // Execute
    const result = await uploadModel.update(payload)

    // Assert
    expect(result.success).toBe(returnSuccess)
    expect(result.message).toEqual(returnMessage)
    expect(result.results).toEqual(returnResults)

  })

  it('should return an error if name is of the wrong format', async () => {

    // Setup
    const modelReturnData = []

    tracker.on.update('files').responseOnce(modelReturnData)

    const payload = {
      id: 1,
      name: 13,
      mimetype: 'image/jpeg',
      resource: 'recipe',
      resourceid: 1,
      userid: 1
    }

    const returnSuccess = false
    const returnMessage = 'Name must be a string'
    const returnResults = modelReturnData

    // Execute
    const result = await uploadModel.update(payload)

    // Assert
    expect(result.success).toBe(returnSuccess)
    expect(result.message).toEqual(returnMessage)
    expect(result.results).toEqual(returnResults)

  })

  it('should return an error if mimetype is missing', async () => {

    // Setup
    const modelReturnData = []

    tracker.on.update('files').responseOnce(modelReturnData)

    const payload = {
      id: 1,
      name: 'test-1680211818271-248980925.jpg',
      resource: 'recipe',
      resourceid: 1,
      userid: 1
    }

    const returnSuccess = false
    const returnMessage = 'Mimetype is required'
    const returnResults = modelReturnData

    // Execute
    const result = await uploadModel.update(payload)

    // Assert
    expect(result.success).toBe(returnSuccess)
    expect(result.message).toEqual(returnMessage)
    expect(result.results).toEqual(returnResults)

  })

  it('should return an error if mimetype is of the wrong format', async () => {

    // Setup
    const modelReturnData = []

    tracker.on.update('files').responseOnce(modelReturnData)

    const payload = {
      id: 1,
      name: 'test-1680211818271-248980925.jpg',
      mimetype: 1,
      resource: 'recipe',
      resourceid: 1,
      userid: 1
    }

    const returnSuccess = false
    const returnMessage = 'Mimetype must be a string'
    const returnResults = modelReturnData

    // Execute
    const result = await uploadModel.update(payload)

    // Assert
    expect(result.success).toBe(returnSuccess)
    expect(result.message).toEqual(returnMessage)
    expect(result.results).toEqual(returnResults)

  })

  it('should return an error if resource is missing', async () => {

    // Setup
    const modelReturnData = []

    tracker.on.update('files').responseOnce(modelReturnData)

    const payload = {
      id: 1,
      name: 'test-1680211818271-248980925.jpg',
      mimetype: 'image/jpeg',
      resourceid: 1,
      userid: 1
    }

    const returnSuccess = false
    const returnMessage = 'Resource is required'
    const returnResults = modelReturnData

    // Execute
    const result = await uploadModel.update(payload)

    // Assert
    expect(result.success).toBe(returnSuccess)
    expect(result.message).toEqual(returnMessage)
    expect(result.results).toEqual(returnResults)

  })

  it('should return an error if resource is of the wrong type', async () => {

    // Setup
    const modelReturnData = []

    tracker.on.update('files').responseOnce(modelReturnData)

    const payload = {
      id: 1,
      name: 'test-1680211818271-248980925.jpg',
      mimetype: 'image/jpeg',
      resource: 1,
      resourceid: 1,
      userid: 1
    }

    const returnSuccess = false
    const returnMessage = 'Resource must be a string'
    const returnResults = modelReturnData

    // Execute
    const result = await uploadModel.update(payload)

    // Assert
    expect(result.success).toBe(returnSuccess)
    expect(result.message).toEqual(returnMessage)
    expect(result.results).toEqual(returnResults)

  })

  it('should return an error if resource id is missing', async () => {

    // Setup
    const modelReturnData = []

    tracker.on.update('files').responseOnce(modelReturnData)

    const payload = {
      id: 1,
      name: 'test-1680211818271-248980925.jpg',
      mimetype: 'image/jpeg',
      resource: 'recipe',
      userid: 1
    }

    const returnSuccess = false
    const returnMessage = 'Resource ID is required'
    const returnResults = modelReturnData

    // Execute
    const result = await uploadModel.update(payload)

    // Assert
    expect(result.success).toBe(returnSuccess)
    expect(result.message).toEqual(returnMessage)
    expect(result.results).toEqual(returnResults)

  })

  it('should return an error if resource id is of the wrong format', async () => {

    // Setup
    const modelReturnData = []

    tracker.on.update('files').responseOnce(modelReturnData)

    const payload = {
      id: 1,
      name: 'test-1680211818271-248980925.jpg',
      mimetype: 'image/jpeg',
      resource: 'recipe',
      resourceid: 'Steve oMalley',
      userid: 1
    }

    const returnSuccess = false
    const returnMessage = 'Resource ID must be a number'
    const returnResults = modelReturnData

    // Execute
    const result = await uploadModel.update(payload)

    // Assert
    expect(result.success).toBe(returnSuccess)
    expect(result.message).toEqual(returnMessage)
    expect(result.results).toEqual(returnResults)

  })

  it('should return an error if user id is missing', async () => {

    // Setup
    const modelReturnData = []

    tracker.on.update('files').responseOnce(modelReturnData)

    const payload = {
      id: 1,
      name: 'test-1680211818271-248980925.jpg',
      mimetype: 'image/jpeg',
      resource: 'recipe',
      resourceid: 1,
    }

    const returnSuccess = false
    const returnMessage = 'User ID is required'
    const returnResults = modelReturnData

    // Execute
    const result = await uploadModel.update(payload)

    // Assert
    expect(result.success).toBe(returnSuccess)
    expect(result.message).toEqual(returnMessage)
    expect(result.results).toEqual(returnResults)

  })

  it('should return an error if the user id is of the wrong format', async () => {

    // Setup
    const modelReturnData = []

    tracker.on.update('files').responseOnce(modelReturnData)

    const payload = {
      id: 1,
      name: 'test-1680211818271-248980925.jpg',
      mimetype: 'image/jpeg',
      resource: 'recipe',
      resourceid: 1,
      userid: 'Jericho'
    }

    const returnSuccess = false
    const returnMessage = 'User ID must be a number'
    const returnResults = modelReturnData

    // Execute
    const result = await uploadModel.update(payload)

    // Assert
    expect(result.success).toBe(returnSuccess)
    expect(result.message).toEqual(returnMessage)
    expect(result.results).toEqual(returnResults)

  })

  it('should return an error for any other problems', async () => {

    // Setup
    tracker.on.update('files').simulateError('Problem connectiong to the database')

    const payload = {
      id: 1,
      name: 'test-1680211818271-248980925.jpg',
      mimetype: 'image/jpeg',
      resource: 'recipe',
      resourceid: 1,
      userid: 1
    }

    const returnSuccess = false
    const returnMessage = 'There was a problem with the resource, please try again later'

    // Execute
    const result = await uploadModel.update(payload)

    // Assert
    expect(result.success).toBe(returnSuccess)
    expect(result.message).toEqual(returnMessage)

  })

})