const { categoriesServices: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const getAll = async (req, res, next) => {
  try {
    const categories = await services.getAll();

    if (!categories || categories.length === 0) {
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
        categories,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
