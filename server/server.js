const express = require('express');
const bodyParser = require('body-parser');
const productsMock = require('./mockData').products;
const productMock = productsMock[0];
const stylesMock = require('./mockData').styles;
const relatedMock = require('./mockData').related;
const db = require("../database/index.js");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ strict: false }));

app.get('/', (req, res) => {
  res.status(200);
  res.end('request recieved by server:');
});

// GET /products
app.get('/products', (req, res) => {
  let page = Number(req.query.page || 1);
  let count = Number(req.query.count || 5);
  db.getProducts(page, count)
    .then(data => {
      res.status(200).send(JSON.stringify(data));
    })
    .catch(error => {
    console.error(error);
    res.sendStatus(500);
    });
});

// GET /products/:product_id
app.get('/products/:product_id', (req, res) => {
  let product_id = Number(req.query.product_id);
  db.getProduct(product_id)
  .then(data => {
    res.status(200).send(JSON.stringify(data));
  })
  .catch(error => {
    console.error(error);
    res.sendStatus(500);
  });
});

// GET /products/:product_id/styles
app.get('/products/:product_id/styles', (req, res) => {
  let product_id = Number(req.params.product_id);
  db.getStyles(product_id)
  .then(data => {
    res.status(200).send(JSON.stringify(data));
  })
  .catch(error => {
    console.error(error);
    res.sendStatus(500);
  });
});

// GET /products/:product_id/related
app.get('/products/:product_id/related', (req, res) => {
  let product_id = Number(req.query.product_id);
  db.getRelated(product_id)
  .then(data => {
    res.status(200).send(JSON.stringify(data));
  })
  .catch(error => {
    console.error(error);
    res.sendStatus(500);
  })
});

module.exports = app;