define(['App', 'backbone', 'marionette', "controllers/checkout/CheckoutController", "controllers/browse/Controller", "controllers/header/HeaderController", "controllers/user/AccountController", "controllers/search/SearchController", "controllers/MiscController", "views/FooterView", "entities/Category", "entities/State"],
    function(App, Backbone, Marionette, CheckoutController, BrowseController, HeaderController, AccountController, SearchController, MiscController, FooterView) {

        var API = Backbone.Marionette.Controller.extend({
            initialize: function(options) {
                App.request("state:usersync");
                //App.request("state:sync");
                App.request("cart:sync");
                HeaderController.show();
                App.footerRegion.show(new FooterView());
            },
            //gets mapped to in AppRouter's appRoutes
            showStore: function() {
                if (App.request("state:usersync")) {
                    BrowseController.showStore();
                }
            },
            changeStore: function (id) {
                App.request("state:usersync");
                id = parseInt(id, 10);
                App.request("state:store:change", id);
                App.trigger("cart:refresh");
            },
            changeCategory: function (sid, cid) {
                App.request("state:usersync");
                sid = parseInt(sid, 10);
                cid = parseInt(cid, 10);
                var model = App.request("category:search", sid, cid);
                console.log(model);
                App.request("state:category:change", model);
                App.trigger("cart:refresh");
            },
            checkout: function(sid) {
                sid = sid || 1;
                CheckoutController.show();
            },
            login: function() {
                AccountController.show();
                AccountController.login();
            },
            account: function(showSuccess) {
                AccountController.show();
                AccountController.myaccount(showSuccess);
            },
            register: function() {
                AccountController.show();
                AccountController.register();
            },
            forget: function() {
                AccountController.show();
                AccountController.forget();
            },
            basicinfo: function() {
                AccountController.show();
                AccountController.basicinfo();
            },
            search: function(criterion) {
                var res = criterion.replace(" ", "_");
                SearchController.show(res);
            },
            orderHistory: function() {
                AccountController.show();
                if (App.request("state:usersync")) {
                    AccountController.orderHistory();
                }
            },
            resetPassword: function(uid, hash) {
                AccountController.show();
                AccountController.resetPassword(uid, hash);
            },
            faq: function() {
                MiscController.showFaq();
            },
            term: function() {
                MiscController.showTerm();
            },
            privacy: function() {
                MiscController.showPrivacy();
            },
            contact_us: function() {
                MiscController.showContact();
            },
            about_us: function() {
                MiscController.showAbout();
            },
            pricing: function() {
                MiscController.showPricing();
            }
        });

        var api = new API();

        App.on("changeCategory", function (sid, cid) {
            console.log(arguments);
            api.changeCategory(sid, cid);
        });

        App.on("browse", function() {
            api.showStore();
        });

        App.on("login", function() {
            api.login();
        });
        App.on("register", function() {
            api.register();
        });

        App.on("account", function(showSuccess) {
            api.account(showSuccess);
            App.navigate("#account");
        });

        App.on("checkout", function(sid) {
            // App.navigate("#checkout/" + sid);
            api.checkout(sid);
        });

        App.on("search", function(criterion) {
            api.search(criterion);
            var res = criterion.replace(" ", "_");
            App.navigate("#search/" + res);
        });

        return api;
    });
