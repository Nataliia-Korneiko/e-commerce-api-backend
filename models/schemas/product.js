const { Schema, SchemaTypes } = require('mongoose');
const { productColor } = require('../../helpers/constants');

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Add product name'],
    },
    description: {
      type: String,
      required: [true, 'Add product description'],
    },
    color: {
      type: String,
      enum: {
        values: [
          productColor.WHITE,
          productColor.GRAY,
          productColor.BLACK,
          productColor.SILVER,
          productColor.GOLD,
          productColor.BROWN,
          productColor.RED,
          productColor.PINK,
          productColor.ORANGE,
          productColor.PURPLE,
          productColor.BLUE,
          productColor.GREEN,
          productColor.YELLOW,
          productColor.MULTICOLORED,
        ],
        message: "This color isn't allowed",
      },
      required: [true, 'Add product color'],
    },
    image: {
      type: String,
      default: '',
    },
    images: [
      {
        type: String,
      },
    ],
    brand: {
      type: String,
      required: [true, 'Add product brand'],
    },
    price: {
      type: Number,
      default: 0,
      required: [true, 'Add product price'],
    },
    category: {
      type: SchemaTypes.ObjectId,
      required: [true, 'Add product category'],
      ref: 'category',
    },
    countInStock: {
      type: Number,
      min: 0,
      max: 1000,
      required: [true, 'Add product count in stock'],
    },
    rating: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5],
      min: 0,
      max: 5,
      default: 0,
    },
    resume: {
      type: String,
      maxLength: 300,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = productSchema;
