'use strict';

const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            default:''
        },
        username: {
            type: String,
            required: true,
            default:''
        },
        email: {
            type: String,
            required: true,
            default:''
        },
        imageUrl: {
            type: String,
            default:''
        },
        phone: {
            type: String,
            default:''
        },
        gender: {
            type: String,
            default:''
        },
        referral: {
            type: String,
            default:''
        },
        birth: {
            type: String,
            default:''
        },
        address: {
            type: String,
            default:''
        },
        password: {
            type: String,
            default:''
        },
        wishlist: {
            type: Array,
            default:[]
        }
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Users', UsersSchema);