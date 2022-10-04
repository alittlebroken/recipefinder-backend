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

/*
 * Log all errors for the app here
 */
const httpErrorLogStream = rfs.createStream('error.log', {
  interval: '1d',
  path: path.join(__dirname, 'logs')
});

/*
 * Log all access to the app here
 */
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'logs')
});

/*
 * Configure the app
 */
 require('./config/passport');
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 app.use(cors());
 app.use(passport.initialize());

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

 app.get('/', (req, res) => {
   res.send('Boo!')
 })

/*
 * Import our routes
 */

/*
 * Start the server
 */
app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`${process.env.ENVIRONMENT} server started on port ${process.env.EXPRESS_PORT}`)
});
