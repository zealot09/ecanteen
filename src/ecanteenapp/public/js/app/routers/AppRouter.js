define(['backbone', 'marionette'], function(Backbone, Marionette) {
    return Backbone.Marionette.AppRouter.extend({
        //"index" must be a method in AppRouter's controller
        appRoutes: {
            // navigation section
            // "": "showStore",
            // "stores/:id": "changeStore",
            // "stores/:sid/:cid": "changeCategory",
            // "search/:criterion": "search",
            // checkout section
            // "checkout/:sid": "checkout",
            // account section
            // "login": "login",
            // "register": "register",
            // "account": "account",
            // "forget": "forget",
            // "basicinfo": "basicinfo",
            // "orderHistory": "orderHistory",
            // "resetpassword/:uid/:hash": "resetPassword",
            // misc
            // "faq": "faq",
            // "TermofUse": "term",
            // "privacy": "privacy",
            // "contact_us": "contact_us",
            // "about_us": "about_us",
            // "pricing": "pricing"
        }
    });
});
