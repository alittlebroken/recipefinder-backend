/*
 * Packages needed for scripts
 */
const knex = require('knex');
const db = require('../database');
const userModel = require('../models/userModel');
const { getTracker, Tracker } = require('knex-mock-client');

/* Mock the DB library */
jest.mock('../database', () => {
  const knex = require('knex');
  const { MockClient } = require('knex-mock-client');
  return knex({ client: MockClient })
});

/* Tracker for the SQL commands */
let tracker;

/* Mock a single user from the db */
const users = [{
  id: 1,
  username: 'bcollins',
  email: 'bcollins@testmailer.com',
  roles: 'user',
  forename: '',
  surname: ''
}];

describe('userModel.insert', () => {

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

  it('should add a user into the users table', async () => {

    /* Mock the response for the insert */
    tracker.on.insert('users').response([{ id: 1 }]);
    tracker.on.select('users').response([
      {
        id: 1,
        username: 'bcollins',
        email: 'bcollins@testemailer.com',
        roles: 'user'
      }
    ]);

    /* Set the data to be inserted */
    const usersName = 'bcollins';
    const usersEmail = 'bcollins@testmailer.com';
    const usersPassword = 'b0st1nr365s';

    /* Insert some users into the users table */
    const user1 = await userModel.insert(usersName, usersPassword, usersEmail);

    /* Check the user was added */
    expect(Array.isArray(user1)).toBe(true);
    expect(user1).toHaveLength(1);
    expect(user1[0].id).toEqual(1);
    expect(user1[0].username).toEqual('bcollins');

  });

  it('should throw an error if required data is not passed', async () => {

    /* Set the data to be inserted */
    const usersPassword = '';
    const usersEmail = '';
    const usersName = '';

    /* Try to add the data */
    const result = await userModel.insert(usersName, usersPassword, usersEmail);

    /* Check the result of running the function */
    expect(typeof result).toEqual('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('You must provide values for username,password or email.');

  });

  it('should throw an error if any issues inserting', async () => {

    /* Mock the response */
    tracker.on.insert('users').simulateError('insertion error');

    /* Set the data to be inserted */
    const usersName = 'bcollins';
    const usersEmail = 'bcollins@testmailer.com';
    const usersPassword = 'b0st1nr365s';

    /* Add the record */
    const result = await userModel.insert(usersName, usersPassword, usersEmail);

    /* Check the result of running the function */
    expect(typeof result).toEqual('object');
    expect(result.success).toBe(false);
    expect(result.message).toBe('There was an issue using this resource, please try again later');

  });

});

describe('userModel.findByEmail', () => {

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

  it('should return the requested record', async () => {

    /* Mock the DB responses and errors */
    tracker.on.select('users').response(users);

    /* Set the data to find */
    const usersEmail = 'bcollins@testmailer.com';

    /* Execute the method */
    const result = await userModel.findByEmail(usersEmail);

    /* Check the response */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);
    expect(result[0].email).toEqual(usersEmail);

  });

  it('should error if incorrect data has been supplied', async () => {

    /* Set the data to send */
    const usersEmail = '';

    /* Execute the method */
    const result = await userModel.findByEmail(usersEmail);

    /* Check the response from the function */
    expect(typeof result).toEqual('object');
    expect(result.success).toBe(false);
    expect(result.message).toEqual('You must supply a valid email address');

  });

  it('should error if no records match passed in data', async () => {

    /* Mock the DB responses and errors */
    tracker.on.select('users').response([]);

    /* Set the data to find */
    const usersEmail = 'twallis@testemailer.com';

    /* execute the method */
    const result = await userModel.findByEmail(usersEmail);

    /* Check the response */
    expect(typeof result).toEqual('object')
    expect(result.success).toBe(false);
    expect(result.message).toEqual('Unable to find any records matching supplied data.');

  });

  it('should give generic error message for any other issues encountered', async () => {

    /* Mock the DB responses and errors */
    tracker.on.select('users').simulateError('Unknown error');

    /* Set the data to send */
    const usersEmail = 'bcollins@testmailer.com';

    /* Execute the function */
    const result = await userModel.findByEmail(usersEmail);

    /* Test the response */
    expect(typeof result).toEqual('object')
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was an issue using this resource, please try again later');

  });

});

