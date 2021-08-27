const { usersServices: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const getAllCount = async (req, res, next) => {
  try {
    const users = await services.getAllCount();

    res.status(httpCode.OK).json({
      status: 'success',
      code: httpCode.OK,
      message: 'Successful operation',
      data: {
        totalCount: users,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllCount;
