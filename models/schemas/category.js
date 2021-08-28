const { Schema } = require('mongoose');

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Add category name'],
    },
    icon: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = categorySchema;
