'use strict';

var AWS = require('aws-sdk');
console.log("Masuk")

exports.sendSms = (numberPhone, message) => {
    const accountSid = 'AC9d4f0f0bd8da6bcd5def8a7e74d0f1e6';
    const authToken = '[AuthToken]';
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            body: message,
            messagingServiceSid: 'MG88abb43b805d9487aab82748f27d37c5',
            to: numberPhone
        })
        .then(message =>
        {
            return message.sid;
        })
        .done();

};
