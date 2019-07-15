'use strict';

var AWS = require('aws-sdk');
console.log("Masuk")

exports.sendSms = (numberPhone, message) => {
    console.log(numberPhone);
    const accountSid = process.env.TWILOaccountSid;
    const authToken = process.env.TWILOauthToken;
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
        .catch(e => {
            console.log(e);
            return false;
        })
        .done();

};
