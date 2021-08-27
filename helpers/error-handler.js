const { httpCode } = require('../helpers/constants');

class ErrorHandler extends Error {
  constructor(status, message, data = null) {
    super();
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

function errorHandler(error, req, res, next) {
  console.log('error:', error);
  if (error.name === 'UnauthorizedError') {
    // jwt authentication error
    return res
      .status(httpCode.UNAUTHORIZED)
      .json({ message: 'The user is not authorized' });
  }

  if (error.name === 'ValidationError') {
    //  validation error
    return res.status(httpCode.UNAUTHORIZED).json({ message: error });
  }

  // default to 500 server error
  return res.status(httpCode.INTERNAL_SERVER_ERROR).json(error);
}

module.exports = {
  ErrorHandler,
  errorHandler,
};
