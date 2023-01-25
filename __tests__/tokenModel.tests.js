/*
 * Packages needed for scripts
 */
const knex = require('knex');
const db = require('../database');
const { getTracker, Tracker } = require('knex-mock-client');

const tokenModel = require('../models/tokenModel');
const { exceptions } = require('winston');

/* Mock the DB library */
jest.mock('../database', () => {
  const knex = require('knex');
  const { MockClient } = require('knex-mock-client');
  return knex({ client: MockClient })
});

/* Tracker for the SQL commands */
let tracker;

describe('tokenModel', () => {

    beforeEach(async () => {
        /* Initialize the tracker of the various commands */
        tracker = getTracker();
    });
    
    afterEach(() => {
        /* Reset the tracker */
        tracker.reset();
    })

    describe('findOne', () => {

        it('should find and return an existing refresh token', async () => {

            // Setup
            const userId = 1;

            const mockReturnData = [{
                id: 1,
                userid: 1,
                token: '84105872-3472-34834-58345-84=234',
                created_at: '',
                updated_at: ''
            }]

            tracker.on.select('refreshtokens').responseOnce(mockReturnData)

            // Execute
            const result = await tokenModel.findOne(userId)
            
            // Assert
            expect(typeof result).toBe('object')
            expect(typeof result.id).toBe('number')
            expect(typeof result.userid).toBe('number')
            expect(typeof result.token).toBe('string')
            expect(typeof result.created_at).toBe('string')
            expect(typeof result.updated_at).toBe('string')

            expect(result).toEqual(mockReturnData[0])

        })

        it('should return false if no entries found', async () => {

            // Setup
            const userId = 2;

            const modelReturnData = [];

            tracker.on.select('refreshtokens').response(modelReturnData)

            // execute
            const result = await tokenModel.findOne(userId)
            
            // Assert
            expect(typeof result).toBe('boolean')
            expect(result).toEqual(false)

        })

        it('should return an error if userId is not passed in', async () => {

            // Setup
            let userId

            const modelReturnData = []

            const expectedSuccess = false
            const expectedMessage = 'Undefined user id'

            tracker.on.select('refreshtokens').response(modelReturnData)

            // Execute
            const result = await tokenModel.findOne(userId)

            // Assert
            expect(typeof result).toBe('object')
            expect(typeof result.success).toBe('boolean')
            expect(typeof result.message).toBe('string')

            expect(result.success).toEqual(expectedSuccess)
            expect(result.message).toEqual(expectedMessage)

        })

        it('should return an error if user id is in the wrong format', async () => {

            // Setup
            let userId = 'twentyfour'

            const modelReturnData = []

            const expectedSuccess = false
            const expectedMessage = 'Wrong format for user id'

            tracker.on.select('refreshtokens').response(modelReturnData)

            // Execute
            const result = await tokenModel.findOne(userId)

            // Assert
            expect(typeof result).toBe('object')
            expect(typeof result.success).toBe('boolean')
            expect(typeof result.message).toBe('string')

            expect(result.success).toEqual(expectedSuccess)
            expect(result.message).toEqual(expectedMessage)

        })

        it('should return a generic error for any other problems found', async () => {
            
            // Setup
            let userId = 1

            const modelReturnData = []

            const expectedSuccess = false
            const expectedMessage = 'There was a problem with the resource, please try again later'

            tracker.on.select('refreshtokens').simulateError('Unable to connect to DB')

            // Execute
            const result = await tokenModel.findOne(userId)

            // Assert
            expect(typeof result).toBe('object')
            expect(typeof result.success).toBe('boolean')
            expect(typeof result.message).toBe('string')

            expect(result.success).toEqual(expectedSuccess)
            expect(result.message).toEqual(expectedMessage)
        })

    })

    describe('removeOne', () => {

        it('should remove the refresh token associated with a user', async () => {

            // setup
            const userid = 1

            const modelReturnData = [ { id: 1 } ]

            tracker.on.delete('refreshtokens').responseOnce(modelReturnData)

            // execute
            const result = await tokenModel.removeOne(userid)
            
            // assert
            expect(typeof result).toBe('object')
            expect(typeof result.success).toBe('boolean')
            expect(typeof result.message).toBe('string')

            expect(result.success).toEqual(true)
            expect(result.message).toEqual('refreshToken successfully removed')

        })

        it('should return false if no records found', async () => {

            // setup
            const userid = 1

            const modelReturnData = []

            tracker.on.delete('refreshtokens').responseOnce(modelReturnData)

            // execute
            const result = await tokenModel.removeOne(userid)

            // assert
            expect(typeof result).toBe('object')
            expect(typeof result.success).toBe('boolean')
            expect(typeof result.message).toBe('string')

            expect(result.success).toEqual(false)
            expect(result.message).toEqual('No refresh tokens were found matching supplied data')

        })

        it('should return false if user id is undefined', async () => {

            // setup
            let userid

            const modelReturnData = []

            tracker.on.delete('refreshtokesn').responseOnce(modelReturnData)

            // execute
            const result = await tokenModel.removeOne(userid)

            // assert
            expect(typeof result).toBe('object')
            expect(typeof result.success).toBe('boolean')
            expect(typeof result.message).toBe('string')

            expect(result.success).toEqual(false)
            expect(result.message).toEqual('Undefined user id')

        })

        it('should return false if the user id is in the wrong format', async () => {

            // setup
            const userid = 'twentytwelve'

            const modelReturnData = []

            tracker.on.delete('refreshtokens').responseOnce(modelReturnData)

            // execute
            const result = await tokenModel.removeOne(userid)

            // assert
            expect(typeof result).toBe('object')
            expect(typeof result.success).toBe('boolean')
            expect(typeof result.message).toBe('string')

            expect(result.success).toEqual(false)
            expect(result.message).toEqual('Wrong format for user id')

        })

        it('should return a generic error for any other problems the resource encounters', async () => {

            // setup
            const userid = 1

            const modelReturnData = []

            tracker.on.delete('refreshtokens').simulateError('Unable to connect to the database')

            // execute
            const result = await tokenModel.removeOne(userid)

            // assert
            expect(typeof result).toBe('object')
            expect(typeof result.success).toBe('boolean')
            expect(typeof result.message).toBe('string')

            expect(result.success).toEqual(false)
            expect(result.message).toEqual('There was a problem with the resource, please try again later')

        })

    })

})