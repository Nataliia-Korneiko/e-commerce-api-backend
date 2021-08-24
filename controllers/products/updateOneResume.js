const mongoose = require('mongoose');
const { productsServices: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const updateOneResume = async (req, res, next) => {
  const { id } = req.params;
  const { resume } = req.body;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(httpCode.BAD_REQUEST).json({
        status: 'error',
        code: httpCode.BAD_REQUEST,
        message: 'Invalid Product Id',
      });
    }

    const product = await services.updateOneResume(id, resume);

    if (!product || !id) {
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
        product,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateOneResume;
