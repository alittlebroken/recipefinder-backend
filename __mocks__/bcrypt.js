/* Auto mock the bcrypt library */
const bcrypt = jest.createMockFromModule('bcrypt');

/* controls wether or not we produce and error or not for testing */
let errorMode = 'none';

/* Set wether or not we produce a good value or an error */
bcrypt.__setErrorMode = (mode = 'none') => {
  errorMode = mode;
}

/* Mocking hash function */
bcrypt.hash = (password, salt) => {
  if(errorMode === 'none'){
    return '$2a$10$p7lR6HJiYpA7leO23Dq85O1MmPmw1ox0KXpmFSCWUSo0vPL7vo9M.';
  } else if(errorMode === 'fail') {
    return false;
  } else if(errorMode = 'libfail') {
    throw new error('Mocked bcrypt has encountered an error');
  }
}

/* Mocking the verify function */
bcrypt.compare = (password, hash) => {
  if(errorMode === 'none'){
    return true;
  } else if(errorMode === 'fail') {
    return false;
  } else if(errorMode = 'libfail') {
    throw new error('Mocked bcrypt has encountered an error');
  }
}

module.exports = bcrypt;
