'use strict';

exports.ok = function (values, res) {
    res.status(200);
    const data = {
        status:200,
        value:values
    };
    res.json(data);
    res.end();
};