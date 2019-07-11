'use strict';
const response = require('../libs/response');
const userModel = require('../models/users');
const _ = require('lodash');
const helper = require('../libs/helper');

exports.getCarts = async (req, res) => {

    const token = helper.decodeJwt(req.header('x-auth-token'));

    if (!token._id) {
        return response.error('error get data user', res);
    }

    let usersId = token._id;

    await userModel.findById(usersId)
        .then(data => {
            response.success(_.pick(data, ['carts']), res);
        })
        .catch(err => {
            response.error('error get data carts', res);
        });
};
exports.addCarts = async function (req, res) {
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


    await userModel.updateOne()
    (
        {_id: usersId},
        {$push: {carts: product}}
    )
        .then(data => {

            let json = {
                status: 200,
                message: 'success add data carts',
                data: product
            };

            response.success(json, res)
        })

        .catch(err => {
            let json = {
                status: 500,
                message: 'Error add data carts'
            };

            response.withCode(500, json, res)
        })
};
exports.deleteCarts = async (req, res) => {
    let id = req.params.id;
    const token = helper.decodeJwt(req.header('x-auth-token'));

    if (!token._id) {
        return response.error('error get data seller', res);
    }

    userModel.updateOne(
        {_id:token._id},
        {
            $pull: {
                carts: {productId:id}
            }
        },
        {
            multi: true
        }
    ).then(data=>{
        response.success(data,res)
    }).catch(e=>{
        response.error(e,res)
    })

};

