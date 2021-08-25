const mongoose = require('mongoose');
const { categoriesServices: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const updateOne = async (req, res, next) => {
  const { id } = req.params;
  const { name, icon } = req.body;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(httpCode.BAD_REQUEST).json({
        status: 'error',
        code: httpCode.BAD_REQUEST,
        message: 'Invalid Category Id',
      });
    }

    const category = await services.updateOne(id, name, icon);

    if (!category || !id) {
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
        category,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateOne;
