/* Called by any package needing access to the DB*/
require('dotenv').config();
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[process.env.ENVIRONMENT]);
module.exports = knex;
