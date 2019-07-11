'use strict';
const response = require('../libs/response');
const ProductModel = require('../models/products');
const CategoriesModel = require('../models/categories');

const _ = require('lodash');
const helper = require('../libs/helper');

exports.getProduct = async (req, res) => {

    let search = {};

    Object.keys(req.query).forEach(function (key) {

        if (key == 'id') {
            search['_id'] = req.query.id
        }
        // else if(key == 'name'){
        //     let a = req.query.name;
        //     search['name'] =
        // }
        else if (key == 'productId') {
            search['productId'] = req.query.productId
        }
    });

    await ProductModel.find(search)
        .sort({createdAt: 'desc'})
        .then(data => {
            let json = {
                status: 200,
                message: 'success get data product',
                data: data
            };
            response.success(json, res)
        })
        .catch(err => {
            let json = {
                status: 500,
                message: 'Error get data product'
            };

            response.withCode(500, json, res)
        })

};

exports.addProduct = async function (req, res) {
    const token = helper.decodeJwt(req.header('x-auth-token'));

    if (!token._id) {
        return response.error('error get data seller', res);
    }

    let usersId = token._id;
    let status = 'visible';

    //input from request
    let name = req.body.name;
    let categoriesId = req.body.categoriesId;
    let price = req.body.price;
    let stock = req.body.stock;
    let weight = req.body.weight;
    let image = req.body.image;

    try {
        let checkCategory = await CategoriesModel.findById({_id: categoriesId});

        if (!checkCategory) {
            return response.error('error get data category', res);
        }
    } catch (e) {
        return response.error('error add data category', res);
    }


    const product = new ProductModel({
        name,
        categoriesId,
        usersId,
        price,
        stock,
        weight,
        status,
        image,
    });

    await product.save()
        .then(data => {
            let json = {
                status: 200,
                message: 'success add data product',
                data: data
            };
            response.success(json, res)
        })
        .catch(err => {
            let json = {
                status: 500,
                message: 'Error add data product'
            };

            response.withCode(500, json, res)
        })
};

exports.deleteProduct = async (req, res) => {
    let id = req.params.id;

    const token = helper.decodeJwt(req.header('x-auth-token'));

    if (!token._id) {
        return response.error('error get data seller', res);
    }

    let usersId = token._id;
    let del = {
        _id: id
    };
    try {
        ProductModel.deleteOne(del, function (err, obj) {
            if (err) {
                // error
                return response.error('error delete product', res);
            } else {
                return response.success('product deleted', res)
            }
        });
    } catch (e) {
        return response.error('error delete product', res);
    }

};
exports.updateProduct = async (req, res) => {
    let id = req.params.id;
    let update = {};

    Object.keys(req.body).forEach(function (key) {

        if (key == 'name') {
            update['name'] = req.body.name
        } else if (key == 'categoriesId') {
            update['categoriesId'] = req.body.categoriesId
        } else if (key == 'price') {
            update['price'] = req.body.price
        } else if (key == 'stock') {
            update['stock'] = req.body.stock
        } else if (key == 'weight') {
            update['weight'] = req.body.weight
        } else if (key == 'status') {
            update['status'] = req.body.status
        } else if (key == 'image') {
            update['image'] = req.body.image
        } else if (key == 'rating') {
            update['rating'] = req.body.rating
        }
    });

    ProductModel.findOneAndUpdate({_id: id}, update)
        .then(data => {
            let json = {
                message: 'success update product',
                data: data
            }
            response.success(json, res)
        })
        .catch(e => {
            response.error("Error update product" + e, res)
        })
};