'use strict';

const mongoose = require('mongoose');
const Categories = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    subCategories: {
        type: Array,
        require: true
    },
    specification: {
        type: Array,
        require: true
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('Categories', Categories);