define(['jquery', 'hbs!templates/user/forgetpassword', 'backbone', 'marionette', 'backbone.syphon'],
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
                    url: "http://kantwait.com/forgetEmail/" //@api_addr
                }).done(function(response){
                    if (response.status === "success") {
                        that.trigger("continue");
                    } else {
                        $.notify("The You have entered an invalid mail address, please correct it and try again. Or you can click back to register if you don't have one.", {
                            position: "right bottom",
                            className: 'Error'
                        })
                    }

                });
            }
        });
    });