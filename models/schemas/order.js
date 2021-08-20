const { Schema, SchemaTypes } = require('mongoose');

const orderSchema = new Schema(
  {
    orderItems: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'order_item',
        required: true,
      },
    ],
    shippingAddress1: {
      type: String,
      required: true,
    },
    shippingAddress2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'Pending',
    },
    totalPrice: {
      type: Number,
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
    dateOrdered: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = orderSchema;
