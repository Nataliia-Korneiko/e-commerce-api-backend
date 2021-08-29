const { Order, OrderItem } = require('../models');

const getAll = async () => {
  try {
    return Order.find()
      .populate('user', 'name email') // отдаем только name и email юзера
      .select('-createdAt -updatedAt')
      .sort({ orderDate: -1 }); // сортировка по дням
  } catch (error) {
    throw new Error(error.message);
  }
};

const getOne = async (id) => {
  try {
    return Order.findById(id)
      .populate('user', 'name email')
      .populate({
        path: 'orderItems',
        select: '-createdAt -updatedAt',
        populate: {
          path: 'product',
          select: '-createdAt -updatedAt',
          populate: {
            path: 'category',
            select: '-createdAt -updatedAt',
          },
        },
      })
      .select('-createdAt -updatedAt');
  } catch (error) {
    throw new Error(error.message);
  }
};

const addOne = async (
  orderItems,
  user,
  phone,
  street,
  apartment,
  city,
  country,
  zip
) => {
  try {
    const orderItemsIds = Promise.all(
      orderItems.map(async ({ quantity, product }) => {
        let newOrderItem = new OrderItem({
          quantity,
          product,
        });

        newOrderItem = await newOrderItem.save(); // сохраняем в db
        return newOrderItem._id;
      })
    );

    // console.log('orderItemsIds', orderItemsIds); // promise
    const orderItemsIdsResolved = await orderItemsIds;
    // console.log('orderItemsIdsResolved', orderItemsIdsResolved); // результат [id, id]

    const totalPrices = await Promise.all(
      orderItemsIdsResolved.map(async (orderItemId) => {
        // console.log(orderItemId); // id
        const orderItem = await OrderItem.findById(orderItemId).populate(
          'product',
          'price' // отдаем только price из product
        );

        const {
          product: { price },
          quantity,
        } = orderItem;

        const totalPrice = price * quantity;
        return totalPrice;
      })
    );

    const totalPrice = totalPrices.reduce((acc, value) => {
      return acc + value;
    }, 0);

    const order = new Order({
      orderItems: orderItemsIdsResolved, // [id, id]
      totalPrice,
      user,
      phone,
      street,
      apartment,
      city,
      country,
      zip,
    });

    return await Order.create(order);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteOne = async (id) => {
  try {
    const order = await Order.findByIdAndDelete(id);

    if (order) {
      await order.orderItems.map(async (orderItem) => {
        await OrderItem.findByIdAndDelete(orderItem);
      });
    }

    return order;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateOneStatus = async (id, status) => {
  try {
    return await Order.findByIdAndUpdate(
      { _id: id },
      {
        status,
      },
      {
        new: true,
      }
    )
      // .populate('user', 'name email')
      // .populate({
      //   path: 'orderItems',
      //   select: '-createdAt -updatedAt',
      //   populate: {
      //     path: 'product',
      //     select: '-createdAt -updatedAt',
      //     populate: {
      //       path: 'category',
      //       select: '-createdAt -updatedAt',
      //     },
      //   },
      // })
      .select('-createdAt -updatedAt');
  } catch (error) {
    throw new Error(error.message);
  }
};

const getTotalSales = async () => {
  try {
    return await Order.aggregate([
      { $group: { _id: null, totalSales: { $sum: '$totalPrice' } } },
    ]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllCount = async () => {
  try {
    return await Order.countDocuments((count) => count); // countDocuments - количество заказов в db
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUserOrders = async (userId) => {
  try {
    return await Order.find({ user: userId })
      .populate({
        path: 'orderItems',
        select: '-createdAt -updatedAt',
        populate: {
          path: 'product',
          select: '-countInStock -createdAt -updatedAt',
          populate: {
            path: 'category',
            select: '-createdAt -updatedAt',
          },
        },
      })
      .select('-createdAt -updatedAt')
      .sort({ orderDate: -1 });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOneStatus,
  getTotalSales,
  getAllCount,
  getAllUserOrders,
};
