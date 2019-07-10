'use strict';
const response = require('../libs/response');
const UserModels =  require('../models/users');

exports.getUsers = async (req, res) => {

    await UserModels.find()
        .sort({createdAt: 'desc'})
        .then(data => {
            let json = {
                status: 200,
                message: 'success get data users',
                data: data
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
    let name = req.body.name || 1;
    let username = req.body.username||2 ;
    let email = req.body.email||3;
    let imageUrl = req.body.image_url||4;
    let phone = req.body.phone||5;
    let gender = req.body.gender||6;
    let referral = req.body.referral||7;
    let birth = req.body.birth||8;
    let address = req.body.address||9;
    let wishlist = req.body.wishlist||[1,2,3,4,5];
    const user = new UserModels({
        name, username, email, imageUrl, phone, gender, referral, birth, address,wishlist
    });

    await user.save()
        .then(data => {
            let json = {
                status: 200,
                message: 'success add data users',
                data: data
            };
            response.success(json, res)
        })
        .catch(err => {
            let json = {
                status: 500,
                message: 'Error add data users'
            };

            response.withCode(500,json,res)
        })


};