'use strict';

module.exports = (req, res, next) => {

    const origin = process.env.NODE_ENV === 'production'
        ? 'https://kane-pwa.firebaseapp.com'
        : 'http://localhost:4201';

    res.setHeader('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    next();
};
