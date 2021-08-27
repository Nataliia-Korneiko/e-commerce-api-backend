const { usersServices: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const getAll = async (req, res, next) => {
  try {
    const users = await services.getAll();

    if (!users || users.length === 0) {
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
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
