// server build version 2.0 - nginx deployment
const cors = require('cors');
const app = require('./server');
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: `http://localhost:${PORT}`
};

app.use(cors(corsOptions));

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}.`);
});