require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const http = require('http');

const Router = require('./src/routers/router');

const app = express();
const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log('Server Running at Port', process.env.PORT);
});

const jsonParser = express.json();
const urlEncodedParser = express.urlencoded();

app.use(logger('dev'));
app.use(jsonParser);
app.use(urlEncodedParser);
app.use(cors());
app.use(express.static('public'));

app.use(Router);
