const { model } = require('mongoose');
const { productSchema } = require('./schemas');

const Product = model('product', productSchema);

module.exports = Product;
