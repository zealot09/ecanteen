define(["App", "models/user/User", "entities/Category", "entities/Content", "entities/Cart", "jquery.cookie"], function(App, User) {
    App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {

        var currentStoreId = 8;
        var currentCategory;
        var isLoggedIn = false;
        var user = new User();
        var checkout_info;

        function set_cookie(data) {
            var serialized = JSON.stringify(data);
            $.cookie('user_info', serialized); // body...
        }


        var API = {
            getCurrentCategory: function() {
                return currentCategory;
            },
            getCurrentStore: function() {
                return App.request("category:entity", currentStoreId);
            },
            getCurrentStoreId: function() {
                return currentStoreId;
            },
            getCurrentCatalog: function() {
                if (currentCategory) {
                    return App.request("catalog:entity:category", currentCategory.id);
                } else {
                    return App.request("catalog:entity:store", currentStoreId);
                }
            },
            login: function(info) {
                var defer = $.Deferred();
                $.ajax({
                    type: "POST",
                    data: info,
                    url: "http://api.encanteen.com/login/" //@api_addr
                }).done(function(response) {
                    defer.resolve(response);
                });
                var promise = defer.promise();
                promise.done(function(response) {
                    if (response.status === "success") {
                        isLoggedIn = true;
                        user.set(response.user);
                        set_cookie(response.user);
                        App.request("cart:sync");
                    }
                });
                return promise;
            },
            logout: function() {
                $.ajax({
                    type: "POST",
                    url: "http://kantwait.com/logout/" //@api_addr
                }).done(function(response) {
                    if (response.status === "success") {
                        isLoggedIn = false;
                        user.clear();
                        $.cookie('user_info', "");
                        location.href = "#login";
                    }
                });
            },
            usersync: function() {
                ret = false;
                if(location.hash.substr(1,13) == 'resetpassword') {
                    return ret;
                }

                try {
                    var val = JSON.parse($.cookie('user_info'));
                    if (val) {
                        isLoggedIn = true;
                        user.set(val);
                        ret = true;
                    } else {
                        location.href = "#login";
                    }
                } catch (e) {
                    location.href = "#login";
                } finally {
                    return ret;
                }
            },
            userfetch: function() {
                var uid = user.id;
                api = "http://kantwait.com/userInfo/" + uid + "/"; //@api_addr
                $.ajax({
                    type: "GET",
                    url: api
                }).done(function(response) {
                    if (response.status === "success") {
                        delete response.status;
                        user.clear();
                        user.set(response);
                        set_cookie(response);
                    }
                });
            },
            register: function(info) {
                var defer = $.Deferred();
                $.ajax({
                    type: "POST",
                    data: info,
                    url: "http://kantwait.com/signup/" //@api_addr
                }).done(function(response) {
                    defer.resolve(response);
                });
                var promise = defer.promise();
                promise.done(function(response) {
                    if (response.status === "success") {

                    }
                });
                return promise;
            },
            userinfo: function() {
                user = user || new User();
                return user;
            },
            saveDefaultAddr: function(address) {
//                user.set('default_address', address)
//                console.log(address);
                var str=user.toJSON();
                $.ajax({
                    type: "POST",
                    data: str,
                    url: "http://kantwait.com/updateProfile/" //@api_addr
                }).done(function(response) {
                    if (response.status == "success") {
                        //that.trigger("update");
//                        console.log("success");
                    } else {
                        // If the request fail, mostly likely he is not logged in
                        //that.trigger("login");
//                        console.log("failed");
                    }
                });
            },
            orderHistory: function() {
                var uid = user.id;
                var url = "http://kantwait.com/orderHistory/" + uid + "/"; //@api_addr
                var defer = $.Deferred();
                $.ajax({
                    url: url,
                    type: "GET"
                }).done(function(response) {
                    defer.resolve(response.orders);
                });
                return defer.promise();
            }
        };

        App.reqres.setHandler("state:category", function() {
            return API.getCurrentCategory();
        });

        App.reqres.setHandler("state:store", function() {
            return API.getCurrentStore();
        });

        App.reqres.setHandler("state:storeid", function() {
            return currentStoreId;
        });

        App.reqres.setHandler("state:catalog", function() {
            return API.getCurrentCatalog();
        });

        App.reqres.setHandler("state:isLoggedIn", function() {
            return API.userinfo();
        });

        App.reqres.setHandler("state:userinfo", function() {
            return user;
        });

        App.reqres.setHandler("state:saveAddress", function(address) {
            return API.saveDefaultAddr(address);
        });

        App.reqres.setHandler("state:usersync", function() {
            return API.usersync();
        });

        App.reqres.setHandler("state:userfetch", function() {
            return API.userfetch();
        });

        App.reqres.setHandler("state:orderHistory", function() {
            return API.orderHistory();
        });

        App.reqres.setHandler("state:logout", function() {
            return API.logout();
        });

        App.reqres.setHandler("state:login", function(info) {
            return API.login(info);
        });

        App.reqres.setHandler("state:register", function(info) {
            return API.register(info);
        });

        App.reqres.setHandler("state:store:change", function(id) {
            if (currentCategory || currentStoreId !== id || id === 8) {
                currentStoreId = id;
                currentCategory = undefined;
                App.trigger("browse");
            }
        });

        App.reqres.setHandler("state:category:change", function (model) {
            if (currentCategory !== model) {
                var cateId = model.id;
                // Obtain the store the category belongs to
                var ancestor = App.request("category:ancestor", model);
                currentStoreId = ancestor;
                currentCategory = model;

                App.trigger("browse");
                App.navigate("stores/" + ancestor + "/" + cateId, { trigger: true });
            }
        });
    });

    return;
});