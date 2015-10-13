define(["App", "backbone", "collections/contents/Categories", "models/search/SearchResult", "entities/State"], function(App, Backbone, Categories, SearchResult) {
    App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {

        var API = {
            getSearchEntities: function(criterion) {
                var sid = App.request("state:storeid");
                var res = new SearchResult({
                    id: sid
                });
                var defer = $.Deferred();
                res.fetch({
                    data: {
                        q: criterion,
                        page: 0
                    },
                    success: function(d) {
                        defer.resolve(d);
                    }
                });
                var promise = defer.promise();
                return promise;
            }
        };

        App.reqres.setHandler("search:store", function(criterion) {
            return API.getSearchEntities(criterion);
        });

    });

    return;
});