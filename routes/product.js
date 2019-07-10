'use strict';
const product = require ('../controllers/products');
module.exports = function (app) {
    app.route('/product').get(product.getProduct);
    app.route('/product').post(product.addProduct);
};