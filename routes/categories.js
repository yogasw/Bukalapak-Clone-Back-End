'use strict';
const product = require ('../controllers/categories');
module.exports = function (app) {
    app.route('/categories').get(product.getCategories);
    app.route('/categories').post(product.addCategories);
};