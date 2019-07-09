'use strict';
const product = require ('../controllers/address');
module.exports = function (app) {
    app.route('/address').get(product.getAddress);
    app.route('/address').post(product.addAddress);
};