const fs = require('fs');
const path = require('path');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const {
  productsRoutes,
  categoriesRoutes,
  usersRoutes,
  authRoutes,
  ordersRoutes,
} = require('./routes');
const { httpCode } = require('./helpers/constants');
const { ErrorHandler, errorHandler } = require('./helpers/error-handler');
const { apiLimit, jsonLimit } = require('./config/rate-limit.json');
const authJwt = require('./helpers/jwt');
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
app.use(express.json({ limit: jsonLimit }));
app.use(logger('combined', { stream: accessLogStream }, formatsLogger));
app.use(authJwt());
app.use(errorHandler);

app.use(
  '/api/',
  rateLimit({
    windowMs: apiLimit.windowMs,
    max: apiLimit.max,

    handler: (req, res, next) => {
      next(
        new ErrorHandler(
          httpCode.BAD_REQUEST,
          'You have reached your request limit. Try later!'
        )
      );
    },
  })
);

app.use(`${api}/products`, productsRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/auth`, authRoutes);
app.use(`${api}/orders`, ordersRoutes);

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
