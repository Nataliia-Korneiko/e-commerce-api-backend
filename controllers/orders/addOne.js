const { ordersServices: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const addOne = async (req, res, next) => {
  const { orderItems, user, phone, street, apartment, city, country, zip } =
    req.body;

  try {
    if (
      !orderItems ||
      !user ||
      !phone ||
      !street ||
      !apartment ||
      !city ||
      !country ||
      !zip
    ) {
      return res.status(httpCode.BAD_REQUEST).json({
        status: 'error',
        code: httpCode.BAD_REQUEST,
        message: 'Invalid request body',
      });
    }

    const order = await services.addOne(
      orderItems,
      user,
      phone,
      street,
      apartment,
      city,
      country,
      zip
    );

    res.status(httpCode.CREATED).json({
      status: 'success',
      code: httpCode.CREATED,
      message: 'Successful operation',
      data: {
        _id: order._id,
        orderItems: order.orderItems,
        totalPrice: order.totalPrice,
        orderDate: order.orderDate,
        status: order.status,
        user,
        phone,
        street,
        apartment,
        city,
        country,
        zip,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addOne;
