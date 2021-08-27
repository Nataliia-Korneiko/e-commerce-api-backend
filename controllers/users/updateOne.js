const mongoose = require('mongoose');
const { usersServices: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const updateOne = async (req, res, next) => {
  const { id } = req.params;

  const { name, phone, isAdmin, street, apartment, zip, city, country } =
    req.body;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(httpCode.BAD_REQUEST).json({
        status: 'error',
        code: httpCode.BAD_REQUEST,
        message: 'Invalid User Id',
      });
    }

    const user = await services.updateOne(
      id,
      name,
      phone,
      isAdmin,
      street,
      apartment,
      zip,
      city,
      country
    );

    if (!user || !id) {
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

module.exports = updateOne;
