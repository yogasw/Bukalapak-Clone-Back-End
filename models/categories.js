'use strict';

const mongoose = require('mongoose');
const Categories = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: ''
    },
    children: [{
        name: String,
        default: ''
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Categories', Categories);