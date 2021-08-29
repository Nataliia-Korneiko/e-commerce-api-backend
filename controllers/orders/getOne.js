const { ordersServices: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const getOne = async (req, res, next) => {
  const { id } = req.params;

  try {
    const order = await services.getOne(id);

    if (!order) {
      return res.status(httpCode.NOT_FOUND).json({
        status: 'error',
        code: httpCode.NOT_FOUND,
        message: 'Not Found',
      });
    }

    res.status(httpCode.OK).json({
      status: 'Successful operation',
      code: httpCode.OK,
      data: {
        order,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getOne;
