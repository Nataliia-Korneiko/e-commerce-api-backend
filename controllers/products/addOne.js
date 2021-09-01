const {
  productsServices: services,
  categoriesServices,
} = require('../../services');
const { httpCode } = require('../../helpers/constants');

const addOne = async (req, res, next) => {
  const { file } = req;

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

    if (!file) {
      return res.status(httpCode.BAD_REQUEST).json({
        status: 'error',
        code: httpCode.BAD_REQUEST,
        message: 'No image in the request',
      });
    }

    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    const product = await services.addOne({
      name,
      description,
      color,
      brand,
      price,
      category,
      countInStock,
      image: `${basePath}${fileName}`,
    });

    res.status(httpCode.CREATED).json({
      status: 'success',
      code: httpCode.CREATED,
      message: 'Successful operation',
      data: {
        _id: product._id,
        name,
        description,
        color,
        brand,
        price,
        category,
        countInStock,
        image: product.image,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addOne;
