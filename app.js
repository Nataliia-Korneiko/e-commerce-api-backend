const fs = require('fs');
const path = require('path');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { httpCode } = require('./helpers/constants');
require('dotenv').config();

const api = process.env.API_URL;
const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

app.use(helmet());
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(logger('combined', { stream: accessLogStream }, formatsLogger));

app.use((req, res, _next) => {
  res.status(httpCode.NOT_FOUND).json({
    status: 'error',
    code: httpCode.NOT_FOUND,
    message: `Use api on routes: ${req.baseUrl}${api}/auth/register`,
    data: 'Not Found',
  });
});

app.use((error, _req, res, _next) => {
  const status = error.status ? error.status : httpCode.INTERNAL_SERVER_ERROR;

  res.status(status).json({
    status: status === 500 ? 'fail' : 'error',
    code: status,
    message: error.message,
    data: status === 500 ? 'Internal Server Error' : error.data,
  });
});

module.exports = app;
