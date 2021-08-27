const bcrypt = require('bcryptjs');
const { authServices: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

const register = async (req, res, next) => {
  const {
    name,
    email,
    password,
    phone,
    isAdmin,
    street,
    apartment,
    zip,
    city,
    country,
  } = req.body;

  try {
    const user = await services.getUserByEmail(email);

    if (user) {
      return res.status(httpCode.CONFLICT).json({
        status: 'error',
        code: httpCode.CONFLICT,
        message: 'Provided email already exists',
      });
    }

    if (!name || !email || !password || !phone) {
      return res.status(httpCode.BAD_REQUEST).json({
        status: 'error',
        code: httpCode.BAD_REQUEST,
        message: 'Invalid request body',
      });
    }

    const newUser = await services.addOne({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      phone,
      isAdmin,
      street,
      apartment,
      zip,
      city,
      country,
    });

    res.status(httpCode.CREATED).json({
      status: 'success',
      code: httpCode.CREATED,
      message: 'Successful operation',
      data: {
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          // password: newUser.password,
          phone: newUser.phone,
          isAdmin: newUser.isAdmin,
          street: newUser.street,
          apartment: newUser.apartment,
          zip: newUser.zip,
          city: newUser.city,
          country: newUser.country,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
