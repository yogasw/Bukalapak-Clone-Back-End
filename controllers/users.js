'use strict';
const response = require('../libs/response');
const UserModels =  require('../models/users');

exports.getUsers = async (req, res) => {

    await UserModels.find()
        .sort({createdAt: 'desc'})
        .then(data => {
            res.json({
                status: 200,
                message: 'success get data categories',
                data: data
            });
        })
        .catch(err => {
            return res.status(500).json({
                status: 500,
                message: err.message,
                data: []
            })
        })

};
exports.addUsers = async function (req, res) {
    let name = req.body.name || 1;
    let username = req.body.username || 2;
    let email = req.body.email || 3;
    let image_url = req.body.image_url;
    let phone = req.body.phone;
    let gender = req.body.gender;
    let referral = req.body.referral;
    let birth = req.body.birth;
    let address = req.body.address;
    const user = new UserModels({
        name, username, email, image_url, phone, gender, referral, birth, address
    });

    await user.save()
        .then(data => {

        })
        .catch(err => {
            response.ok("error");
        })


};