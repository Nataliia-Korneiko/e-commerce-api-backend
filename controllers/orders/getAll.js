const { ordersServices: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const getAll = async (req, res, next) => {
  try {
    const orders = await services.getAll();

    if (!orders || orders.length === 0) {
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
        orders,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
