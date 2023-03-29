const dotenv = require('dotenv');

// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

let port = 3001;
const db = require('./queries');

dotenv.config();
// defining the Express app
const app = express();

// defining an array to work as the database (temporary solution)
const ads = [
  {title: 'Hello, world (again)!'}
];

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.get('/', (req, res) => {
  res.send(ads);
});

app.get('/books', db.getBooks);
app.get('/book/:id', db.getBookById);
app.post('/login', db.loginUser);

app.use(express.static('books'));

// starting the server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
/*
const config = {
  required: false,
  auth0Logout: true
};

port = process.env.PORT || 3000;
if (!config.baseURL && !process.env.BASE_URL && process.env.PORT && process.env.NODE_ENV !== 'production') {
  config.baseURL = `http://localhost:${port}`;
}

app.use(auth(config));*/
