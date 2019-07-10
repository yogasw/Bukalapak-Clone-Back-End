'use strict';
const response = require('../libs/response');
const userModel = require('../models/users');
const authModel = require('../models/auth');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    //declare http request
    let username = req.body.username;
    let password = req.body.password;

    //search user by username and email
    let check = await userModel.findOne({
        $or: [{username: username},
            {email: username}]
    });

    //if check false
    if (!check) {
        return res.stat(400).json({
            status: 400,
            message: 'User not found.'
        })
    }

    //validate password
    const validPassword = await bcrypt.compare(password, check.password);
    if (!validPassword){
        return res.status(400).json({
            status:400,
            message: 'Wrong password.'
        })
    }

    res.json({
        status:200,
        data:check,
    });

    res.end()
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
        $or: [{email: req.body.email},
            {username: req.body.username}]
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
