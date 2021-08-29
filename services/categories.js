const { Category } = require('../models');

const getAll = async () => {
  try {
    return Category.find().select('-createdAt -updatedAt');
  } catch (error) {
    throw new Error(error.message);
  }
};

const getOne = async (id) => {
  try {
    return Category.findById(id).select('-createdAt -updatedAt');
  } catch (error) {
    throw new Error(error.message);
  }
};

const addOne = async (body) => {
  try {
    return await Category.create(body);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteOne = async (id) => {
  try {
    return await Category.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateOne = async (id, name, icon) => {
  try {
    return await Category.findByIdAndUpdate(
      { _id: id },
      { name, icon },
      { new: true }
    ).select('-createdAt -updatedAt');
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
