'use strict';

const mongoose = require('mongoose');
const Categories = new mongoose.Schema({
    usersId: {
        type: String,
        require: true
    },
    token: {
        type: String,
    },
    password: {
        type: true,
        require: true
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('Categories', Categories);