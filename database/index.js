const db = require('./db.js');

const getProducts = (page, count) => {
  let queryString = 'SELECT * FROM products ORDER BY id OFFSET $1 LIMIT $2';
  let offset = (page - 1) * count;
  let params = [offset, count];
  return db.pool
    .connect()
    .then(client => {
      console.log('connection success');
      return client
      .query(queryString, params)
      .then(results => {
        client.release();
        return results.rows;
      })
      .catch(error => {
        client.release();
        console.error(error);
      });
    })
    .catch(error => {
      console.error;(error);
    });
};

module.exports = {
  getProducts
};