describe('userModel.findById', () => {

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

 it('should find the desired record', async () => {

   /* Mock the DB response */
   tracker.on.select('users').response(users);

   /* Set the data to be used in the test */
   const userID = 1;
   const userName = 'bcollins';
   const userEmail = 'bcollins@testmailer.com';
   const userPassword = 'User';

   /* Execute the function */
   const result = await userModel.findById(userID);

   /* Check the response back */
   expect(Array.isArray(result)).toBe(true);
   expect(result).toHaveLength(1);
   expect(result[0].id).toEqual(userID);
   expect(result[0].username).toEqual(userName);
   expect(result[0].email).toEqual(userEmail);

 });

 it('should error if passed in data is incorrect or missing', async () => {

   /* Set the data to send */
   const userId = '';

   /* Execute the method */
   const result = await userModel.findById(userId);

   /* check the response from the function  */
   expect(result instanceof Object).toBe(true);
   expect(result.success).toBe(false);
   expect(result.message).toEqual('A valid user id is required.');

 });

 it('should error if no records found', async () => {

   /* Mock the DB response error */
   tracker.on.select('users').response([]);

   /* Set ID we wish to try and find */
   const userId = 1002;

   /* Execute the function with the passed in data */
   const result = await userModel.findById(userId);

   /* Check the response */
   expect(result instanceof Object).toBe(true);
   expect(result.success).toBe(false);
   expect(result.message).toEqual('No records found matching passed in id');

 });

 it('should give generic error message for any other issues encountered', async () => {

   /* Mock the DB response error */
   tracker.on.select('users').simulateError('connection lost');

   /* Set ID we wish to try and find */
   const userId = 1002;

   /* Execute the function with the passed in data */
   const result = await userModel.findById(userId);

   /* Check the response */
   expect(result instanceof Object).toBe(true);
   expect(result.success).toBe(false);
   expect(result.message).toEqual('There was a problem with the resource, please try again later');

 });

});

describe('userModel.update', () => {

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

  it('should update the specified user', async () => {

    /* Mock the DB Response */
    tracker.on.update('users').response([]);
    tracker.on.select('users').response([
      { id: 1,
        username: 'bcollins',
        email: 'bcollins@testmailer.com',
        roles: 'user',
        forename: 'Brian',
        surname: 'Collinson'
      }
    ]);

    /* Set the data to be updated */
    const userId = 1;
    const username = 'bcollins';
    const email = 'bcollins@testmailer.com';
    const roles = 'user';
    const forename = 'Brian';
    const surname = 'Collinson';

    /* Update the record */
    const result = await userModel.update(userId, username, email, roles, forename, surname);

    /* Check the response */
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);
    expect(result[0].id).toEqual(userId);
    expect(result[0].username).toEqual(username);
    expect(result[0].email).toEqual(email);
    expect(result[0].roles).toEqual(roles);
    expect(result[0].forename).toEqual(forename);
    expect(result[0].surname).toEqual(surname);

  });

  it('should error if required data is missing or incorrect', async () => {

    /* Set the data to send across */
    const userId = '';
    const username = 'bcollins';
    const email = 'bcollins@testmail.com';
    const roles = 'user';
    const forename = 'Brian';
    const surname = 'Collinson';

    /* Execute the function */
    const result = await userModel.update(userId, username, email, roles, forename, surname);

    /* Check the response */
    expect(result instanceof Object).toBe(true);
    expect(result.success).toBe(false);
    expect(result.message).toEqual('One or more of the supplied arguments are missing or incorrect.');

  });

  it('should error if there are no records found', async() => {

    /* Mock the DBs respknse */
    tracker.on.update('users').response([]);
    tracker.on.select('users').response([]);

    /* set the data to be sent to the function */
    const userId = 1024;
    const username = 'bcollins';
    const email = 'bcollins@testmail.com';
    const roles = 'user';
    const forename = 'Brian';
    const surname = 'Collinson';

    /* Execute the function */
    const result = await userModel.update(userId, username, email, roles, forename, surname);

    /* Check the response */
    expect(result instanceof Object).toBe(true);
    expect(result.success).toBe(false);
    expect(result.message).toEqual('No records matched supplied data');

  });

  it('should give generic error message for any other issues encountered', async() => {

    /* Mock the DBs response */
    tracker.on.select('users').simulateError('connection lost to db');

    /* set the data to be sent to the function */
    const userId = 1024;
    const username = 'bcollins';
    const email = 'bcollins@testmail.com';
    const roles = 'user';
    const forename = 'Brian';
    const surname = 'Collinson';

    /* Execute the function */
    const result = await userModel.update(userId, username, email, roles, forename, surname);

    /* Check the response */
    expect(result instanceof Object).toBe(true);
    expect(result.success).toBe(false);
    expect(result.message).toEqual('There was an issue with the resource, please try again later');

  });

});

