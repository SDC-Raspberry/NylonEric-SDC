const app = require('../server/server');
const supertest = require('supertest');
const { initializeTestDatabase, clearTestDatabase, databaseConnect, databaseRelease } = require('../database/scripts.js');
const request = supertest(app);
const chalk = require('chalk');

const PORT = process.env.TEST_PORT || 3331;
let baseURL = `http://localhost:${PORT}`;

describe('Server and database function test suite:', () => {
  let client;
  beforeAll(() => {
    return databaseConnect()
    .then(_client => {
      client = _client;
      // console.log(chalk.bgBlue('test database client connected!\nport: ', client.connectionParameters.port));
      return initializeTestDatabase(client);
    })
    .catch(error => console.log(error));
  });

  afterAll(() => {
    return clearTestDatabase(client)
    .then(() => {
      return databaseRelease(client)
    })
    .catch(error => console.log('error on exit process', error));
    //  await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  });

  /* server connection test */
  test('Server responds to GET request', () => {
    let queryString = '/';
    expect.assertions(1);
    return request.get(queryString)
    .then(data => {
      expect(data.status).toBe(200);
    })
    .catch(err => {
      console.error('error in GET request: ', err);
    });
  });

  /* GET products test */
  test('Server responds to GET /products request', () => {
    let queryString = '/products';
    expect.assertions(2);
    return request.get(queryString)
    .then(data => {
      // console.log('server response to GET /products request: success!');
      expect(data.status).toBe(200);
      let products = JSON.parse(data.text);
      expect(products.length > 0).toBe(true);
    })
    .catch(err => {
      console.error('error in GET /products request: ', err);
    });
  });

   /* GET product test */
   test('Server responds to GET /product request', () => {
    let product_id = 11;
    let queryString = `/products/${product_id}`;
    expect.assertions(2);
    return request.get(queryString)
    .then(data => {
      // console.log('server response to GET /products/:product_id request: success!');
      expect(data.status).toBe(200);
      let product = JSON.parse(data.text);
      expect(product.id).toBe(11);
    })
    .catch(err => {
      console.error('error in GET /product/:product_id request: ', err);
    });
  });

  /* GET product styles test */
  test('Server responds to GET /product/:product_id/styles request', () => {
    let queryString = '/products/:product_id/styles';
    expect.assertions(3);
    return request.get(queryString)
    .query({'product_id':13})
    .then(data => {
      // console.log('server response to GET /product/:product_id/styles request: success!');
      expect(data.status).toBe(200);
      let styles = JSON.parse(data.text);
      expect(styles.product_id).toBe(13);
      expect(styles.results.length).toBe(3);
    })
    .catch(err => {
      console.error('error in GET products/:product_id/styles request: ', err);
    });
  });

  /* GET product related test */
  test('Server responds to GET /product/:product_id/related request', () => {
    let queryString = '/products/:product_id/related';
    expect.assertions(2);
    return request.get(queryString)
    .query({product_id: 12})
    .then(data => {
      // console.log('server response to GET /product/:product_id/related request: success!');
      let related = JSON.parse(data.text);
      expect(data.status).toBe(200);
      expect(related.length).toBe(6);
    })
    .catch(err => {
      console.error('error in GET /products/:product_id/related request: ', err);
    });
  });
});