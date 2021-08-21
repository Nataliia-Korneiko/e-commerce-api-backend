const { Schema } = require('mongoose');

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = categorySchema;
