const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
const productsMock = require('./mockData').products;
const productMock = productsMock[0];
const stylesMock = require('./mockData').styles;
const relatedMock = require('./mockData').related;
const db = require("../database/index.js");

const app = express();
const client = redis.createClient(6379, '172.17.0.2');

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ strict: false }));

client.on('error', (err) => {
  console.log('Redis Caching Error: ', err);
});

app.get('/', (req, res) => {
  res.status(200);
  res.end('request recieved by server:');
});

// GET /products
app.get('/products', (req, res) => {
  let page = Number(req.query.page || 1);
  let count = Number(req.query.count || 5);

  const productsRedisKey = `/products?page=${page}&count=${count}`;
  return client.get(productsRedisKey, (err, products) => {
    if (products) {
      console.log('products query result exists in cache');
      // return res.json({
      //   source: 'cache',
      //   data: JSON.parse(products)
      // });
      return res.status(200).send(products);
    } else {
      db.getProducts(page, count)
      .then(data => {
        let productsResponse = JSON.stringify(data);
        // save response to Redis store:
        client.setex(productsRedisKey, 3600, productsResponse);
        return res.status(200).send(productsResponse);
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(500);
      });
    }
  })
});

// GET /products/:product_id
app.get('/products/:product_id', (req, res) => {
  let product_id = Number(req.params.product_id);

  const productRedisKey = `/products/${product_id}`;

  return client.get(productRedisKey, (err, product) => {
    if (product) {
      console.log('product description query result exists in cache');
      return res.status(200).send(product);
    } else {
      db.getProduct(product_id)
      .then(data => {
        let productResponse = JSON.stringify(data)

        // save response to Redis store:
        client.setex(productRedisKey, 3600, productResponse);
        return res.status(200).send(productResponse);
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(500);
      });
    }
  });
});

// GET /products/:product_id/styles
app.get('/products/:product_id/styles', (req, res) => {
  let product_id = Number(req.params.product_id);

  const stylesRedisKey = `/products/${product_id}/styles`;

  return client.get(stylesRedisKey, (err, styles) => {
    if (styles) {
      console.log('product styles query result exists in cache');
      return res.status(200).send(styles);
    } else {
      db.getStyles(product_id)
      .then(data => {
        let stylesResponse = JSON.stringify(data);

        // save response to Redis store:
        client.setex(stylesRedisKey, 3600, stylesResponse);
        res.status(200).send(stylesResponse);
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(500);
      });
    }
  });
});

// GET /products/:product_id/related
app.get('/products/:product_id/related', (req, res) => {
  let product_id = Number(req.params.product_id);

  const relatedRedisKey = `/products/${product_id}/related`;

  return client.get(relatedRedisKey, (err, related) => {
    if (related) {
      console.log('related products query result exists in cache');
      return res.status(200).send(related);
    } else {
      db.getRelated(product_id)
      .then(data => {
        let relatedResponse = JSON.stringify(data)

        // save response to Redis store:
        client.setex(relatedRedisKey, 3600, relatedResponse);
        return res.status(200).send(relatedResponse);
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(500);
      });
    }
  });
});

module.exports = app;