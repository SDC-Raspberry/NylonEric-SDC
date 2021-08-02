const express = require('express');
const bodyParser = require('body-parser');
const productsMock = require('./mockData').products;
const productMock = productsMock[0];
const stylesMock = require('./mockData').styles;
const relatedMock = require('./mockData').related;
const db = require("../models");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ strict: false }));

app.get('/', (req, res) => {
  res.status(200);
  res.end('request recieved by server:');
});

// GET /products
app.get('/products', (req, res) => {
  res.status(200);
  // temp mock response
  // db query here
  res.send(JSON.stringify(productsMock));
});

// GET /products/:product_id
app.get('/products/:product_id', (req, res) => {
  let product_id = req.params.question_id;
  res.status(200);
  // temp mock response
  // db query here
  res.send(JSON.stringify(productMock));
});

// GET /products/:product_id/styles
app.get('/products/:product_id/styles', (req, res) => {
  let product_id = req.params.question_id;
  res.status(200);
  // temp mock response
  // db query here
  res.send(JSON.stringify(stylesMock));
});

// GET /products/:product_id/related
app.get('/products/:product_id/related', (req, res) => {
  let product_id = req.params.question_id;
  res.status(200);
  // temp mock response
  // db query here
  res.send(JSON.stringify(relatedMock));
});

module.exports = app;