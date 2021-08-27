const { usersServices: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const getOne = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await services.getUserById(id);

    if (!user) {
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
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getOne;
