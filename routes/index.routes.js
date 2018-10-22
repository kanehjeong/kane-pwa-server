const express = require('express');
const router = express.Router();
const subscriptionService = require('./subscription.service');
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

router.get('/numbers', (req, res) => {
    const randomNumbers = Array.from({length: 5}, () => Math.floor(Math.random() * 40));
    res.json(randomNumbers);
});

router.post('/', async (req, res, next) => {

    const allSubscriptions = await subscriptionService.getSubscriptions();

    console.log('Total subscriptions', allSubscriptions.length);

    const notificationPayload = {
        "notification": {
            "title": "PWA Notification",
            "body": "You got a notification!",
            "icon": "assets/main-page-logo-small-hat.png",
            "vibrate": [100, 50, 100],
            "data": {
                "dateOfArrival": Date.now(),
                "primaryKey": 1
            },
            "actions": [{
                "action": "explore",
                "title": "Go to the site (Not yet Supported)"
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
        await subscriptionService.addSubscription(req.body);
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).send('There was a problem adding the subscription.');
    }
});

module.exports = router;
