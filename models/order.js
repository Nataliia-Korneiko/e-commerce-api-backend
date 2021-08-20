const { model } = require('mongoose');
const { orderSchema } = require('./schemas');

const Order = model('order', orderSchema);

module.exports = Order;
