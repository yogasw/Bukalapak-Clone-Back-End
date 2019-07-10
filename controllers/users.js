'use strict';
const response = require('../libs/response');
const UserModels =  require('../models/users');
const helper = require('../libs/helper');
const _ = require('lodash');

exports.getUsers = async (req, res) => {
    const token = helper.decodeJwt(req.header('x-auth-token'));

    if (!token._id) {
        return response.error('error get data users', res);
    }
    await UserModels.findOne({_id: token._id})
        .then(data => {
            let json = {
                message: 'success get data users',
                data: _.pick(data, ['_id', 'name', 'username', 'email', 'imageUrl', 'phone', 'gender', 'referral', 'birth', 'address'])
            };
            response.success(json, res)
        })
        .catch(err => {
            let json = {
                status: 500,
                message: 'Error get data users'
            };

            response.withCode(500,json,res)
        })

};

exports.updateUsers = async function (req, res) {
    const token = helper.decodeJwt(req.header('x-auth-token'));

    if (!token._id) {
        return response.error('error update data users', res);
    }

    let check = await UserModels.findOne({_id: token._id});

    if (check) {

        await UserModels.findOneAndUpdate(
            {
                _id: token._id
            }, req.body)
            .then((data) => {
                if (!data) {
                    response.error('error update data users', res);
                }
            }).catch((e) => {
                response.error('error update data users', res);
            });

        await UserModels.findOne({_id: token._id})
            .then(data => {
                let json = {
                    message: 'update data success',
                    data: _.pick(data, ['_id', 'name', 'username', 'email', 'imageUrl', 'phone', 'gender', 'referral', 'birth', 'address'])
                };
                response.success(json, res)
            })
            .catch(err => {
                let json = {
                    status: 500,
                    message: 'error update data users '
                };
                console.log("masuk");
                //console.log(err);
                response.error(json, res);
            })
    } else {
        return response.error("error update data users", res);
    }

};