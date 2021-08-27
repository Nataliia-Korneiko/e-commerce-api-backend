const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authServices: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');
require('dotenv').config();

const { JWT_SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await services.getUserByEmail(email);

    if (!user) {
      return res.status(httpCode.UNAUTHORIZED).json({
        status: 'error',
        code: httpCode.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }

    if (user && !bcrypt.compareSync(password, user.password)) {
      return res.status(httpCode.UNAUTHORIZED).json({
        status: 'error',
        code: httpCode.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }

    const { _id, isAdmin } = user;
    const payload = { _id, isAdmin };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '16h' }); // помещаем значение _id и isAdmin в токен

    res.status(httpCode.OK).json({
      status: 'success',
      code: httpCode.OK,
      message: 'Successful operation',
      data: {
        user: {
          _id: user._id,
          name: user.name,
          token,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
