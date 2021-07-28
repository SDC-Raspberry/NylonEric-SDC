const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("../models");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ strict: false }));

app.get('/', (req, res) => {
  res.end('request recieved by server:');
});

module.exports = app;