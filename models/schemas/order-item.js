const { Schema, SchemaTypes } = require('mongoose');

const orderItemSchema = new Schema(
  {
    product: {
      type: SchemaTypes.ObjectId,
      required: [true, 'Add product'],
      ref: 'product',
    },
    quantity: {
      type: Number,
      required: [true, 'Add quantity'],
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = orderItemSchema;
