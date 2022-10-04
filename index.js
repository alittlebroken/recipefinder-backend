/*
 * Required Packages
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const morgan = require('morgan');

/*
 * Configure the app
 */
 require('./config/passport');
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 app.use(cors());
 app.use(passport.initialize());
 app.use(morgan('combined'));

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
