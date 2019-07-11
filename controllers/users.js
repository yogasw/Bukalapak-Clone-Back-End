'use strict';
const response = require('../libs/response');
const UserModels = require('../models/users');
const helper = require('../libs/helper');
const _ = require('lodash');
const fs = require('fs');
const aws = require('aws-sdk');

// MULTER
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});

const s3 = new aws.S3({
    accessKeyId:process.env.AWSAccessKeyId,
    secretAccessKey:process.env.AWSSecretKey
});

exports.getUsers = async (req, res) => {
    const token = helper.decodeJwt(req.header('x-auth-token'));

    if (!token._id) {
        return response.error('error get data users', res);
    }
    await UserModels.findOne({_id: token._id})
    // .populate({path:'Address',select:[token._id]})
        .then(data => {
            let json = {
                message: 'success get data users',
                data: _.pick(data, ['_id', 'name', 'username', 'email', 'imageUrl', 'phone', 'gender', 'referral', 'birth', 'address'])
            };
            response.success(json, res)
        })
        .catch(err => {
            response.error('Error get data users', res)
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

exports.uploadFotoProfil = async (req, res) => {
    const token = helper.decodeJwt(req.header('x-auth-token'));

    if (!token._id) {
        return response.error('error get data users', res);
    }

    let check = await UserModels.findOne({_id: token._id});
    if (check) {
        try {
            const upload = multer({storage}).single('image');
            upload(req, res, function (err) {

                if (err) {
                    return res.send(err)
                }

                const path = req.file.path;
                const uniqueFilename = new Date().toISOString();

               fs.readFile(path, function (err, data) {
                    if (err) {
                        return false;
                    }
                    const params = {
                        Bucket: 'clonebukalapak',  // pass your bucket name
                        Key: uniqueFilename,
                        Body: data
                    };
                    s3.upload(params, function (s3Err, data) {
                        if (s3Err) return s3Err;
                        fs.unlinkSync(path);

                        UserModels.findOneAndUpdate(
                            {_id:token._id}
                            ,{
                                imageUrl: data.Location
                            }
                        ).then(data => {
                            console.log(data)
                        }).catch(data => {
                            console.log(err)
                        });
                        return response.success(data.Location, res);
                    })
                });
            })
        } catch (e) {
            response.error('System error', res);
        }
    } else {
        return response.error("error upload profil users", res);
    }

};