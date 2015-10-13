define(["App", "backbone", "models/checkout/Stops", "models/checkout/CheckoutProfile", "entities/State", "entities/Cart"], function(App, Backbone, Stops, Checkout) {
    function checkSatisfyStandard(data) {
        return (data.stop !== "") && (data.ride) && (data.offset);
    }

    function checkSatisfyPremium(data) {
        return (data.address !== "") && (data.zipcode !== "") && (data.poffset);
    }
    var _checkout, _cart;
    var API = {
        resetParams: function() {
            _checkout = new Checkout();
            _cart = App.request("cart:current");
        },
        getStopList: function() {
            var sid = App.request("state:storeid");
            return new Stops({
                id: sid
            });
        },
        getStopDate: function(stop_id) {
            var sid = App.request("state:storeid");
            var defer = $.Deferred();
            $.get("http://kantwait.com/getArriveTime/" + sid + "/" + stop_id, function(data) {
                defer.resolve(data);
            });
            return defer.promise();
        },
        setPremium: function(tf) {
            _checkout.set("premium", tf);
            if (tf) {
                _cart.set("shipping", 5.99);
            } else {
                _cart.set("shipping", 2.99);
            }
        },
        addGift: function() {
            _checkout.set("gift", true);
        },
        checkData: function(data) {
            return _checkout.get("premium") ? checkSatisfyPremium(data) : checkSatisfyStandard(data);
        },
        checkDelivery: function(data) {
            return  _checkout.get("premium") ? data.preDelivery : data.stdDelivery;
        },
        checkMobile: function(data) {
//            console.log(data.mobile);
            return  (data.mobile === '' || data.mobile === '0000000000') ? false : true;
        },
        settleShipping: function(data) {
            _checkout.set(data);

        },
        confirmOrder: function() {
            var uid = App.request("state:userinfo").get("id");
            _checkout.set("uid", uid);
//            console.log(_cart.toJSON());
            var cart = _cart.toJSON();
            for (var attrname in cart) {
                _checkout.set(attrname, cart[attrname]);
            }
            var shp = parseFloat(_checkout.get("shipping")),
                tp = parseFloat(_checkout.get("totalPrice"));
            _checkout.set("totalPrice", (shp + tp).toFixed(2));
            if (_checkout.get("premium")) {
                _checkout.set("offset", _checkout.get("poffset"));
            }

//            console.log(_checkout.get("saveDefaultAddr"));
            if(_checkout.get("saveDefaultAddr")) {
//                console.log(_checkout.get("address"));
                App.request("state:saveAddress", _checkout.get("address"));
            }

            var str = JSON.stringify(_checkout);
//            console.log(str);
            var sid = App.request("state:storeid"),
                api = "http://kantwait.com/createOrder/", //@api_addr
                defer = $.Deferred();
            api = api + sid + "/";
            $.ajax({
                type: "POST",
                data: {
                    json: str
                },
                url: api
            }).done(function(d) {
                defer.resolve(d);
            });
            return defer.promise();
        }
    };

    App.reqres.setHandler("checkout:stoplist", function() {
        return API.getStopList();
    });
    App.reqres.setHandler("checkout:stopdate", function(sid) {
        return API.getStopDate(sid);
    });
    App.reqres.setHandler("checkout:set:premium", function(tf) {
        API.setPremium(tf);
    });
    App.reqres.setHandler("checkout:init", function() {
        API.resetParams();
    });
    App.reqres.setHandler("checkout:verifyShipping", function(data) {
        return API.checkData(data);
    });
    App.reqres.setHandler("checkout:verifyDelivery", function(data) {
        return API.checkDelivery(data);
    });
    App.reqres.setHandler("checkout:verifyMobile", function(data) {
        return API.checkMobile(data);
    });
    App.reqres.setHandler("checkout:settleShipping", function(data) {
        API.settleShipping(data);
    });
    App.reqres.setHandler("checkout:confirm", function() {
        return API.confirmOrder();
    });
    App.reqres.setHandler("checkout:addGift", function() {
        API.addGift();
    });

    return;
});