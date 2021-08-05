const pg = require('pg');
const db = require('./db.js');
const fs = require('fs');
const path = require('path');

const databaseConnect = () => {
  return db.pool.connect()
  .then(client => {
    return client;
  });
};

const databaseRelease = () => {
  return client.release();
};

const initializeTestDatabase = (client) => {
  let removeDBQuery = 'DROP DATABASE IF EXISTS test';
  let createDBQuery = 'CREATE DATABASE IF NOT EXISTS test';
  let createTablesQuery = fs.readFileSync(path.join(__dirname, './atelier.overview.sql')).toString();
  let loadDBMockData = fs.readFileSync(path.join(__dirname, './db_load_test.sql')).toString();

  return client.query(`${removeDBQuery} ${createDBQuery} ${createTablesQuery} ${loadDBMockData}`);
};

const clearTestDatabase = (client) => {
  let removeDBQuery = 'DROP DATABASE IF EXISTS test';
  return client.query(removeDBQuery);
};

module.exports = {
  databaseConnect,
  databaseRelease,
  initializeTestDatabase,
  clearTestDatabase
};