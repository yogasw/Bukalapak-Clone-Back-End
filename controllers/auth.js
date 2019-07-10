'use strict';
const response = require('../libs/response');
const userModel = require('../models/users');
const authModel = require('../models/auth');

exports.login = async (req, res) => {

};
exports.register = async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let gender = req.body.gender;
    let username = req.body.username;
    let password = req.body.password;
    let referral = req.body.referral;

    const data = new userModel({
        name,
        email,
        gender,
        username,
        password,
        referral
    });

    let check = await userModel.findOne({
        $or: [{
            email: req.body.email,
            username: req.body.username
        }]
    });

    if (check) {
        let json = {
            status: 200,
            message: 'That user already exisits!',
        };
        return response.success(json, res);
    } else {
        await data.save()
            .then(val => {
                let json = {
                    status: 200,
                    message: 'register success',
                    data: val
                };
                return response.success(json, res);

            })
            .catch(err => {
                let json = {
                    status: 500,
                    message: 'failed register user :' + err + data,
                };

                return response.withCode(500, json, res);
            })
    }
};
