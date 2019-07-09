'use strict';

const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name :{
        type:String,
        require:true
    },categoriesId :{
        type:Number,
        require:true
    },usersId :{
        type:Number,
        require:true
    },price :{
        type:String,
        require:true
    },stock :{
        type:Number,
        require:true
    },weight :{
        type:String,
        require:true
    },status :{
        type:String,
    },image:{
        type:Array,
    }
});

module.exports = mongoose.model('Product', ProductSchema);