const { productsServices: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const getAll = async (req, res, next) => {
  const { query } = req;

  try {
    const products = await services.getAll(query);

    if (!products || products.length === 0) {
      return res.status(httpCode.NOT_FOUND).json({
        status: 'fail',
        code: httpCode.NOT_FOUND,
        message: 'Not found',
      });
    }

    res.status(httpCode.OK).json({
      status: 'success',
      code: httpCode.OK,
      message: 'Successful operation',
      data: {
        products,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
