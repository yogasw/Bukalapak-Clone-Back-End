'use strict';
const carts = require('../controllers/cart');
module.exports = function (app) {
    app.route('/carts').post(carts.addCart);
    app.route('/carts/:id').delete(carts.deleteCart);
    app.route('/carts').get(carts.getCart);
};