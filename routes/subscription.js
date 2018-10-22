const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    endpoint: String,
    expirationTime: String,
    keys: {
        p256dh: String,
        auth: String
    }
});

const subscriptionModel = mongoose.model('Subscription', subscriptionSchema);
module.exports = subscriptionModel;
