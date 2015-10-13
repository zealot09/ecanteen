define(['App', 'backbone', 'marionette', "views/user/LoginView"],
    function(App, Backbone, Marionette, View) {
        var control = Backbone.Marionette.Controller.extend({
            show: function() {
                var view = new View();
                view.on("login", function(info) {
                    var token = App.request("state:login", info);
                    token.done(function(response) {
                        if (response.status === "success") {
                            App.trigger("browse");
                        } else {
                            if (response.errorKey === 1) {
                                view.showNoValidWarning();
                            } else {
                                view.showNoAccountWarning();
                            }
                        }
                    });
                });
                view.on("resendmail", function(d) {
                    $.ajax({
                        type: "POST",
                        data: d,
                        url: "/resendConfirmationEmail/"
                    }).done(function(response){
                        if (response.status === "success") {
                            view.showResendSuccess()
                        }
                    });
//                    api = "http://kantwait.com/resendemail/"+email; //@api_addr
//                    $.ajax({
//                        type: "GET",
//                        url: api
//                    }).done(function(response) {
//                        if(response.status === "success") {
//                            view.showResendSuccess()
//                        }
//                    });
                });
                App.accountView.mainRegion.show(view);
            }
        });
        return new control();
    });