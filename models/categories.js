'use strict';

const mongoose = require('mongoose');
const Categories = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    children: [{
        name: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Categories', Categories);