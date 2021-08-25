const { categoriesServices: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const addOne = async (req, res, next) => {
  const { name, icon } = req.body;

  try {
    if (!name) {
      return res.status(httpCode.BAD_REQUEST).json({
        status: 'error',
        code: httpCode.BAD_REQUEST,
        message: 'Invalid request body / Token not provided',
      });
    }

    const category = await services.addOne({
      name,
      icon,
    });

    res.status(httpCode.CREATED).json({
      status: 'success',
      code: httpCode.CREATED,
      message: 'Successful operation',
      data: {
        _id: category._id,
        name: category.name,
        icon: category.icon,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addOne;
