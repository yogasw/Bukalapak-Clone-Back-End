'use strict';
const product = require ('../controllers/categories');

// middleware
const auth = require('../middleware/auth');

module.exports = function (app) {
    app.route('/categories').get(product.getCategories);
    app.route('/categories').post(auth, product.addCategories);
};