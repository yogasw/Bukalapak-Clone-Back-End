'use strict';

const jwt = require('jsonwebtoken');
const fs  = require('fs');


exports.decodeJwt = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.PRIMARY_KEY);
        return decoded;
    } catch (e) {
        return false;
    }
};




exports.uploadFile = (file, fileName) =>{


};