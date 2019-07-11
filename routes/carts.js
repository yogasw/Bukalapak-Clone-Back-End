'use strict';
const carts = require ('../controllers/carts');
module.exports = function (app) {
    app.route('/carts').post(carts.addCarts);
    app.route('/carts/:id').delete(carts.deleteCarts);
    app.route('/carts').get(carts.getCarts);
};