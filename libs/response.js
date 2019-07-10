'use strict';

exports.success = function (values, res) {
    const data = {
        status:200,
        value:values
    };
    res.status(200);
    res.json(data);
    res.end();
};

exports.withCode = function (code, value, res) {
    const data = {
        status: code,
        values: value
    };
    res.status(code);
    res.json(data);
    res.end();
};

exports.error = function (res) {
    const data = {
        status: 500,
        values: "System Error",
    };
    res.status(500);
    res.json(data);
    res.end();
};
