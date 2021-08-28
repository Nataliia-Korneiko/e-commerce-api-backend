const { Schema } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Add user name'],
    },
    email: {
      type: String,
      required: [true, 'Add user email'],
    },
    password: {
      type: String,
      required: [true, 'Add user password'],
    },
    phone: {
      type: String,
      required: [true, 'Add user phone'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    street: {
      type: String,
    },
    apartment: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    zip: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = userSchema;
