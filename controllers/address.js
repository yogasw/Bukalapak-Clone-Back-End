'use strict';
const response = require('../libs/response');
const AddressModels =  require('../models/address');
const helper = require('../libs/helper');
const _ = require('lodash');


exports.getAddress = async (req, res) => {
    const token = helper.decodeJwt(req.header('x-auth-token'));

    if (!token._id) {
        return response.error('error get data user', res);
    }

    await AddressModels.find({
        userId: token._id
    })
        .sort({createdAt: 'desc'})
        .then(data => {
            let json = {
                status: 200,
                message: 'success get data address',
                data: data
            };
            response.success(json, res)
        })
        .catch(err => {
            let json = {
                status: 500,
                message: 'Error get data address'
            };

            response.withCode(500,json,res)
        })

};
exports.addAddress = async function (req, res) {
    const token = helper.decodeJwt(req.header('x-auth-token'));

    if (!token._id) {
        return response.error('error get data user', res);
    }

    let name = req.body.name;
    let phoneNumber = req.body.phoneNumber;
    let userId = token._id;
    let address = req.body.address;
    let receiver = req.body.receiver;
    let zipCode = req.body.zipCode;
    const dataAddress = new AddressModels({
        name,
        phoneNumber,
        userId,
        address,
        receiver,
        zipCode
    });

    await dataAddress.save()
        .then(data => {
            let json = {
                message: 'success add data address',
                data: data
            };
            response.success(json, res)
        })
        .catch(err => {
            response.error('Error add data address', res);
        })
};
exports.deleteAddress = async (req, res) => {
    const token = helper.decodeJwt(req.header('x-auth-token'));

    if (!token._id) {
        return response.error('error get data user', res);
    }

    let id = req.params.id;

    AddressModels.deleteOne(
        {
            _id: id,
            userId: token._id
        }
    ).then(data => {
        if (data.deletedCount > 0) {
            response.success({id: id}, res);
        } else {
            return response.error('id address not found', res);
        }
    }).catch(e => {
        response.error(e, res);
    })
};
exports.updateAddress = async (req, res) => {
    const token = helper.decodeJwt(req.header('x-auth-token'));

    if (!token._id) {
        return response.error('error get data user', res);
    }

    let id = req.params.id;
    let update = {};
    Object.keys(req.body).forEach(function (key) {
        switch (key) {
            case 'name' :
                update['name'] = req.body.name;
                break;
            case 'phoneNumber' :
                update['phoneNumber'] = req.body.phoneNumber;
                break;
            case 'userId' :
                update['userId'] = req.body.userId;
                break;
            case 'address' :
                update['address'] = req.body.address;
                break;
            case 'receiver' :
                update['receiver'] = req.body.receiver;
                break;
            case 'zipCode' :
                update['zipCode'] = req.body.zipCode;
                break;
        }
    });

    await AddressModels.updateOne(
        {
            _id: id,
            userId: token._id
        }, update
    ).catch(e => {
        return response.error('error update address', res);
    });

    await AddressModels.find(
        {
            _id: id,
            userId: token._id
        }
    ).then(data => {
        response.success(data, res);
    }).catch(e => {
        return response.error('error get data address', res);
    });
};