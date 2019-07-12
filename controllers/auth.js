'use strict';

const {sendSms} = require('../libs/sendSms');
const response = require('../libs/response');
const userModel = require('../models/users');
const authModel = require('../models/auth');

//const authModel = require('../models/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');

exports.login = async (req, res) => {
    //declare http request
    let username = req.body.username;
    let password = req.body.password;
    console.log(req.body);
    //search user by username and email
    let check = await userModel.findOne({
        $or: [{username: username},
            {email: username}]
    }).catch(e => {
        response.error('User not found', res);
    });

    //if check false
    if (!check) {
        return res.status(400).json({
            status: 400,
            message: 'User not found.'
        })
    }

    //validate password
    const validPassword = await bcrypt.compare(password, check.password);
    if (!validPassword) {
        return res.status(400).json({
            status: 400,
            message: 'Wrong password.'
        })
    }

    const token = check.generateAuthToken();
    res.header('x-auth-token', token);

    res.json({
        status: 200,
        data: _.pick(check, ['_id', 'username', 'email']),
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
            status: 'failed',
            message: 'That user already exisits!',
        };
        return response.error(json, res);
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
                return response.error('failed register user', res);
            });
    }
};

exports.getOTP = async (req, res) => {
    let min = 11111;
    let max = 99999;
    let token = Math.floor(Math.random() * (max - min) + min);
    let phoneNumber = req.body.phoneNumber;

    //let otp = sendSms(phoneNumber, 'ANGAN BERIKAN KODE RAHASIA ini kepada siapa pun TERMASUK PIHAK BUKALAPAK. Kode otentikasi anda adalah : ' + token);

    if (true) {
        const data = {
            token,
            phoneNumber
        };

        authModel.update({
            phoneNumber: phoneNumber
        }, {
            token,
            phoneNumber
        }, {
            upsert: true
        })
            .then(respon => {
                response.success(data, res)
            }).catch(e => {
            response.error(e, res);
        })
    } else {
        response.error("system error", res);
    }
};
exports.cekOTP = async (req, res) => {
    let token = req.body.token;
    let phoneNumber = req.body.phoneNumber;

    let check = await authModel.find({ token: token, phoneNumber: phoneNumber });
    response.error(check,res);
};