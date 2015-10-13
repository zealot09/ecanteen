define(['App', 'backbone', 'marionette', "views/user/AccountView", "controllers/user/LoginController", "controllers/user/MyAccountController", "controllers/user/RegisterController", "controllers/user/ForgetController", "controllers/user/InfoController", "controllers/user/OrderHistoryController", "controllers/user/ResetController", "entities/State"],
    function(App, Backbone, Marionette, View, LoginController, MyAccountController, RegisterController, ForgetController, InfoController, OrderHistoryController, ResetController) {
        var control = Backbone.Marionette.Controller.extend({
            show: function() {
                var view = new View();
                App.accountView = view;
                App.mainRegion.show(view);
            },
            login: function() {
                LoginController.show();
            },
            register: function() {
                RegisterController.show();
            },
            myaccount: function(showSuccess) {
                var uid = App.request("state:isLoggedIn").id;
                if (uid) {
                    MyAccountController.show(showSuccess);
                } else {
                    this.login();
                }
            },
            forget: function() {
                ForgetController.show();
            },
            basicinfo: function() {
                InfoController.show();
            },
            orderHistory: function() {
                OrderHistoryController.show();
            },
            resetPassword: function(uid, hash) {
                ResetController.show(uid, hash);
            }

        });
        return new control();
    });