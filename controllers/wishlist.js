'use strict';
const response = require('../libs/response');
const userModel = require('../models/users');
const productModel = require('../models/products');
const withlistModel = require('../models/withlist');

const _ = require('lodash');
const helper = require('../libs/helper');

exports.getWishlist = async (req, res) => {

    const token = helper.decodeJwt(req.header('x-auth-token'));

    if (!token._id) {
        return response.error('error get data user', res);
    }

    let usersId = token._id;

    await withlistModel.find({user: usersId})
        .populate({path: 'product', model: 'Product'})
        .exec()
        .then(data => {
            let dataNew = [];

            data.forEach((i)=>{
                dataNew.push(i.product);
            });
            response.success(data, res);
        })
        .catch(err => {
            response.error('error get data wishlist', res);
        });
};

exports.addWishlist = async function (req, res) {
    const token = helper.decodeJwt(req.header('x-auth-token'));

    if (!token._id) {
        return response.error('error get data user', res);
    }

    let user = token._id;

    //input from request
    let product = req.body.productId;

    const wishlist = new withlistModel({
        user,
        product
    });

    try {
        let idUser = await userModel.findById({_id: user});

        if (!idUser) {
            return response.error('error get data users', res);
        }
    } catch (e) {
        return response.error('error get data users', res);
    }

    await wishlist.save()
        .then(data => {
            let json = {
                message: 'success add data Wishlist',
                data: data
            };

            response.success(json, res)
        })

        .catch(err => {
            let json = {
                status: 500,
                message: 'Error add data Wishlist'
            };

            response.error(json, res)
        })
};
exports.deleteWishlist = async (req, res) => {
    let id = req.params.id;
    const token = helper.decodeJwt(req.header('x-auth-token'));

    if (!token._id) {
        return response.error('error get data user', res);
    }

    withlistModel.deleteOne(
        {
            _id: id,
        },
    ).then(data=>{
        response.success({id:id}, res)
    }).catch(e=>{
        response.error(e,res)
    })

};

