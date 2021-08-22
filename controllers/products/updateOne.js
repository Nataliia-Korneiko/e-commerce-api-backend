const {
  productsServices: services,
  categoriesServices,
} = require('../../services');
const { httpCode } = require('../../helpers/constants');

const mongoose = require('mongoose');

const updateOne = async (req, res, next) => {
  const { id } = req.params;
  // const {
  //   body,
  //   body: { category },
  // } = req;

  const { name, description, color, brand, price, category, countInStock } =
    req.body;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(httpCode.BAD_REQUEST).json({
        status: 'error',
        code: httpCode.BAD_REQUEST,
        message: 'Invalid Product Id',
      });
    }

    const categoryId = await categoriesServices.getOne(category);

    if (!categoryId) {
      return res.status(httpCode.BAD_REQUEST).json({
        status: 'error',
        code: httpCode.BAD_REQUEST,
        message: 'Invalid category',
      });
    }

    const product = await services.updateOne(
      id,
      name,
      description,
      color,
      brand,
      price,
      category,
      countInStock
    );

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

module.exports = updateOne;
