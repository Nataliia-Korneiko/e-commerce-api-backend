const { User } = require('../models');

const getAll = async () => {
  try {
    return User.find().select('-password -createdAt -updatedAt -__v');
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteOne = async (id) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateOne = async (
  id,
  name,
  phone,
  isAdmin,
  street,
  apartment,
  zip,
  city,
  country
) => {
  try {
    return await User.findByIdAndUpdate(
      { _id: id },
      {
        name,
        phone,
        isAdmin,
        street,
        apartment,
        zip,
        city,
        country,
      },
      { new: true }
    ).select('-password -createdAt -updatedAt -__v');
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserById = async (id) => {
  try {
    return await User.findById(id).select(
      '-password -createdAt -updatedAt -__v'
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllCount = async () => {
  try {
    return await User.countDocuments((count) => count); // countDocuments - количество юзеров в db
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAll,
  deleteOne,
  updateOne,
  getUserById,
  getAllCount,
};
