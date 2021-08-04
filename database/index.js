const db = require('./db.js');

const getProducts = (page, count) => {
  let queryString = 'SELECT * FROM products ORDER BY id OFFSET $1 LIMIT $2';
  let offset = (page - 1) * count;
  let params = [offset, count];
  return db.pool
    .connect()
    .then(client => {
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
      console.error(error);
    });
};

const getProduct = (product_id) => {
  let productsQueryString = 'SELECT * FROM products WHERE id=$1';
  let featuresQueryString = 'SELECT feature, value FROM features WHERE product_id=$1';
  return db.pool
  .connect()
  .then(client => {
    return Promise.all([
      client.query(productsQueryString, [product_id]),
      client.query(featuresQueryString, [product_id])
    ])
    .then(results => {
      client.release();
      let info = results[0].rows[0];
      let productInfo = {
        id: Number(info.id),
        name: info.name,
        slogan: info.slogan,
        description: info.description,
        category: info.category,
        default_price: info.default_price,
        features: []
      };
      let features = results[1].rows;
      productInfo.features = features;
      return productInfo;
    })
    .catch(error => {
      client.release();
      console.error(error);
      return error;
    });
  })
  .catch(error => {
    console.error(error);
    return error;
  });
};

module.exports = {
  getProducts,
  getProduct
};