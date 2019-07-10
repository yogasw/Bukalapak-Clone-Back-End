'use strict';
const response = require('../libs/response');
const AddressModels =  require('../models/address');

exports.getAddress = async (req, res) => {

    await AddressModels.find()
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
    let name = req.body.name ||1;
    let phoneNumber = req.body.phoneNumber ||2;
    let userId  = req.body.userId||3;
    let address = req.body.address||4;
    let receiver = req.body.receiver||5;
    let zipCode = req.body.zipCode||6;
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
                status: 200,
                message: 'success add data address',
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