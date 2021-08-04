require('dotenv').config();
const { Pool } = require ('pg');

// check current environment variables to use either test db or dev/production
let currentDatabase = '';
process.env.NODE_ENV === 'test' ? currentDatabase = process.env.PSQL_TEST_DATABASE : currentDatabase = process.env.PSQL_DATABASE;

const pool = new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: currentDatabase,
  password: process.env.PSQL_PASSWORD,
  port: process.env.PSQL_PORT
});

module.exports = { pool };