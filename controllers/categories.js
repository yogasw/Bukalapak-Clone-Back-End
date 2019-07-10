'use strict';
const response = require('../libs/response');
const CategoriesModels =  require('../models/categories');

exports.getCategories = async (req, res) => {

    await CategoriesModels.find()
        .sort({createdAt: 'desc'})
        .then(data => {
            let json = {
                status: 200,
                message: 'success get data categories',
                data: data
            };
            response.success(json, res)
        })
        .catch(err => {
            let json = {
                status: 500,
                message: 'Error get data categories'
            };

            response.withCode(500,json,res)
        })

};

exports.addCategories = async function (req, res) {
    let name = req.body.name ||1;
    let subCategories = req.body.subCategories ||2;
    let specification = req.body.specification||[1,2,3];
    const categories = new CategoriesModels({
        name,
        subCategories,
        specification
    });

    await categories.save()
        .then(data => {
            let json = {
                status: 200,
                message: 'success add data categories',
                data: data
            };
            response.success(json, res)
        })
        .catch(err => {
            let json = {
                status: 500,
                message: 'Error add data categories'
            };

            response.withCode(500,json,res)
        })
};