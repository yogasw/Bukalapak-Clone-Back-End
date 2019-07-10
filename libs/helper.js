const jwt = require('jsonwebtoken');
exports.decodeJwt = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.PRIMARY_KEY);
        return decoded;
    } catch (e) {
        return false;
    }
};