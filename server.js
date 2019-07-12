require('dotenv').config({
    path: './config/.env'
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.SERVER_PORT;
const cors = require('cors');
const multer = require('multer');
const dateFormat = require('dateformat');
const {sendSms} = require('./libs/sendSms');
const {sendVoce} = require('./libs/sendVoice');
//const cors = require('../rds-combined-ca-bundle.pem');

//Configure Database
var fs = require('fs');
var ca = [fs.readFileSync('../rds-combined-ca-bundle.pem')];

const dbConfig = require('./config/database');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.DB, {
    dbName: 'bukalapak',
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log('connection success');
}).catch(err => {
    console.log(`connection error `, err);
    process.exit();
});

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
    function (req, res, next) {
        console.log("[LOG]");
        console.log(`\nTIME : ${dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")} \nHOST : ${req.headers.host} \nURL : ${req.url} \nMETHOD : ${req.method} \nUser Agent : ${req.headers["useragent"]} \n`);
        next();

    },
    bodyParser.json(),
    //use CORS
    cors(corsOptions),
);
const routeUsers = require('./routes/users');
const routeProduct =  require('./routes/product');
const routeAddress =  require('./routes/address');
const routeCategories =  require('./routes/categories');
const routeAuth =  require('./routes/auth');
const routeCarts =  require('./routes/carts');
const routeWishlist =  require('./routes/wishlist');

routeUsers(app);
routeProduct(app);
routeAddress(app);
routeCategories(app);
routeAuth(app);
routeCarts(app);
routeWishlist(app);

app.get('/', function (req, res) {
    //sendSms('6282329949292', 'JANGAN BERIKAN KODE RAHASIA ini kepada siapa pun TERMASUK PIHAK BUKALAPAK. Kode otentikasi');
    //sendVoce('6283829832340','sms verifikasi anda adalah 2909');
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
