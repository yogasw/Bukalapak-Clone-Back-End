require('dotenv').config({
    path: './config/.env'
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.SERVER_PORT;
const cors = require('cors');

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
