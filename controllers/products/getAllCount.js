const { productsServices: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const getAllCount = async (req, res, next) => {
  try {
    const products = await services.getAllCount();

    res.status(httpCode.OK).json({
      status: 'success',
      code: httpCode.OK,
      message: 'Successful operation',
      data: {
        totalCount: products,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllCount;
