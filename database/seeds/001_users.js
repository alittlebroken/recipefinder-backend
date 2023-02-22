// Bring in any packages needed
require('dotenv').config();
const bcrypt  = require('bcrypt')

// Get the password for the SEEDED users
const hashPass = bcrypt.hashSync(process.env.SEED_PASS, 10)

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  // Add the new data
  await knex('users').insert([
    {
      id: 1,
      username: 'admin@localhost',
      password: hashPass,
      email: 'admin@localhost',
      forename: 'Site',
      surname: 'Administrator',
      phone_no: '',
      roles: 'admin'
    },
    {
      id: 2,
      username: 'customer@localhost',
      password: hashPass,
      email: 'customer@localhost',
      forename: 'Site',
      surname: 'Customer',
      phone_no: '',
      roles: 'customer'
    }
  ]);
};
