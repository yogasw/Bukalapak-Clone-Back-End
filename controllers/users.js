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
    let name = req.body.name;
    let username = req.body.username;
    let email = req.body.email;
    let imageUrl = req.body.image_url;
    let phone = req.body.phone;
    let gender = req.body.gender;
    let referral = req.body.referral;
    let birth = req.body.birth;
    let address = req.body.address;
    let wishlist = req.body.wishlist;
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