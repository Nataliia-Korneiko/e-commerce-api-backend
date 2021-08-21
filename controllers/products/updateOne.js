// const { productsServices } = require('../../services');
// const { httpCode } = require('../../helpers/constants');

const updateOne = async (req, res, next) => {
  try {
    console.log('updateOne');
  } catch (error) {
    next(error);
  }
};

module.exports = updateOne;
