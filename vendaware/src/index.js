const dotenv = require('dotenv').config();
if (dotenv.error) {
  throw dotenv.error
}

// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

//const { auth } = require('express-openid-connect');

let port = 3001;
const db = require('./queries');

//dotenv.load();
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

app.get('/total-good-sales', db.getTotalGoodSales);
app.get('/total-failed-sales', db.getTotalFailedSales);
app.get('/failed-sales', db.getAllFailedSales);


// starting the server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

//const config = {
//  required: false,
//  auth0Logout: true
//};

//port = process.env.PORT || 3001;
//if (!config.baseURL && !process.env.BASE_URL && process.env.PORT && process.env.NODE_ENV !== 'production') {
//  config.baseURL = `http://localhost:${port}`;
//}

//app.use(auth(config));
