const { User } = require('../models');

const getUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new Error(error.message);
  }
};

const addOne = async (body) => {
  try {
    return await User.create(body);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getUserByEmail,
  addOne,
};
