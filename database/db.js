require('dotenv').config();
const { Pool } = require ('pg');

// check current environment variables to use either test db or dev/production
process.env.NODE_ENV === 'test' ? currentPoolObject = {
  user: process.env.PSQL_TEST_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_TEST_DATABASE,
  password: process.env.PSQL_TEST_PASSWORD,
  port: process.env.PSQL_TEST_PORT,
  max: 3,
  maxUses: Infinity,
  idleTimeoutMillis: 30000,
  // connectionTimeoutMillis: 5000
} : currentPoolObject = {
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DATABASE,
  password: process.env.PSQL_PASSWORD,
  port: process.env.PSQL_PORT,
  max: 3,
  maxUses: Infinity,
  idleTimeoutMillis: 30000,
  // connectionTimeoutMillis: 5000
};

const pool = new Pool(currentPoolObject);

module.exports = { pool };