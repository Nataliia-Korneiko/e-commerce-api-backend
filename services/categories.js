const { Category } = require('../models');

const getOne = async (id) => {
  try {
    return Category.findById(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getOne,
};
