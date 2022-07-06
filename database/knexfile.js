const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
  test: {
    client: 'sqlite3',
    connection: ':memory:',
    useNullAsDefault: true,
    pool: {
      min: 1,
      max: 10,
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations'
    }
  },
  development: {
    client: 'pg',
    connection: {
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations'
    }
  },

};
