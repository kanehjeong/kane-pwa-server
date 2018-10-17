class NewsletterService {

    constructor() {
        this.subscriptions = [];
    }

    addSubscription(sub) {
        if (!sub) {
            console.log('Subscription was not sent');
            return Promise.reject();
        }

        this.subscriptions.push(sub);
        console.log('Added subscription successfully');
        console.log(sub);
        return Promise.resolve();
    }

    getSubscriptions() {
        return this.subscriptions;
    }
}

const subscriptionService = new NewsletterService();
module.exports = subscriptionService;

