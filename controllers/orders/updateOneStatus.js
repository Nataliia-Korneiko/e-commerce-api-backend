const mongoose = require('mongoose');
const { ordersServices: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const updateOneStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(httpCode.BAD_REQUEST).json({
        status: 'error',
        code: httpCode.BAD_REQUEST,
        message: 'Invalid Order Id',
      });
    }

    if (!status) {
      return res.status(httpCode.NOT_FOUND).json({
        status: 'error',
        code: httpCode.NOT_FOUND,
        message: 'Missing field status',
      });
    }

    const order = await services.updateOneStatus(id, status);

    if (!order || !id) {
      return res.status(httpCode.NOT_FOUND).json({
        status: 'error',
        code: httpCode.NOT_FOUND,
        message: 'Not Found',
      });
    }

    res.status(httpCode.OK).json({
      status: 'success',
      code: httpCode.OK,
      message: 'Successful operation',
      data: {
        order,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateOneStatus;
