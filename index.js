/*
 * Required Packages
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path');
const bodyParser = require('body-parser');

/*
 * Configure the app
 */
 require('./config/passport');
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 app.use(cors());
 app.use(passport.initialize());

/* Logging Information */

/*
 * Log all errors for the app here
 */
const logger = require('./config/winston');

/*
 * Log all http access and errors
 */
 const httpErrorLogStream = rfs.createStream(process.env.LOG_HTTP_ERROR || 'http_error.log', {
   interval: process.env.LOG_ROTATION || '1d',
   path: path.join(__dirname, process.env.LOG_LOCATION)
 });

const accessLogStream = rfs.createStream(process.env.LOG_HTTP_ACCESS || 'http_access.log', {
  interval: process.env.LOG_ROTATION || '1d',
  path: path.join(__dirname, process.env.LOG_LOCATION)
});

app.use(morgan('dev', {
  stream: httpErrorLogStream,
  skip: (req, res) => { return res.statusCode < 400 }
}));

app.use(morgan('combined', {
  stream: accessLogStream
}));

 /*
  Only display logs to the console if in development mode
 */
 if(process.env.ENVIRONMENT !== 'production' || process.env.ENVIRONMENT !== 'prod'){
   app.use(morgan('combined'));
 }

/*
 * Import our routes
 */
const cookbooksRoute = require('./routes/api/cookbooksRoute');
const ingredientsRoute = require('./routes/api/ingredientsRoute');
const stepsRoute = require('./routes/api/stepsRoute');
const pantriesRoute = require('./routes/api/pantriesRoute');
const categoriesRoute = require('./routes/api/categoriesRoute');
const recipesRoute = require('./routes/api/recipesRoute');

/*
 * Add the routes to the app
 */
app.use('/cookbooks', cookbooksRoute);
app.use('/ingredients', ingredientsRoute);
app.use('/steps', stepsRoute);
app.use('/pantries', pantriesRoute);
app.use('/categories', categoriesRoute);
app.use('/recipes', recipesRoute);

/* Capture unknown routes */
app.get('*', (req, res, next) => {
  const err  = new Error(`Endpoint ${req.url} not found`);
  err.status = 404;
  next(err);
});

/* Default error handler */
app.use((error, req, res, next) => {

  let statusCode = 500;
  let message = 'A problem has been encountered please check and try again';

  if(error){
      statusCode = error.status;
      message = error.message;
  }

  /* Log the error */
  logger.logMessage('error', message)

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message
  });

});

/* export the server for testing */
module.exports  = app;
