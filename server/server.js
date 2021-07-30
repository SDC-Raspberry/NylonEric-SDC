const express = require('express');
const bodyParser = require('body-parser');
const db = require("../models");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ strict: false }));

app.get('/', (req, res) => {
  res.status(200);
  res.end('request recieved by server:');
});

module.exports = app;