define(['jquery', 'hbs!templates/user/info', 'backbone', 'marionette', 'backbone.syphon'],
    function($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template: template,
            events: {
                "submit form": "onSubmitForm"
            },
            onSubmitForm: function(e) {
                e.preventDefault();
                var data = Backbone.Syphon.serialize(this);
                var that = this;
                $.ajax({
                    type: "POST",
                    data: data,
                    url: "http://kantwait.com/updateProfile/" //@api_addr
                }).done(function(response) {
                    if (response.status == "success") {
                        that.trigger("update");
                    } else {
                        // If the request fail, mostly likely he is not logged in
                        that.trigger("login");
                    }
                });
            }
        });
    });