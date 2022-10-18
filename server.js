/* Import the express app */
require('dotenv').config();
const express = require('express')
const app = require('./index')
const logger = require('./config/winston');

/*
 * Start the server
 */
app.listen(process.env.EXPRESS_PORT, () => {
  let startupMessage = `${process.env.ENVIRONMENT} server started on port ${process.env.EXPRESS_PORT}`;
  logger.logMessage('info', startupMessage);
});
