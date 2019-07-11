'use strict';
const response = require('../libs/response');
const userModel = require('../models/users');
const _ = require('lodash');
const helper = require('../libs/helper');

exports.getWishlist = async (req, res) => {

    const token = helper.decodeJwt(req.header('x-auth-token'));

    if (!token._id) {
        return response.error('error get data user', res);
    }

    let usersId = token._id;

    await userModel.findById(usersId)
        .then(data => {
            response.success(_.pick(data, ['wishlist']), res);
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

    let usersId = token._id;

    //input from request
    let name = req.body.name;
    let productId = req.body.productId;

    const product = {
        name,
        productId,
    };

    try {
        let idUser = await userModel.findById({_id: usersId});

        if (!idUser) {
            return response.error('error get data users', res);
        }
    } catch (e) {
        return response.error('error get data users', res);
    }

    await userModel.updateOne
    (
        {_id: usersId},
        {$push: {wishlist: product}}
    )
        .then(data => {

            let json = {
                message: 'success add data Wishlist',
                data: product
            };

            response.success(json, res)
        })

        .catch(err => {
            let json = {
                status: 500,
                message: 'Error add data Wishlist'
            };

            response.withCode(500, json, res)
        })
};
exports.deleteWishlist = async (req, res) => {
    let id = req.params.id;
    const token = helper.decodeJwt(req.header('x-auth-token'));

    if (!token._id) {
        return response.error('error get data user', res);
    }

    userModel.updateOne(
        {_id:token._id},
        {
            $pull: {
                wishlist: {_id:id}
            }
        },
        {
            multi: true
        }
    ).then(data=>{
        response.success({id: id}, res)
    }).catch(e=>{
        response.error(e,res)
    })

};

