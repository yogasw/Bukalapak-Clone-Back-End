'use strict';
const controller = require ('../controllers/users');
module.exports = function (app) {
    app.route('/users').get(controller.getUsers);
    app.route('/users/upload_foto').post(controller.uploadFotoProfil);
    app.route('/users').patch(controller.updateUsers);
};