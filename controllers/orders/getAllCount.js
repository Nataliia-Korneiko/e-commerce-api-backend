const { ordersServices: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

// количество заказов в db
const getAllCount = async (req, res, next) => {
  try {
    const orders = await services.getAllCount();

    res.status(httpCode.OK).json({
      status: 'success',
      code: httpCode.OK,
      message: 'Successful operation',
      data: {
        totalCount: orders,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllCount;
