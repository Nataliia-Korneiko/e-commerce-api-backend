const { ordersServices: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

// список заказов юзера
const getAllUserOrders = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const orders = await services.getAllUserOrders(userId);

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

module.exports = getAllUserOrders;
