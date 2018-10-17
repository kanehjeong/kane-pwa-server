const express = require('express');
const router = express.Router();
const newsletterService = require('./newsletter.service');
const webpush = require('web-push');

const vapidKeys = {
    'publicKey':'BBG7Ys0byc5gI2P9EI6Jey1GtO8jK4vdDxoSZVih83wqOTGCxcQYv-Ht4lb3Sf8YiYA_CH2eZtG0bnheRmC0fqQ',
    'privateKey':'k0hPi9hBCI9G-nwzQMb4N1B4N9mQ6qGFcwYjZXPEePE'
};

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

router.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

router.post('/', async (req, res, next) => {

    const allSubscriptions = newsletterService.getSubscriptions();

    console.log('Total subscriptions', allSubscriptions.length);

    const notificationPayload = {
        "notification": {
            "title": "Angular News",
            "body": "Newsletter Available!",
            "icon": "assets/main-page-logo-small-hat.png",
            "vibrate": [100, 50, 100],
            "data": {
                "dateOfArrival": Date.now(),
                "primaryKey": 1
            },
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    };

    try {
        await Promise.all(allSubscriptions.map(sub => webpush.sendNotification(sub, JSON.stringify(notificationPayload))));
        res.status(200).json({message: 'Newsletter sent successfully.'});
    } catch (err) {
        console.error("Error sending notification, reason: ", err);
        res.sendStatus(500);
    }
});

router.post('/subscription', async (req, res, next) => {
    try {
        await newsletterService.addSubscription(req.body);
        res.status(200).send();
    } catch (err) {
        res.status(500).send('There was a problem adding the subscription.');
    }
});

module.exports = router;
