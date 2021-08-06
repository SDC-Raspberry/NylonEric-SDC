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

const databaseRelease = (client) => {
  return client.release();
};

const initializeTestDatabase = (client) => {
  let removeTables = `
    DO $$ DECLARE
    r RECORD;
    BEGIN
      FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
        EXECUTE 'DROP TABLE ' || quote_ident(r.tablename) || ' CASCADE';
      END LOOP;
    END $$;`;

  let createTablesQuery = fs.readFileSync(path.join(__dirname, './atelier.overview.sql')).toString();
  let loadDBMockData = fs.readFileSync(path.join(__dirname, './db_load_test.sql')).toString();
  return Promise.all([
    client.query(removeTables),
    client.query(createTablesQuery),
    client.query(loadDBMockData),
  ])
};

const clearTestDatabase = (client) => {
  let removeTables = `
    DO $$ DECLARE
    r RECORD;
    BEGIN
      FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
        EXECUTE 'DROP TABLE ' || quote_ident(r.tablename) || ' CASCADE';
      END LOOP;
    END $$;`;
  return client.query(removeTables);
};

module.exports = {
  databaseConnect,
  databaseRelease,
  initializeTestDatabase,
  clearTestDatabase
};