const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    console.log(token);
    if (!token) return res.status(401).send('Access denied. No Token provided');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        console.log(decoded);
        req.user = decoded;
        console.log(req.user);
        next();
    }
    catch (ex) {
        res.status(400).send('Invalid Token');
    }
}

module.exports = auth;