/*
 * Required Packages
 */
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

/*
 * Configure the app
 */
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 app.use(cors);

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
