const { productsServices, categoriesServices } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const addOne = async (req, res, next) => {
  const {
    name,
    description,
    color,
    brand,
    price,
    category: id,
    countInStock,
  } = req.body;

  try {
    const category = await categoriesServices.getOne(id);

    if (!category) {
      return res.status(httpCode.BAD_REQUEST).json({
        status: 'error',
        code: httpCode.BAD_REQUEST,
        message: 'Invalid category',
      });
    }

    if (!name || !description || !color || !brand || !price || !countInStock) {
      return res.status(httpCode.BAD_REQUEST).json({
        status: 'error',
        code: httpCode.BAD_REQUEST,
        message: 'Invalid request body / Token not provided',
      });
    }

    const product = await productsServices.addOne({
      name,
      description,
      brand,
      price,
      category,
      countInStock,
    });

    res.status(httpCode.CREATED).json({
      status: 'success',
      code: httpCode.CREATED,
      message: 'Successful operation',
      data: {
        name: product.name,
        description: product.description,
        brand: product.brand,
        price: product.price,
        category: product.category,
        countInStock: product.countInStock,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addOne;
