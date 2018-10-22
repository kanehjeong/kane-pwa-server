const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
    require('dotenv').config();
}
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// DB INIT
const mongoose = require('mongoose');
const connectionString = isProduction
    ? process.env.MONGODB_URI
    : `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds125031.mlab.com:25031/heroku_v3ddrvsm`;
mongoose.connect(connectionString, {
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Successfully connected to DB');
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./middleware/cors.middleware'));
app.use('/api', require('./routes/index.routes'));

module.exports = app;
