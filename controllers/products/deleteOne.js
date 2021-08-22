const { productsServices: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const deleteOne = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await services.deleteOne(id);

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
      message: 'Successful operation',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteOne;
