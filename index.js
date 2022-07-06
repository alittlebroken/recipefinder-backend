/*
 * Required Packages
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');

/*
 * Configure the app
 */
 require('./config/passport');
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 app.use(cors);
 app.use(passport.initialize());

/*
 * Import our routes
 */

/*
 * Start the server
 */
app.listen(process.env.EXPRESS_PORT, error => {
  if(error) console.error('Issue starting server');
  console.log(`Server started on port ${process.env.EXPRESS_PORT}`)
});
