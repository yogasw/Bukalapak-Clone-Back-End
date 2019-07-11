'use strict';
const product = require ('../controllers/address');
module.exports = function (app) {
    app.route('/address').get(product.getAddress);
    app.route('/address').post(product.addAddress);
    app.route('/address/:id').delete(product.deleteAddress);
    app.route('/address/:id').patch(product.updateAddress);
};