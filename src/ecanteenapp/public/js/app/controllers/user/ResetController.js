define(['App', 'backbone', 'marionette', "views/user/ResetView", 'notify'],
    function(App, Backbone, Marionette, View) {
        var control = Backbone.Marionette.Controller.extend({
            show: function(uid, hash) {
                var view = new View();
                view.on("submit", function(d) {
                    d.key = hash;
                    d.userid = uid;
                    $.ajax({
                        type: "POST",
                        data: d,
                        // url: "/resetpasswordfinal/"
                        url: "/resetpasswordfinal/"
                    }).done(function(response){
                        if (response.status === "success") {
                            App.trigger("login");
                        }
                    });
                });
                App.accountView.mainRegion.show(view);
            }
        });
        return new control();
    });