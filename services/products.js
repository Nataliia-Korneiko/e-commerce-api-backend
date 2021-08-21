const { Product } = require('../models');

const getAll = async (query) => {
  const { categories } = query;
  let filter = {};

  if (categories) {
    filter = { category: categories.split(',') }; // ['611d6e45864fbe3ff262927a', '611d6e73864fbe3ff262927c'] - _id категории
  }

  try {
    // return Product.find(filter).populate('category').select('name -_id'); // select - отдаем на фронт только определенные поля, -_id - не покажет id
    return Product.find(filter).populate('category');
  } catch (error) {
    throw new Error(error.message);
  }
};

const getOne = async (id) => {
  try {
    return Product.findById(id).populate('category'); // populate - вместо id категории получаем развернутый объект категории
  } catch (error) {
    throw new Error(error.message);
  }
};

const addOne = async (body) => {
  try {
    const product = new Product(body);
    return await product.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAll,
  getOne,
  addOne,
};
