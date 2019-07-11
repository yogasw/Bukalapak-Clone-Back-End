'use strict';
const controller = require ('../controllers/wishlist');
module.exports = function (app) {
    app.route('/wishlist').get(controller.getWishlist);
    app.route('/wishlist').post(controller.addWishlist);
    app.route('/wishlist/:id').delete(controller.deleteWishlist);
};