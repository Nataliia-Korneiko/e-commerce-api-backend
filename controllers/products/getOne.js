const { productsServices: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const getOne = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await services.getOne(id);

    if (!product) {
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
        product,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getOne;
