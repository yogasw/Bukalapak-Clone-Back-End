'use strict';

const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name :{
        type:String,
        required: true,
        default: ''
    },categoriesId :{
        type: String,
        required: true,
        default: ''
    },usersId :{
        type: String,
        required: true,
        default: ''
    },price :{
        type:String,
        required: true,
        default: ''
    },stock :{
        type:Number,
        required: true,
        default: 0
    },weight :{
        type:String,
        required: true,
        default: 0
    },status :{
        type:String,
        default: ''
    },image:{
        type:Array,
    },rating:{
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Product', ProductSchema);