describe('userModel.remove', () => {

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

  it('should remove the specified record', async () => {

    /* Mock the DB repsonses */
    tracker.on.delete('users').response({ id: 1 });
    tracker.on.select('users').response({
      success: true,
      message: 'The record was deleted successfully'
    });

    /* Set data to pass to function */
    const userId = 1;

    /* Set the expected response value(s) */
    const expectedResponseMessage = 'The record was deleted successfully';
    const expectedSelectResponseMessage = 'No records found matching passed in id';

    /* Execute the function */
    const result = await userModel.remove(userId);

    /* Test the response */
    expect(result instanceof Object).toBe(true);
    expect(result.success).toBe(true);
    expect(result.message).toEqual(expectedResponseMessage);

    /* Perform a search of the DB to ensure the record is not there */
    const searchResult = await userModel.findById(userId);
    expect(searchResult instanceof Object).toBe(true);
    expect(searchResult.success).toBe(false);
    expect(searchResult.message).toEqual(expectedSelectResponseMessage);

  });

  it('should error if passed in argument is missing or incorrect', async () => {

    /* Set the  data being passed to the funtion */
    const userId = '';
    const responseMessage = 'One or more of the supplied arguments are missing or incorrect.';

    /* execute the function */
    const result = await userModel.remove(userId);

    /* Test the response */
    expect(result instanceof Object).toBe(true);
    expect(result.success).toBe(false);
    expect(result.message).toEqual(responseMessage);

  });

  it('should error when other issues occur', async () => {

    /* Mock the DBs response */
    tracker.on.delete('users').simulateError('Connection lost to the database');

    /* Set the data being passed to the function */
    const userId = 1;
    const responseMessage = 'There was an issue with the resource, please try again later';

    /* Execute the function */
    const result = await userModel.remove(userId);

    /* Test the response */
    expect(result instanceof Object).toBe(true);
    expect(result.success).toBe(false);
    expect(result.message).toEqual(responseMessage);

  });

});

describe('userModel.hash', () => {

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

  it('should hash the supplied data and return it', async () => {

    /* database to be hashed */
    const userPassword = '!Tw3lv£D4ysL0st@-';

    /* Execute the function */
    const result = await userModel.hash(userPassword);

    /* Test the response from the function */
    expect(typeof result).toEqual('string');
    expect(result.length).toBeGreaterThan(0);

  });

  it('should error if there are issues', async () => {

    /* Data to be passed into the function */
    const userPassword = '';

    /* Execute the function */
    const result = await userModel.hash(userPassword);

    /* Test the response */
    expect(result instanceof Object).toBe(true);
    expect(result.success).toBe(false);

  });

});

describe('userModel.verify', () => {

  it('should correctly verify the users password against the hash', async () => {

    /* Set the data to be sent to the function */
    const userPassword = 'password';

    /* Now generate the hash that we wish to verify against */
    const userHashedPassword = await userModel.hash(userPassword);

    /* Now execute the function */
    const result = await userModel.verify(userPassword, userHashedPassword);

    /* Test the response */
    expect(typeof result).toEqual('boolean');
    expect(result).toBe(true);

  });

  it('should return false if no data supplied', async () => {

    /* data to send to the function */
    const userPassword = '';
    const userHashedPassword = '';

    /* Execute the function */
    const result = await userModel.verify(userPassword, userHashedPassword);

    /* Test the response */
    expect(typeof result).toEqual('boolean');
    expect(result).toBe(false);

  });

  it('should return an error if the password and hash do not match', async () => {

    /* Data to send to the function */
    const userPassword = 'password';
    const userHash = '$2a$10$LDDwA7gt8Tve3qUlVGnZw.1K8h0lG.jkOAx8jILRmwO./CJ0A5Mw.';

    /* execute the function */
    const result = await userModel.verify(userPassword, userHash);

    /* Test the result */
    expect(typeof result).toEqual('boolean');
    expect(result).toBe(false);

  });

  it('should error for any other reason', async () => {

    /* Set data to send to the function */
    const userPassword = { };
    const userHash = { };

    /* Execute the function */
    const result = await userModel.verify(userPassword, userHash);

    /* Test the response */
    expect(typeof result).toEqual('boolean');
    expect(result).toBe(false);

  });

});
