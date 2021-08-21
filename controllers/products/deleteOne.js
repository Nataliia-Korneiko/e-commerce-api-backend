// const { productsServices } = require('../../services');
// const { httpCode } = require('../../helpers/constants');

const deleteOne = async (req, res, next) => {
  try {
    console.log('deleteOne');
  } catch (error) {
    next(error);
  }
};

module.exports = deleteOne;
