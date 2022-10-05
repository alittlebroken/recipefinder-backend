/*
 * Required Packages
 */
require('dotenv').config();
const winston = require('winston');
const path = require('path');
const LOGPATH = path.join('../', process.env.LOG_LOCATION);

/* Create the logger for the appliation log */
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: path.join(LOGPATH, process.env.LOG_APP_COMMON)
    })
  ]
});

/* Add printing to the console if we are not in production */
if(process.env.ENVIRONMENT !== 'production' || process.env.ENVIRONMENT !== 'prod'){
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
};

module.exports = {
  logger
}
