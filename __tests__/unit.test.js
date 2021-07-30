const app = require('../server/server');
const supertest = require('supertest');
const request = supertest(app);

const PORT = process.env.PORT || 3331;
let baseURL = `http://localhost:${PORT}`;

describe('Server and database function test suite:', () => {

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
});