'use strict';
const controller = require ('../controllers/users');
module.exports = function (app) {
    app.route('/users').get(controller.getUsers);
};