const { categoriesServices: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const getOne = async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = await services.getOne(id);

    if (!category) {
      return res.status(httpCode.NOT_FOUND).json({
        status: 'error',
        code: httpCode.NOT_FOUND,
        message: 'Not Found',
      });
    }

    res.status(httpCode.OK).json({
      status: 'success',
      code: httpCode.OK,
      data: {
        category,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getOne;
