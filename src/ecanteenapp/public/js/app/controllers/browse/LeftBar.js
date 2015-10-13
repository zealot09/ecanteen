define(['App', 'backbone', 'marionette', 'views/browse/left_bar/LeftBar', 'views/browse/left_bar/Cates', 'views/browse/left_bar/Parents', 'entities/State'],
    function(App, Backbone, Marionette, LeftBarView, CatesView, ParentsView) {
        var control = Backbone.Marionette.Controller.extend({
            show: function() {
                var store = App.request("state:store");
                var cate = App.request("state:category");
                var m = cate ? cate : store;

                var lb = new LeftBarView({
                    model: m
                });

                lb.on("show", function() {
                    var prs = App.request("category:parents", m);
                    var parents = new ParentsView({
                        collection: prs
                    });
                    lb.parents.show(parents);
                    parents.on("itemview:state:store:change", function(childView, model) {
                        App.request("state:store:change", model.id);
                    });
                    parents.on("itemview:state:category:change", function(childView, model) {
                        App.request("state:category:change", model);
                    });

                    // Category Display
                    var items = m.get("children");
                    if (items && items.length < 1) {
                        return;
                    }
                    var cates = new CatesView({
                        collection: items
                    });
                    cates.on("itemview:state:category:change", function(childView, model) {
                        App.request("state:category:change", model);
                    });
                    lb.cates.show(cates);
                });

                App.mainLayout.leftBar.show(lb);
            }
        });
        return new control();
    });