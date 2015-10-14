define(["App", "backbone", "models/cart/Carts", "collections/cart/CartItemList", "models/cart/Cart", "entities/State"], function(App, Backbone, Carts, CartItemList, Cart) {
    App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {

        var carts = new Carts(); // this is now merely a model
        var API = {
            getCartEntities: function() {
                return carts;
            },
            getCartEntity: function (sid) {
                var ct = carts.get(sid);
                if (!ct) {
                    ct = new Cart({
                        id: sid
                    });
                    carts.set(sid, ct);
                }
                return ct;
            },
            addCartItem: function(item, count) {
                count = count || 1;
                var cart = this.getCurrentCartEntity();
                var children = cart.get("children");
                var itm = children.get(item.id);
                if (itm) {
                    itm.addCount(count);
                } else {
                    var attr = item.attributes;
                    attr.count = count;
                    children.unshift(attr);
                }
                cart.trigger("change");
                cart.save();
            },
            updateCartItem: function(item, count) {
                count = count || 1;
                var cart = this.getCurrentCartEntity();
                var children = cart.get("children");
                var itm = children.get(item.id);
                if (itm) {
                    itm.setCount(count);
                } else {
                    var attr = item.attributes;
                    attr.count = count;
                    children.unshift(attr);
                }
                cart.trigger("change");
                cart.save();
            },
            getCurrentCartEntity: function() {
                var sid = App.request("state:storeid");
                return this.getCartEntity(sid);
            },
            clearCurrentCart: function() {
                var cart = this.getCurrentCartEntity();
                cart.get("children").reset();
                cart.trigger("change");
            },
            syncCart: function() {
                if(location.hash.substr(1,13) == 'resetpassword') {
                    return;
                }
                carts.fetch();
            }
        };

        App.reqres.setHandler("cart:setCount", function(item, count) {
            API.updateCartItem(item, count);
        });
        App.reqres.setHandler("cart:add", function(item, count) {
            API.addCartItem(item, count);
        });
        App.reqres.setHandler("cart:sync", function() {
            API.syncCart();
        });
        App.reqres.setHandler("cart:current", function() {
            return API.getCurrentCartEntity();
        });
        App.reqres.setHandler("cart:clear", function() {
            return API.clearCurrentCart();
        });
    });

    return;
});
