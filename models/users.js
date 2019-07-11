'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 8;
const jwt = require('jsonwebtoken');

const UsersSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            default: ''
        },
        username: {
            type: String,
            required: true,
            default: ''
        },
        email: {
            type: String,
            required: true,
            default: ''
        },
        imageUrl: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            default: ''
        },
        gender: {
            type: String,
            default: ''
        },
        referral: {
            type: String,
            default: ''
        },
        birth: {
            type: String,
            default: ''
        },
        nameStore: {
            type: String,
            default: ''
        },
        address: {
            type: String,
            default: ''
        },
        /* [{
             name:{
                 type: String,
                 default:'1'
             },
             phoneNumber:{
                 type: String,
                 default:'2'
             },
             usersId:{
                 type: String,
                 default:''
             },
             address:{
                 type: String,
                 default:''
             },
             receiver:{
                 type: String,
                 default:''
             },
             zipCode:{
                 type: String,
                 default:''
             },
         }]*/

        password: {
            type: String,
            default: ''
        },
        wishlist: {
            type: Array,
            default: []
        },
        carts: [{
            name :{
                type:String,
                default:''
            },
            productId :{
                type:String,
                default:''
            }
        }]
    },
    {
        timestamps: true
    });

UsersSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next()
});

UsersSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id}, process.env.PRIMARY_KEY);
};

module.exports = mongoose.model('Users', UsersSchema);