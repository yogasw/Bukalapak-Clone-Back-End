'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 8;
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

UsersSchema.pre('save', function (next) {
    console.log(this.password);
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next()
});


module.exports = mongoose.model('Users', UsersSchema);