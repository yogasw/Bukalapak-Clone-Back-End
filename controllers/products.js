'use strict';
const response = require('../libs/response');
const ProductModel =  require('../models/products');

exports.getProduct = async (req, res) => {

    await ProductModel.find()
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

            response.withCode(500,json,res)
        })

};

exports.addProduct = async function (req, res) {
    let name = req.body.name ||1;
    let categoriesId = req.body.categoriesId ||2;
    let usersId = req.body.usersId||3;
    let price = req.body.price||4;
    let stock = req.body.stock||5;
    let weight = req.body.weight||6;
    let status = req.body.status||7;
    let image = req.body.image||8;
    const product = new ProductModel({
        name,
        categoriesId,
        usersId,
        price,
        stock,
        weight,
        status,
        image
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

            response.withCode(500,json,res)
        })
};