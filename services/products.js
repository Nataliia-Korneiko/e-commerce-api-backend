const { Product } = require('../models');

const getAll = async (query) => {
  const { categories } = query;
  let filter = {};

  if (categories) {
    filter = { category: categories.split(',') }; // ['611d6e45864fbe3ff262927a', '611d6e73864fbe3ff262927c'] - _id категории
  }

  try {
    // return Product.find(filter).populate('category').select('name -_id'); // select - отдаем на фронт только определенные поля, -_id - не покажет id
    return Product.find(filter)
      .populate({
        path: 'category',
        select: '-createdAt -updatedAt',
      })
      .select('-createdAt -updatedAt');
  } catch (error) {
    throw new Error(error.message);
  }
};

const getOne = async (id) => {
  try {
    return (
      Product.findById(id)
        // populate - вместо id категории получаем развернутый объект категории
        .populate({
          path: 'category',
          select: '-createdAt -updatedAt',
        })
        .select('-createdAt -updatedAt')
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const addOne = async (body) => {
  try {
    // const product = new Product(body);
    // return await product.save();

    return await Product.create(body);
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
  countInStock,
  isFeatured
) => {
  try {
    return await Product.findByIdAndUpdate(
      { _id: id },
      {
        name,
        description,
        color,
        brand,
        price,
        category,
        countInStock,
        isFeatured,
      },
      { new: true }
    )
      .populate({
        path: 'category',
        select: '-createdAt -updatedAt',
      })
      .select('-createdAt -updatedAt');
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateOneRating = async (id, rating) => {
  try {
    return await Product.findByIdAndUpdate(
      { _id: id },
      {
        rating,
      },
      { new: true }
    )
      .populate({
        path: 'category',
        select: '-createdAt -updatedAt',
      })
      .select('-createdAt -updatedAt');
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateOneResume = async (id, resume) => {
  try {
    return await Product.findByIdAndUpdate(
      { _id: id },
      {
        resume,
      },
      { new: true }
    )
      .populate({
        path: 'category',
        select: '-createdAt -updatedAt',
      })
      .select('-createdAt -updatedAt');
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllCount = async () => {
  try {
    return await Product.countDocuments((count) => count); // countDocuments - количество найменований товаров в db
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllFeatured = async (count) => {
  try {
    return await Product.find({ isFeatured: true })
      .limit(+count) // количество популярных товаров, :count - лимит на показ (сколько товаров отображать)
      .populate({
        path: 'category',
        select: '-createdAt -updatedAt',
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
  updateOneRating,
  updateOneResume,
  getAllCount,
  getAllFeatured,
};
