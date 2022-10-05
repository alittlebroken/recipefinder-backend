/*
 * Required Packages
 */
require('dotenv').config();
const winston = require('winston');
const path = require('path');
const LOGPATH = path.join('../', process.env.LOG_LOCATION);

/* Create custom format for log output */
const customFormat = winston.format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}]: ${level} - ${message}`;
});

/* Create the logger for the appliation log */
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.label({ label: process.env.APP_NAME}),
    winston.format.timestamp({ format: 'DD-MM-YY HH:mm:ss'}),
    customFormat
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(LOGPATH, process.env.LOG_APP_COMMON)
    })
  ]
});

/* Add a console transport if we are in development only */
if(process.env.ENVIRONMENT !== 'production' || process.env.ENVIRONMENT !== 'prod'){
  logger.add(new winston.transports.Console())
}

/*
 * log a message
 */
const logMessage = (level, message) => {
  logger.log({
    level: level,
    message: message,
  })
}

module.exports = {
  logMessage
}
