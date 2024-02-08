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
const cookieParser = require('cookie-parser');

/*
 * Configure the app
 */
 app.use(express.json()); 
 app.use(express.urlencoded({ extended: true }));
 app.use(cookieParser());
 app.use(cors({
  //origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  //origin: 'http://localhost:3000',
  origin: 'https://recipefinder-client.onrender.com',
  credentials: true,
  allowedHeaders: "authorisation,Authorisation,Content-Type,content-type,Content-type,token,range",
  exposedHeaders: "Content-Range, X-Content-Range"
 }));
 app.use(passport.initialize());
 require('./config/passport');

/* Set the base location for the uploaded files */
app.use('/media', express.static(path.join(__dirname, '/public/media')))

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
const authRoute = require('./routes/api/authRoute');
const searchRoute = require('./routes/api/searchRoute');
const usersRoute = require('./routes/api/userRoute');
const dashRoute = require('./routes/api/dashRoute');
const uploadRoute = require('./routes/api/uploadRoute');

/*
 * Add the routes to the app
 */
app.use('/cookbooks', cookbooksRoute);
app.use('/ingredients', ingredientsRoute);
app.use('/steps', stepsRoute);
app.use('/pantries', pantriesRoute);
app.use('/categories', categoriesRoute);
app.use('/recipes', recipesRoute);
app.use('/auth', authRoute);
app.use('/search', searchRoute);
app.use('/users', usersRoute);
app.use('/dashboard', dashRoute);
app.use('/uploads', uploadRoute);

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
  let results;

  if(error){
      
    if(error.status){
        statusCode = error.status
    } 
      
      message = error.message;

      /* Some messages we also send extra information that we need to also include */
      error.results ? results = error.results : [];
  }


  /* Log the error */
  logger.logMessage('error', message)

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
    results: results,
    pagination: {}
  });

});

/* export the server for testing */
module.exports  = app;
