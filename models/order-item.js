const { model } = require('mongoose');
const { orderItemSchema } = require('./schemas');

const OrderItem = model('order_item', orderItemSchema);

module.exports = OrderItem;
