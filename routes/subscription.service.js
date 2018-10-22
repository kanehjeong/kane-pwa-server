const Subscription = require('./subscription');

class SubscriptionService {

    constructor() { }

    async addSubscription(sub) {
        if (!sub) {
            console.log('Subscription was not sent');
            return Promise.reject();
        }

        const subExists = await Subscription.findOne({ 'keys.auth': sub.keys.auth });
        if (subExists) {
            return;
        }
        const newSub = await Subscription.create(sub);

        console.log('Added subscription successfully');
        console.log(newSub);
        return Promise.resolve(newSub);
    }

    async getSubscriptions() {
        return await Subscription.find();
    }
}

const subscriptionService = new SubscriptionService();
module.exports = subscriptionService;

