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

const deleteOne = async (id) => {
  try {
    return await Product.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

// const updateOne = async (id, body) => {
//   try {
//     return await Product.findByIdAndUpdate(
//       { _id: id },
//       { ...body },
//       { new: true }
//     ).populate('category');
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

const updateOne = async (
  id,
  name,
  description,
  color,
  brand,
  price,
  category,
  countInStock
) => {
  try {
    return await Product.findByIdAndUpdate(
      { _id: id },
      { name, description, color, brand, price, category, countInStock },
      { new: true }
    )
      .populate({
        path: 'category',
        select: '-createdAt -updatedAt -__v',
      })
      .select('-createdAt -updatedAt');
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
};
