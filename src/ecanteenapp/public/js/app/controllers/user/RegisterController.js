define(['App', 'backbone', 'marionette', "views/user/RegisterView"],
    function(App, Backbone, Marionette, View) {
        var control = Backbone.Marionette.Controller.extend({
            show: function() {
                var view = new View();
                view.on("register", function(info) {
                    var regPromise = App.request("state:register", info);
                    regPromise.done(function(data){
                        if (data.status === "success") {
                            alert("Thanks for registering! Please check your Verification Email.");
                            location.href = "#";
                        } else {
                            view.showEmailDupError();
                        }
                    });
                });
                App.accountView.mainRegion.show(view);
            }
        });
        return new control();
    });