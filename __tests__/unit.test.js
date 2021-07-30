const app = require('../server/server');
const supertest = require('supertest');
const request = supertest(app);

const PORT = process.env.PORT || 3331;
let baseURL = `http://localhost:${PORT}`;

describe('Server and database function test suite:', () => {
  /*

  GET /products/:product_id/related (returns array of length>0)
  */

  /* server connection test */
  test('Server responds to GET request', () => {
    let queryString = '/';

    return request.get(queryString)
    .then(data => {
      console.log('server response to GET request: ', data.text)
      expect(data.status).toBe(200);
    })
    .catch(err => {
      console.error('error in GET request: ', err);
    });
  });

  /* GET products test */
  test('Server responds to GET /products request', () => {
    let queryString = '/products';

    return request.get(queryString)
    .then(data => {
      console.log('server response to GET /products request: success!');
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
    let queryString = '/products/:product_id';

    return request.get(queryString)
    .query({product_id: 28212})
    .then(data => {
      console.log('server response to GET /product/:product_id request: success!');
      expect(data.status).toBe(200);
      let product = JSON.parse(data.text);
      expect(product.id).toBe(28212);
    })
    .catch(err => {
      console.error('error in GET /product/:product_id request: ', err);
    });
  });

  /* GET product styles test */
  test('Server responds to GET /product/:product_id/styles request', () => {
    let queryString = '/products/:product_id/styles';

    return request.get(queryString)
    .query({product_id: 28212})
    .then(data => {
      console.log('server response to GET /product/:product_id/styles request: success!');
      expect(data.status).toBe(200);
      let styles = JSON.parse(data.text);
      expect(styles.product_id).toBe("28212");
      expect(styles.results.length).toBe(6);
    })
    .catch(err => {
      console.error('error in GET products/:product_id/styles request: ', err);
    });
  });

  /* GET product related test */
  test('Server responds to GET /product/:product_id/related request', () => {
    let queryString = '/products/:product_id/related';

    return request.get(queryString)
    .query({product_id: 28212})
    .then(data => {
      console.log('server response to GET /product/:product_id/related request: success!');
      expect(data.status).toBe(200);
      let related = JSON.parse(data.text);
      expect(related.length).toBe(4);
    })
    .catch(err => {
      console.error('error in GET /products/:product_id/related request: ', err);
    });
  });
});