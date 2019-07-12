'use strict';

var AWS = require('aws-sdk');


exports.sendSms = (numberPhone, message) => {

// The AWS Region that you want to use to send the message. For a list of
// AWS Regions where the Amazon Pinpoint API is available, see
// https://docs.aws.amazon.com/pinpoint/latest/apireference/.
    let aws_region = "us-east-1";

// The phone number or short code to send the message from. The phone number
// or short code that you specify has to be associated with your Amazon Pinpoint
// account. For best results, specify long codes in E.164 format.
    let originationNumber = process.env.AWSoriginationNumber;

// The recipient's phone number.  For best results, you should specify the
// phone number in E.164 format.
    let destinationNumber = numberPhone;

// The content of the SMS message.
    let SMSmessage = message;

// The Amazon Pinpoint project/application ID to use when you send this message.
// Make sure that the SMS channel is enabled for the project or application
// that you choose.
    let applicationId = process.env.AWSapplicationId;

// The type of SMS message that you want to send. If you plan to send
// time-sensitive content, specify TRANSACTIONAL. If you plan to send
// marketing-related content, specify PROMOTIONAL.
    let messageType = "TRANSACTIONAL";

// The registered keyword associated with the originating short code.
    let registeredKeyword = "myKeyword";

// The sender ID to use when sending the message. Support for sender ID
// varies by country or region. For more information, see
// https://docs.aws.amazon.com/pinpoint/latest/userguide/channels-sms-countries.html
    let senderId = "MySenderID";

// Specify that you're using a shared credentials file, and optionally specify
// the profile that you want to use.
    let credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
    AWS.config.credentials = credentials;

// Specify the region.
    AWS.config.update({
        accessKeyId: process.env.AWSAccessKeyId,
        secretAccessKey: process.env.AWSSecretKey,
        region: aws_region
    });

//AWS.config.update({region:aws_region});

//Create a new Pinpoint object.
    let pinpoint = new AWS.Pinpoint();

// Specify the parameters to pass to the API.
    let params = {
        ApplicationId: applicationId,
        MessageRequest: {
            Addresses: {
                [destinationNumber]: {
                    ChannelType: 'SMS'
                }
            },
            MessageConfiguration: {
                SMSMessage: {
                    Body: SMSmessage,
                    Keyword: registeredKeyword,
                    MessageType: messageType,
                    //OriginationNumber: originationNumber,
                    SenderId: senderId,
                }
            }
        }
    };

//Try to send the message.
    pinpoint.sendMessages(params, function (err, data) {
        // If something goes wrong, print an error message.
        if (err) {
            console.log(err.message);
            return false;
            // Otherwise, show the unique ID for the message.
        } else {
            console.log("Message sent! "
                + data['MessageResponse']['Result'][destinationNumber]['StatusMessage']);
            return true;
        }
    });

};
