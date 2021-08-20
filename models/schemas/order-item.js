const { Schema, SchemaTypes } = require('mongoose');

const orderItemSchema = new Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },
    product: {
      type: SchemaTypes.ObjectId,
      ref: 'product',
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = orderItemSchema;
