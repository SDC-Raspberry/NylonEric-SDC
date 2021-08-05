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
  let removeTables = `
    DO $$ DECLARE
    r RECORD;
    BEGIN
      FOR r IN (SELECT tablename FROM test WHERE schemaname = current_schema()) LOOP
        EXECUTE 'DROP TABLE ' || quote_ident(r.tablename) || ' CASCADE';
      END LOOP;
    END $$;`;

  let createTablesQuery = fs.readFileSync(path.join(__dirname, './atelier.overview.sql')).toString();
  let loadDBMockData = fs.readFileSync(path.join(__dirname, './db_load_test.sql')).toString();

  return client.query(`${removeTables} ${createTablesQuery} ${loadDBMockData}`)
  .then(data => {
    console.log('load query executed, data:', data);
    return data;
  });
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