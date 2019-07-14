'use strict';

const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema({
        user: {
            type: String,
            ref: 'User'
        },
        product: {
            type: mongoose.Types.ObjectId,
            ref: 'Products'
        },
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Cart', CartSchema);