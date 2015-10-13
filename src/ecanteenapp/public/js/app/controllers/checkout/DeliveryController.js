define(['App', 'backbone', 'marionette', 'underscore', 'views/checkout/Shipping', 'jquery.tabs', 'entities/Checkout'],
    function(App, Backbone, Marionette, _, View) {
        function changeStop(view, stopList, sid) {
            sid = parseInt(sid, 10);
            var obj = _.findWhere(stopList.get("stops"), {
                id: sid
            });
            // fetch date info
            var date_info_promise = App.request("checkout:stopdate", obj.id);
            $.when(date_info_promise).done(function(date_info) {
                view.changeStopInfo(obj, date_info);
            });
        }

        var control = Backbone.Marionette.Controller.extend({
            show: function() {
                var stopList = App.request("checkout:stoplist");
                var cart = App.request("cart:current");
                var view = new View({
                    model: stopList
                });
                var isLogged = App.request("state:isLoggedIn");
                if (isLogged.get("id")) {
                    view.on("show", function() {
                        view.appear();
                        var d = new Date();
                        var n = d.getHours();
                        if (n > 13) {
                            view.hideToday();
                        }
                        if (cart.get("id") == 8) {
                            api = "http://kantwait.com/order_count/"; //@api_addr
                            $.ajax({
                                type: "GET",
                                url: api
                            }).done(function(response) {
                                if (response.today === 0) {
                                    view.hideToday();
                                }
                                if (response.tomorrow === 0) {
                                    view.hideTomorrow();
                                }
                                if (response.thedayaftertomorrow === 0) {
                                    view.hideTheDayAfterTomorrow();
                                }

                                if (response.tomorrow === 0 && response.thedayaftertomorrow === 0) {
                                    var d = new Date();
                                    var n = d.getHours();
                                    if (n > 13 || response.today === 0) {
                                        view.showEmptyMessage();
                                    }
                                }
                            });
                        }
                    });
                }
                view.on("change:stop", function(sid) {
                    changeStop(view, stopList, sid);
                });
                view.on("setdefaultaddress", function() {
                    var isLogged = App.request("state:isLoggedIn");
                    view.setDefaultAddress(isLogged.get("default_address"));
                });
                view.on("setdefaultMobile", function() {
                    var isLogged = App.request("state:isLoggedIn");
                    view.setDefaultMobile(isLogged.get("mobile"));
                });
                view.on("changeshipping", function(stat) {
                    App.request("checkout:set:premium", stat);
                });
                view.on("continue", function(data) {
                    if (App.request("checkout:verifyShipping", data)) {
                        if (App.request("checkout:verifyDelivery", data)) {
                            if (App.request("checkout:verifyMobile", data)) {
                                App.request("checkout:settleShipping", data);
                                view.disappear();
                                App.checkoutView.trigger("show:confirm");
                            } else {
                                view.showMobileWarning();
                            }
                        } else {
                            view.showDeliveryWarning();
                        }
                    } else {
                        view.showWarning();
                    }
                });
                view.on("closeothers", function() {
                    App.checkoutView.trigger("closeall");
                });
                stopList.on("sync", function() {
                    App.checkoutView.deliveryRegion.show(view);
                });

                stopList.fetch();
                return view;
            }
        });
        return new control();
    });