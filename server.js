require('dotenv').config({
    path: './config/.env'
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routeUsers = require('./routes/users');
const port = process.env.SERVER_PORT;
const cors = require('cors');
//const cors = require('../rds-combined-ca-bundle.pem');

//Configure Database
var fs = require('fs');
var ca = [fs.readFileSync('../rds-combined-ca-bundle.pem')];

const dbConfig = require('./config/database');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// mongoose.connect(dbConfig.DB, {
//     sslCA:ca,
//     useNewUrlParser: true,
//     useFindAndModify: false
// }).then(() => {
//     console.log('connection success');
// }).catch(err => {
//     console.log(`connection error `, err);
//     process.exit();
// });
var options = {
    sslCA: ca,
    useNewUrlParser: true,
};
mongoose.connect(dbConfig.DB,options);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//End Configure Database

//Start Config CORS
const whitelist = ['http://192.168.6.101', 'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop', undefined];

const corsOptions = {
    origin: function (origin, next) {
        if (whitelist.indexOf(origin) !== -1) {
            next()
        } else {
            next("Not allowed by CORS");
        }
    }
};

//END Config CORS

app.use(
//USE Body parser
    bodyParser.urlencoded({
        extended: true
    }),
    bodyParser.json(),
    //use CORS
    cors(corsOptions),
);

routeUsers(app);
app.get('/', function (req, res) {
    res.send('Welcome to server');
});

app.listen(port);

//Show Log start server ip and port to console log
const os = require('os');
let networkInterfaces = os.networkInterfaces();
for (let inet in networkInterfaces) {
    let addresses = networkInterfaces[inet];
    for (let i = 0; i < addresses.length; i++) {
        let address = addresses[i];
        if (!address.internal) {
            console.log(`_____________Server Started ${address.address}:${port}____________________`);
        }
    }
}
