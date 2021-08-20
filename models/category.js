const { model } = require('mongoose');
const { categorySchema } = require('./schemas');

const Category = model('category', categorySchema);

module.exports = Category;
