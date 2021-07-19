const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: "http://localhost:4000"
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.end('request recieved by server');
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}.`);
});