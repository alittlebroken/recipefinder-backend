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