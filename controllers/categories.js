'use strict';
const response = require('../libs/response');
const CategoriesModels = require('../models/categories');

exports.getCategories = async (req, res) => {
    let id = req.query.id;

    if (id == '' || typeof id == 'undefined' || id == undefined) {
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

                response.withCode(500, 'success', json, res)
            })
    } else {
        await CategoriesModels.findById(id)
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

                response.withCode(500, 'success', json, res)
            })

    }
};


exports.addCategories = async function (req, res) {
    // let name = req.body.name;
    // let subCategories = req.body.subCategories;
    // let specification = req.body.specification||[1,2,3];


    // const categories = new CategoriesModels({
    //     name
    // });
    //
    // await categories.save()
    //     .then(data => {
    //         let json = {
    //             status: 200,
    //             message: 'success add data categories',
    //             data: data
    //         };
    //         response.success(json, res)
    //     })
    //     .catch(err => {
    //         let json = {
    //             status: 500,
    //             message: 'Error add data categories'
    //         };
    //
    //         response.withCode(500,json,res)
    //     })

    CategoriesModels.create([
        {
            name: 'Handphone',
            children:
                [
                    {name: 'Spare Part & Tools Handphone'},
                    {name: 'Virtual Reality'},
                    {name: 'Smartwatch'},
                    {name: 'HP & Smartphone'},
                    {name: 'Tablet'},
                ]
        }, {
            name: 'Komputer',
            children:
                [
                    {name: 'Hardware'},
                    {name: 'Mini PC'},
                    {name: 'Desktop'},
                    {name: 'Laptop'},
                    {name: 'Server'},
                    {name: 'Printer'},
                ]
        }, {
            name: 'Elektronik',
            children:
                [
                    {name: 'Walkie Talkie'},
                    {name: 'Media Player & Set Top Box'},
                    {name: 'Komponen Elektronik'},
                    {name: 'Aksesoris TV & Video'},
                    {name: 'Voice Recorder'},
                    {name: 'Televisi'},
                ]
        }, {
            name: 'Kamera',
            children:
                [
                    {name: 'Action Camera'},
                    {name: 'Drone'},
                    {name: 'Kamera Digital'},
                    {name: 'Handycam'},
                    {name: 'Kamera Analog'},
                    {name: 'CCTV'},
                ]
        }, {
            name: 'Olahraga',
            children:
                [
                    {name: 'Surfing & Diving'},
                    {name: 'LAri'},
                    {name: 'Badminton'},
                    {name: 'Renang'},
                    {name: 'Pancing'},
                    {name: 'Tenis'},
                ]
        }
    ]).then(user => {
        res.json(user)
    });

};