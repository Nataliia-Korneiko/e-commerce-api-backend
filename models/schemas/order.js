const { Schema, SchemaTypes } = require('mongoose');

const orderSchema = new Schema(
  {
    orderItems: [
      {
        type: SchemaTypes.ObjectId,
        required: [true, 'Add order items'],
        ref: 'order_item',
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
    dateOrdered: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      required: [true, 'Add order status'],
      default: 'Pending',
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
    phone: {
      type: String,
      required: [true, 'Add order phone'],
    },
    street: {
      type: String,
      required: [true, 'Add order street'],
    },
    apartment: {
      type: String,
      required: [true, 'Add order apartment'],
    },
    city: {
      type: String,
      required: [true, 'Add order city'],
    },
    country: {
      type: String,
      required: [true, 'Add order country'],
    },
    zip: {
      type: String,
      required: [true, 'Add order zip'],
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = orderSchema;
