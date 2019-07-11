'use strict';
const response = require('../libs/response');
const userModel = require('../models/users');
//const authModel = require('../models/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');

exports.login = async (req, res) => {
console.log("masuk 1");
    //declare http request
    let username = req.body.username;
    let password = req.body.password;

    //search user by username and email
    let check = await userModel.findOne({
        $or: [{username: username},
            {email: username}]
    });
    console.log("masuk 2")
    //if check false
    if (!check) {
        return res.status(400).json({
            status: 400,
            message: 'User not found.'
        })
    }
    console.log("masuk 3")
    //validate password
    const validPassword = await bcrypt.compare(password, check.password);
    if (!validPassword){
        return res.status(400).json({
            status:400,
            message: 'Wrong password.'
        })
    }
    console.log("masuk 4")
    const token = check.generateAuthToken();
    res.header('x-auth-token', token);
    console.log("masuk 5")
    res.json({
        status:200,
        data: _.pick(check, ['_id', 'username', 'email']),
    });
    console.log("masuk 6")
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
                    data: _.pick(val, ['_id', 'name', 'username', 'email', 'phone'])
                };

                const token = data.generateAuthToken();
                res.header('x-auth-token', token);
                res.json(json);
                res.end()

            })
            .catch(err => {
                let json = {
                    status: 500,
                    message: 'failed register user' + err,
                };

                return response.withCode(500, json, res);
            })
    }
};