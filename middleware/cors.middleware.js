'use strict';

module.exports = (req, res, next) => {

    const origins = ['http://localhost:3000', 'http://localhost:4201', 'https://kane-pwa.firebaseapp.com'];

    origins.forEach((origin) => res.setHeader('Access-Control-Allow-Origin', origin));

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    next();
};
