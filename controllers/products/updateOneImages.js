const mongoose = require('mongoose');
const { productsServices: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const updateOneImages = async (req, res, next) => {
  const { files } = req;
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(httpCode.BAD_REQUEST).json({
        status: 'error',
        code: httpCode.BAD_REQUEST,
        message: 'Invalid Product Id',
      });
    }

    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    const product = await services.updateOneImages(id, files, basePath);

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

module.exports = updateOneImages;
